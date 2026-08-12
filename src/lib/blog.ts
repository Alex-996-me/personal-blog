import { getCollection, type CollectionEntry } from "astro:content";
import { categories, inspirationThemes, visibleCategories } from "../data/site";
import { withBasePath } from "./paths";

export type Post = CollectionEntry<"posts">;
export type Inspiration = CollectionEntry<"inspirations">;
export type InspirationTheme = Inspiration["data"]["theme"];
export type Moment = CollectionEntry<"moments">;
export type MomentCategory = "food" | "travel" | "life" | "other";
export type MomentLocation = {
  city: string;
  country: string;
  place?: string;
  latitude: number;
  longitude: number;
};
type DatedEntry = {
  id: string;
  data: {
    date: Date;
    updated?: Date;
    updatedAt?: Date;
  };
};

export type SearchEntry = {
  title: string;
  description: string;
  date: string;
  updated: string;
  section: string;
  kind: "ARTICLE" | "IDEA" | "MOMENT";
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
  return entry.data.updatedAt ?? entry.data.updated ?? entry.data.date;
}

function normalizeRelationSlug(value: string) {
  return value
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .replace(/^(posts|daily|moments)\//, "")
    .replace(/\.(md|mdx)$/i, "");
}

function resolveRelations<T extends { id: string }>(values: string[] | undefined, entries: T[]) {
  if (!values?.length) {
    return [];
  }

  const wanted = new Set(values.map(normalizeRelationSlug));
  return entries.filter((entry) => wanted.has(normalizeRelationSlug(getEntrySlug(entry))));
}

export function resolveRelatedPosts(values: string[] | undefined, posts: Post[]) {
  return resolveRelations(values, posts);
}

export function resolveRelatedInspirations(values: string[] | undefined, inspirations: Inspiration[]) {
  return resolveRelations(values, inspirations);
}

export function resolveRelatedMoments(values: string[] | undefined, moments: Moment[]) {
  return resolveRelations(values, moments);
}

export function getSources(source: string | string[] | undefined) {
  return source ? (Array.isArray(source) ? source : [source]) : [];
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

export function getMomentSlug(moment: Moment) {
  return moment.data.slug?.trim() || getEntrySlug(moment);
}

export function getMomentDate(moment: Moment) {
  return moment.data.visitedAt ?? moment.data.date;
}

export function getMomentLocation(moment: Moment): MomentLocation | undefined {
  if (moment.data.location) {
    return {
      ...moment.data.location,
      place: moment.data.place,
    };
  }

  if (
    moment.data.city &&
    moment.data.country &&
    typeof moment.data.lat === "number" &&
    typeof moment.data.lon === "number"
  ) {
    return {
      city: moment.data.city,
      country: moment.data.country,
      place: moment.data.place,
      latitude: moment.data.lat,
      longitude: moment.data.lon,
    };
  }

  return undefined;
}

export function getMomentCategory(moment: Moment): MomentCategory {
  // Existing Moments are restaurant and food records; new entries can opt into another category.
  return moment.data.category ?? "food";
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

export function getUpdatedDate(post: Post) {
  return getEntryUpdatedDate(post);
}

export function getInspirationUpdatedDate(inspiration: Inspiration) {
  return getEntryUpdatedDate(inspiration);
}

export async function getAllPosts() {
  const posts = await getCollection("posts");
  return sortPosts(posts);
}

export async function getAllInspirations() {
  const inspirations = await getCollection("inspirations");
  // 首页灵感是按首次发布顺序翻阅，编辑旧灵感不会改变它在队列中的位置。
  return [...inspirations]
    .filter((entry) => entry.data.published !== false)
    .sort((left, right) => right.data.date.valueOf() - left.data.date.valueOf());
}

export async function getAllMoments() {
  const moments = await getCollection("moments");
  return sortDatedEntries(moments.filter((entry) => entry.data.published !== false));
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

export function getInspirationDetailHref(inspiration: Inspiration) {
  return `/daily/${getInspirationSlug(inspiration)}/`;
}

export function getMomentHref(moment: Moment) {
  return `/moments/${getMomentSlug(moment)}/`;
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

function buildMomentSearchText(moment: Moment) {
  const location = getMomentLocation(moment);
  const itemText = (moment.data.items ?? [])
    .flatMap((item) => [item.title, item.description])
    .join(" ");

  return stripMarkdownToText(
    [moment.data.title, moment.data.description, location?.city, location?.country, location?.place, itemText, moment.body].join("\n\n"),
  ).toLowerCase();
}

function buildSearchSnippet(value: string) {
  return stripMarkdownToText(value);
}

function resolveSearchCover(value?: string) {
  return value ? withBasePath(value) : "";
}

export async function getSearchEntries() {
  const [posts, inspirations, moments] = await Promise.all([
    getAllPosts(),
    getAllInspirations(),
    getAllMoments(),
  ]);

  const postEntries: (SearchEntry & { sortTime: number })[] = posts.map((post) => ({
    title: post.data.title,
    description: post.data.description,
    date: post.data.date.toISOString().slice(0, 10),
    updated: getUpdatedDate(post).toISOString().slice(0, 10),
    section: post.data.category,
    kind: "ARTICLE",
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
      section: `explained / ${inspiration.data.theme}`,
      kind: "IDEA",
      tags: inspiration.data.tags,
      cover: "",
      text: buildInspirationSearchText(inspiration),
      snippet: buildSearchSnippet(inspiration.body),
      url: withBasePath(getInspirationDetailHref(inspiration)),
      sortTime: getInspirationUpdatedDate(inspiration).valueOf(),
    }),
  );

  const momentEntries: (SearchEntry & { sortTime: number })[] = moments.map((moment) => ({
    title: moment.data.title || "生活记录",
    description: moment.data.description,
    date: moment.data.date.toISOString().slice(0, 10),
    updated: getEntryUpdatedDate(moment).toISOString().slice(0, 10),
    section: "生活记录",
    kind: "MOMENT",
    tags: moment.data.tags,
    cover: resolveSearchCover(moment.data.items[0]?.image ?? moment.data.images[0]),
    text: buildMomentSearchText(moment),
    snippet: buildSearchSnippet(moment.body || moment.data.description),
    url: withBasePath(getMomentHref(moment)),
    sortTime: getEntryUpdatedDate(moment).valueOf(),
  }));

  return [...postEntries, ...inspirationEntries, ...momentEntries]
    .sort((left, right) => right.sortTime - left.sortTime)
    .map(({ sortTime: _sortTime, ...entry }) => entry);
}

function cleanSearchTerm(value: string) {
  return value
    .replace(/^#/, "")
    .replace(/^(每日灵感|explained)\s*\/\s*/u, "")
    .replace(/[()（）]/g, "")
    .trim();
}

export function getFrequentSearchTerms(entries: SearchEntry[], limit = 12) {
  const counts = new Map<string, number>();
  const blockedTerms = new Set(["文章", "每日灵感", "explained"]);

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
