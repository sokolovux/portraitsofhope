import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// One Markdown file per entry; the filename is the slug.
// The body holds the long-form text (portrait bio, campaign story).

const portraits = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/portraits" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      age: z.number().int().positive().optional(),
      artist: z.string().optional(),
      image: image(),
      /** Display order in the gallery and the home page marquee (ascending). */
      order: z.number(),
      draft: z.boolean().default(false),
    }),
});

const campaigns = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/campaigns" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      /** Heading on the home page campaign card. */
      headline: z.string(),
      /** Heading on the campaign page; falls back to `headline`. */
      title: z.string().optional(),
      summary: z.string(),
      image: image(),
      /** Amount raised so far, in USD. */
      raised: z.number().nonnegative(),
      /** Fundraising goal in USD, if there is one. */
      goal: z.number().positive().optional(),
      donateUrl: z.url(),
      featured: z.boolean().default(false),
      order: z.number().default(0),
      draft: z.boolean().default(false),
    }),
});

export const collections = { portraits, campaigns };
