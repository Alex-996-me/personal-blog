// @ts-check
import { defineConfig } from "astro/config";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import sharp from "sharp";
import path from "node:path";
import {
  rehypeEnhanceBlogContent,
  remarkEnhanceBlogMarkdown,
} from "./src/lib/markdown-pipeline.mjs";

const username = "Alex-996-me";
const repository = "personal-blog";
const isUserSite = repository === `${username}.github.io`;
const site = `https://${username}.github.io`;
const base = isUserSite ? undefined : `/${repository}`;

function prefixBasePath(value) {
  if (typeof value !== "string") {
    return value;
  }

  if (!value.startsWith("/") || value.startsWith("//") || !base) {
    return value;
  }

  if (value === base || value.startsWith(`${base}/`)) {
    return value;
  }

  return `${base}${value}`;
}

function rehypePrefixBasePaths() {
  return async (tree, file) => {
    const imageTasks = [];
    const publicRoot = path.resolve("public");
    const visit = (node) => {
      if (!node || typeof node !== "object") {
        return;
      }

      if ("properties" in node && node.properties) {
        const source = node.properties.src;
        if (file.data.astro?.frontmatter?.status === "published" && node.tagName === "img" && typeof source === "string" && source.startsWith("/images/")) {
          const imagePath = path.resolve(publicRoot, `.${source}`);
          if (!imagePath.startsWith(publicRoot + path.sep)) throw new Error(`Invalid image path: ${source}`);
          imageTasks.push(sharp(imagePath).metadata().then(({ width, height }) => {
            Object.assign(node.properties, { width, height, loading: "lazy", decoding: "async" });
          }));
        }
        for (const attribute of ["href", "src", "poster"]) {
          const currentValue = node.properties[attribute];
          if (typeof currentValue === "string") {
            node.properties[attribute] = prefixBasePath(currentValue);
          }
        }
      }

      if (Array.isArray(node.children)) {
        node.children.forEach(visit);
      }
    };

    visit(tree);
    await Promise.all(imageTasks);
  };
}

export default defineConfig({
  site,
  ...(base ? { base } : {}),
  markdown: {
    remarkPlugins: [remarkGfm, remarkEnhanceBlogMarkdown],
    rehypePlugins: [rehypeRaw, rehypeEnhanceBlogContent, rehypePrefixBasePaths],
  },
});
