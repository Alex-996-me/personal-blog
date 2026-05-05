import { getCollection, type CollectionEntry } from "astro:content";
import { categories } from "../data/site";

export type Post = CollectionEntry<"posts">;

export async function getAllPosts() {
  const posts = await getCollection("posts");
  return sortPosts(posts);
}

export function sortPosts(posts: Post[]) {
  return posts.sort((left, right) => right.data.date.valueOf() - left.data.date.valueOf());
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

export function getPostSlug(post: Post) {
  return post.id.replace(/\.(md|mdx)$/i, "");
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
