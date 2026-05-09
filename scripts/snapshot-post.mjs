import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const postsDir = path.join(root, "src", "content", "posts");
const versionsDir = path.join(root, "src", "content", "post-versions");
const input = process.argv[2];

if (!input) {
  console.error("请提供文章 slug 或文件名，例如：npm run snapshot -- why-i-want-a-blog");
  process.exit(1);
}

const normalized = input.endsWith(".md") || input.endsWith(".mdx") ? input : `${input}.md`;
const sourcePath = path.join(postsDir, normalized);

let raw;
try {
  raw = await readFile(sourcePath, "utf8");
} catch {
  console.error(`没有找到文章：${sourcePath}`);
  process.exit(1);
}

const parsed = matter(raw);
const version = Number(parsed.data.version ?? 1);
const slug = normalized.replace(/\.(md|mdx)$/i, "");
const targetDir = path.join(versionsDir, slug);
const targetPath = path.join(targetDir, `v${version}.md`);

try {
  await access(targetPath);
  console.error(`历史版本已存在：${targetPath}`);
  process.exit(1);
} catch {
  // File does not exist, continue.
}

await mkdir(targetDir, { recursive: true });
await writeFile(targetPath, raw, "utf8");

console.log(`已创建历史版本快照：src/content/post-versions/${slug}/v${version}.md`);
console.log(`下一步：编辑 src/content/posts/${normalized}，将 version 改为 ${version + 1}，更新 updated，并补充 changeLog。`);
