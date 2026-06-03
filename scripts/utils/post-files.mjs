import { access, copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { spawn } from "node:child_process";

export const rootDir = process.cwd();
export const postsDir = path.join(rootDir, "src", "content", "posts");
export const notionImportsDir = path.join(rootDir, "imports", "notion");
export const publicImagesDir = path.join(rootDir, "public", "images", "posts");

export function toIsoDate(date = new Date()) {
  return new Date(date).toISOString().slice(0, 10);
}

export async function fileExists(targetPath) {
  try {
    await access(targetPath);
    return true;
  } catch {
    return false;
  }
}

export function normalizePostInput(input) {
  if (!input) {
    return "";
  }

  return input.endsWith(".md") || input.endsWith(".mdx") ? input : `${input}.md`;
}

export function getSlugFromFilename(filename) {
  return filename.replace(/\.(md|mdx)$/i, "");
}

export async function readPostByInput(input) {
  const normalized = normalizePostInput(input);
  const sourcePath = path.join(postsDir, normalized);
  const raw = await readFile(sourcePath, "utf8");

  return {
    normalized,
    slug: getSlugFromFilename(normalized),
    sourcePath,
    raw,
    parsed: matter(raw),
  };
}

export async function tryReadPostBySlug(slug) {
  const sourcePath = path.join(postsDir, `${slug}.md`);
  if (!(await fileExists(sourcePath))) {
    return null;
  }

  const raw = await readFile(sourcePath, "utf8");
  return {
    normalized: `${slug}.md`,
    slug,
    sourcePath,
    raw,
    parsed: matter(raw),
  };
}

export function buildPostFrontmatter(frontmatter) {
  return {
    title: frontmatter.title ?? "",
    date: frontmatter.date ?? toIsoDate(),
    updated: frontmatter.updated ?? frontmatter.date ?? toIsoDate(),
    category: frontmatter.category ?? "日志",
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
    description: frontmatter.description ?? "",
    cover: frontmatter.cover ?? "",
    youtube: frontmatter.youtube ?? "",
    fullSummary: Array.isArray(frontmatter.fullSummary) ? frontmatter.fullSummary : [],
    sectionSummaries: Array.isArray(frontmatter.sectionSummaries)
      ? frontmatter.sectionSummaries
      : [],
    ...(frontmatter.notionImport ? { notionImport: frontmatter.notionImport } : {}),
  };
}

export function serializePostFile(frontmatter, content) {
  return matter.stringify(content.trimEnd() + "\n", buildPostFrontmatter(frontmatter));
}

export async function writePostFile(slug, frontmatter, content) {
  const targetPath = path.join(postsDir, `${slug}.md`);
  const file = serializePostFile(frontmatter, content);
  await writeFile(targetPath, file, "utf8");
  return targetPath;
}

export async function copyAsset(sourcePath, targetPath) {
  await mkdir(path.dirname(targetPath), { recursive: true });
  await copyFile(sourcePath, targetPath);
}

export function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const executable = process.platform === "win32" ? "cmd.exe" : command;
    const commandArgs =
      process.platform === "win32" ? ["/d", "/s", "/c", command, ...args] : args;
    const child = spawn(executable, commandArgs, {
      cwd: rootDir,
      stdio: "inherit",
      shell: false,
      ...options,
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${command} ${args.join(" ")} 退出码 ${code}`));
    });
  });
}
