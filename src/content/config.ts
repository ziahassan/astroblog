// Add this to your src/content/config.ts
import { defineCollection, z } from 'astro:content';

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
    tags: z.union([z.array(z.string()), z.string(), z.null()]).optional().transform(val => {
      if (!val) return [];
      if (typeof val === 'string') {
        return val.split(',').map(tag => tag.trim()).filter(Boolean);
      }
      return val;
    }),
    status: z.string().optional(),
    private: z.union([z.boolean(), z.string()]).optional().transform(v => v === true || v === 'true'),
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
    show: z.string(),
    type: z.enum(['podcast', 'interview', 'talk', 'video']).default('podcast'),
    publishDate: z.date(),
    description: z.string().optional(),
    url: z.string(),
    thumbnail: z.string().optional(),
    duration: z.string().optional(),
    embedUrl: z.string().optional(),
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

const research = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    status: z.enum(['preprint', 'under-review', 'published']),
    year: z.number(),
    venue: z.string(),
    abstract: z.string(),
    authors: z.array(z.string()),
    doi: z.string().optional(),
    url: z.string().optional(),
    quartoPath: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    publishDate: z.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
    image: z.string().optional(),
  }),
});

const teaching = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    type: z.enum(['presentation', 'handout', 'workshop']),
    date: z.date(),
    description: z.string().optional(),
    event: z.string().optional(),
    url: z.string().optional(),
    presentationPath: z.string().optional(), // folder name under /presentations/
    thumbnail: z.string().optional(),        // override image path if you have one
    tags: z.array(z.string()).optional(),
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
  research,
  blog,
  teaching,
};