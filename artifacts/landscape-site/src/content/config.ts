import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    category: z.enum([
      'Landscape',
      'Green Wall',
      'Planting',
      'Tree Pruning',
      'Grass Cutting',
      'Indoor Plants',
      'Turfing',
      'Artificial Turf',
      'Construction',
      'Maintenance',
    ]),
    location: z.string(),
    image: z.string(),
    description: z.string(),
    order: z.number().default(0),
  }),
});

const testimonials = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    quote: z.string(),
    rating: z.number().min(1).max(5).default(5),
    order: z.number().default(0),
  }),
});

export const collections = { projects, testimonials };
