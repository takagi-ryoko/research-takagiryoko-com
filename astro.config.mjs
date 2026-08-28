// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://research.takagiryoko.com',
  trailingSlash: 'ignore',
  build: {
    format: 'file', // /news.html のような従来型URLを維持（既存の外部リンクを壊さないため）
    assets: '_astro'
  },
  compressHTML: true,
  integrations: [sitemap()],
  server: {
    port: 4321,
    host: true
  }
});
