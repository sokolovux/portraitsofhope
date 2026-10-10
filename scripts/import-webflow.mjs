// One-off import of content and assets from the published Webflow site.
//
//   node scripts/import-webflow.mjs
//
// Reads the live pages, downloads original-size images from the Webflow CDN and
// writes one Markdown file per portrait / campaign into src/content. Existing
// files are overwritten, so only re-run it before content has been edited here.

import * as cheerio from "cheerio";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SITE = "https://portraitsofhope.art";
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const load = async (path) => {
  const res = await fetch(SITE + path);
  if (!res.ok) throw new Error(`${path}: HTTP ${res.status}`);
  return cheerio.load(await res.text());
};

const slugify = (s) =>
  s.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/[\s_]+/g, "-");

const extOf = (url) => extname(new URL(url).pathname).toLowerCase().replace(".jpeg", ".jpg") || ".jpg";

async function download(url, relPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  const file = join(ROOT, relPath);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, Buffer.from(await res.arrayBuffer()));
  console.log("  ↓", relPath);
  return relPath;
}

async function writeEntry(relPath, data, body = "") {
  const yaml = Object.entries(data)
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => `${k}: ${typeof v === "string" ? JSON.stringify(v) : v}`)
    .join("\n");
  const file = join(ROOT, relPath);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, `---\n${yaml}\n---\n${body ? `\n${body.trim()}\n` : ""}`);
  console.log("  ✎", relPath);
}

const clean = (s) => s.replace(/\u200d/g, "").replace(/\s+/g, " ").trim();

/** Minimal HTML → Markdown for Webflow rich text (paragraphs, line breaks, links, emphasis). */
function richTextToMarkdown($, el) {
  const inline = (node) =>
    $(node)
      .contents()
      .map((_, n) => {
        if (n.type === "text") return $(n).text().replace(/\s+/g, " ");
        if (n.type !== "tag") return "";
        const inner = inline(n);
        switch (n.name) {
          case "br": return "  \n";
          case "a": return `[${inner}](${$(n).attr("href")})`;
          case "strong": case "b": return `**${inner}**`;
          case "em": case "i": return `*${inner}*`;
          default: return inner;
        }
      })
      .get()
      .join("");
  return $(el)
    .children()
    .map((_, block) => inline(block).replace(/\u200d/g, "").replace(/ +\n/g, "  \n").trim())
    .get()
    .filter(Boolean)
    .join("\n\n");
}

// ---------------------------------------------------------------- portraits

console.log("Portraits");
const gallery = await load("/gallery");
const seen = new Map();
const items = gallery(".collection-list .collection-item").toArray();

for (const [i, item] of items.entries()) {
  const $item = gallery(item);
  const name = clean($item.find(".div-block-3 .h6").text());
  const ageText = clean($item.find(".div-block-2 p").first().text());
  const artist = clean($item.find(".div-block p").eq(1).text());
  const bio = clean($item.find("p.b3").text()).replace(/^-$/, "");
  const src = $item.find("img.portrait-image").attr("src");

  let slug = slugify(name);
  const count = (seen.get(slug) ?? 0) + 1;
  seen.set(slug, count);
  if (count > 1) slug = `${slug}-${count}`;

  const image = await download(src, `src/assets/portraits/${slug}${extOf(src)}`);
  await writeEntry(
    `src/content/portraits/${slug}.md`,
    {
      name,
      age: /^\d+$/.test(ageText) ? Number(ageText) : undefined,
      artist: artist || undefined,
      image: `../../${image.replace(/^src\//, "")}`,
      order: i + 1,
    },
    bio,
  );
}

// ---------------------------------------------------------------- campaigns

console.log("Campaigns");
const home = await load("/");

for (const card of home(".story-card").toArray()) {
  const $card = home(card);
  const pagePath = $card.find('a[href^="/"]').attr("href");
  const slug = pagePath.replace(/^\//, "");
  const page = await load(pagePath);

  const src = $card.find("img.story-image").attr("src");
  const image = await download(src, `src/assets/campaigns/${slug}${extOf(src)}`);
  const raised = Number(clean($card.find(".b1.green").text()).replace(/[^\d.]/g, ""));
  const pageTitle = clean(page("section h3.h4.centered").first().text());
  const headline = clean($card.find("h3.h4").text());

  await writeEntry(
    `src/content/campaigns/${slug}.md`,
    {
      name: clean($card.find("h3.h6").text()),
      headline,
      title: pageTitle.toLowerCase() === headline.toLowerCase() ? undefined : pageTitle,
      summary: clean($card.find(".story-card-content > p.b1").not(".green").text()),
      image: `../../${image.replace(/^src\//, "")}`,
      raised,
      donateUrl: $card.find('a[href*="givebutter"]').attr("href"),
      featured: true,
    },
    richTextToMarkdown(page, page(".rich-text").first()),
  );
}

// ---------------------------------------------------------------- site assets

console.log("Site assets");
await download(home(".hero-image").attr("src"), "src/assets/site/hero-logo.png");
await download(home(".poh-footer-logo").attr("src"), "src/assets/site/footer-logo.png");
await download(home(".section-image").attr("src"), "src/assets/site/exhibition-prague.jpg");
await download(gallery(".gallery-title").attr("src"), "src/assets/site/gallery-title.png");

for (const [i, img] of home(".hero-portrait").toArray().entries()) {
  const src = home(img).attr("src");
  await download(src, `src/assets/hero/frame-${String(i + 1).padStart(2, "0")}${extOf(src)}`);
}

for (const member of home(".team-member").toArray()) {
  const name = clean(home(member).find(".h6").text());
  const src = home(member).find("img.tm-image").attr("src");
  await download(src, `src/assets/team/${slugify(name)}${extOf(src)}`);
}

const css = await (await fetch(home('link[rel="stylesheet"]').attr("href"))).text();
const noise = css.match(/grain-overlay[^}]*url\("([^"]+)"\)/)?.[1];
if (noise) await download(noise, "public/noise.png");

await download(home('link[rel="shortcut icon"]').attr("href"), "public/favicon-32.png");
await download(home('link[rel="apple-touch-icon"]').attr("href"), "public/apple-touch-icon.png");

console.log("Done.");
