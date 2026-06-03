# N=1 Lab

一个基于 Astro 的中文个人博客。风格偏长期写作，适合发日志、读书、健康、训练、脑科学和工具类文章。

## 1. 先安装

在项目目录打开 `cmd` 或 PowerShell，然后运行：

```bash
npm install
```

## 2. 本地预览

运行：

```bash
npm run dev
```

浏览器打开：

```text
http://localhost:4321/personal-blog/
```

## 3. 最简单的发文方式：手动新建一篇 Markdown

### 第一步：新建文章文件

去这个目录：

```text
src/content/posts/
```

新建一个文件，比如：

```text
src/content/posts/my-new-post.md
```

### 第二步：把 frontmatter 填好

最小可用模板：

```md
---
title: "文章标题"
date: "2026-06-03"
updated: "2026-06-03"
category: "健康"
tags:
  - "饮食"
  - "实验"
description: "一句话概括这篇文章。"
cover: "/images/covers/example-cover.jpg"
youtube: ""
fullSummary: []
sectionSummaries: []
---

正文从这里开始。
```

可用分类只有这 6 个：

- `日志`
- `读书`
- `健康`
- `训练`
- `脑科学`
- `工具`

## 4. 怎么加图片

### 方法 A：给正文加图片

1. 先把图片放到这个目录：

```text
public/images/posts/你的文章-slug/
```

比如：

```text
public/images/posts/my-new-post/photo-01.jpg
```

2. 然后在正文里这样写：

```md
![图片说明](/images/posts/my-new-post/photo-01.jpg)
```

如果你写了 `![图片说明]`，页面会自动把这句说明当作图注显示。

### 方法 B：给文章设置封面

把封面图放到：

```text
public/images/covers/
```

比如：

```text
public/images/covers/my-new-post-cover.jpg
```

frontmatter 里这样写：

```md
cover: "/images/covers/my-new-post-cover.jpg"
```

注意：

- 封面只在首页、分类页、搜索结果等列表位置显示
- 打开具体文章后，不再显示封面

## 5. 怎么插普通链接、YouTube、Bilibili

### 普通链接

直接写 Markdown 链接：

```md
[这是一篇参考文章](https://example.com)
```

外链会自动新标签页打开。

### YouTube

如果你想在文章顶部嵌入 YouTube，可以在 frontmatter 里写：

```md
youtube: "https://www.youtube.com/watch?v=xxxxxxx"
```

### 正文里单独嵌入 YouTube 或 Bilibili

如果正文里有一整行只有视频链接，系统会自动把它渲染成播放器。

例如：

```md
https://www.youtube.com/watch?v=xxxxxxx
```

或者：

```md
https://www.bilibili.com/video/BVxxxxxxxx
```

## 6. 搜索是怎么工作的

博客现在支持关键词检索，搜索范围包括：

- 标题
- 正文
- 摘要
- 分类
- 标签
- 文章总结

你在右侧栏或 `/search/` 页输入关键词后，会直接筛出包含这个词的文章。

## 7. 目录是自动生成的

每篇文章开头都会自动出现一个折叠目录。

规则：

- 自动读取正文里的 `##`、`###`
- 自动生成锚点
- 默认折叠
- 以后你手动写文章或用 Notion 导入文章，都会自动有目录

所以你只需要正常写标题层级就行：

```md
## 第一部分
### 小节 A
## 第二部分
```

## 8. 如果你是从 Notion 导入

### 第一步：导出

在 Notion 里选择：

```text
Export -> Markdown & CSV
```

### 第二步：把导出文件放进项目

你有两种放法。

如果你拿到的是 zip：

```text
imports/notion/你的-slug.zip
```

如果你已经解压好了：

```text
imports/notion/你的-slug/
```

### 第三步：运行导入命令

```bash
npm run publish:notion -- 你的-slug
```

例如：

```bash
npm run publish:notion -- sleep-notes
```

### 这个命令会自动做什么

- 找到主 Markdown 或 HTML 文件
- 复制文章里的图片到 `public/images/posts/你的-slug/`
- 重写图片路径
- 清理标题层级和多余空行
- 自动补齐 frontmatter
- 自动生成全文总结和分节总结
- 自动跑 `npm run build`

## 9. 如果你只想检查某篇文章

```bash
npm run check:post -- 文章-slug
```

它会尽量自动修这些问题：

- `category` 不合法
- `cover` 为空或路径不对
- `description` 为空
- `updated` 缺失
- 总结字段缺失
- 正文里误写成 `public/images/...`

## 10. 如果你想重生成文章总结

```bash
npm run summarize -- 文章-slug
```

如果你本地配置了 `OPENAI_API_KEY`，它会尝试自动生成更像样的总结；没有的话也不会报错，只会生成可手动修改的占位总结。

## 11. 我自己发一篇文章的完整傻瓜流程

### 场景 A：手动写

1. 打开 `cmd`
2. 进入项目目录

```cmd
cd /d C:\Users\栗海粟\Documents\Codex\2026-05-05\github-plugin-github-openai-curated-personal
```

3. 新建文章文件到 `src/content/posts/`
4. 如果有图片，复制到 `public/images/posts/你的-slug/`
5. 如果有封面，复制到 `public/images/covers/`
6. 运行本地检查

```bash
npm run build
```

7. 本地预览

```bash
npm run dev
```

8. 确认没问题后提交并推送

```bash
git add .
git commit -m "add new post"
git push origin main
```

### 场景 B：从 Notion 导入

1. 从 Notion 导出 `Markdown & CSV`
2. 把 zip 或文件夹放到 `imports/notion/你的-slug/` 或 `imports/notion/你的-slug.zip`
3. 运行

```bash
npm run publish:notion -- 你的-slug
```

4. 再运行

```bash
npm run dev
```

5. 浏览器打开

```text
http://localhost:4321/personal-blog/posts/你的-slug/
```

6. 确认没问题后推送

```bash
git add .
git commit -m "import notion post"
git push origin main
```

## 12. 常用命令

| 命令 | 作用 |
| --- | --- |
| `npm install` | 安装依赖 |
| `npm run dev` | 本地预览 |
| `npm run build` | 生产构建 |
| `npm run publish:notion -- slug` | 一键导入 Notion 文章 |
| `npm run import:notion -- slug` | 和上面相同 |
| `npm run summarize -- slug` | 重生成文章总结 |
| `npm run check:post -- slug` | 检查并自动修文章元数据 |

## 13. 部署

推到 `main` 分支后，GitHub Actions 会自动部署到 GitHub Pages。

公网地址：

```text
https://alex-996-me.github.io/personal-blog/
```
