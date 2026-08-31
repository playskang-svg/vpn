import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// This is a standalone Astro project that publishes static, fully
// pre-rendered pages under vpn.adbles.com/info/ — content marketing /
// SEO pages that sit alongside (and don't touch) the main React/Vite app.
//
// It builds into ../dist/info so the deploy workflow can merge it into
// the same GitHub Pages output as the main app (see .github/workflows/deploy.yml).
export default defineConfig({
  site: 'https://vpn.adbles.com',
  base: '/info',
  outDir: '../dist/info',
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()],
  },
});
