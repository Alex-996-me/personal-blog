import { readPostByInput, snapshotRawPost } from "./utils/post-files.mjs";

const input = process.argv[2];

if (!input) {
  console.error("请提供文章 slug 或文件名，例如：npm run snapshot -- why-i-want-a-blog");
  process.exit(1);
}

let currentPost;
try {
  currentPost = await readPostByInput(input);
} catch {
  console.error(`没有找到文章：src/content/posts/${input}`);
  process.exit(1);
}

const version = Number(currentPost.parsed.data.version ?? 1);
const snapshot = await snapshotRawPost({
  slug: currentPost.slug,
  raw: currentPost.raw,
  version,
});

if (!snapshot.created) {
  console.error(`历史版本已存在：${snapshot.targetPath}`);
  process.exit(1);
}

console.log(`已创建历史版本快照：src/content/post-versions/${currentPost.slug}/v${version}.md`);
console.log(
  `下一步：编辑 src/content/posts/${currentPost.normalized}，将 version 改为 ${version + 1}，更新 updated，并补充 changeLog。`,
);
