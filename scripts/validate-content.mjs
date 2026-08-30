import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const rootDir = process.cwd();
const contentRoot = path.join(rootDir, "src", "content");
const publicDir = path.join(rootDir, "public");

const collections = {
  posts: path.join(contentRoot, "posts"),
  inspirations: path.join(contentRoot, "inspirations"),
  moments: path.join(contentRoot, "moments"),
};

async function walkMarkdown(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkMarkdown(target)));
    } else if (/\.(md|mdx)$/i.test(entry.name)) {
      files.push(target);
    }
  }

  return files;
}

function normalizeSlug(value) {
  return String(value ?? "")
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .replace(/^(posts|daily|moments)\//, "")
    .replace(/\.(md|mdx)$/i, "");
}

function fileSlug(file) {
  return path.basename(file).replace(/\.(md|mdx)$/i, "");
}

async function exists(target) {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
}

const entries = {};
for (const [name, directory] of Object.entries(collections)) {
  entries[name] = await Promise.all(
    (await walkMarkdown(directory)).map(async (file) => {
      const raw = await readFile(file, "utf8");
      const parsed = matter(raw);
      return {
        file,
        relative: path.relative(rootDir, file).replaceAll(path.sep, "/"),
        slug: fileSlug(file),
        raw,
        data: parsed.data ?? {},
      };
    }),
  );
}

const slugSets = {
  posts: new Set(entries.posts.map((entry) => entry.slug)),
  inspirations: new Set(entries.inspirations.map((entry) => entry.slug)),
  moments: new Set(entries.moments.map((entry) => normalizeSlug(entry.data.slug || entry.slug))),
};

const errors = [];
const warnings = [];
const relationTargets = {
  relatedPosts: slugSets.posts,
  relatedNotes: slugSets.inspirations,
  relatedMoments: slugSets.moments,
};

for (const group of Object.values(entries)) {
  for (const entry of group) {
    const label = entry.relative;
    if (!String(entry.data.title ?? "").trim() && !label.includes("/moments/")) {
      errors.push(`${label}: missing title`);
    }
    if (!entry.data.date || Number.isNaN(new Date(entry.data.date).valueOf())) {
      errors.push(`${label}: missing or invalid date`);
    }
    if (entry.data.seriesOrder !== undefined && !entry.data.series) {
      errors.push(`${label}: seriesOrder requires series`);
    }

    for (const [field, targets] of Object.entries(relationTargets)) {
      const values = entry.data[field];
      if (values === undefined) continue;
      if (!Array.isArray(values)) {
        errors.push(`${label}: ${field} must be an array`);
        continue;
      }
      for (const value of values) {
        const target = normalizeSlug(value);
        if (!targets.has(target)) {
          errors.push(`${label}: ${field} points to missing slug "${value}"`);
        }
      }
    }

    const localAssets = [...entry.raw.matchAll(/\/((?:images|audio|videos)\/[^)"'<>\s]+)/g)]
      .map((match) => match[1].split("#")[0].split("?")[0]);
    for (const asset of new Set(localAssets)) {
      const target = path.join(publicDir, ...asset.split("/"));
      if (!(await exists(target))) {
        errors.push(`${label}: missing public asset /${asset}`);
      }
    }
  }
}

const seriesOrders = new Map();
for (const entry of entries.posts) {
  if (!entry.data.series || entry.data.seriesOrder === undefined) continue;
  const key = `${entry.data.series}::${entry.data.seriesOrder}`;
  if (seriesOrders.has(key)) {
    errors.push(
      `${entry.relative}: duplicate seriesOrder ${entry.data.seriesOrder} in "${entry.data.series}" (also ${seriesOrders.get(key)})`,
    );
  } else {
    seriesOrders.set(key, entry.relative);
  }
}

for (const entry of entries.posts) {
  if (entry.data.series && entry.data.seriesOrder === undefined) {
    warnings.push(`${entry.relative}: series has no seriesOrder`);
  }
}

if (warnings.length) {
  console.warn(`WARN: ${warnings.length} content warning(s)`);
  warnings.forEach((warning) => console.warn(`- ${warning}`));
}

if (errors.length) {
  console.error(`FAIL: ${errors.length} content error(s)`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

const total = Object.values(entries).reduce((count, group) => count + group.length, 0);
console.log(`PASS: ${total} content files, local assets, relationships, and series orders validated.`);
