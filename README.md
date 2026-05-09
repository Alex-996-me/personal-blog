# 极简中文个人博客

一个基于 Astro 的静态中文个人博客，风格偏传统个人站：白底、黑色顶部导航、清晰分类、文章列表、右侧栏、搜索框、关于作者区域，并内置 RSS、基础 SEO、文章版本历史、差异对比，以及 Notion 导入工作流。

## 如何安装

```bash
npm install
```

## 如何本地运行

```bash
npm run dev
```

默认访问地址为 `http://localhost:4321`。

## 如何新增文章

1. 在 `src/content/posts/` 下新建一个 Markdown 文件，例如 `my-new-post.md`。
2. 按下面的 frontmatter 格式填写文章信息：

```md
---
title: "文章标题"
date: 2026-05-05
updated: 2026-05-05
category: "日志"
tags:
  - 个人成长
  - 记录
description: "用一句话概括这篇文章。"
cover: "/images/covers/journal-cover.svg"
youtube: ""
version: 1
changeLog:
  - version: 1
    date: 2026-05-05
    summary:
      - "初始发布版本。"
fullSummary: []
sectionSummaries: []
---

这里开始写正文。
```

3. `category` 可选值：
   - `日志`
   - `读书`
   - `健康`
   - `训练`
   - `脑科学`
   - `工具`
4. `cover` 和 `youtube` 是可选字段。
5. 如果填写 `youtube`，文章页会在正文顶部自动显示响应式视频播放器。

## 如何更新一篇已有文章并保留历史版本

1. 在修改文章前，先把当前文章复制到 `src/content/post-versions/[slug]/v当前版本号.md`。
2. 也可以直接运行：

```bash
npm run snapshot -- your-post-slug
```

3. 修改 `src/content/posts/` 下的最新版文章。
4. 把 `version` 加 1。
5. 更新 `updated` 日期。
6. 在 `changeLog` 里新增本次更新说明。
7. 运行 `npm run build`。
8. build 成功后 commit 和 push。
9. GitHub Actions 会自动重新部署。

## 如何从 Notion 导入文章

### 1. 从 Notion 导出

优先使用 Notion 的 `Markdown & CSV` 导出方式。导出后，把整包文件放到：

```text
imports/notion/[slug]/
```

例如：

```text
imports/notion/diet-experiment/
  我的饮食实验.md
  assets/
  images/
  tables/
  long-table.csv
```

如果你拿到的是 HTML 导出，也可以放进去，导入脚本会尽量转换成 Markdown。

### 2. 运行导入命令

```bash
npm run import:notion -- slug
```

例如：

```bash
npm run import:notion -- diet-experiment
```

这个命令会尽量自动完成：

1. 读取 `imports/notion/[slug]/`。
2. 自动识别主 Markdown 或 HTML 文件。
3. 转换为适合博客的 Markdown。
4. 输出到 `src/content/posts/[slug].md`。
5. 把引用到的图片复制到 `public/images/posts/[slug]/`。
6. 重写图片路径为 `/images/posts/[slug]/...`。
7. 保留普通超链接。
8. 单独成行的 YouTube / Bilibili 链接会在文章页自动嵌入。
9. 自动补全 frontmatter、版本号和 `changeLog`。
10. 尽量生成 `fullSummary` 和 `sectionSummaries`。
11. 自动运行 `npm run build`。

### 3. 图片如何处理

1. 相对路径图片会复制到 `public/images/posts/[slug]/`。
2. 远程图片会尽量下载到本地；如果下载失败，会保留原链接并在终端输出 warning。
3. 图片文件名会被清理成 `image-01.png` 这类稳定格式，避免中文乱码和空格问题。
4. 图片默认居中，最大宽度不会超过正文宽度。
5. 导入后的图片如果有 alt 文本，会显示成图注。

### 4. 大表格如何处理

导入后的 Markdown 表格或 CSV 转换表格，满足以下任一条件时会自动折叠：

1. 行数超过 8 行。
2. 列数超过 5 列。
3. 表格文本总长度超过 1200 字符。

短表格会正常展开显示。长表格会自动包进 `details / summary`，默认折叠，并显示类似 `共 18 行，6 列。` 的摘要。

### 5. 如何生成 AI 总结

如果你希望单独为已有文章重生成摘要，可以运行：

```bash
npm run summarize -- slug
```

例如：

```bash
npm run summarize -- diet-experiment
```

这个命令会：

1. 读取 `src/content/posts/[slug].md`。
2. 按 H2 拆分文章。
3. 先备份当前文章到历史版本目录。
4. 如果有 `OPENAI_API_KEY`，尝试调用 OpenAI 接口生成总结。
5. 如果没有 `OPENAI_API_KEY`，或者调用失败，则写入可手动调整的占位总结。
6. 写回 `fullSummary` 和 `sectionSummaries`。
7. 自动运行 `npm run build`。

### 6. 如何手动补充 sectionSummaries

直接编辑文章 frontmatter 里的 `fullSummary` 和 `sectionSummaries` 即可：

```yaml
fullSummary:
  - "这一篇主要是在整理饮食实验的阶段性观察。"
  - "更像读者导览，不是替代正文。"

sectionSummaries:
  - heading: "为什么要记录饮食实验"
    summary:
      - "这一节主要在解释动机。"
      - "重点不是做内容，而是保留自己的实验过程。"
  - heading: "一张更长的数据表"
    summary:
      - "这部分是一张原始数据表，建议先看表头。"
      - "如果想突出结论，可以再补 1 到 2 条观察。"
```

保存后运行一次：

```bash
npm run build
```

### 7. 从 Notion 更新一篇旧文章时会发生什么

如果 `src/content/posts/[slug].md` 已经存在，`npm run import:notion -- slug` 会自动：

1. 先把当前文章备份到 `src/content/post-versions/[slug]/v当前版本.md`。
2. 保留原来的 `date`。
3. 把 `version` 加 1。
4. 把 `updated` 改成当天日期。
5. 在 `changeLog` 里追加 `从 Notion 文档重新导入并更新内容。`
6. 尽量重建 `fullSummary` 和 `sectionSummaries`。

### 8. 常见错误

`找不到 Markdown 文件`

- 检查 `imports/notion/[slug]/` 里是否真的有 `.md` 或 `.html` 主文件。

`图片路径失效`

- 先确认导出包里的图片文件和 Markdown 引用路径仍然对应。
- 如果是外链图片，检查终端 warning，看是否下载失败。

`表格太宽`

- 正常情况会自动横向滚动；如果还是不理想，可以在导入后手动删减列，或者补一段表格说明。

`没有 OPENAI_API_KEY`

- 不会报错崩溃，只会写入可手动调整的总结占位内容。

`build 失败`

- 先看终端报错位置，再检查 frontmatter、表格格式、原始 HTML 或图片路径。
- 导入脚本和总结脚本本身都会在最后自动跑 `npm run build`。

## 如何部署到 Cloudflare Pages

1. 将仓库推送到 GitHub。
2. 在 Cloudflare Pages 中连接该仓库。
3. 构建设置填写：
   - Build command: `npm run build`
   - Build output directory: `dist`
4. 建议在 Cloudflare Pages 的环境变量中添加：
   - `SITE_URL=https://你的域名`

## 项目命令

| 命令 | 说明 |
| --- | --- |
| `npm install` | 安装依赖 |
| `npm run dev` | 启动本地开发环境 |
| `npm run build` | 构建生产版本到 `dist/` |
| `npm run preview` | 预览生产构建结果 |
| `npm run snapshot -- slug` | 为指定文章创建当前版本快照 |
| `npm run import:notion -- slug` | 从 `imports/notion/[slug]/` 导入 Notion 导出内容 |
| `npm run summarize -- slug` | 为指定文章生成或更新 `fullSummary` / `sectionSummaries` |
