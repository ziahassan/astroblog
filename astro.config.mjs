// @ts-check
import { defineConfig } from 'astro/config';
import remarkWikiLink from 'remark-wiki-link';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
// https://astro.build/config
export default defineConfig({
  integrations: [react(), 
                tailwind()],
    markdown: {
        remarkPlugins: [
          [remarkWikiLink, {
            hrefTemplate: (permalink) => `/notes/${permalink}`
          }]
        ]
      }
    });
