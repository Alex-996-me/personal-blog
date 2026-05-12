import { auditAndFixPost } from "./utils/post-audit.mjs";
import { runCommand } from "./utils/post-files.mjs";

const slug = process.argv[2];

if (!slug) {
  console.error("Usage: npm run check:post -- your-slug");
  process.exit(1);
}

const result = await auditAndFixPost(slug, {
  ensureSummaries: true,
});

if (result.changed) {
  console.log("Post metadata was normalized automatically.");
  console.log(`Category: ${result.category}`);
  console.log(`Cover: ${result.cover || "(none)"}`);
  console.log(`Updated: ${result.updated}`);
  await runCommand("npm", ["run", "build"]);
} else {
  console.log("No automatic fixes were needed.");
}
