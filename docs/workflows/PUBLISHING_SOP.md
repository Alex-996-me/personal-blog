# N=1 Lab Human × Agent Publishing System

这套流程的目的不是让 AI 替作者思考，而是把判断权与生产劳动分开：作者决定什么值得写、相信什么、怎样表达；Agent 负责把已授权的内容变成可发布的作品。

## 人负责什么

- 选真正值得写的问题
- 价值判断与原创想法
- 个人经验
- 金句和有辨识度的表达
- 最终风格判断
- 发布决定

## AI 负责什么

- 整理原料与发散文章角度
- 结构设计
- 初稿与编辑
- Markdown/MDX 排版
- schema、frontmatter、媒体管理
- validation
- Git publication mechanics

## 标准流程

```text
RAW MATERIAL
↓
idea-architect
↓
AUTHOR GATE 1
↓
voice-drafter
↓
AUTHOR GATE 2
↓
blog-production
↓
VALIDATION
↓
AUTHOR GATE 3
↓
PUBLISH
```

1. `idea-architect` 把笔记、转录、阅读材料和金句整理为 editorial brief。它最多给出三个角度，但不会替你决定立场；输出结束于 `AUTHOR DECISION REQUIRED`。
2. **Author Gate 1**：你选择核心问题、文章角度、必须保留的观点/金句，并删去不想写的方向。
3. `voice-drafter` 基于已确认的方向和你提供的经历写初稿，优先保留你的表达，不会伪造事实或经验；输出附带 `AUTHOR PASS`。
4. **Author Gate 2**：你修改那些不像你的段落，补上最重要的判断、经验或金句，并确认最终稿。
5. `blog-production` 将最终稿接入站点：生成合法 frontmatter，处理分类、标签、摘要、关系、系列、媒体和排版；随后运行 `npm run validate`、`git diff --check` 并检查 `git status --short`。
6. **Author Gate 3**：你审阅最终 diff，并决定是否发布。只有明确说“发布”后，Agent 才能精确 `git add -- <files>`、commit 和 push；绝不使用 `git add .`。

## 日常最短提示词

完整新文章，先停在 Gate 1：

> 这是今天的素材。启动完整发文 workflow，先只做到 Gate 1。

方向已定，继续初稿：

> 方向确定，继续到 Author Pass。

我已完成作者修改，进入生产但不发布：

> 我已经完成作者修改。进入 production，但不要发布。

确认发布：

> 发布。

## 快捷入口

- 已有完整终稿：直接使用 `$blog-production`。
- 只想编辑现有稿件：从 `$voice-drafter` 开始。
- 旧提示词仍可使用 `$personal-blog-publisher`；它会按素材所处阶段路由到上述三个 Skill。
