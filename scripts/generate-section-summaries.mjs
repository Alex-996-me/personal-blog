import {
  readPostByInput,
  runCommand,
  snapshotExistingPost,
  writePostFile,
} from "./utils/post-files.mjs";
import { auditAndFixPost } from "./utils/post-audit.mjs";
import { generateSummaryData } from "./utils/summaries.mjs";

const input = process.argv[2];

if (!input) {
  console.error("Usage: npm run summarize -- your-slug");
  process.exit(1);
}

let currentPost;
try {
  currentPost = await readPostByInput(input);
} catch {
  console.error(`Post not found: src/content/posts/${input}`);
  process.exit(1);
}

const snapshot = await snapshotExistingPost(currentPost.slug);
if (snapshot?.created) {
  console.log(`Snapshot created: ${snapshot.targetPath}`);
}

const summaryData = await generateSummaryData(currentPost.parsed.content, {
  title: currentPost.parsed.data.title ?? currentPost.slug,
});

await writePostFile(
  currentPost.slug,
  {
    ...currentPost.parsed.data,
    fullSummary: summaryData.fullSummary,
    sectionSummaries: summaryData.sectionSummaries,
  },
  currentPost.parsed.content,
);

await auditAndFixPost(currentPost.slug, {
  ensureSummaries: true,
});

console.log(
  summaryData.usedAI
    ? "Section summaries generated with OPENAI_API_KEY."
    : "No OPENAI_API_KEY detected. Fallback summaries were written and can be edited manually.",
);

await runCommand("npm", ["run", "build"]);
