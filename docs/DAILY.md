# Daily v1 — Personal Reading Edition

Daily 是从获准来源中重新编排的个人阅读版：通常 5–6 篇连贯文章，每篇约 1200–1800 个汉字，整期约 8000–12000 字、30–40 分钟阅读。都是目标而非配额；短来源、低价值日和私人材料不得靠填充达到篇幅。

## 每天怎么用

1. 可选：把 URL、文字、PNG/JPG/JPEG/WebP 放进 `daily/inbox/YYYY-MM-DD/`。日期为 Asia/Shanghai，文字放 `inbox.md`；没有材料也能运行。
2. 调用 `$daily-publisher`（或“生成今天的邮报”）。机器采集、筛选、深读、编排并更新唯一的 `src/content/daily/YYYY-MM-DD.md` 草稿。
3. 打开返回的实际本地 URL，先浏览本期版面，再点击文章块进入完整阅读页。约 5–10 分钟审核，必要时花 10–15 分钟深入核对。
4. 审核通过后明确说“批准发布”。skill 不重新生成，发布精确审核稿，validate、检查隐私与 staging，然后 commit、push 当前分支。

仅生成成功或 QA 通过不是发布授权。修改过审核稿必须重新审核。手动命令仍为 `npm run daily` → `npm run dev` → `npm run daily:publish`；最后一步要求 `Publish YYYY-MM-DD? (y/N)`，只本地发布，不自动 Git。

人工收集约 0–8 分钟，生成主要是机器时间，审核约 5–10 分钟，发布约 1 分钟；操作开销目标不超过 20 分钟／日，阅读时间另计。

## 配置与隐私

- `.env`：`DAILY_LLM_BASE_URL`、`DAILY_LLM_API_KEY`、`DAILY_LLM_MODEL`，使用 OpenAI-compatible `chat/completions`。最终长文采用标准流式响应，完整 JSON 校验成功后才写草稿。禁止提交或输出密钥。
- `daily/profile.local.md`：本地真实资料，包括 Stable preferences、已内化原则和作者手动填写的 Current focus。新环境使用 `daily/profile.example.md` 建立，不能从其他资料推断或扩写。
- 编辑规则只有一个来源：[daily/EDITORIAL.md](../daily/EDITORIAL.md)。不发送仓库文档、旧 Daily 或无关历史给模型。
- `daily/inbox/`、`daily/.local/`、本地 profile、`.env`、旧 inbox/profile 均仅本地保存并忽略。原始输入、截图、候选、笔记、请求状态、备份和审核 hash 不进入 Git。
- 公开来源必须实质改述、选择、重排并标注原链接，不复制长段或复刻整篇结构。私人／付费／截图输入只能产生短篇高层心得，或被排除；绝不能按 1500 字长文目标重构付费内容。自动 guard 不替代人审。

## Source labels

Daily has two user-facing source labels only: `auto-subscribe` for approved automatic feeds and `manual` for material placed in the dated inbox. Do not expose `personal`, `public`, or `private` as editorial source categories. Privacy and paid-content checks remain internal guards on manual material.

## 手动输入

直接贴独立 URL 或多段文字即可。空行保留在同一材料内；需要拆项时用单独一行 `---`。可选 metadata：

~~~text
source: 来源名称
access: private

笔记或允许处理的节选。
![附件](001.png)

---
https://example.org/public-article
~~~

模糊文字和图片默认 PRIVATE。`access: public` 不能把私人文字自动变成公共来源。只有独立且无凭据、敏感 query/fragment 或分享路径的 URL 才作为公共页面获取；其他链接保留为私人文字。请只提交允许配置中的服务商处理的材料。

附件仅支持当天同目录文件；未引用图片也参与筛选。禁止越界和 inbox 外 symlink。单图最多 8 MB；还受现有请求字节预算限制，过大时明确报错，不默默弃图。通过同一 provider 的多模态输入，不接 OCR。所有 inbox 材料均保留。

## 来源与候选池

唯一来源配置是 `data/daily-sources.json`。现有六家：Predictive History、Experimental History、Kevin Kelly、Overcoming Bias／Robin Hanson、Nassim Nicholas Taleb、Works in Progress。沿用已验证 feed，不自动发现其他来源。

新增、关闭普通 RSS/Atom 来源通常只改该文件，不改 skill、编辑契约或发布流程。无可用官方 feed 的来源保持关闭／手动输入，不开发 scraper。

候选窗口固定为最近 14×24 小时；不为凑数量扩窗或抓深层档案。`daily/.local/reservoir.json` 只存 ID、来源、发现／发表时间、快照引用、eligible/rejected/published 状态。正文复用既有本地候选快照。永久低价值淘汰不重试；deferred 仍可竞争；实际 published/archive 的 source ID 不再出现。生成草稿不等于发布。

## 冻结的处理链与恢复

- 采集／规范化／确定性去重 → gate 候选卡（500–900 字符，最多 64 KB）→ shortlisted 正文分批深读 → 每篇紧凑编辑笔记 → 一次全局编辑，只读笔记 → JSON 校验 → 确定性 Markdown。
- gate 队列最多 40 个候选，手动优先；余下公共候选继续留池。通常 8–12 篇进入深读，不强制配额。
- 每批最多两篇、正文上限 16000 字符，实际请求最多 72 KB；暂时性失败重试缩到 48 KB／8000 字符，所有截断明确标记。笔记每篇最多 2200 字符，最终请求最多 48 KB；不把完整正文再发给全局编辑。
- 每阶段最多一次 transient retry；深读批次共享重试预算。最终长文流式接收，最多等待 5 分钟；不完整或无效 JSON 不落盘。失败后保留已有草稿、候选、成功的 gate 和深读笔记，下一次从缓存续跑，不重新抓取。
- 相同输入、规则、profile、模型跳过 AI；更改这些条件时更新同一草稿并备份旧稿。published/archive 拒绝覆盖。inbox 从不删除；附件变化明确报错。
- 模型生成的长文可能少于目标或被淘汰；不要为验收好看自动重写。零篇使用空日说明。单 feed 失败跳过并报告；无可用来源或候选时保留旧稿、报告失败。
- Markdown 仍是唯一正文源，保留原有生成格式；前端解析成封面版面和独立阅读页，不重新生成或改写。draft 仅 Astro dev 可见，使用终端实际端口；生产 preview/build 同时隐藏草稿的整期和单篇路由。
- 发布前核对 `daily/.local/review.json` 中的日期、路径、hash；精确 staging，拒绝私人／运行时文件和无关修改，禁止切分支、rebase、merge、force push。

## 验收与后续边界

### 邮报版面与阅读

- `/personal-blog/daily/` 展示最新一期，下面是按日期排列的往期；本地 dev 可预览草稿，生产只展示 published。导航使用现有「文章／生活／邮报／关于」和内联搜索，首页主体不变。
- `/personal-blog/daily/YYYY-MM-DD/` 使用 12 栏概念网格：主稿占 7 栏和两行，两篇次稿占右侧 5 栏，其余使用较小块。暖色、深底、原有字体与细分隔线；无卡片阴影、圆角或新依赖。
- 点击整块进入 `/personal-blog/daily/YYYY-MM-DD/<source-id>/`。稳定的已有 source ID 作 slug，完整正文复用站点 `.prose`；文末提供公共原文链接和返回本期。不在网格里展开全部长文。
- 760px 以下按编辑顺序收为单列，图片放在文字前。标题 hover／键盘 focus 为暖色并右移 4px，200–240ms；触屏不启用 hover，reduced motion 取消位移。
- 阅读时间按每分钟约 250 个汉字（拉丁文字按词计）确定性计算，向上取整；整期为单篇分钟数之和。
- `src/data/daily-covers.json` 只保存公共 source URL 对应的 `coverImage`、可选 `coverAlt` 与元数据出处。按 feed media/enclosure → 原文 og:image → twitter:image 回填，先验证图片可加载；排除站点默认 logo、虚构图和私人截图。缺图就是纯文字块，未来未回填的来源也能直接渲染，不影响生成链。图片从公共原始 URL 加载，仅显示框裁切，不修改图片内容。
- 2026-09-19 审核稿包含 6 篇正文（5 篇 `auto-subscribe`、1 篇 `manual`），已获作者明确发布授权；四张原文封面可用，Kevin Kelly 采用纯文字块。GitHub repository 与 Pages 均为 PUBLIC，发布前仍必须检查精确 staging，排除 inbox、`.local`、profile、截图与 API 状态。
- 正式地址为 `https://alex-996-me.github.io/personal-blog/daily/` 和 `https://alex-996-me.github.io/personal-blog/daily/2026-09-19/`。

最终实现使用 `validate`、`smoke`、`diff --check`；生成阶段已有一次真实草稿验收，本轮不重跑生成，只检查 Daily 首页／当期／完整阅读、桌面与约 390px、图片及键盘交互。实际结果记录在 `docs/DESIGN_HANDOFF.md` 的 Daily v1 部分。

2026-09-19 内容已进入正式发布流程；Daily v1 冻结。正常变更限于来源配置、EDITORIAL、local profile 和 bug 修复。只有真实日用暴露功能阻塞才重新讨论架构，不增加额外平台功能。
