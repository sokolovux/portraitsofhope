// @ts-check
import { defineConfig } from 'astro/config';

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

  vite: {
    plugins: [tailwindcss()]
  }
});
