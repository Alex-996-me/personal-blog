import { mkdir, readdir, readFile, rename, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const rootDir = process.cwd();
const publicImagesDir = path.join(rootDir, "public", "images");
const sourceDir = path.join(rootDir, "src");
const shouldWrite = process.argv.includes("--write");
const minimumBytes = 1024 * 1024;

async function walk(directory, predicate = () => true) {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...(await walk(target, predicate)));
    else if (predicate(target)) result.push(target);
  }
  return result;
}

const sourceFiles = await walk(sourceDir, (file) => /\.(astro|css|js|jsx|md|mdx|ts|tsx)$/i.test(file));
const sourceCache = new Map(
  await Promise.all(sourceFiles.map(async (file) => [file, await readFile(file, "utf8")])),
);
const changedSources = new Set();

const candidates = [];
for (const file of await walk(publicImagesDir, (target) => /\.(png|jpe?g)$/i.test(target))) {
  const info = await stat(file);
  if (info.size < minimumBytes) continue;
  const publicPath = `/${path.relative(path.join(rootDir, "public"), file).replaceAll(path.sep, "/")}`;
  const references = [...sourceCache.entries()].filter(([, text]) => text.includes(publicPath));
  if (references.length === 0) continue;
  candidates.push({ file, info, publicPath, references });
}

let originalBytes = 0;
let optimizedBytes = 0;
let converted = 0;
const originalsToDelete = [];

for (const candidate of candidates) {
  const outputPath = candidate.file.replace(/\.(png|jpe?g)$/i, ".webp");
  const publicOutput = candidate.publicPath.replace(/\.(png|jpe?g)$/i, ".webp");
  const temporaryPath = `${outputPath}.tmp`;
  const result = await sharp(candidate.file)
    .rotate()
    .webp({ quality: 86, effort: 6, smartSubsample: true })
    .toFile(temporaryPath);

  originalBytes += candidate.info.size;
  optimizedBytes += result.size;

  if (!shouldWrite) {
    await unlink(temporaryPath);
    console.log(`${candidate.publicPath} -> ${publicOutput}: ${(candidate.info.size / 1048576).toFixed(2)} MB -> ${(result.size / 1048576).toFixed(2)} MB`);
    continue;
  }

  if (result.size >= candidate.info.size) {
    await unlink(temporaryPath);
    optimizedBytes -= result.size;
    optimizedBytes += candidate.info.size;
    continue;
  }

  await mkdir(path.dirname(outputPath), { recursive: true });
  await rename(temporaryPath, outputPath);
  for (const [sourceFile] of candidate.references) {
    const nextText = sourceCache.get(sourceFile).replaceAll(candidate.publicPath, publicOutput);
    sourceCache.set(sourceFile, nextText);
    changedSources.add(sourceFile);
  }
  originalsToDelete.push(candidate.file);
  converted += 1;
}

if (shouldWrite) {
  for (const file of changedSources) {
    await writeFile(file, sourceCache.get(file), "utf8");
  }
  for (const file of originalsToDelete) {
    await unlink(file);
  }
}

console.log("");
console.log(`${shouldWrite ? "Optimized" : "Would optimize"}: ${shouldWrite ? converted : candidates.length} referenced image(s)`);
console.log(`Size: ${(originalBytes / 1048576).toFixed(2)} MB -> ${(optimizedBytes / 1048576).toFixed(2)} MB`);
if (!shouldWrite) console.log("Run npm run optimize:media -- --write to apply these changes.");
