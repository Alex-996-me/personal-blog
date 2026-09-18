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
- 保留长文章的可折叠目录、参考来源与数据表格能力。
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
