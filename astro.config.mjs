// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://portraitsofhope.art',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  integrations: [react(), sitemap({ filter: (page) => !page.endsWith('/style-guide') }), icon()],

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Oswald',
      cssVariable: '--font-oswald',
      weights: [400, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'IBM Plex Serif',
      cssVariable: '--font-plex-serif',
      weights: [400, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'IBM Plex Serif',
      cssVariable: '--font-plex-serif',
      weights: [700],
      styles: ['italic'],
      subsets: ['latin'],
      fallbacks: ['serif'],
    },
  ],

  vite: {
    plugins: [tailwindcss()]
  }
});
