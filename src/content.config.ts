import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(["日志", "读书", "健康", "训练", "脑科学", "工具"]),
    tags: z.array(z.string()).default([]),
    description: z.string(),
    cover: z.string().optional(),
    youtube: z.string().optional(),
  }),
});

export const collections = {
  posts,
};
