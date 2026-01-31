// Add this to your src/content/config.ts
import { defineCollection, z } from 'astro:content';

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
    tags: z.union([z.array(z.string()), z.string()]).optional().transform(val => {
      if (typeof val === 'string') {
        return val.split(',').map(tag => tag.trim()).filter(Boolean);
      }
      return val || [];
    }),
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

// Add CV collection
const cv = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    lastUpdated: z.date(),
    contact: z.object({
      location: z.string(),
      phone: z.string(),
      email: z.string(),
    }),
  }),
});


const guestAppearances = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    podcast: z.string(),
    publishDate: z.date(),
    description: z.string().optional(),
    url: z.string(),
    thumbnail: z.string().optional(),
    duration: z.string().optional(),
  }),
});

const music = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    releaseDate: z.date(),
    description: z.string().optional(),
    url: z.string(),
    thumbnail: z.string().optional(),
    price: z.string().optional(),
    platform: z.string().default('Bandcamp'),
  }),
});

// Articles collection for Quarto exports and formal research pieces
const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    publishDate: z.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
    quartoFile: z.string().optional(), // Path to HTML file in public/articles/
    abstract: z.string().optional(),
    authors: z.array(z.string()).optional(),
    doi: z.string().optional(),
  }),
});

export const collections = {
  notes,
  pages,
  essays,
  reading,
  cv,
  guestAppearances,
  music,
  articles,
};