// @ts-check
import { defineConfig } from 'astro/config';
import remarkWikiLink from 'remark-wiki-link';
// https://astro.build/config
export default defineConfig({
    markdown: {
        remarkPlugins: [
          [remarkWikiLink, {
            hrefTemplate: (permalink) => `/notes/${permalink}`
          }]
        ]
      }
    });
