import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

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

const expectations = [
  {
    route: "posts/2026-08-28-discipline-freedom/",
    includes: [
      "2026/8/28-自律如何通向自由：让行动先于动机",
      "/personal-blog/audio/english/2026-08-28/speaking.m4a",
      "2026/8/30-酮体、胰岛素和肌肉维持",
      "继续阅读",
    ],
  },
  {
    route: "posts/2026-08-30-ketones-insulin-muscle/",
    includes: [
      "2026/8/30-酮体、胰岛素和肌肉维持：真相并不像你想的那样",
      "/personal-blog/audio/english/2026-08-30/final.m4a",
      "2026/8/28-自律如何通向自由",
      "继续阅读",
    ],
  },
  {
    route: "series/english-learning/",
    includes: ["2026/8/28-自律如何通向自由", "2026/8/30-酮体、胰岛素和肌肉维持"],
  },
];

for (const expectation of expectations) {
  const url = new URL(expectation.route, baseUrl).href;
  const html = await (await fetchChecked(url)).text();
  for (const text of expectation.includes) {
    if (!html.includes(text)) failures.push(`${url}: missing expected text/path: ${text}`);
  }
}

if (failures.length) {
  console.error(`FAIL: ${failures.length} smoke-test failure(s)`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`PASS: ${htmlFiles.length} generated pages and ${referencedUrls.size} unique local routes/assets returned HTTP 2xx.`);
console.log("PASS: English Learning article titles, audio, series page, and reciprocal continue-reading links are present.");
