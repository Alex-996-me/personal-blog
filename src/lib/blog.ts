import { getCollection, type CollectionEntry } from "astro:content";
import { categories, inspirationThemes, visibleCategories } from "../data/site";
import { withBasePath } from "./paths";

export type Post = CollectionEntry<"posts">;
export type Inspiration = CollectionEntry<"inspirations">;
export type InspirationTheme = Inspiration["data"]["theme"];
export type ResourceDocument = CollectionEntry<"resources">;
export type ResourceGroup = ResourceDocument["data"]["groups"][number];
export type ResourceItem = ResourceGroup["items"][number];

type DatedEntry = {
  id: string;
  data: {
    date: Date;
    updated?: Date;
  };
};

export type SearchEntry = {
  title: string;
  description: string;
  date: string;
  updated: string;
  section: string;
  kind: "文章" | "每日灵感" | "资料";
  tags: string[];
  cover: string;
  text: string;
  snippet: string;
  url: string;
};

export type SearchTermSuggestion = {
  term: string;
  count: number;
};

export type SearchTopicPreview = {
  title: string;
  section: string;
  kind: SearchEntry["kind"];
  updated: string;
  url: string;
};

function getEntrySlug<T extends { id: string }>(entry: T) {
  return entry.id.replace(/\.(md|mdx)$/i, "");
}

function getEntryUpdatedDate<T extends DatedEntry>(entry: T) {
  return entry.data.updated ?? entry.data.date;
}

function sortDatedEntries<T extends DatedEntry>(entries: T[]) {
  return [...entries].sort((left, right) => {
    const rightTime = getEntryUpdatedDate(right).valueOf();
    const leftTime = getEntryUpdatedDate(left).valueOf();
    return rightTime - leftTime;
  });
}

export function getPostSlug(post: Post) {
  return getEntrySlug(post);
}

export function getInspirationSlug(inspiration: Inspiration) {
  return getEntrySlug(inspiration);
}

export function getInspirationAnchorId(inspiration: Inspiration) {
  return getInspirationSlug(inspiration);
}

export function getInspirationThemeDefinition(theme: InspirationTheme) {
  return inspirationThemes.find((item) => item.name === theme);
}

export function getInspirationThemeAnchor(theme: InspirationTheme) {
  const themeDefinition = getInspirationThemeDefinition(theme);
  return `daily-theme-${themeDefinition?.slug ?? theme}`;
}

export function getInspirationThemeHref(theme: InspirationTheme) {
  return `/daily/#${getInspirationThemeAnchor(theme)}`;
}

export function getResourceSlug(resource: ResourceDocument) {
  return getEntrySlug(resource);
}

export function getUpdatedDate(post: Post) {
  return getEntryUpdatedDate(post);
}

export function getInspirationUpdatedDate(inspiration: Inspiration) {
  return getEntryUpdatedDate(inspiration);
}

export function getResourceUpdatedDate(resource: ResourceDocument) {
  return getEntryUpdatedDate(resource);
}

export async function getAllPosts() {
  const posts = await getCollection("posts");
  return sortPosts(posts);
}

export async function getAllInspirations() {
  const inspirations = await getCollection("inspirations");
  return sortDatedEntries(inspirations.filter((entry) => entry.data.published !== false));
}

export async function getAllResources() {
  const resources = await getCollection("resources");
  return sortDatedEntries(resources.filter((entry) => entry.data.published !== false));
}

export function sortPosts(posts: Post[]) {
  return sortDatedEntries(posts);
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

export function getInspirationHref(inspiration: Inspiration) {
  return `/daily/#${getInspirationAnchorId(inspiration)}`;
}

export function getResourceHref(resource: ResourceDocument) {
  return `/resources/${getResourceSlug(resource)}/`;
}

export function getCategoryCounts(posts: Post[], options: { includeHidden?: boolean } = {}) {
  const sourceCategories = options.includeHidden ? categories : visibleCategories;

  return sourceCategories.map((category) => ({
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

function buildPostSearchText(post: Post) {
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

function buildInspirationSearchText(inspiration: Inspiration) {
  return stripMarkdownToText(
    [
      inspiration.data.title,
      inspiration.data.description,
      inspiration.data.theme,
      inspiration.data.tags.join(" "),
      inspiration.body,
    ].join("\n\n"),
  ).toLowerCase();
}

function buildResourceSearchText(resource: ResourceDocument) {
  const groupText = (resource.data.groups ?? [])
    .flatMap((group) => [
      group.title,
      group.description ?? "",
      ...group.items.flatMap((item) => [item.title, item.description ?? "", item.file]),
    ])
    .join(" ");

  return stripMarkdownToText(
    [
      resource.data.title,
      resource.data.description,
      resource.data.tags.join(" "),
      resource.data.file ?? "",
      groupText,
      resource.body,
    ].join("\n\n"),
  ).toLowerCase();
}

function buildSearchSnippet(value: string) {
  return stripMarkdownToText(value);
}

function resolveSearchCover(value?: string) {
  return value ? withBasePath(value) : "";
}

export function isPdfResource(value: string) {
  return /\.pdf($|[?#])/i.test(value);
}

export function isImageResource(value: string) {
  return /\.(png|jpe?g|webp|gif|svg)($|[?#])/i.test(value);
}

export function isAudioResource(value: string) {
  return /\.(mp3|m4a|wav|ogg|aac|flac)($|[?#])/i.test(value);
}

export function isOfficeResource(value: string) {
  return /\.(docx?|pptx?|xlsx?)($|[?#])/i.test(value);
}

export function getResourcePrimaryFile(resource: ResourceDocument) {
  if (resource.data.file) {
    return resource.data.file;
  }

  const firstGroupedFile = (resource.data.groups ?? [])
    .flatMap((group) => group.items)
    .find((item) => item.kind !== "audio")?.file;

  return firstGroupedFile ?? "";
}

export function getResourceCover(resource: ResourceDocument) {
  if (resource.data.cover) {
    return resource.data.cover;
  }

  const fallbackFile = getResourcePrimaryFile(resource);
  return fallbackFile && isImageResource(fallbackFile) ? fallbackFile : "";
}

export function getOfficeViewerUrl(value: string, site?: URL) {
  if (!value || !site) {
    return "";
  }

  const absoluteFileUrl = new URL(withBasePath(value), site).toString();
  return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(absoluteFileUrl)}`;
}

export async function getSearchEntries() {
  const [posts, inspirations, resources] = await Promise.all([
    getAllPosts(),
    getAllInspirations(),
    getAllResources(),
  ]);

  const postEntries: (SearchEntry & { sortTime: number })[] = posts.map((post) => ({
    title: post.data.title,
    description: post.data.description,
    date: post.data.date.toISOString().slice(0, 10),
    updated: getUpdatedDate(post).toISOString().slice(0, 10),
    section: post.data.category,
    kind: "文章",
    tags: post.data.tags,
    cover: resolveSearchCover(post.data.cover),
    text: buildPostSearchText(post),
    snippet: buildSearchSnippet(post.body),
    url: withBasePath(getPostHref(post)),
    sortTime: getUpdatedDate(post).valueOf(),
  }));

  const inspirationEntries: (SearchEntry & { sortTime: number })[] = inspirations.map(
    (inspiration) => ({
      title: inspiration.data.title,
      description: inspiration.data.description,
      date: inspiration.data.date.toISOString().slice(0, 10),
      updated: getInspirationUpdatedDate(inspiration).toISOString().slice(0, 10),
      section: `每日灵感 / ${inspiration.data.theme}`,
      kind: "每日灵感",
      tags: inspiration.data.tags,
      cover: "",
      text: buildInspirationSearchText(inspiration),
      snippet: buildSearchSnippet(inspiration.body),
      url: withBasePath(getInspirationHref(inspiration)),
      sortTime: getInspirationUpdatedDate(inspiration).valueOf(),
    }),
  );

  const resourceEntries: (SearchEntry & { sortTime: number })[] = resources.map((resource) => {
    const primaryFile = getResourcePrimaryFile(resource);
    const fallbackCover = !resource.data.cover && primaryFile && isImageResource(primaryFile)
      ? primaryFile
      : "";

    return {
      title: resource.data.title,
      description: resource.data.description,
      date: resource.data.date.toISOString().slice(0, 10),
      updated: getResourceUpdatedDate(resource).toISOString().slice(0, 10),
      section: "资料",
      kind: "资料",
      tags: resource.data.tags,
      cover: resolveSearchCover(resource.data.cover ?? fallbackCover),
      text: buildResourceSearchText(resource),
      snippet: buildSearchSnippet(resource.body || resource.data.description),
      url: withBasePath(getResourceHref(resource)),
      sortTime: getResourceUpdatedDate(resource).valueOf(),
    };
  });

  return [...postEntries, ...inspirationEntries, ...resourceEntries]
    .sort((left, right) => right.sortTime - left.sortTime)
    .map(({ sortTime: _sortTime, ...entry }) => entry);
}

function cleanSearchTerm(value: string) {
  return value
    .replace(/^#/, "")
    .replace(/^每日灵感\s*\/\s*/u, "")
    .replace(/[()（）]/g, "")
    .trim();
}

export function getFrequentSearchTerms(entries: SearchEntry[], limit = 12) {
  const counts = new Map<string, number>();
  const blockedTerms = new Set(["文章", "资料", "每日灵感"]);

  const addTerm = (value: string, weight = 1) => {
    const term = cleanSearchTerm(value);

    if (!term || term.length < 2 || term.length > 12 || blockedTerms.has(term)) {
      return;
    }

    counts.set(term, (counts.get(term) ?? 0) + weight);
  };

  entries.forEach((entry) => {
    entry.tags.forEach((tag) => addTerm(tag, 4));
    entry.section
      .split(/[\/、，,\s]+/u)
      .map((segment) => segment.trim())
      .filter(Boolean)
      .forEach((segment) => addTerm(segment, 2));

    const titleTerms = entry.title.match(/[A-Za-z][A-Za-z0-9-]+|[\u4e00-\u9fff]{2,6}/gu) ?? [];
    titleTerms.forEach((term) => addTerm(term, 1));
  });

  return [...counts.entries()]
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0], "zh-CN"))
    .slice(0, limit)
    .map(([term, count]) => ({ term, count }));
}

export function getRecentSearchTopics(entries: SearchEntry[], limit = 6): SearchTopicPreview[] {
  return entries.slice(0, limit).map((entry) => ({
    title: entry.title,
    section: entry.section,
    kind: entry.kind,
    updated: entry.updated,
    url: entry.url,
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
