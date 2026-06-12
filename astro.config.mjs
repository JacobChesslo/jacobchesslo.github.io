// @ts-check
import { defineConfig } from 'astro/config';
import solidJs from '@astrojs/solid-js';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://jacobchesslo.github.io',
  // Prefetch linked pages on hover/touch so funnel navigation (home → hub → science/lifestyle)
  // is instant. HTML-only background fetch - does not touch the scroll-scene JS or re-init canvases.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  integrations: [solidJs(), sitemap()],
  vite: {
    // @ts-expect-error - @tailwindcss/vite and Astro resolve slightly different Vite versions, so
    // the Plugin types don't structurally match; the plugin is correct and works at runtime.
    plugins: [tailwindcss()],
  },
});
