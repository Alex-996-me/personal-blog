import { auditAndFixPost } from "./utils/post-audit.mjs";
import { readPostByInput, runCommand } from "./utils/post-files.mjs";

const args = process.argv.slice(2);
const shouldFix = args.includes("--fix");
const slug = args.find((argument) => !argument.startsWith("--"));

if (!slug) {
  console.error("Usage: npm run check:post -- your-slug [--fix]");
  process.exit(1);
}

if (!shouldFix) {
  try {
    await readPostByInput(slug);
  } catch {
    console.error(`Post not found: src/content/posts/${slug}.md`);
    process.exit(1);
  }

  await runCommand("node", ["scripts/validate-content.mjs"]);
  console.log(`PASS: ${slug} exists and repository content validation passed.`);
  process.exit(0);
}

const result = await auditAndFixPost(slug, {
  ensureSummaries: true,
  writeChanges: true,
});

if (result.changed) {
  console.log("Post metadata was normalized.");
  console.log(`Category: ${result.category}`);
  console.log(`Cover: ${result.cover || "(none)"}`);
  console.log(`Updated: ${result.updated}`);
  await runCommand("npm", ["run", "validate"]);
} else {
  console.log("PASS: no automatic fixes are needed.");
}
