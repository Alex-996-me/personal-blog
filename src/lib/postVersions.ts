import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"posts">;
export type PostVersion = CollectionEntry<"postVersions">;
export type PostLike = Post | PostVersion;

export type VersionRecord = {
  slug: string;
  version: number;
  title: string;
  date: Date;
  updated: Date;
  summary: string[];
  isLatest: boolean;
  body: string;
  href: string;
  compareHref?: string;
  source: "current" | "history";
};

export function getPostSlug(post: Post) {
  return post.id.replace(/\.(md|mdx)$/i, "");
}

export function getVersionSlug(version: PostVersion) {
  const normalized = version.id.replace(/\.(md|mdx)$/i, "");
  const segments = normalized.split("/");
  segments.pop();
  return segments.join("/");
}

export function getVersionNumber(post: PostLike) {
  if (typeof post.data.version === "number") {
    return post.data.version;
  }

  if (post.collection === "postVersions") {
    const match = post.id.match(/v(\d+)\.(md|mdx)$/i);
    if (match) {
      return Number(match[1]);
    }
  }

  return 1;
}

export function getUpdatedDate(post: PostLike) {
  return post.data.updated ?? post.data.date;
}

export function getChangeLogSummary(post: PostLike, version = getVersionNumber(post)) {
  const matched = post.data.changeLog.find((entry) => entry.version === version);
  if (matched && matched.summary.length > 0) {
    return matched.summary;
  }
  return version === 1 ? ["初始发布版本。"] : [];
}

export function getChangeLogDate(post: PostLike, version = getVersionNumber(post)) {
  const matched = post.data.changeLog.find((entry) => entry.version === version);
  return matched?.date ?? getUpdatedDate(post);
}

export function getPostHrefFromSlug(slug: string) {
  return `/posts/${slug}/`;
}

export function getHistoryHrefFromSlug(slug: string) {
  return `/posts/${slug}/history/`;
}

export function getVersionHrefFromSlug(slug: string, version: number) {
  return `/posts/${slug}/versions/v${version}/`;
}

export function getCompareHrefFromSlug(slug: string, fromVersion: number, toVersion: number) {
  return `/posts/${slug}/compare/v${fromVersion}-v${toVersion}/`;
}

export async function getAllHistoricalVersions() {
  const versions = await getCollection("postVersions");
  return versions.sort((left, right) => {
    if (getVersionSlug(left) !== getVersionSlug(right)) {
      return getVersionSlug(left).localeCompare(getVersionSlug(right));
    }
    return getVersionNumber(left) - getVersionNumber(right);
  });
}

export async function getHistoricalVersionsBySlug(slug: string) {
  const versions = await getAllHistoricalVersions();
  return versions.filter((entry) => getVersionSlug(entry) === slug);
}

export async function getVersionTimeline(post: Post) {
  const slug = getPostSlug(post);
  const historicalVersions = await getHistoricalVersionsBySlug(slug);
  const versionMap = new Map<number, VersionRecord>();

  for (const entry of historicalVersions) {
    const version = getVersionNumber(entry);
    versionMap.set(version, {
      slug,
      version,
      title: entry.data.title,
      date: entry.data.date,
      updated: getUpdatedDate(entry),
      summary: getChangeLogSummary(entry, version),
      isLatest: false,
      body: entry.body,
      href: getVersionHrefFromSlug(slug, version),
      source: "history",
    });
  }

  const currentVersion = getVersionNumber(post);
  versionMap.set(currentVersion, {
    slug,
    version: currentVersion,
    title: post.data.title,
    date: post.data.date,
    updated: getUpdatedDate(post),
    summary: getChangeLogSummary(post, currentVersion),
    isLatest: true,
    body: post.body,
    href: getPostHrefFromSlug(slug),
    source: "current",
  });

  const timeline = [...versionMap.values()].sort((left, right) => right.version - left.version);

  return timeline.map((item) => ({
    ...item,
    compareHref:
      versionMap.has(item.version - 1)
        ? getCompareHrefFromSlug(slug, item.version - 1, item.version)
        : undefined,
  }));
}

export async function getVersionRecord(post: Post, version: number) {
  const timeline = await getVersionTimeline(post);
  return timeline.find((entry) => entry.version === version);
}

export async function getVersionComparePairs(post: Post) {
  const timeline = await getVersionTimeline(post);
  return timeline
    .filter((entry) => entry.compareHref)
    .map((entry) => {
      const previous = timeline.find((candidate) => candidate.version === entry.version - 1);
      return previous
        ? {
            slug: entry.slug,
            from: previous,
            to: entry,
            href: getCompareHrefFromSlug(entry.slug, previous.version, entry.version),
          }
        : null;
    })
    .filter(Boolean);
}
