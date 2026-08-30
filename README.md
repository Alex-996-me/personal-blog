# N=1 Lab

基于 Astro 的中文个人博客，用于沉淀长文、英文学习、短灵感与生活图文记录。线上地址：<https://alex-996-me.github.io/personal-blog/>。

## 最快的发文方式

在 Codex 中打开本仓库，把文字、图片、音频或 Notion 导出文件直接附上，然后说：

> 使用 `$personal-blog-publisher`，把这些素材整理成一篇文章。先完成内容与验证，不要发布。

Agent 会负责选题、编辑、资源归档、系列与关联文章、内容校验和构建。确认预览后，再说“发布这篇”，Agent 才会做聚焦提交并推送。完整流程见 [发布 SOP](docs/workflows/PUBLISHING_SOP.md)。

## 常用命令

```bash
npm install
npm run dev
npm run validate
npm run check:post -- your-slug
npm run check:post -- your-slug --fix
npm run publish:notion -- your-slug
npm run optimize:media
```

- `npm run validate`：只读内容校验 + 完整生产构建，是发文前统一入口。
- `npm run check:post -- slug`：只检查单篇文章，不再静默改文件。
- `--fix`：明确授权规范化该文章，再重新验证。
- `npm run optimize:media`：预览大图优化收益；添加 `-- --write` 才实际执行。

## 内容与资源目录

```text
src/content/posts/          长文、书评、学习文章、英文打卡
src/content/inspirations/   短灵感
src/content/moments/        生活与地点图文
public/images/covers/       文章封面
public/images/posts/        正文插图
public/images/moments/      Moments 图片
public/audio/               公开音频
public/videos/              公开视频
imports/notion/example/     Notion 导入格式示例
.english-inbox/             本地英文原始素材（Git 忽略）
.content-inbox/             其他本地原始素材（Git 忽略）
.agents/skills/             仓库专用 Agent 技能
scripts/                    导入、校验和媒体工具
```

完整文件夹职责与维护边界见 [发布 SOP](docs/workflows/PUBLISHING_SOP.md)。内容字段的唯一准则是 `src/content.config.ts`。

## 内容模型要点

文章分类只有：`日志`、`自学`、`体悟`、`健康`、`训练`、`工具`、`世界`。

系列文章使用 `series` 和 `seriesOrder`；跨内容关联使用 `relatedPosts`、`relatedNotes`、`relatedMoments`。本地资源统一写成从 `/images/`、`/audio/` 或 `/videos/` 开始的站点路径。

## 部署

推送到 `main` 后，`.github/workflows/deploy.yml` 会自动构建并部署 GitHub Pages。不要使用 `git add .`；只暂存本次发布涉及的精确文件。
