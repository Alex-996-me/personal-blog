import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const changeLogEntrySchema = z.object({
  version: z.number().int().positive(),
  date: z.coerce.date(),
  summary: z.array(z.string()).default([]),
});

const postSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  category: z.enum(["日志", "读书", "健康", "训练", "脑科学", "工具"]),
  tags: z.array(z.string()).default([]),
  description: z.string(),
  cover: z.string().optional(),
  youtube: z.string().optional(),
  version: z.number().int().positive().default(1),
  changeLog: z.array(changeLogEntrySchema).default([]),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: postSchema,
});

const postVersions = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/post-versions" }),
  schema: postSchema,
});

export const collections = {
  posts,
  postVersions,
};
