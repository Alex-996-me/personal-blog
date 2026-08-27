import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { inspirationThemeNames } from "./data/site";

const sectionSummarySchema = z.object({
  heading: z.string(),
  summary: z.array(z.string()).default([]),
});

const notionImportSchema = z.object({
  source: z.literal("notion").default("notion"),
  importedAt: z.coerce.date(),
  originalFile: z.string().optional(),
});

const relationshipFields = {
  relatedPosts: z.array(z.string()).optional(),
  relatedNotes: z.array(z.string()).optional(),
  relatedMoments: z.array(z.string()).optional(),
  source: z.union([z.string(), z.array(z.string())]).optional(),
  updatedAt: z.coerce.date().optional(),
};

const postSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  category: z.enum(["日志", "自学", "体悟", "健康", "训练", "工具", "世界"]),
  tags: z.array(z.string()).default([]),
  description: z.string(),
  cover: z.string().optional(),
  youtube: z.string().optional(),
  fullSummary: z.array(z.string()).default([]),
  sectionSummaries: z.array(sectionSummarySchema).default([]),
  notionImport: notionImportSchema.optional(),
  featured: z.boolean().default(false),
  featuredRank: z.number().int().positive().optional(),
  featuredHome: z.boolean().default(false),
  series: z.string().optional(),
  seriesOrder: z.number().int().positive().optional(),
  ...relationshipFields,
});

const inspirationSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  theme: z.enum(inspirationThemeNames),
  tags: z.array(z.string()).default([]),
  description: z.string(),
  published: z.boolean().default(true),
  ...relationshipFields,
});

const momentSchema = z.object({
  title: z.string().default(""),
  slug: z.string().optional(),
  date: z.coerce.date(),
  visitedAt: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  place: z.string().optional(),
  lat: z.number().min(-90).max(90).optional(),
  lon: z.number().min(-180).max(180).optional(),
  category: z.enum(["food", "travel", "life", "other"]).optional(),
  location: z.object({
    city: z.string(),
    country: z.string(),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
  }).optional(),
  tags: z.array(z.string()).default([]),
  images: z.array(z.string()).default([]),
  items: z.array(z.object({
    image: z.string(),
    title: z.string().default(""),
    description: z.string().default(""),
  })).default([]),
  hideToc: z.boolean().default(false),
  description: z.string().default(""),
  published: z.boolean().default(true),
  ...relationshipFields,
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: postSchema,
});

const inspirations = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/inspirations" }),
  schema: inspirationSchema,
});

const moments = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/moments" }),
  schema: momentSchema,
});

export const collections = {
  posts,
  inspirations,
  moments,
};
