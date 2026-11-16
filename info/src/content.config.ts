import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    thumbnail: z.string(),
    tags: z.array(z.string()).default([]),
    // 비교표 아래 CTA 상자의 질문형 문구(선택)
    cta: z.string().optional(),
  }),
});

export const collections = { posts };
