import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const sectionSummarySchema = z.object({
  heading: z.string(),
  summary: z.array(z.string()).default([]),
});

const notionImportSchema = z.object({
  source: z.literal("notion").default("notion"),
  importedAt: z.coerce.date(),
  originalFile: z.string().optional(),
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
  fullSummary: z.array(z.string()).default([]),
  sectionSummaries: z.array(sectionSummarySchema).default([]),
  notionImport: notionImportSchema.optional(),
});

const inspirationSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  description: z.string(),
  published: z.boolean().default(true),
});

const resourceItemSchema = z.object({
  title: z.string(),
  file: z.string(),
  kind: z.enum(["document", "audio", "archive", "image", "other"]).default("other"),
  description: z.string().optional(),
  preview: z.enum(["auto", "pdf", "image", "audio", "office", "none"]).default("auto"),
});

const resourceGroupSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  items: z.array(resourceItemSchema).default([]),
});

const resourceSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  description: z.string(),
  file: z.string().optional(),
  cover: z.string().optional(),
  groups: z.array(resourceGroupSchema).default([]),
  published: z.boolean().default(true),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: postSchema,
});

const inspirations = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/inspirations" }),
  schema: inspirationSchema,
});

const resources = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/resources" }),
  schema: resourceSchema,
});

export const collections = {
  posts,
  inspirations,
  resources,
};
