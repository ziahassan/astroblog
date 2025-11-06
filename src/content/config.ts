// Add this to your src/content/config.ts
import { defineCollection, z } from 'astro:content';

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()).optional(),
    status: z.string().optional(),
    publishDate: z.date().optional(),
    created: z.date().optional(),
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
    heroImage: z.string().optional(),
  }),
});

// Add reading collection for literature notes - robust for Readwise exports
const reading = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.union([z.string(), z.null()]).optional(), // Handle null, undefined, or string
    source: z.union([z.string(), z.null()]).optional(), 
    tags: z.array(z.string()).optional().default([]),
    readDate: z.union([z.date(), z.string()]).optional(), // Handle string dates
    rating: z.union([z.number(), z.null()]).optional(),
    // Common Readwise fields that might appear
    url: z.string().optional(),
    category: z.string().optional(),
    document_note: z.string().optional(),
    // Handle any other fields Readwise might add
  }).passthrough(), // Allow extra fields without errors
});

export const collections = {
  notes,
  pages,
  essays,
  reading, // Add this
};