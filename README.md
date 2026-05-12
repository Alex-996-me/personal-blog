# N=1 Lab

一个基于 Astro 的极简中文个人博客，适合长期写日志、读书、训练、健康和工具类文章。

## 安装

```bash
npm install
```

## 本地运行

```bash
npm run dev
```

默认地址：

```text
http://localhost:4321/personal-blog/
```

## 新增普通文章

在 `src/content/posts/` 下新建一个 `.md` 文件，frontmatter 至少包含这些字段：

```md
---
title: "文章标题"
date: "2026-05-12"
updated: "2026-05-12"
category: "日志"
tags:
  - 记录
description: "一句话摘要。"
cover: ""
youtube: ""
version: 1
changeLog:
  - version: 1
    date: "2026-05-12"
    summary:
      - "初始发布版本。"
fullSummary: []
sectionSummaries: []
---
```

可用分类：

- `日志`
- `读书`
- `健康`
- `训练`
- `脑科学`
- `工具`

## 最省事的 Notion 导入方式

### 你只需要做的事

1. 在 Notion 里导出页面，优先选 `Markdown & CSV`。
2. 把导出的内容放到这两个位置中的任意一个：

- 文件夹方式：`imports/notion/你的-slug/`
- 压缩包方式：`imports/notion/你的-slug.zip`

3. 运行一条命令：

```bash
npm run publish:notion -- 你的-slug
```

`publish:notion` 和 `import:notion` 是同一个流程，你用哪个都可以：

```bash
npm run import:notion -- 你的-slug
```

### 这个命令会自动做什么

它会尽量自动完成下面这些事：

1. 自动识别文件夹或 zip。
2. 如果是 zip，自动解压到 `imports/notion/你的-slug/`。
3. 自动找到主 Markdown 或 HTML 文件。
4. 转成适合博客的 Markdown。
5. 清理多余空行和标题层级。
6. 复制本地图片到 `public/images/posts/你的-slug/`。
7. 重写图片路径。
8. 保留普通超链接。
9. 把长表格交给现有的折叠渲染逻辑。
10. 自动补全 frontmatter。
11. 自动生成或补齐 `fullSummary` / `sectionSummaries`。
12. 自动修复常见问题：

- `cover` 为空
- `cover` 还指向旧的默认封面
- `category` 缺失或不合法
- `description` 为空
- `updated` 缺失
- `changeLog` 缺失

13. 最后自动运行 `npm run build`。

## 白痴版导入步骤

### 如果你拿到的是 zip

1. 把 zip 放到：

```text
imports/notion/sleep-notes.zip
```

2. 运行：

```bash
npm run publish:notion -- sleep-notes
```

### 如果你拿到的是解压后的文件夹

1. 把整个文件夹内容放到：

```text
imports/notion/sleep-notes/
```

2. 运行：

```bash
npm run publish:notion -- sleep-notes
```

### 导入完成后怎么看

1. 本地预览：

```bash
npm run dev
```

2. 浏览器打开：

```text
http://localhost:4321/personal-blog/posts/sleep-notes/
```

## 如果你直接手改了 `.md`

有时候你会直接改 `src/content/posts/xxx.md`，这时可以跑一条自检修复命令：

```bash
npm run check:post -- xxx
```

它会尽量自动修复这些基础问题：

- 分类字段不合法
- 封面为空
- 封面还停留在旧默认图
- 摘要为空
- `updated` 没补
- `changeLog` 没补
- 总结字段缺失

然后会自动重新 build。

## 如果你想单独重生文章总结

```bash
npm run summarize -- 你的-slug
```

如果环境里有 `OPENAI_API_KEY`，脚本会尝试自动生成更像样的总结。  
如果没有，也不会报错，只会写入可手改的占位总结。

## 如何更新一篇已有文章并保留快照

如果你不是从 Notion 导入，而是手改旧文章：

1. 先备份当前版本：

```bash
npm run snapshot -- 你的-slug
```

2. 修改 `src/content/posts/你的-slug.md`
3. 把 `version` 加 1
4. 更新 `updated`
5. 在 `changeLog` 里补这次改了什么
6. 运行：

```bash
npm run build
```

## 图片、链接、表格怎么处理

### 图片

- 相对路径图片会复制到 `public/images/posts/你的-slug/`
- 远程图片会尽量下载到本地
- 下载失败就保留原链接，并在终端提示 warning
- 如果导入文章里有本地图片，系统会优先把第一张图当成封面候选

### 链接

- 普通链接会保留
- YouTube / Bilibili 单独成行时，会走现有文章渲染逻辑
- 其他链接按普通链接处理

### 表格

长表格会在前端自动折叠，短表格正常显示。  
当前折叠规则：

- 行数大于 `8`
- 或列数大于 `5`
- 或表格字符长度大于 `1200`

## 常用命令

| 命令 | 作用 |
| --- | --- |
| `npm install` | 安装依赖 |
| `npm run dev` | 本地预览 |
| `npm run build` | 生产构建 |
| `npm run publish:notion -- slug` | 一键导入并发布一篇 Notion 文章 |
| `npm run import:notion -- slug` | 和上面相同 |
| `npm run check:post -- slug` | 自检并自动修复一篇文章的基础元数据 |
| `npm run summarize -- slug` | 重写文章总结 |
| `npm run snapshot -- slug` | 先给旧文章打快照 |

## 部署到 GitHub Pages

推到 `main` 分支后，GitHub Actions 会自动部署。  
默认访问地址：

```text
https://alex-996-me.github.io/personal-blog/
```
