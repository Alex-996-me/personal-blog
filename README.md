# N=1 Lab

一个基于 Astro 的中文个人博客，偏长期写作和资料沉淀。现在分成三类内容：

- `文章`：完整长文，按读书、健康、训练、脑科学、工具等分类归档
- `每日灵感`：短想法、随手记、片段文字
- `资料`：PDF、讲义、课程资料、可在线阅读和下载的文件

## 1. 安装依赖

在项目目录打开 `cmd` 或 PowerShell，然后运行：

```bash
npm install
```

## 2. 本地预览

启动开发服务器：

```bash
npm run dev
```

浏览器打开：

```text
http://localhost:4321/personal-blog/
```

## 3. 构建检查

上线前建议先跑一遍：

```bash
npm run build
```

## 4. 项目里最常用的目录

```text
src/content/posts/          长文文章
src/content/inspirations/   每日灵感
src/content/resources/      资料说明页
public/images/covers/       文章或资料封面
public/images/posts/        正文插图
public/resources/           PDF / 讲义 / 资料文件
imports/notion/             Notion 导入源文件
```

## 5. 新增一篇长文章

去这里新建一个 Markdown 文件：

```text
src/content/posts/my-new-post.md
```

最小模板：

```md
---
title: "文章标题"
date: "2026-06-15"
updated: "2026-06-15"
category: "健康"
tags:
  - "饮食"
  - "实验"
description: "一句话摘要。"
cover: "/images/covers/my-new-post-cover.jpg"
youtube: ""
fullSummary: []
sectionSummaries: []
---

正文从这里开始。
```

可用分类：

- `日志`
- `读书`
- `健康`
- `训练`
- `脑科学`
- `工具`

说明：

- `日志` 是旧分类，保留给历史文章
- 首页和导航现在主推的是 `每日灵感`，不是旧日志栏目

## 6. 给文章加图片

先把图片放到：

```text
public/images/posts/你的文章-slug/
```

例如：

```text
public/images/posts/my-new-post/photo-01.jpg
```

然后在正文里这样写：

```md
![图片说明](/images/posts/my-new-post/photo-01.jpg)
```

如果你写了 `![图片说明]`，页面会把它当成图注显示。

## 7. 设置文章封面

把封面放到：

```text
public/images/covers/
```

例如：

```text
public/images/covers/my-new-post-cover.jpg
```

frontmatter 里写：

```md
cover: "/images/covers/my-new-post-cover.jpg"
```

封面只会出现在首页、搜索结果、列表页和资料卡片里。打开文章正文后，不再显示封面图。

## 8. 插入链接、YouTube、Bilibili

普通链接直接写：

```md
[参考资料](https://example.com)
```

外链会自动新标签页打开。

如果你想在文章顶部嵌入 YouTube，可以在 frontmatter 里写：

```md
youtube: "https://www.youtube.com/watch?v=xxxxxxx"
```

如果正文里有单独一行的 YouTube 或 Bilibili 链接，系统也会自动渲染成播放器。

## 9. 新增一条“每日灵感”

去这里新建文件：

```text
src/content/inspirations/my-thought.md
```

模板：

```md
---
title: "今天的一句话"
date: "2026-06-15"
updated: "2026-06-15"
tags:
  - "灵感"
description: "一句话摘要。"
published: true
---

这里写正文。可以很短，一段就够。
```

效果：

- 会出现在首页的“每日灵感”区块
- 会出现在 `/daily/`
- 会参与搜索
- 样式是短文本流，不会做成大文章卡片

## 10. 新增一份“资料”

第一步，把 PDF 或资料文件放进：

```text
public/resources/
```

例如：

```text
public/resources/my-notes.pdf
```

第二步，去这里新建资料说明页：

```text
src/content/resources/my-notes.md
```

模板：

```md
---
title: "我的一份资料"
date: "2026-06-15"
updated: "2026-06-15"
tags:
  - "PDF"
  - "课程"
description: "这份资料的大致内容。"
file: "/resources/my-notes.pdf"
cover: "/images/covers/my-notes-cover.jpg"
published: true
---

这里可以补一段说明，比如适合谁看、重点是什么、为什么值得存。
```

效果：

- 会出现在 `/resources/`
- 详情页会提供 `在线阅读` 和 `下载资料`
- 如果文件是 PDF，会直接站内预览
- 如果是图片文件，会直接显示图片预览

## 11. 搜索怎么用

站点搜索现在会一起检索：

- 文章标题
- 文章正文
- 标签
- 摘要
- 每日灵感内容
- 资料说明

入口：

- 右侧栏搜索框
- `/search/`

## 12. 目录是自动生成的

每篇 Markdown 文章开头都会自动生成一个可折叠目录。

规则：

- 自动读取正文里的 `##` 和 `###`
- 自动生成锚点
- 默认折叠

所以你只需要正常写标题层级：

```md
## 第一部分
### 小节 A
## 第二部分
```

## 13. 如果你从 Notion 导入

把 Notion 导出的 `zip` 或文件夹放进：

```text
imports/notion/你的-slug.zip
```

或：

```text
imports/notion/你的-slug/
```

然后运行：

```bash
npm run publish:notion -- 你的-slug
```

这个命令会尽量自动完成：

- 找主 Markdown / HTML
- 复制图片到 `public/images/posts/`
- 重写图片路径
- 清理排版
- 自动补 frontmatter
- 自动跑构建

## 14. 常用命令

```bash
npm install
npm run dev
npm run build
npm run publish:notion -- slug
npm run import:notion -- slug
npm run summarize -- slug
npm run check:post -- slug
```

## 15. 最简单的本地发文流程

如果你只是想自己发一篇文章、加图片、然后推上 GitHub，可以按这个顺序来：

1. 打开 `cmd`
2. 进入项目目录

```cmd
cd /d C:\Users\栗海粟\Documents\Codex\2026-05-05\github-plugin-github-openai-curated-personal
```

3. 新建文章 Markdown
4. 把图片放到 `public/images/posts/你的-slug/`
5. 如果有封面，把封面放到 `public/images/covers/`
6. 运行：

```bash
npm run build
```

7. 预览：

```bash
npm run dev
```

8. 确认没问题后提交并推送：

```bash
git add .
git commit -m "add new content"
git push origin main
```

## 16. 部署地址

推到 `main` 后，GitHub Actions 会自动部署到 GitHub Pages。

公网地址：

```text
https://alex-996-me.github.io/personal-blog/
```
