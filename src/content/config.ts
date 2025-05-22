import { defineCollection, z } from 'astro:content';

const notes = defineCollection({
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()).optional(),
    status: z.string().optional(),
  }),
});

export const collections = {
  notes,
};