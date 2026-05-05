# 极简中文个人博客

一个基于 Astro 的静态中文个人博客，风格偏传统个人站：白底、黑色顶部导航、清晰分类、文章列表、右侧栏、搜索框、关于作者区域，并内置 RSS 与基础 SEO。

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
category: "日志"
tags:
  - 个人成长
  - 记录
description: "用一句话概括这篇文章。"
cover: "/images/covers/journal-cover.svg"
youtube: "https://www.youtube.com/watch?v=xxxxxxxxxxx"
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

## 如何部署到 Cloudflare Pages

1. 将仓库推送到 GitHub。
2. 在 Cloudflare Pages 中连接该仓库。
3. 构建设置填写：
   - Build command: `npm run build`
   - Build output directory: `dist`
4. 建议在 Cloudflare Pages 的环境变量中添加：
   - `SITE_URL=https://你的域名`

如果没有设置 `SITE_URL`，项目会回退到 `https://example.com` 作为默认站点地址，用于 canonical URL 和 RSS 生成。

## 项目命令

| 命令 | 说明 |
| --- | --- |
| `npm install` | 安装依赖 |
| `npm run dev` | 启动本地开发环境 |
| `npm run build` | 构建生产版本到 `dist/` |
| `npm run preview` | 预览生产构建结果 |
