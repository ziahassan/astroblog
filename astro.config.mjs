// @ts-check
import { defineConfig } from 'astro/config';
import remarkWikiLink from 'remark-wiki-link';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import rehypeHashtags from './src/plugins/rehype-hashtags.js';
// https://astro.build/config
export default defineConfig({
  site: 'https://ziahassan.space',
  integrations: [react(), 
                tailwind()],
    markdown: {
        rehypePlugins: [rehypeHashtags],
        remarkPlugins: [
          [remarkWikiLink, {
            pageResolver: (name) => {
              const slug = name
                .toLowerCase()
                .replace(/['''‘’`]/g, '') // remove apostrophes
                .replace(/["""]/g, '')                    // remove quotes
                .replace(/[,.:;!?()\[\]{}]/g, '')         // remove punctuation
                .replace(/\s+/g, '-')                     // spaces to hyphens
                .replace(/_/g, '-')                       // underscores to hyphens
                .replace(/-+/g, '-')                      // collapse multiple hyphens
                .replace(/^-|-$/g, '');                   // trim edge hyphens
              return [slug];
            },
            hrefTemplate: (permalink) => `/notes/${permalink}`,
          }]
        ]
      }
    });
