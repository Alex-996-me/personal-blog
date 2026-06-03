import { getCollection, type CollectionEntry } from "astro:content";
import { categories } from "../data/site";

export type Post = CollectionEntry<"posts">;

export function getPostSlug(post: Post) {
  return post.id.replace(/\.(md|mdx)$/i, "");
}

export function getUpdatedDate(post: Post) {
  return post.data.updated ?? post.data.date;
}

export async function getAllPosts() {
  const posts = await getCollection("posts");
  return sortPosts(posts);
}

export function sortPosts(posts: Post[]) {
  return posts.sort((left, right) => {
    const rightTime = getUpdatedDate(right).valueOf();
    const leftTime = getUpdatedDate(left).valueOf();
    return rightTime - leftTime;
  });
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getCategoryByName(name: string) {
  return categories.find((category) => category.name === name);
}

export function getCategoryHref(categoryName: string) {
  const category = getCategoryByName(categoryName);
  return category ? `/categories/${category.slug}/` : "/categories/";
}

export function getPostHref(post: Post) {
  return `/posts/${getPostSlug(post)}/`;
}

export function getCategoryCounts(posts: Post[]) {
  return categories.map((category) => ({
    ...category,
    count: posts.filter((post) => post.data.category === category.name).length,
  }));
}

export function stripMarkdownToText(value: string) {
  return value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/!\[([^\]]*)]\([^)]+\)/g, " $1 ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, " $1 ")
    .replace(/<\/?[^>]+>/g, " ")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^[>*+-]\s+/gm, "")
    .replace(/^\d+\.\s+/gm, "")
    .replace(/\|/g, " ")
    .replace(/\r?\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function extractSearchText(post: Post) {
  const sectionSummaryText = (post.data.sectionSummaries ?? [])
    .flatMap((entry) => [entry.heading, ...entry.summary])
    .join(" ");

  return stripMarkdownToText(
    [
      post.data.title,
      post.data.description,
      post.data.category,
      post.data.tags.join(" "),
      (post.data.fullSummary ?? []).join(" "),
      sectionSummaryText,
      post.body,
    ].join("\n\n"),
  ).toLowerCase();
}

export function extractSearchSnippet(post: Post) {
  return stripMarkdownToText(post.body);
}

export function extractYoutubeId(value: string) {
  const input = value.trim();
  if (!input) {
    return "";
  }

  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
    return input;
  }

  try {
    const url = new URL(input);
    if (url.hostname.includes("youtu.be")) {
      return url.pathname.replace("/", "");
    }
    if (url.searchParams.get("v")) {
      return url.searchParams.get("v") ?? "";
    }
    const parts = url.pathname.split("/").filter(Boolean);
    return parts.at(-1) ?? "";
  } catch {
    return "";
  }
}

export function getYoutubeEmbedUrl(value?: string) {
  if (!value) {
    return "";
  }

  const id = extractYoutubeId(value);
  return id ? `https://www.youtube.com/embed/${id}` : "";
}
