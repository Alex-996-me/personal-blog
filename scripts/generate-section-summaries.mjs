import {
  readPostByInput,
  runCommand,
  snapshotExistingPost,
  writePostFile,
} from "./utils/post-files.mjs";
import { generateSummaryData } from "./utils/summaries.mjs";

const input = process.argv[2];

if (!input) {
  console.error("请提供文章 slug，例如：npm run summarize -- example");
  process.exit(1);
}

let currentPost;
try {
  currentPost = await readPostByInput(input);
} catch {
  console.error(`没有找到文章：src/content/posts/${input}`);
  process.exit(1);
}

const snapshot = await snapshotExistingPost(currentPost.slug);
if (snapshot?.created) {
  console.log(`已备份当前版本：${snapshot.targetPath}`);
}

const summaryData = await generateSummaryData(currentPost.parsed.content, {
  title: currentPost.parsed.data.title ?? currentPost.slug,
});

await writePostFile(currentPost.slug, {
  ...currentPost.parsed.data,
  fullSummary: summaryData.fullSummary,
  sectionSummaries: summaryData.sectionSummaries,
}, currentPost.parsed.content);

console.log(
  summaryData.usedAI
    ? "已生成 AI 总结并写回文章 frontmatter。"
    : "没有可用的 OPENAI_API_KEY，已写入可手动调整的总结占位内容。",
);

await runCommand("npm", ["run", "build"]);
