import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { parse as parseCsv } from "csv-parse/sync";
import TurndownService from "turndown";
import { gfm as turndownGfm } from "turndown-plugin-gfm";
import {
  copyAsset,
  fileExists,
  notionImportsDir,
  publicImagesDir,
  runCommand,
  snapshotExistingPost,
  toIsoDate,
  tryReadPostBySlug,
  writePostFile,
} from "./utils/post-files.mjs";
import { generateSummaryData } from "./utils/summaries.mjs";

const VALID_CATEGORIES = new Set(["日志", "读书", "健康", "训练", "脑科学", "工具"]);
const slug = process.argv[2];

if (!slug) {
  console.error("请提供导入 slug，例如：npm run import:notion -- example");
  process.exit(1);
}

const importDir = path.join(notionImportsDir, slug);
if (!(await fileExists(importDir))) {
  console.error(`没有找到导入目录：imports/notion/${slug}/`);
  process.exit(1);
}

async function walkFiles(targetDir) {
  const entries = await readdir(targetDir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(targetDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkFiles(absolutePath)));
    } else {
      files.push(absolutePath);
    }
  }

  return files;
}

function getRelativeDepth(root, target) {
  return path.relative(root, target).split(path.sep).length;
}

function pickMainSourceFile(allFiles) {
  const markdownFiles = allFiles.filter((file) => /\.(md|markdown)$/i.test(file));
  const htmlFiles = allFiles.filter((file) => /\.html?$/i.test(file));

  const score = (file) => {
    const base = path.basename(file).toLowerCase();
    const depth = getRelativeDepth(importDir, file);
    const mdBonus = /\.(md|markdown)$/i.test(file) ? 0 : 1000;
    const nameBonus = base.includes(slug.toLowerCase()) ? -20 : 0;
    const exportNoise = /(index|readme|_all|archive)/i.test(base) ? 15 : 0;
    return mdBonus + depth + exportNoise + nameBonus + base.length / 100;
  };

  const candidates = markdownFiles.length > 0 ? markdownFiles : htmlFiles;
  return candidates.sort((left, right) => score(left) - score(right))[0] ?? "";
}

function normalizeMarkdownText(markdown) {
  let value = markdown.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");

  value = value.replace(/\n{3,}/g, "\n\n");
  value = value.replace(/[ \t]+\n/g, "\n");
  value = value.replace(/\u00a0/g, " ");
  value = value.replace(/\s+([，。！？；：、])/g, "$1");

  return value.trim();
}

function deriveTitleFromMarkdown(markdown, fallbackTitle) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : fallbackTitle;
}

function removeLeadingH1(markdown) {
  return markdown.replace(/^#\s+.+\n+/, "");
}

function demoteBodyH1(markdown) {
  const lines = markdown.split("\n");
  let inCodeBlock = false;

  return lines
    .map((line) => {
      if (line.trim().startsWith("```")) {
        inCodeBlock = !inCodeBlock;
        return line;
      }

      if (!inCodeBlock && /^#\s+/.test(line)) {
        return line.replace(/^#\s+/, "## ");
      }

      return line;
    })
    .join("\n");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function sanitizeExtension(value) {
  const extension = path.extname(value).toLowerCase();
  if (extension && /^[.][a-z0-9]+$/i.test(extension)) {
    return extension;
  }
  return ".png";
}

function cleanupLinkTarget(target) {
  return target.trim().replace(/^<|>$/g, "");
}

function isRemoteUrl(target) {
  return /^https?:\/\//i.test(target);
}

async function resolveLocalAsset(target, sourceDir, allFiles) {
  const cleaned = cleanupLinkTarget(target);
  const decoded = (() => {
    try {
      return decodeURIComponent(cleaned);
    } catch {
      return cleaned;
    }
  })();

  const directCandidates = [
    path.resolve(sourceDir, decoded),
    path.resolve(importDir, decoded),
  ];

  for (const candidate of directCandidates) {
    if (await fileExists(candidate)) {
      return candidate;
    }
  }

  const baseName = path.basename(decoded).toLowerCase();
  return allFiles.find((file) => path.basename(file).toLowerCase() === baseName) ?? "";
}

function renderMarkdownTable(rows) {
  if (!Array.isArray(rows) || rows.length === 0) {
    return "";
  }

  const columnCount = rows.reduce((count, row) => Math.max(count, row.length), 0);
  const normalizedRows = rows.map((row) => {
    const padded = [...row];
    while (padded.length < columnCount) {
      padded.push("");
    }
    return padded;
  });

  const escapeCell = (value) =>
    String(value ?? "")
      .replace(/\r?\n/g, " ")
      .replace(/\|/g, "\\|")
      .trim();

  const header = normalizedRows[0].map(escapeCell);
  const divider = new Array(columnCount).fill("---");
  const body = normalizedRows.slice(1).map((row) => row.map(escapeCell));

  return [
    `| ${header.join(" | ")} |`,
    `| ${divider.join(" | ")} |`,
    ...body.map((row) => `| ${row.join(" | ")} |`),
  ].join("\n");
}

async function convertCsvLinks(markdown, sourceDir, allFiles) {
  return markdown.replaceAll(
    /\[([^\]]+)\]\(([^)]+\.csv)\)/gi,
    (match, label, csvTarget) => `__CSV_PLACEHOLDER__${Buffer.from(JSON.stringify({ label, csvTarget })).toString("base64")}__`,
  );
}

async function expandCsvPlaceholders(markdown, sourceDir, allFiles) {
  const matches = [...markdown.matchAll(/__CSV_PLACEHOLDER__([A-Za-z0-9+/=]+)__/g)];
  let output = markdown;

  for (const match of matches) {
    const payload = JSON.parse(Buffer.from(match[1], "base64").toString("utf8"));
    const csvPath = await resolveLocalAsset(payload.csvTarget, sourceDir, allFiles);

    if (!csvPath) {
      console.warn(`未找到 CSV 文件，已保留原链接：${payload.csvTarget}`);
      output = output.replace(
        match[0],
        `[${payload.label}](${payload.csvTarget})`,
      );
      continue;
    }

    const rawCsv = await readFile(csvPath, "utf8");
    const rows = parseCsv(rawCsv, {
      skip_empty_lines: true,
      relax_column_count: true,
    });
    const table = renderMarkdownTable(rows);
    const block = [`**${payload.label}**`, "", table].join("\n");
    output = output.replace(match[0], block);
  }

  return output;
}

async function downloadRemoteAsset(url, targetPath) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`下载失败：${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  await mkdir(path.dirname(targetPath), { recursive: true });
  await writeFile(targetPath, Buffer.from(arrayBuffer));
}

async function rewriteImages(markdown, sourceDir, allFiles) {
  const assetDir = path.join(publicImagesDir, slug);
  await mkdir(assetDir, { recursive: true });

  const seen = new Map();
  let assetIndex = 0;
  let firstLocalImage = "";

  const replaceAsync = async (input, matcher, replacer) => {
    const matches = [...input.matchAll(matcher)];
    let output = input;

    for (const match of matches) {
      const replacement = await replacer(match);
      output = output.replace(match[0], replacement);
    }

    return output;
  };

  const updatedMarkdown = await replaceAsync(
    markdown,
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    async (match) => {
      const alt = match[1];
      const rawTarget = cleanupLinkTarget(match[2]);
      const cacheKey = rawTarget;

      if (seen.has(cacheKey)) {
        return `![${alt}](${seen.get(cacheKey)})`;
      }

      assetIndex += 1;
      const extension = sanitizeExtension(rawTarget);
      const publicPath = `/images/posts/${slug}/image-${String(assetIndex).padStart(2, "0")}${extension}`;
      const targetPath = path.join(assetDir, path.basename(publicPath));

      if (isRemoteUrl(rawTarget)) {
        try {
          await downloadRemoteAsset(rawTarget, targetPath);
          seen.set(cacheKey, publicPath);
          firstLocalImage ||= publicPath;
          return `![${alt}](${publicPath})`;
        } catch (error) {
          console.warn(`远程图片下载失败，已保留原链接：${rawTarget} (${error.message})`);
          return match[0];
        }
      }

      const localSource = await resolveLocalAsset(rawTarget, sourceDir, allFiles);
      if (!localSource) {
        console.warn(`未找到图片资源，已保留原路径：${rawTarget}`);
        return match[0];
      }

      await copyAsset(localSource, targetPath);
      seen.set(cacheKey, publicPath);
      firstLocalImage ||= publicPath;
      return `![${alt}](${publicPath})`;
    },
  );

  const withFigures = updatedMarkdown.replace(
    /^!\[([^\]]*)\]\(([^)]+)\)\s*$/gm,
    (_, altText, imageTarget) => {
      if (!altText.trim()) {
        return `![](${imageTarget})`;
      }

      return [
        "",
        '<figure class="post-figure">',
        `<img src="${escapeHtml(imageTarget)}" alt="${escapeHtml(altText)}" />`,
        `<figcaption>${escapeHtml(altText)}</figcaption>`,
        "</figure>",
        "",
      ].join("\n");
    },
  );

  return {
    markdown: withFigures,
    firstLocalImage,
  };
}

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

function normalizeCategory(value, fallback = "日志") {
  if (VALID_CATEGORIES.has(value)) {
    return value;
  }
  return fallback;
}

function normalizeTags(value) {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.map((item) => String(item).trim()).filter(Boolean);
}

function serializeDateValue(value, fallback) {
  if (!value) {
    return fallback;
  }

  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return String(value).slice(0, 10);
}

async function loadSourceMarkdown(sourceFile) {
  const raw = await readFile(sourceFile, "utf8");

  if (/\.(md|markdown)$/i.test(sourceFile)) {
    const parsed = matter(raw);
    return {
      frontmatter: parsed.data,
      title: String(parsed.data.title ?? deriveTitleFromMarkdown(parsed.content, path.parse(sourceFile).name)),
      markdown: parsed.content,
      originalFile: path.basename(sourceFile),
    };
  }

  const turndown = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
  });
  turndown.use(turndownGfm);

  return {
    frontmatter: {},
    title: path.parse(sourceFile).name,
    markdown: turndown.turndown(raw),
    originalFile: path.basename(sourceFile),
  };
}

const allFiles = await walkFiles(importDir);
const sourceFile = pickMainSourceFile(allFiles);

if (!sourceFile) {
  console.error("没有找到可导入的 Markdown 或 HTML 主文件。");
  process.exit(1);
}

const loaded = await loadSourceMarkdown(sourceFile);
const sourceDir = path.dirname(sourceFile);
let content = normalizeMarkdownText(loaded.markdown);
const title = String(loaded.frontmatter.title ?? loaded.title ?? slug).trim();

content = removeLeadingH1(content);
content = demoteBodyH1(content);
content = await convertCsvLinks(content, sourceDir, allFiles);
content = await expandCsvPlaceholders(content, sourceDir, allFiles);

const rewrittenImages = await rewriteImages(content, sourceDir, allFiles);
content = normalizeMarkdownText(rewrittenImages.markdown);

const existingPost = await tryReadPostBySlug(slug);
if (existingPost) {
  const snapshot = await snapshotExistingPost(slug);
  if (snapshot?.created) {
    console.log(`已备份旧文章版本：${snapshot.targetPath}`);
  }
}

const today = toIsoDate();
const previousData = existingPost?.parsed.data ?? {};
const previousVersion = Number(previousData.version ?? 0);
const nextVersion = existingPost ? previousVersion + 1 : 1;
const description = String(loaded.frontmatter.description ?? "").trim() || extractDescription(content);
const category = normalizeCategory(
  String(loaded.frontmatter.category ?? previousData.category ?? "日志").trim(),
  "日志",
);
const importedTags = normalizeTags(loaded.frontmatter.tags);
const tags = importedTags.length > 0 ? importedTags : normalizeTags(previousData.tags);

const summaryData = await generateSummaryData(content, { title });

const nextChangeLog = existingPost
  ? [
      {
        version: nextVersion,
        date: today,
        summary: ["从 Notion 文档重新导入并更新内容。"],
      },
      ...(Array.isArray(previousData.changeLog) ? previousData.changeLog : []),
    ]
  : [
      {
        version: 1,
        date: today,
        summary: ["初始发布版本。"],
      },
    ];

await writePostFile(
  slug,
  {
    title,
    date: serializeDateValue(previousData.date, today),
    updated: today,
    category,
    tags,
    description,
    cover: String(previousData.cover ?? "").trim() || rewrittenImages.firstLocalImage,
    youtube: String(previousData.youtube ?? "").trim(),
    version: nextVersion,
    changeLog: nextChangeLog,
    fullSummary: summaryData.fullSummary,
    sectionSummaries: summaryData.sectionSummaries,
    notionImport: {
      source: "notion",
      importedAt: today,
      originalFile: loaded.originalFile,
    },
  },
  content,
);

console.log(`已生成文章：src/content/posts/${slug}.md`);
if (rewrittenImages.firstLocalImage) {
  console.log(`已同步图片到：public/images/posts/${slug}/`);
}

console.log(
  summaryData.usedAI
    ? "已使用 OPENAI_API_KEY 自动生成分节总结。"
    : "没有可用的 OPENAI_API_KEY，已生成可手动调整的总结占位内容。",
);

await runCommand("npm", ["run", "build"]);

console.log("导入完成。建议手动检查标题、分类、描述、长表格和 sectionSummaries 是否符合你的写作习惯。");
