// Add this to your src/content/config.ts
import { defineCollection, z } from 'astro:content';

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()).optional(),
    status: z.string().optional(),
  }),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
  }),
});

const essays = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    publishDate: z.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
  }),
});

// Add reading collection for literature notes
const reading = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string().optional(),
    source: z.string().optional(), // book, article, etc.
    tags: z.array(z.string()).optional(),
    readDate: z.date().optional(),
    rating: z.number().optional(),
  }),
});

export const collections = {
  notes,
  pages,
  essays,
  reading, // Add this
};