import path from "node:path";
import {
  buildPostFrontmatter,
  fileExists,
  postsDir,
  publicImagesDir,
  toIsoDate,
  tryReadPostBySlug,
  writePostFile,
} from "./post-files.mjs";
import { generateSummaryData } from "./summaries.mjs";

export const VALID_CATEGORIES = ["日志", "读书", "健康", "训练", "脑科学", "工具"];

const CATEGORY_KEYWORDS = [
  { category: "健康", keywords: ["健康", "饮食", "营养", "体检", "睡眠", "恢复", "补剂", "代谢"] },
  { category: "训练", keywords: ["训练", "壶铃", "力量", "跑步", "有氧", "肌肉", "健身"] },
  { category: "脑科学", keywords: ["脑科学", "神经", "认知", "记忆", "注意力", "多巴胺", "大脑"] },
  { category: "读书", keywords: ["读书", "阅读", "书单", "书摘", "书评", "播客", "课程笔记"] },
  { category: "工具", keywords: ["工具", "workflow", "效率", "软件", "AI", "提示词", "自动化"] },
  { category: "日志", keywords: ["日志", "日记", "大学", "生活", "迷茫", "阶段", "记录"] },
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

function ensureCurrentChangeLog(changeLog, version, updated, isImportedUpdate) {
  const entries = Array.isArray(changeLog) ? [...changeLog] : [];
  const hasCurrentVersion = entries.some((entry) => Number(entry?.version) === Number(version));

  if (hasCurrentVersion) {
    return entries;
  }

  return [
    {
      version,
      date: updated,
      summary: [
        isImportedUpdate ? "从 Notion 文档重新导入并更新内容。" : "初始发布版本。",
      ],
    },
    ...entries,
  ];
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
  const content = current.parsed.content ?? "";
  const updated = String(data.updated ?? data.date ?? options.today ?? toIsoDate()).slice(0, 10);
  const title = String(data.title ?? slug).trim();
  const category = normalizeCategory(data.category, title, content);
  const notionImport = data.notionImport ?? null;
  const description = String(data.description ?? "").trim() || extractDescription(content);
  const version = Number(data.version ?? 1);
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
    version,
    changeLog: ensureCurrentChangeLog(
      data.changeLog,
      version,
      updated,
      Boolean(notionImport && version > 1),
    ),
    fullSummary,
    sectionSummaries,
  });

  const before = JSON.stringify(buildPostFrontmatter(data));
  const after = JSON.stringify(nextFrontmatter);
  const changed = before !== after;

  if (changed) {
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
