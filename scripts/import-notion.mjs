import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { parse as parseCsv } from "csv-parse/sync";
import extract from "extract-zip";
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
import { auditAndFixPost, VALID_CATEGORIES } from "./utils/post-audit.mjs";
import { generateSummaryData } from "./utils/summaries.mjs";

const slug = process.argv[2];

if (!slug) {
  console.error("Usage: npm run import:notion -- your-slug");
  process.exit(1);
}

function cleanupLinkTarget(target) {
  return target.trim().replace(/^<|>$/g, "");
}

function sanitizeExtension(value) {
  const extension = path.extname(value).toLowerCase();
  if (extension && /^[.][a-z0-9]+$/i.test(extension)) {
    return extension;
  }
  return ".png";
}

function isRemoteUrl(target) {
  return /^https?:\/\//i.test(target);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
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

async function ensureImportSource(slugValue) {
  const directDir = path.join(notionImportsDir, slugValue);
  const rootZip = path.join(notionImportsDir, `${slugValue}.zip`);

  if (await fileExists(directDir)) {
    const existingFiles = await walkFiles(directDir);
    const hasSourceFile = existingFiles.some((file) => /\.(md|markdown|html?)$/i.test(file));
    if (hasSourceFile) {
      return directDir;
    }

    const nestedZip = existingFiles.find((file) => /\.zip$/i.test(file));
    if (nestedZip) {
      await extract(nestedZip, { dir: directDir });
      return directDir;
    }
  }

  if (await fileExists(rootZip)) {
    await mkdir(directDir, { recursive: true });
    await extract(rootZip, { dir: directDir });
    return directDir;
  }

  throw new Error(
    `No import source found. Expected either imports/notion/${slugValue}/ or imports/notion/${slugValue}.zip`,
  );
}

function getRelativeDepth(root, target) {
  return path.relative(root, target).split(path.sep).length;
}

function pickMainSourceFile(importDir, allFiles, slugValue) {
  const markdownFiles = allFiles.filter((file) => /\.(md|markdown)$/i.test(file));
  const htmlFiles = allFiles.filter((file) => /\.html?$/i.test(file));

  const score = (file) => {
    const base = path.basename(file).toLowerCase();
    const depth = getRelativeDepth(importDir, file);
    const mdBonus = /\.(md|markdown)$/i.test(file) ? 0 : 1000;
    const nameBonus = base.includes(slugValue.toLowerCase()) ? -20 : 0;
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

async function resolveLocalAsset(target, sourceDir, importDir, allFiles) {
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

async function convertCsvLinks(markdown, sourceDir, importDir, allFiles) {
  const csvLinkPattern = /\[([^\]]+)\]\(([^)]+\.csv)\)/gi;
  const matches = [...markdown.matchAll(csvLinkPattern)];
  let output = markdown;

  for (const match of matches) {
    const label = match[1];
    const csvTarget = match[2];
    const csvPath = await resolveLocalAsset(csvTarget, sourceDir, importDir, allFiles);

    if (!csvPath) {
      continue;
    }

    const rawCsv = await readFile(csvPath, "utf8");
    const rows = parseCsv(rawCsv, {
      skip_empty_lines: true,
      relax_column_count: true,
    });
    const table = renderMarkdownTable(rows);
    const block = [`**${label}**`, "", table].join("\n");
    output = output.replace(match[0], block);
  }

  return output;
}

async function downloadRemoteAsset(url, targetPath) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download asset: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  await mkdir(path.dirname(targetPath), { recursive: true });
  await writeFile(targetPath, Buffer.from(arrayBuffer));
}

async function rewriteImages(markdown, slugValue, sourceDir, importDir, allFiles) {
  const assetDir = path.join(publicImagesDir, slugValue);
  await mkdir(assetDir, { recursive: true });

  const seen = new Map();
  let assetIndex = 0;
  let firstLocalImage = "";

  const matches = [...markdown.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)];
  let output = markdown;

  for (const match of matches) {
    const alt = match[1];
    const rawTarget = cleanupLinkTarget(match[2]);

    if (seen.has(rawTarget)) {
      output = output.replace(match[0], `![${alt}](${seen.get(rawTarget)})`);
      continue;
    }

    assetIndex += 1;
    const extension = sanitizeExtension(rawTarget);
    const fileName = `image-${String(assetIndex).padStart(2, "0")}${extension}`;
    const publicPath = `/images/posts/${slugValue}/${fileName}`;
    const targetPath = path.join(assetDir, fileName);

    if (isRemoteUrl(rawTarget)) {
      try {
        await downloadRemoteAsset(rawTarget, targetPath);
        seen.set(rawTarget, publicPath);
        firstLocalImage ||= publicPath;
        output = output.replace(match[0], `![${alt}](${publicPath})`);
      } catch (error) {
        console.warn(`Warning: failed to download remote image ${rawTarget}: ${error.message}`);
      }
      continue;
    }

    const localSource = await resolveLocalAsset(rawTarget, sourceDir, importDir, allFiles);
    if (!localSource) {
      console.warn(`Warning: image not found, keeping original path: ${rawTarget}`);
      continue;
    }

    await copyAsset(localSource, targetPath);
    seen.set(rawTarget, publicPath);
    firstLocalImage ||= publicPath;
    output = output.replace(match[0], `![${alt}](${publicPath})`);
  }

  output = output.replace(/^!\[([^\]]*)\]\(([^)]+)\)\s*$/gm, (_, altText, imageTarget) => {
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
  });

  return {
    markdown: normalizeMarkdownText(output),
    firstLocalImage,
  };
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

function normalizeCategory(value, fallbackTitle, markdown, previousCategory = "") {
  const raw = String(value ?? previousCategory ?? "").trim();
  if (VALID_CATEGORIES.includes(raw)) {
    return raw;
  }

  const combined = `${fallbackTitle}\n${markdown}`.toLowerCase();
  const keywordMap = [
    ["健康", ["健康", "饮食", "营养", "体检", "睡眠", "恢复", "补剂"]],
    ["训练", ["训练", "力量", "壶铃", "健身", "跑步", "肌肉", "有氧"]],
    ["脑科学", ["脑科学", "神经", "认知", "大脑", "记忆", "注意力"]],
    ["读书", ["读书", "阅读", "书摘", "书评", "播客", "课程笔记"]],
    ["工具", ["工具", "工作流", "AI", "软件", "效率", "自动化"]],
  ];

  for (const [category, keywords] of keywordMap) {
    if (keywords.some((keyword) => combined.includes(keyword))) {
      return category;
    }
  }

  return "日志";
}

async function loadSourceMarkdown(sourceFile) {
  const raw = await readFile(sourceFile, "utf8");

  if (/\.(md|markdown)$/i.test(sourceFile)) {
    const parsed = matter(raw);
    return {
      frontmatter: parsed.data,
      title: String(
        parsed.data.title ?? deriveTitleFromMarkdown(parsed.content, path.parse(sourceFile).name),
      ),
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

async function main() {
  const importDir = await ensureImportSource(slug);
  const allFiles = await walkFiles(importDir);
  const sourceFile = pickMainSourceFile(importDir, allFiles, slug);

  if (!sourceFile) {
    throw new Error("No Markdown or HTML source file found in this Notion export.");
  }

  const loaded = await loadSourceMarkdown(sourceFile);
  const sourceDir = path.dirname(sourceFile);
  const title = String(loaded.frontmatter.title ?? loaded.title ?? slug).trim();

  let content = normalizeMarkdownText(loaded.markdown);
  content = removeLeadingH1(content);
  content = demoteBodyH1(content);
  content = await convertCsvLinks(content, sourceDir, importDir, allFiles);

  const rewrittenImages = await rewriteImages(content, slug, sourceDir, importDir, allFiles);
  content = rewrittenImages.markdown;

  const existingPost = await tryReadPostBySlug(slug);
  if (existingPost) {
    const snapshot = await snapshotExistingPost(slug);
    if (snapshot?.created) {
      console.log(`Snapshot created: ${snapshot.targetPath}`);
    }
  }

  const today = toIsoDate();
  const previousData = existingPost?.parsed.data ?? {};
  const previousVersion = Number(previousData.version ?? 0);
  const nextVersion = existingPost ? previousVersion + 1 : 1;
  const importedTags = normalizeTags(loaded.frontmatter.tags);
  const tags = importedTags.length > 0 ? importedTags : normalizeTags(previousData.tags);
  const summaryData = await generateSummaryData(content, { title });

  const frontmatter = {
    title,
    date: serializeDateValue(previousData.date, today),
    updated: today,
    category: normalizeCategory(
      loaded.frontmatter.category,
      title,
      content,
      String(previousData.category ?? ""),
    ),
    tags,
    description: String(loaded.frontmatter.description ?? "").trim() || extractDescription(content),
    cover: String(loaded.frontmatter.cover ?? "").trim() ||
      String(previousData.cover ?? "").trim() ||
      rewrittenImages.firstLocalImage,
    youtube: String(loaded.frontmatter.youtube ?? previousData.youtube ?? "").trim(),
    version: nextVersion,
    changeLog: existingPost
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
        ],
    fullSummary: summaryData.fullSummary,
    sectionSummaries: summaryData.sectionSummaries,
    notionImport: {
      source: "notion",
      importedAt: today,
      originalFile: loaded.originalFile,
    },
  };

  await writePostFile(slug, frontmatter, content);

  const auditResult = await auditAndFixPost(slug, {
    ensureSummaries: true,
    today,
  });

  console.log(`Post generated: src/content/posts/${slug}.md`);
  if (rewrittenImages.firstLocalImage) {
    console.log(`Imported images: public/images/posts/${slug}/`);
  }
  if (auditResult.changed) {
    console.log("Auto-fix applied: cover/frontmatter/summaries were normalized.");
  }

  await runCommand("npm", ["run", "build"]);

  console.log("");
  console.log("Import complete.");
  console.log(`Preview locally: npm run dev`);
  console.log(`Article path: /posts/${slug}/`);
  console.log("Recommended quick check:");
  console.log("- title");
  console.log("- category");
  console.log("- cover image");
  console.log("- description");
  console.log("- section summaries");
}

await main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
