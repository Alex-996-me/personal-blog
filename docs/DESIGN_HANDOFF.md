# Design Handoff — Editorial Finish

## Public IA
- N=1 Lab → 文章 / 生活 / 关于；页头内联搜索作为工具。保持 Essays + Life；分类只是元数据。
- 首页：Identity → 3 篇显式精选 Essay → 3 条 Life → 最小 Footer。
- 精选使用 `featuredHome` + `featuredRank`，没有最新文章补位。
- 当前公开 3 篇 Essays、27 条 Life；完整处置依据见 [PUBLIC_CONTENT_AUDIT.md](PUBLIC_CONTENT_AUDIT.md)。

## Publishing contract
- 公开 Essay 必须显式填写 `title, date, updated, category, description, status: published`。
- `date` 首次发表；`updated` 最近实质修订，必须 ≥ date；日期相同也要明确填写。
- 不猜测日期、分类、摘要；不以 `updatedAt` 替代 Essay 的 `updated`。样式调整不修改文章日期。
- `src/content.config.ts` 是 schema；与 CLI 校验共享 `src/lib/essay-contract.mjs`。
- archive/draft 不强制 updated。Life 继续兼容 `published: false`。
- archive 旧 URL 只生成通用 noindex 提示，不展示原文；draft 不生成页面。
- Inspirations 永不进入公开 loader；旧路由保留收起提示，源文件保留。
- Search/Pagefind 只索引 published Essays + Life；RSS 只含 published Essays。
- status 不使 Git 历史及既有 public 媒体私有化。commit/push 仍须作者明确授权。

## Visual tokens
- 唯一全局系统：`src/styles/global.css`；Life 的布局补充在 `moments.css`，不重复定义 tokens。
- 背景 #161513；表面 #211f1c；正文 #eeebe5；辅助文字 #aaa49b；细线 #35322d；交互强调 #d7b98c。
- 阅读 680px；普通内容 960px；照片外框 1120px。移动端边距 20px。
- 区段间距 clamp(48px, 6vw, 80px)；图片与搜索面板圆角 3px。
- 不使用玻璃面板、阴影卡片或装饰性徽章。

## Typography
- Serif 用于主要标题和 Essay 标题；Sans 用于正文、Life 小标题、导航与元数据；Mono 仅代码。
- 全局字号变量：display 44.8–64px；h1 30.4–44px；h2 22.4–28px；h3 19.2–23.2px。
- Lead 19px；正文 18px（移动端 17px）；small 15px；meta 13px。
- Essay 行高 1.95，680px 宽约 38 个全角字 / 75 个半角字符的等效长度。
- 使用系统字体，不下载字体；不同平台的中文字体字形会有差异。

## Essay presentation
- 首页与文章索引共用现有 ArticleVisual，现为文字行：分类 / 标题 / 摘要 / 更新日期。
- 索引每篇只出现一次，不再重复精选区；无封面卡片、序号、标签或系列徽章。
- 详情：分类 → 标题 → 摘要 → 发布/更新日期 → 正文。同日只显示一组日期，语义保留两者。
- 不再重复输出 frontmatter 封面；正文原有图文保留。
- 结尾只留“所有文章”；不叠加相关推荐、上一篇/下一篇。
- 正文顶部固定 2px 进度线：正文到达阅读起点时为 0，正文末尾进入视口时为 100%；不计 Footer。缓存几何数据，passive scroll + rAF 更新。
- ≥3 个有效 H2 才生成章节侧栏；≥1200px 显示在阅读列左侧，sticky 限于正文区域，不改变 680px 阅读宽度；窄屏只保留进度线。
- 侧栏使用实际标题和既有 ID，排除参考资料/参考文献等支持性标题；原生 hash 跳转，H2 scroll-margin-top 为 2rem，当前章节轻量高亮。无移动目录或百分比文本。
- 移除正文前的大目录及 Markdown TOC 生成器；保留标题 ID、作者手写引用和数据表格能力。引用继续使用现有链接/列表样式与长 URL 换行，不自动编号。
- Phase 2.2 文件：`posts/[...slug].astro`、`essay-reading.ts`、`essay-reading.css`、`markdown-pipeline.mjs`、本 handoff。
- Phase 2.2 验证：validate / smoke / diff-check 通过；定向浏览器确认 1440px 侧栏、390px 隐藏、正文起中末进度、上下滚动高亮、点击/直达 hash、reduced-motion；已查看桌面/移动截图。
- 不自动插入 frontmatter 的全文/分节摘要面板；原有字段与 Markdown 正文保留。
- 构建时为公开正文的本地图片补真实尺寸和 lazy/async 属性，不改 Markdown 源文。

## Life presentation
- Life 列表在 960px 内容宽度内使用等宽双列 Grid；760px 以下单列。列距 32px、行距 48px。
- 列表缩略图统一 4:3、居中 cover 裁切；详情完整原比例不变。只改变 CSS，不改原图。标题最多两行，无占位文案。
- 详情：照片及原有图注 → 小标题 / 短文 → 日期地点 → 所有生活记录。
- 无 lightbox、相关推荐墙或多组分页导航。
- LifePhoto 用 Astro Image 输出真实尺寸和 480/960/1440 宽度候选，不放大原图。
- 首张详情/列表图 eager；首页 Life 及后续图片 lazy。原媒体不改写。

## Motion and accessibility
- 只保留 160ms 颜色反馈，统一 easing；无跨页面 View Transition、滚动动画或图片缩放。
- Header 随文档自然滚动，没有 scroll handler 或固定层造成的跳动。
- reduced-motion 关闭过渡；可见 focus、跳至正文链接、44px 导航高度。
- HeaderSearch 是同一个响应式搜索框：桌面 170px、移动端 100px；结果面板紧邻页头，不跳页。
- 输入后按需加载 Pagefind，最多显示 6 条公开结果；失败后读取公开 JSON 索引。方向键移动焦点、Enter 打开，Escape/点击外部/焦点离开关闭。
- 搜索结果显示类型、标题、摘要、日期/分类；无复杂过滤器。

## Removed
- KineticIdeaStage.astro、RelatedContent.astro、phase-b.css。
- Inspiration 专属 CSS/动画、废弃字典卡片样式、封面卡片 variants、重复语义 tokens。
- 全站转场、Life lightbox JS、照片 hover 缩放、搜索页内嵌全量内容及第二套搜索实现。
- 自动摘要面板生成器与样式、已无用途的封面转场命名函数。

## Verification
- `npm run validate`、`npm run smoke`、`git diff --check` 通过；130 页面，351 个本地 URL（含 responsive image 候选）。
- `node --test scripts/essay-contract.test.mjs` 覆盖缺失/空字段、非法日期、时间顺序和带文件名的错误。
- 浏览器检查限定公开代表内容：桌面 1440px / 移动端 390px；首页、文章索引、两篇 Essay、Life 列表与两条详情、About、Search。
- 自动检查公开索引与 RSS 成员、旧路由提示、图片加载、溢出、键盘、对比度与 reduced-motion。
- 实际 Pagefind 30 条公开内容；摘要/日期元数据、带 query URL 和 JSON 降级搜索通过浏览器验证。
- 已查看桌面与移动端页面截图；没有 commit、push 或内容文件删除。

## Remaining design debt
- 个别旧照片方向与封面选择仍需作者编辑判断，见 Phase 1 的两条 REFINE_PRESENTATION；本轮不改原照片。
- 正文已有空 alt 保留原值，需作者补充有意义的图片说明；不根据图片猜测内容。
- 视觉风格、阅读舒适度与照片节奏最终由作者在真实设备确认。

## Phase 2.1 operational facts
- 分类为作者明确填写的 trim 后 1–24 字符文本，取消 broad enum；published 的 date/updated/description/status 约束不变。
- 当前分类：attention-control → 注意力；mental-models-and-judgment → 心智模型；from-scarcity-to-slack → 生活哲学。未改归档分类或正文。
- Essay 列表日期继续取 updated，详情和阅读宽度未改。
- /search/ 仅兼容旧 URL：客户端 replace 到首页，保留 query 并聚焦页头搜索；无 JS 时保留返回链接，noindex。
- 移除 SearchDialog.astro、独立 Search 页面布局/样式、modal JS，以及 Life 列表交错宽度/自然比例规则。
- Phase 2.1 验证：validate / smoke / diff-check 通过；130 页面、351 本地地址。定向浏览器确认 1440px 双列与 390px 单列 4:3、原比例详情、三篇分类/updated、内联键盘搜索、旧 URL 兼容与仅 30 条公开索引。

## Daily v1 — Personal Reading Edition（2026-09-19）

- 最终产品契约：每个保留来源通常形成一篇连贯个人阅读版；目标 5–6 篇、每篇 1200–1800 汉字、整期 8000–12000 字，不凑数。编辑规则只在 `daily/EDITORIAL.md`，真实读者资料仅 `daily/profile.local.md`；操作见 `docs/DAILY.md` 与 `.agents/skills/daily-publisher/SKILL.md`。
- 固定链路：获准来源／14 天未读 reservoir／今日 inbox → 短卡 gate → 每批最多两篇的有界深读笔记 → 一次全局编辑（只发笔记）→ JSON 校验／确定性 Markdown。72 KB 深读、48 KB 最终请求预算；阶段最多一次 transient retry，成功笔记可续跑。最终长文采用标准 SSE，避免网关等待完整响应；未完整接收和验证不写草稿。
- 最终前端：Daily 首页和当期共用非对称 editorial grid；主稿 7 栏跨两行，两篇次稿在右侧，其余以较小的文字／图文块承接。保留站点深底、暖色、字体、宽度和细线，无卡片视觉或新依赖。手机 760px 以下按编辑次序单列。导航加入「邮报」，首页主体不变。
- 来源封面：`src/data/daily-covers.json` 保存公共原文元数据，feed media/enclosure 优先，再查 og:image、twitter:image。四张真实封面可用；Kevin Kelly 的网站默认图被排除，保留纯文字块。原始 URL 加载、显示框裁切，私人图片不进入前端。
- 阅读入口：整块链接到 `/daily/YYYY-MM-DD/<source-id>/`，复用 `.prose` 和原始段落，末尾可返回本期或查看原文。网格只含标题、hook、来源及整数阅读时间（250 汉字／分钟，拉丁文字按词计）；标题 hover／focus 右移 4px，reduced motion 不位移。生成文件及 schema 未改变。
- 隐私／发布：私人材料只允许高层短心得或排除，长文目标不适用；inbox、profile、原始快照、notes、运行状态和 `.env` 均 ignored。GENERATE 只产草稿；批准后发布同一审核 hash，再 validate、精确 staging、commit/push 当前分支。
- 本次真实验收：复用当日 5 条已采集公共候选（手动 inbox 为空），5 条深读、3 批笔记、5 篇最终阅读版，共 6687 个正文汉字。非流式最终请求两次 504；改为标准流式后 HTTP 200，149.8 秒完成，未重复深读。估计约 22–30 分钟，低于整期长度目标。
- 内容 QA：段落式阅读、机制和例子已保留；仍有偏多的限定段落，个别新增解释需作者核对是否超出源材料。未为验收重写。当前状态为 **实现验证通过，作者已批准发布**。
- 验证：13 项 Daily 测试、`npm run validate`、`npm run smoke`（130 页面／351 地址）、`git diff --check` 与 skill validator 通过。独立临时 Chrome 仅检查今日页 1440px／390px，5 篇初始折叠、点击展开／收起、桌面 Enter 操作、段落渲染与无横向溢出通过，截图留 ignored `.local`。`daily:publish` 明确提示，取消后文件 hash 不变。无私人运行路径被 Git 跟踪。
- 修改范围：Daily orchestration/adapter/selection、content contract、详情局部 disclosure 样式、针对性测试、EDITORIAL、skill 和两份现有文档。无 commit/push；作者验收后按 v1 冻结，正常变更限于来源、编辑/profile 与 bug 修复，不继续架构迭代。

### 2026-09-19 最终前端验收与发布状态

- 本轮只改前端呈现、公共封面元数据、导航及相应验证；五篇正文逐段比对一致，原 Markdown hash 未变，未调用 LLM、未改变生成链。16 项自动测试及 `validate` 通过，`smoke` 通过（130 个生产页面／351 个地址；草稿仍被排除），`diff --check` 通过。
- 定向 Chrome 检查：Daily 首页／当期桌面与 390px 单列、四张原图加载、完整阅读页及全部五篇正文一致性、键盘焦点、hover 无布局位移、reduced motion、无横向溢出均通过。截图只在 ignored 本地工作区。
- 已单独提交并推送文章行交互补丁 `e7f03c4`（main）。Daily 核查确认 repository **PUBLIC**、Pages **public**。作者随后审核并批准 6 篇版本（5 auto-subscribe + 1 manual）；发布命令已执行，正文与审核 hash 对应的草稿一致。manual 归属已接入发布校验，原料、截图、profile 和运行数据不提交。
- 正式地址：`https://alex-996-me.github.io/personal-blog/daily/`、`https://alex-996-me.github.io/personal-blog/daily/2026-09-19/`。本地验收：`http://127.0.0.1:4328/personal-blog/daily/`。
