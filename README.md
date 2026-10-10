# Portraits of Hope

Website for [portraitsofhope.art](https://portraitsofhope.art), an art project amplifying the voices of political prisoners in Russia, part of the People for Free Russia Coalition.

Built with [Astro](https://astro.build), Tailwind CSS v4, React (only for the mobile menu) and shadcn/ui. The output is static HTML.

## Development

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
npm run preview  # serve dist/ locally
npm run check    # type-check .astro / .ts files
```

Requires Node 22.12 or newer.

## Where things live

| What | Where |
| --- | --- |
| Portraits (gallery and home marquee) | `src/content/portraits/*.md` + images in `src/assets/portraits/` |
| Campaigns (each gets a page at `/<filename>`) | `src/content/campaigns/*.md` + images in `src/assets/campaigns/` |
| Content schema | `src/content.config.ts` |
| Nav, team, stats, calls to action, external links | `src/data/site.ts` |
| Design tokens and type scale | `src/styles/global.css` |
| Pages | `src/pages/` |

### Adding a portrait

Add the image to `src/assets/portraits/` and create `src/content/portraits/<slug>.md`:

```md
---
name: "Full Name"
age: 42            # optional
artist: "Artist"   # optional
image: "../../assets/portraits/<slug>.jpg"
order: 38          # position in the gallery
---

Short bio (optional).
```

Set `draft: true` to hide an entry without deleting it.

### Adding a campaign

Create `src/content/campaigns/<slug>.md` (see `evgeny-kazantsev.md`). It is published at `/<slug>`, and `featured: true` puts it on the home page.

## Content import

`npm run import:webflow` re-imports all portraits, campaigns and images from the live Webflow site. It overwrites existing files, so only use it before content has been edited here.

## Deployment

The site deploys as static files. `vercel.json` and `netlify.toml` are both included; connect the GitHub repo to either host. URLs have no trailing slash (`/gallery`, `/host`, `/evgeny-kazantsev`), matching the Webflow site.
