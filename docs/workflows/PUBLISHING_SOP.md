# N=1 Lab Human × Agent Publishing System

这套流程的目的不是让 AI 替作者思考，而是把判断权与生产劳动分开：作者决定什么值得写、相信什么、怎样表达；Agent 负责把已授权的内容变成可发布的作品。

## 公开边界

N=1 Lab 公开成熟文章（Essays）、生活记录（Life）和邮报（Daily）。邮报来源标记为 manual 或 auto-subscribe，通常精选 5–6 篇，人审后发布。教程、练习、碎片和临时判断默认留在本地；Life 无须提炼教训。原 Inspirations 不再是公开内容类型。历史审计见 [PUBLIC_CONTENT_AUDIT.md](../PUBLIC_CONTENT_AUDIT.md)。

新增文章显式填写 `status: draft`，作者确认终稿后才改为 `published`；`archive` 保留源文件和无原文的旧 URL 提示，不进入搜索或 RSS。生活使用同样状态，旧 `published: false` 仍有效。首页只用 `featuredHome` 与 `featuredRank` 指定 2–5 篇代表文章，不按日期自动补位。状态字段不改变 commit / push 的作者发布门槛，也不能把仓库或 public 媒体变成私有存储。

## Essay 发布字段

每篇公开 Essay 必须显式填写 `title`、`date`、`updated`、`category`、`description`、`status: published`。`date` 是首次发表日期；`updated` 是最近一次实质修订日期，未修订时仍须由作者明确填写与 `date` 相同的日期，且不得早于 `date`。仅调整页面样式不更新文章日期。

`category` 由作者选择；`description` 简洁表达文章主旨。不得由脚本猜测、补造或用 `updatedAt` 代替 `updated`。缺失信息先向作者核实。`tags` 可选。`npm run validate` 会给出文件名与无效字段；archive/draft 不强制 `updated`。验证通过不代表获得发布授权。

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

## 文件夹与文件使用指南

日常主要使用下面三个投递入口。原料、生成稿和正式内容分开放；不要把私人原文直接放进 `src/content` 或 `public`。`draft` 只控制网站显示，不会让公开 Git 仓库中的文件变成私有。

| 我要做什么 | 投递位置 | 接下来怎么做 |
| --- | --- | --- |
| 写一篇原创文章 | `.content-inbox/<英文主题>/`，放原稿、笔记和附件 | 调用 `$personal-blog-publisher`，说明是原料、已有方向，还是终稿；审核前不发布 |
| 生成每日邮报 | `daily/inbox/YYYY-MM-DD/inbox.md`；图片放当天同目录 | 调用 `$daily-publisher`；审核返回的本地 Daily，再明确批准 |
| 做英语练习并整理文章 | `.english-inbox/YYYY-MM-DD/` | 调用 `$english-learning-workflow`，按练习、反馈、发布顺序推进 |

这三个目录均被 Git 忽略。忽略不是备份：更换电脑前，应另行安全备份需要保留的原料、本地 profile 和密钥；不要为备份把它们加进公开仓库。

### 原料与最终内容

| 路径 | 内容和作用 | 是否可以进入公开 Git |
| --- | --- | --- |
| `.content-inbox/` | 原创文章原料、导入临时文件；现有 `phase*`、`daily-demo` 等为历史本地工作材料，不是新投递入口 | 否 |
| `.english-inbox/` | 视频转录、练习、反馈和中间音频；独立于本次 Daily 发布 | 否 |
| `daily/inbox/` | 每日手动文字和截图，原件始终保留 | 否 |
| `src/content/posts/<slug>.md` 或 `.mdx` | 审核后的文章及其 frontmatter，使用稳定英文 slug | 可以，但必须先排除私人原料 |
| `src/content/moments/` | 生活与地点记录 | 可以，须检查文字与照片隐私 |
| `src/content/daily/YYYY-MM-DD.md` | 当天唯一的可公开 Daily 草稿／已发布内容 | 可以，只有安全公开文字 |
| `src/content/inspirations/` | 保留的旧灵感文件，当前不作公开栏目 | 不作为新内容入口 |
| `public/images/` | 经审核的封面、正文和生活照片 | 可以；不要放私人截图 |
| `public/audio/`、`public/videos/` | 经审核、允许公开的音视频 | 可以 |
| `imports/notion/` | Notion 导入工作区；只有 `example/` 是版本化格式示例 | 原始导出不可提交 |

### Daily 文件职责

| 文件／目录 | 作用 | 日常由谁修改 |
| --- | --- | --- |
| `daily/EDITORIAL.md` | 唯一编辑标准，决定选择和写法 | 作者明确要求校准时 |
| `daily/profile.local.md` | 真实阅读偏好、已内化原则、当前重点；仅本地 | 作者，尤其是 Current focus |
| `daily/profile.example.md` | 不含个人资料的新环境模板 | 通常不动 |
| `data/daily-sources.json` | 获准来源及启用状态 | 增删订阅时修改 |
| `daily/inbox/YYYY-MM-DD/inbox.md` | 当天的 URL、文字；独立 `---` 表示分成不同材料 | 作者投递 |
| `daily/inbox/YYYY-MM-DD/*.{png,jpg,jpeg,webp}` | 当天截图／图片原料，默认 PRIVATE | 作者投递 |
| `daily/.local/state.json` | 手动材料去重状态 | 脚本，勿手改 |
| `daily/.local/reservoir.json` | 近期候选的引用及 eligible/rejected/published 状态 | 脚本，勿清空以“重新生成” |
| `daily/.local/YYYY-MM-DD.candidates.json` | 候选正文快照，避免重复采集 | 脚本，仅本地 |
| `daily/.local/YYYY-MM-DD.pending.json` | 中断恢复用 gate／笔记缓存，成功后移除 | 脚本 |
| `daily/.local/YYYY-MM-DD.json` | 当次输入、选择结果及请求统计 | 脚本，仅本地 |
| `daily/.local/review.json` | 本次待发布稿的日期、路径、hash | Agent 审核后更新 |
| `daily/.local/backups/` | 替换草稿前的备份 | 脚本 |
| `daily/.local/reading/` | manual 阅读稿及处理记录；审核后的转化稿可整合进当期 Daily，原料不提交 | Agent 处理指定材料时 |
| `daily/.local/` 内其他检查工具、截图、日志 | 本地验证和恢复产物，不是文章入口 | Agent；不随意搬移正在引用的文件 |
| `scripts/daily.mjs` | 采集、缓存、去重和生成编排 | 开发维护 |
| `scripts/daily-core.mjs` | 输入适配、API 请求、隐私校验、Markdown 输出 | 开发维护 |
| `scripts/daily-selection.mjs` | gate、分批深读、全局编辑及结构化校验 | 开发维护 |
| `scripts/daily-reservoir.mjs` | 14 天候选池生命周期 | 开发维护 |
| `scripts/daily-publish.mjs` | 确认后本地发布精确草稿；不自动 Git | 由批准后的流程运行 |
| `scripts/daily.test.mjs` | Daily 自动化回归测试 | 开发维护 |
| `src/lib/daily-contract.mjs`、`src/lib/daily.ts` | 文档规则和页面内容读取 | 开发维护 |
| `src/pages/daily/index.astro`、`src/pages/daily/[date].astro`、`src/pages/daily/[date]/[slug].astro` | 邮报首页、当期版面和单篇完整阅读页 | 开发维护 |
| `.agents/skills/daily-publisher/SKILL.md` | GENERATE／PUBLISH 操作与人审边界 | 工作流确需变化时 |
| `docs/DAILY.md` | Daily 操作说明、隐私和恢复方法 | 已验证流程变化后同步 |

一篇原文中自带的 `---` 会被当前 inbox 解析器当作分项符。若希望整体处理，可在投递时保留原件并明确告诉 Agent“这是同一篇文章”；不要为了生成成功把私人文字标成 `public`。私人材料的完整阅读稿留在本地，公开 Daily 只允许高层转化心得。详见 [Daily 操作说明](../DAILY.md)。

### 网站与工程文件

| 路径 | 作用 |
| --- | --- |
| `README.md` | 项目入口和常用命令 |
| `AGENTS.md` | 本仓库 Agent 编辑、验证和发布规则 |
| `.agents/skills/` | 写作／发布／英语／Daily 的可复用操作；不是读者内容 |
| `.env` | 本地 API 配置与密钥，禁止提交；`.env.example` 仅作无密钥模板 |
| `.gitignore` | 原料、密钥、缓存与构建产物的 Git 排除规则 |
| `package.json`、`package-lock.json` | npm 命令、依赖及锁定版本；恢复环境用 `npm ci` |
| `astro.config.mjs`、`tsconfig.json` | Astro 和 TypeScript 工程配置 |
| `src/content.config.ts` | 内容字段的唯一 schema；新增 frontmatter 先遵守这里 |
| `src/pages/` | URL 页面与站点接口 |
| `src/components/`、`src/layouts/`、`src/styles/` | 组件、布局和样式 |
| `src/lib/`、`src/scripts/` | 站点逻辑与浏览器脚本 |
| `src/data/site.ts` | 站点基础配置；不同于 Daily 来源配置 |
| `src/assets/` | 需要构建处理的源码资源 |
| `scripts/validate-content.mjs`、`scripts/smoke-site.mjs` | 内容校验、构建结果 smoke 检查 |
| `scripts/check-post.mjs`、`scripts/essay-contract.test.mjs` | 单篇文章检查与 Essay 规则回归测试 |
| `scripts/import-notion.mjs`、`scripts/optimize-media.mjs` | Notion 导入和媒体优化工具 |
| `scripts/generate-section-summaries.mjs`、`scripts/new-english-log.ps1` | 现有段落摘要工具、英语日目录辅助脚本 |
| `docs/workflows/PUBLISHING_SOP.md` | 当前文件：投递位置、文章发布流程和文件职责 |
| 英语工作流的本地文档及 skill 草稿 | 独立维护与验收，不随 Daily 自动发布 |
| `docs/DESIGN_HANDOFF.md`、`docs/PUBLIC_CONTENT_AUDIT.md` | 已有设计交接和公开内容边界记录，非日常投递入口 |
| `.github/workflows/deploy.yml` | 推送后的 GitHub Pages 构建部署 |
| `node_modules/`、`.astro/`、`dist/` | 可重建的依赖、类型／缓存、构建产物；勿在这里编辑文章 |
| `.git/` | Git 历史和索引，勿手工整理 |
| `.codex/`、`.vscode/` | 工具和编辑器配置，非内容目录 |

### 每次发布前

先核对待发布文章及资源，再验证、检查精确 diff 和私人文件排除状态。现有未提交内容同时包含 Daily 建设与英语工作流，不能整仓 `git add .`，也不能把历史 Daily 草稿自动纳入首次发布。只有作者认可的文件才进入提交。

邮报导航和版面随 2026-09-19 的 6 篇审核稿发布。已删除无引用的旧 Daily 配置迁移提示；归档内容仍支撑旧 URL 和历史引用，不作为无用文件删除。依赖和构建缓存可重建，原料和未验收工作仍保留在本地。
