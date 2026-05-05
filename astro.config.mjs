// @ts-check
import { defineConfig } from "astro/config";

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
  return (tree) => {
    const visit = (node) => {
      if (!node || typeof node !== "object") {
        return;
      }

      if ("properties" in node && node.properties) {
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
  };
}

// https://astro.build/config
export default defineConfig({
  site,
  ...(base ? { base } : {}),
  markdown: {
    rehypePlugins: [rehypePrefixBasePaths],
  },
});
