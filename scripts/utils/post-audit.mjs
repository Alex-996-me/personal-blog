import path from "node:path";
import {
  buildPostFrontmatter,
  fileExists,
  postsDir,
  publicImagesDir,
  serializePostFile,
  toIsoDate,
  tryReadPostBySlug,
  writePostFile,
} from "./post-files.mjs";
import { generateSummaryData } from "./summaries.mjs";

export const VALID_CATEGORIES = ["日志", "自学", "体悟", "健康", "训练", "工具", "世界"];

const CATEGORY_KEYWORDS = [
  { category: "健康", keywords: ["健康", "饮食", "营养", "体检", "睡眠", "恢复", "补剂", "代谢"] },
  { category: "训练", keywords: ["训练", "壶铃", "力量", "跑步", "有氧", "肌肉", "健身"] },
  { category: "自学", keywords: ["自学", "英语", "雅思", "课程", "language", "english", "ielts"] },
  { category: "体悟", keywords: ["读书", "阅读", "播客", "脑科学", "认知", "思考"] },
  { category: "工具", keywords: ["workflow", "AI", "CLI", "工具", "自动化"] },
  { category: "世界", keywords: ["世界", "社会", "行业", "经济", "现实"] },
  { category: "日志", keywords: ["日志", "日记", "大学", "生活", "阶段"] },
];

function extractDescription(markdown) {
  const lines = markdown
    .split("\n")
    .map((line) => line.trim())
    .filter(
      (line) =>
        line &&
        !line.startsWith("#") &&
        !line.startsWith("!") &&
        !line.startsWith("|") &&
        !line.startsWith("```") &&
        !line.startsWith("<"),
    );

  const paragraph = lines[0] ?? "";
  return paragraph.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").slice(0, 120);
}

function extractLocalImagePaths(markdown, slug) {
  const pattern = new RegExp(`/images/posts/${slug}/[^)\\s"'<>]+`, "g");
  return [...new Set(markdown.match(pattern) ?? [])];
}

function normalizePublicImagePaths(markdown) {
  return markdown.replace(
    /(["'(])(?:public[\\/])?images[\\/]posts[\\/]/gi,
    (_, prefix) => `${prefix}/images/posts/`,
  );
}

function normalizeCategory(category, title, markdown) {
  const candidate = String(category ?? "").trim();
  if (VALID_CATEGORIES.includes(candidate)) {
    return candidate;
  }

  const haystack = `${title}\n${markdown}`.toLowerCase();
  for (const item of CATEGORY_KEYWORDS) {
    if (item.keywords.some((keyword) => haystack.includes(keyword.toLowerCase()))) {
      return item.category;
    }
  }

  return "日志";
}

async function resolveCoverPath({ cover, slug, markdown, notionImport }) {
  const localImages = extractLocalImagePaths(markdown, slug);
  const firstLocalImage = localImages[0] ?? "";
  const trimmedCover = String(cover ?? "").trim();

  if (!trimmedCover) {
    return firstLocalImage;
  }

  if (/^https?:\/\//i.test(trimmedCover)) {
    return trimmedCover;
  }

  const normalized = trimmedCover.startsWith("/") ? trimmedCover : `/${trimmedCover}`;
  const localAssetPath = path.join(publicImagesDir, normalized.replace(/^\/images\/posts\//, ""));
  const coverExists =
    normalized.startsWith(`/images/posts/${slug}/`) && (await fileExists(localAssetPath));

  if (coverExists) {
    return normalized;
  }

  if (notionImport && normalized.startsWith("/images/covers/") && firstLocalImage) {
    return firstLocalImage;
  }

  if (!coverExists && firstLocalImage) {
    return firstLocalImage;
  }

  return normalized;
}

export async function auditAndFixPost(slug, options = {}) {
  const current = await tryReadPostBySlug(slug);
  if (!current) {
    throw new Error(`Post not found: ${slug}`);
  }

  const data = current.parsed.data ?? {};
  const content = normalizePublicImagePaths(current.parsed.content ?? "");
  const updated = String(data.updated ?? data.date ?? options.today ?? toIsoDate()).slice(0, 10);
  const title = String(data.title ?? slug).trim();
  const category = normalizeCategory(data.category, title, content);
  const notionImport = data.notionImport ?? null;
  const description = String(data.description ?? "").trim() || extractDescription(content);
  const cover = await resolveCoverPath({
    cover: data.cover,
    slug,
    markdown: content,
    notionImport,
  });

  let fullSummary = Array.isArray(data.fullSummary) ? data.fullSummary : [];
  let sectionSummaries = Array.isArray(data.sectionSummaries) ? data.sectionSummaries : [];

  if (options.ensureSummaries && fullSummary.length === 0 && sectionSummaries.length === 0) {
    const generated = await generateSummaryData(content, { title });
    fullSummary = generated.fullSummary;
    sectionSummaries = generated.sectionSummaries;
  }

  const nextFrontmatter = buildPostFrontmatter({
    ...data,
    title,
    date: String(data.date ?? updated).slice(0, 10),
    updated,
    category,
    description,
    cover,
    fullSummary,
    sectionSummaries,
  });

  const nextFile = serializePostFile(nextFrontmatter, content);
  const changed = current.raw !== nextFile;

  if (changed && options.writeChanges !== false) {
    await writePostFile(slug, nextFrontmatter, content);
  }

  return {
    changed,
    postPath: path.join(postsDir, `${slug}.md`),
    cover: nextFrontmatter.cover,
    category: nextFrontmatter.category,
    updated: nextFrontmatter.updated,
  };
}
