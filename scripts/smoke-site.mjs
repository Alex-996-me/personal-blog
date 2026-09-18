import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const baseUrl = new URL(process.argv[2] ?? "http://127.0.0.1:4321/personal-blog/");

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(target)));
    else files.push(target);
  }
  return files;
}

function routeForHtml(file) {
  const relative = path.relative(distDir, file).replaceAll(path.sep, "/");
  if (relative === "index.html") return baseUrl.pathname;
  return new URL(relative.replace(/index\.html$/, ""), baseUrl).pathname;
}

async function fetchChecked(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response;
}

const htmlFiles = (await walk(distDir)).filter((file) => file.endsWith(".html"));
const routeUrls = htmlFiles.map((file) => new URL(routeForHtml(file), baseUrl.origin).href);
const referencedUrls = new Set(routeUrls);

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  for (const match of html.matchAll(/(?:href|src|poster)=["']([^"']+)["']/g)) {
    const value = match[1];
    if (!value.startsWith(baseUrl.pathname) || value.includes("#")) continue;
    referencedUrls.add(new URL(value, baseUrl.origin).href);
  }
  for (const match of html.matchAll(/srcset="([^"]+)"/g)) {
    for (const candidate of match[1].split(",")) {
      const value = candidate.trim().split(/\s+/)[0];
      if (value.startsWith(baseUrl.pathname)) referencedUrls.add(new URL(value, baseUrl.origin).href);
    }
  }
}

const failures = [];
const urls = [...referencedUrls];
for (let index = 0; index < urls.length; index += 20) {
  const batch = urls.slice(index, index + 20);
  const results = await Promise.allSettled(batch.map(fetchChecked));
  results.forEach((result, resultIndex) => {
    if (result.status === "rejected") failures.push(`${batch[resultIndex]}: ${result.reason.message}`);
  });
}


// Check publication policy against source metadata, not just handpicked happy paths.
const sourceEntries = [];
for (const collection of ["posts", "moments", "inspirations"]) {
  for (const file of (await walk(path.join(rootDir, "src/content", collection))).filter((file) => /\.mdx?$/.test(file))) {
    const { data } = matter(await readFile(file, "utf8"));
    const slug = data.slug || path.relative(path.join(rootDir, "src/content", collection), file).replaceAll(path.sep, "/").replace(/\.mdx?$/, "");
    const published = collection !== "inspirations" && (data.status ?? "published") === "published" && (collection === "posts" || data.published !== false);
    sourceEntries.push({ collection, data, slug, published });
  }
}
const publicEntries = sourceEntries.filter((entry) => entry.published);
const contentUrl = (entry) => new URL((entry.collection === "posts" ? "posts/" : "moments/") + entry.slug + "/", baseUrl).pathname;
const expectedSearchUrls = publicEntries.map(contentUrl).sort();
const searchEntries = await (await fetchChecked(new URL("search-index.json", baseUrl))).json();
if (JSON.stringify(searchEntries.map((entry) => entry.url).sort()) !== JSON.stringify(expectedSearchUrls)) failures.push("Search index differs from published Essays + Life");
if (searchEntries.some((entry) => !["ARTICLE", "MOMENT"].includes(entry.kind))) failures.push("Search contains an unexpected content kind");

const home = await (await fetchChecked(baseUrl)).text();
const sectionIds = [...home.matchAll(/<section class="home-[^"]+"[^>]+aria-labelledby="([^"]+)"/g)].map((match) => match[1]);
if (JSON.stringify(sectionIds) !== JSON.stringify(["home-identity-title", "home-journal-title", "home-moments-title"])) failures.push("Homepage must contain only Identity, Selected Essays, Life in that order");
const homePosts = [...home.matchAll(/href="([^"]*\/posts\/[^"]+)"/g)].map((match) => match[1]);
const selected = publicEntries.filter((entry) => entry.collection === "posts" && entry.data.featuredHome).sort((a, b) => (a.data.featuredRank ?? Infinity) - (b.data.featuredRank ?? Infinity)).slice(0, 3).map(contentUrl);
if (JSON.stringify([...new Set(homePosts)]) !== JSON.stringify(selected) || selected.length < 2 || selected.length > 5) failures.push("Homepage Essays are not the explicit editorial selection");
const homeLife = [...new Set([...home.matchAll(/href="([^"]*\/moments\/[^"/]+\/)"/g)].map((match) => match[1]))];
if (homeLife.length < 2 || homeLife.length > 4) failures.push("Homepage Life must contain 2–4 entries");
if (home.includes("/daily/") || home.includes("kinetic-idea")) failures.push("Homepage still exposes Inspirations");

const rss = await (await fetchChecked(new URL("rss.xml", baseUrl))).text();
const rssItems = [...rss.matchAll(/<item>[\s\S]*?<link>([^<]+)<\/link>[\s\S]*?<\/item>/g)].map((match) => new URL(match[1]).pathname).sort();
const essayUrls = publicEntries.filter((entry) => entry.collection === "posts").map(contentUrl).sort();
if (JSON.stringify(rssItems) !== JSON.stringify(essayUrls)) failures.push("RSS must contain exactly published Essays");

const indexedUrls = [];
let retiredPages = 0;
for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  if (/data-pagefind-body(?:[ =>])/.test(html)) indexedUrls.push(routeForHtml(file));
  const header = html.match(/<header class="site-header">[\s\S]*?<\/header>/)?.[0] ?? "";
  if (header.includes("/daily/")) failures.push(file + ": navigation exposes Inspirations");
  if (html.includes("data-retired-content")) {
    retiredPages++;
    if (!html.includes('content="noindex, follow"') || html.includes("data-pagefind-body") || html.includes('class="prose"><')) failures.push(file + ": retired content is indexable or renders original content");
    for (const entry of sourceEntries.filter((entry) => !entry.published)) {
      if (entry.data.description?.length > 20 && html.includes(entry.data.description)) failures.push(file + ": archived description leaked");
    }
  }
}
if (JSON.stringify(indexedUrls.sort()) !== JSON.stringify(expectedSearchUrls)) failures.push("Pagefind input differs from published Essays + Life");

for (const entry of sourceEntries.filter((entry) => entry.collection !== "inspirations" && !entry.published)) {
  const url = new URL(contentUrl(entry), baseUrl.origin);
  if (entry.data.status === "archive" && entry.data.published !== false) {
    const html = await (await fetchChecked(url)).text();
    if (!html.includes("data-retired-content") || html.includes(entry.data.title)) failures.push(url + ": archived page must be a generic notice without the old title/body");
  } else {
    const response = await fetch(url);
    if (response.status !== 404) failures.push(url + ": drafts must not generate a route");
  }
}
for (const route of ["articles/", "moments/", "about/", "search/", "daily/", "series/english-learning/"]) await fetchChecked(new URL(route, baseUrl));

if (failures.length) {
  console.error(`FAIL: ${failures.length} smoke-test failure(s)`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`PASS: ${htmlFiles.length} generated pages and ${referencedUrls.size} unique local routes/assets returned HTTP 2xx.`);
console.log(`PASS: ${essayUrls.length} Essays + ${publicEntries.length - essayUrls.length} Life entries; curated homepage, JSON search, Pagefind inputs, RSS and ${retiredPages} retirement notices obey publication policy.`);
