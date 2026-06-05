---
title: 学习情境下人机协作效果的定义与量化：一个精简实验框架
date: '2026-06-05'
updated: '2026-06-05'
category: 工具
tags:
  - AI
  - 人机协作
  - 学习
  - 教育
  - 实验设计
description: 围绕学习情境中的人机协作，提出一套强调主体性、学习质量与依赖校准的精简实验框架。
cover: ''
youtube: ''
fullSummary:
  - 这篇文章关心的不是“用了 AI 之后快不快”，而是学习者在使用 AI 之后，是否仍然保有主体性、判断力和长期学习能力。
  - 文章把学习场景中的人机协作拆成不同 AI 角色，并提出多维指标，而不是只看一次性的任务成绩。
  - 比起“机器替代人”，这里更强调“机器增强人”：好的协作应当同时提升当前表现与后续迁移。
  - 文中也把谄媚、幻觉、自动化偏误和检测失灵等现实问题一起纳入了实验框架。
sectionSummaries: []
---

**说明：** 本报告围绕“如果设计实验，应如何定义和量化人机协作效果”这一问题形成初步框架。重点不在于完整综述已有文献，而在于提出一个可操作的指标体系与实验设计思路。

# 背景介绍和实验设定

## 背景介绍

本项目聚焦人与生成式人工智能协作中的个体差异，结合神经心理学问卷、认知实验、脑电及磁共振影像等技术，系统探索影响人机协作个体差异的认知、情绪与社会因素，并揭示其关键神经基础。项目旨在为构建更符合人类认知特性的智能协作系统提供科学依据，并为教育及决策支持等领域中人机协作模式的优化提供参考。

在我看来，学习情境下的人机协作效果差异，不能只被定义为“AI 使用后的任务完成表现”，而应进一步追问：

> **AI 是否在保持人的主体性、独立判断和责任承担的前提下，提高了人的任务表现、学习质量、迁移能力、元认知校准和长期学习能力？**

基于此，本报告将学习情境下的人机协作效果定义为：

> **在特定任务和特定 AI 角色下，AI 介入相对于人类独立完成任务，在任务表现、学习收益、迁移能力、元认知校准、依赖校准、认知负荷分配、主体性保持和长期行为改变等方面产生的综合变化。**

这个定义强调三个关键点：

1. **人机协作效果是多维的：** 不能只用正确率、完成速度或专家评分衡量。
2. **必须区分短期表现与长期能力：** 在学习情境中，表现增益不必定等同于学习能力增益。
3. **人机协作的观念重构：** AI 的价值不应被理解为“机器替代人”，而应被理解为“机器增强人”。

这一立场与人本 AI、混合智能、人机互补和适当依赖研究相吻合。已有研究表明，人机团队的关键并不只是让 AI 给出解释，而是使人能够在正确建议和错误建议之间形成校准后的采纳行为，并在必要时保留判断权([Bansal et al., 2020](https://arxiv.org/abs/2006.14779); [Schemmer et al., 2023a](https://arxiv.org/abs/2310.02108); [Schemmer et al., 2023b](https://arxiv.org/abs/2302.02187); [Cao et al., 2024](https://arxiv.org/abs/2401.05612); [Gao et al., 2023](https://arxiv.org/abs/2302.02944); [Xu & Dainoff, 2021](https://arxiv.org/abs/2111.08460); [Chen et al., 2023](https://arxiv.org/abs/2306.15774); [Wikipedia contributors, 2026a](https://en.wikipedia.org/wiki/Human-centered_AI))。同时，近年的公共讨论也显示，生成式 AI 已经从单一工具扩展为一种新的学习、写作和信息获取界面；因此，本报告不是讨论“是否使用 AI”，而是讨论怎样把 AI 使用重新设计成可测量、可校准、可保留人类主体性的协作过程([Dhar, 2023](https://arxiv.org/abs/2308.02558); [The New Yorker, 2023a](https://www.newyorker.com/culture/2023-in-review/the-year-ai-ate-the-internet); [The Guardian, 2023](https://www.theguardian.com/commentisfree/2023/jul/14/ai-artificial-intelligence-disrupt-education-creativity-critical-thinking); [The Economist, 2023](https://www.economist.com/leaders/2023/04/20/generative-ai-is-a-marvel-is-it-also-built-on-theft); [Olson, 2024](https://en.wikipedia.org/wiki/Supremacy_(book)))。

## 实验设定

### 样本选择

现阶段优先选择大学生样本。大学生更容易招募，也更普遍使用生成式 AI，能够完成较复杂的学习、写作和推理任务，并能配合问卷、行为实验和 AI 使用日志。高中生样本具有重要教育意义，但涉及未成年人伦理、家长同意和学校合作，第一阶段成本较高，可作为后续扩展。

### 核心任务

基础实验可选择大学生能够理解且易于量化的任务，例如写作表达、社会议题讨论、统计概念学习、心理学短文理解、科学概念学习、数学推理、观点批判或决策分析。不同实验模块的任务材料和分组方式不完全相同，因此不在本节提前设置统一分组。后文将在每一个具体实验中分别说明实验任务、分组方式、测量指标和预期用途。

### 实验装置

可以进一步结合 EEG、fMRI 或 MEG 探索认知机制。例如，EEG 可用于观察注意投入、认知负荷、错误监测和反馈加工；fMRI 可用于探索前额叶控制网络、工作记忆网络、注意网络以及海马体等脑区在不同 AI 协作条件下的差异。神经机制测量不应作为所有实验的必要条件，而应作为条件允许时的增强模块。第一阶段仍应以行为表现、交互日志、问卷量表和任务结果为核心数据。这里参考近期关于“AI 是否改变学习者脑活动和认知投入”的讨论，但由于相关研究样本量、生态效度和因果解释仍有限，本文只把脑电和影像放在增强模块，而不作为核心结论来源([Baddeley, 1992](https://doi.org/10.1126/science.1736359); [Cohen et al., 1997](https://doi.org/10.1038/386604a0); [Maguire et al., 2000](https://doi.org/10.1073/pnas.070039597); [Sweller, 1988](https://doi.org/10.1207/s15516709cog1202_4); [Tech & Learning, 2025](https://www.techlearning.com/news/your-brain-on-chatgpt-everything-educators-need-to-know-about-mits-ai-study); [TIME, 2025](https://time.com/7295195/ai-chatgpt-google-learning-school/); [The Washington Post, 2025a](https://www.washingtonpost.com/health/2025/06/29/chatgpt-ai-brain-impact/); [The New Yorker, 2025](https://www.newyorker.com/culture/infinite-scroll/ai-is-homogenizing-our-thoughts))。

# 总体立场：以人为主，机器为辅

人机协作研究首先需要明确价值立场——若只追求“AI 输出越多越好”“人做得越少越好”，研究问题就容易滑向机器替代人的逻辑，因为在机械记忆和有规则的任务完成语境下，AI 已经大幅领先于人类。但在学习、科研和决策场景中，人不仅是任务执行者，还是目标设定者、意义解释者、证据评估者、价值判断者和责任承担者。

因此，高质量人机互补可以定义为：

> **AI 在不削弱人的主体性、独立判断和责任承担的前提下，帮助人提升任务表现、学习深度、迁移能力、错误识别、元认知校准和决策质量。**

也就是说，真正值得研究的不是“人能少做多少”，而是“人在 AI 辅助下是否变得更强”。从任务表现角度，可以先使用两个普通指标表示：

- **人机表现增益（HAIG）：** 人机协作表现相对于人类独立表现的提升幅度。
- **协同互补度（COMP）：** 人机协作表现相对于“人类独立表现”和“AI 独立表现”中较高者的额外提升。若该指标为正，说明人机组合超过了人单独和 AI 单独的表现，形成协同增益。

但在学习情境中，仅有表现互补仍然不够。更严格的标准应是：**主体性保留互补（APC）：保留主体性的人机互补。** 它至少包括三个条件：当前任务表现提升；人的学习、判断、反思或迁移能力提升；人的目标设定、证据评估、独立判断和责任承担没有被削弱。

这种判断也受到自动化偏误和自动化讽刺研究支持：系统越自动化，人越容易过度依赖系统，同时又可能在关键时刻仍需承担责任([Parasuraman & Manzey, 2010](https://doi.org/10.1177/0018720810376055); [Parasuraman & Riley, 1997](https://doi.org/10.1518/001872097778543886); [Bainbridge, 1983](https://doi.org/10.1016/0005-1098(83)90046-8); [Wikipedia contributors, 2026b](https://en.wikipedia.org/wiki/Automation_bias); [Wikipedia contributors, 2026c](https://en.wikipedia.org/wiki/Human%E2%80%93AI_interaction); [Hoque et al., 2024](https://arxiv.org/abs/2404.02147))。同时，认知卸载本身并不一定是坏事：它可能释放工作记忆，也可能让学习者把核心判断外包出去。本文因此避免把 AI 使用简单写成“降低负担”，而是进一步区分低价值负担卸载与核心认知劳动外包([Risko & Gilbert, 2016](https://doi.org/10.1016/j.tics.2016.07.002); [Sparrow et al., 2011](https://doi.org/10.1126/science.1207745); [The Washington Post, 2025a](https://www.washingtonpost.com/health/2025/06/29/chatgpt-ai-brain-impact/); [The New Yorker, 2023b](https://www.newyorker.com/magazine/2023/12/11/the-inside-story-of-microsofts-partnership-with-openai))。

# 第一层框架：按 AI 角色分类

实验设计不能简单比较“使用 AI”和“不使用 AI”，因为不同 AI 使用方式背后的认知机制不同，粗糙地按照用法划分无法形成统一的比较框架。因此，首先应区分 AI 在任务中的角色。

本文将 AI 调用方式分为三类：

- **答案输出型 / 任务完成型 AI:** AI 主要负责完成任务，人主要提出需求和接收结果。它的短期效率高，但可能造成认知外包和虚假掌握感。
- **反馈型 / 批判型 AI:** 人已有初步产出或判断，AI 提供反馈、批判、追问或疏导。它有助于反思和错误识别，但也可能产生谄媚和确认偏误。
- **提示型 / 教学型 / 脚手架型 AI:** AI 不直接替人完成任务，而是提示、引导、教学和测试。它更可能促进真实学习，但需要通过延迟测试和迁移测试验证。

不同 AI 角色对应不同的人类认知参与程度，也对应不同的量化指标。任务完成型 AI 应重点看任务完成表现；学习型 AI 应重点看记忆、内化和迁移；反馈型 AI 应重点看反馈质量、偏误抵抗和独立判断。该分类同时呼应了人本生成式 AI、适当依赖、认知卸载和苏格拉底式 AI 学习研究([Chen et al., 2023](https://arxiv.org/abs/2306.15774); [Risko & Gilbert, 2016](https://doi.org/10.1016/j.tics.2016.07.002); [Sparrow et al., 2011](https://doi.org/10.1126/science.1207745); [Zhang et al., 2024](https://arxiv.org/abs/2406.13919); [Ding et al., 2024](https://arxiv.org/abs/2407.17349); [Chang, 2023](https://arxiv.org/abs/2303.08769); [Jabbour et al., 2025](https://arxiv.org/abs/2502.00341); [OpenAI, 2025](https://openai.com/index/chatgpt-study-mode/); [The Guardian, 2025a](https://www.theguardian.com/technology/2025/jul/29/chatgpt-openai-chatbot-study-mode-universities-students-education))。其中，OpenAI Study Mode 以及近期教育报道也说明，产品设计本身正在从“直接给答案”向“引导、追问、分步学习”转向；这支持本文把 Answer-AI 和 Socratic/Metacognitive-AI 分开比较。

# 人类权重（HW）

## 定义

为了衡量人在协作中的主体性，可以引入指标“人类权重（HW）”。人类权重（HW）指个体在人机协作过程中承担的认知加工、决策控制和责任归属程度。它不是简单看用户输入了多少文字，而是看人在关键认知环节中是否保留决策权。

人类权重（HW）的核心问题是：

> 在人机协作过程中，人是否仍然承担目标设定、问题建模、证据评估、结果解释和责任承担？

因此，HW 可以被看作主体性 agency 的行为化指标。

## 操作化

人类权重（HW）不宜预设为固定数值。更合理的方式是将其视为由多个行为维度共同估计的综合指标，主要包括：目标设定（GS）、问题拆解（PD）、结果评估（EV）、事实核查（VF）和责任承担（RA）。这些维度与自我调节学习中的目标设定、计划、监控和反思过程相近([Winne & Hadwin, 2008](https://psycnet.apa.org/record/2008-03967-011); [Zimmerman, 2002](https://doi.org/10.1207/s15430421tip4102_2); [Wikipedia contributors, 2026d](https://en.wikipedia.org/wiki/Self-regulated_learning))。不过，考虑到自评容易高估原创性和主动性，本文在实验1中不采用“人类权重自评”作为核心指标，而采用交互日志、行为标记和人工复核，这一口径也受到学习过程数据、提示词评价和论证挖掘研究的启发([Hong et al., 2026](https://arxiv.org/abs/2603.10477); [Toulmin, 1958](https://archive.org/details/usesofargument0000toul); [Lippi & Torroni, 2016](https://doi.org/10.1145/2850417); [Li et al., 2025a](https://arxiv.org/abs/2506.16383); [Thoughts Memo 汉化组, 2022a](https://l-m-sherlock.github.io/thoughts-memo/post/how-to-write-good-prompts/))。

各维度可以通过以下行为指标观察：

- **目标设定:** 是否明确任务目标、评价标准和问题背景。
- **问题拆解:** 是否主动拆分任务、划清步骤、提出子问题、说明卡点。
- **结果评估:** 是否比较多个方案、指出 AI 输出不足、筛选建议。
- **事实核查:** 是否查证事实、识别虚假引用、检查推理链。
- **责任承担:** 是否能解释最终选择，并承认自己对结果负责。

进一步，可以构建主体性指数（ASI），用于衡量人是否仍然保留主体性。其组成可以包括最终决策控制（FDC）、解释能力（EA）、错误修正能力（ECA）、无 AI 复现能力（NAR）和责任归属感（RAT）。

## 实验1：基于交互日志的人类权重（HW）行为评分实验

### 实验目标

本实验用于测量在人机协作过程中，用户是否真正保留了任务主导权。这里不采用“人类权重自评”，因为自评容易受到认知偏误影响。用户可能认为某个想法是自己的原创贡献，但实际上它可能是在 AI 根据上下文预测、补全和推理后形成的更成熟表达。因此，HW 不应主要依赖主观问卷，而应基于用户与 AI 的完整交互日志进行行为评分。

本实验的核心问题是：**用户在人机协作过程中，是否通过 prompt、追问、筛选、查证和修改行为体现出目标设定、问题拆解、结果评估和事实核查能力？**

### 核心测量对象

HW 主要由四个行为维度构成：目标设定得分（GSS）、问题拆解得分（PDS）、结果评估得分（EVS）和事实核查得分（VFS）。综合人类权重得分可记为人类权重得分（HWS），由 GSS、PDS、EVS、VFS 四项综合得到。责任承担不作为本实验的核心量化指标，可以作为任务后访谈或反思材料保留，但不进入 HWS 的主要计算。

### 数据来源

实验收集任务说明、用户与 AI 的完整交互日志、用户最终提交版本、用户对 AI 输出的修改记录、必要时的外部查证记录，以及任务后简短解释材料。核心数据是交互日志，而不是用户自评。

### 评分算法设计

本实验采用“机器自动核查 + 人工复核”的评分方式。机器自动核查用于初步提取行为特征，识别用户 prompt 中是否出现明确任务目标、背景和限制条件、任务步骤、评价标准、追问漏洞、比较方案、要求证据或不确定性说明、实质性修改、要求反驳或检查错误，以及是否保留最终判断。机器核查的作用不是直接给最终分数，而是提供可复核的行为标记和初始评分。

人工复核用于保证评分的公平性和解释性。建议至少由两名评分者独立评分。评分者不直接根据最终作品好坏打分，而是根据交互日志中的用户行为打分。人工复核重点判断机器标记是否准确、用户行为是否真的体现主动控制、prompt 是否只是形式上复杂、用户是否只是机械追问，以及用户是否真正评估 AI 输出。如果两名评分者分歧较大，可进行第三方裁定。这样的“自动标记 + 人类裁定”逻辑可借鉴 prompt 评价、论证挖掘、自动评分和助记媒介制卡方法中的“明确目标、单点提问、可检查反馈”思想([Hong et al., 2026](https://arxiv.org/abs/2603.10477); [Toulmin, 1958](https://archive.org/details/usesofargument0000toul); [Lippi & Torroni, 2016](https://doi.org/10.1145/2850417); [Li et al., 2025a](https://arxiv.org/abs/2506.16383); [Cheng et al., 2022](https://arxiv.org/abs/2203.12257); [Wikipedia contributors, 2026e](https://en.wikipedia.org/wiki/Argument_mining); [Wikipedia contributors, 2026f](https://en.wikipedia.org/wiki/Argument_map); [Thoughts Memo 汉化组, 2022a](https://l-m-sherlock.github.io/thoughts-memo/post/how-to-write-good-prompts/))。

### 四维评分标准

每个维度采用 0--3 分评分。目标设定得分（GSS）从没有明确目标到包含背景、限制条件、评价标准和使用场景。问题拆解得分（PDS）从没有拆解到主动建立任务结构，区分主问题、子问题、约束条件和优先顺序。结果评估得分（EVS）从直接接受 AI 输出到能比较、筛选、质疑 AI 输出并根据任务标准进行实质性调整。事实核查得分（VFS）从没有任何事实核查到能主动核查关键信息、识别潜在错误并要求证据或外部验证。

### 综合评分与用途

综合人类权重得分（HWS）由 GSS、PDS、EVS、VFS 四项构成，初步采用等权重综合。HWS 的作用不是衡量作品质量，而是衡量用户在人机协作过程中保留了多少主动控制。实验1不主要回答“AI 是否让人学会”，而是回答：**在人机协作过程中，用户是否仍然主导任务？** 它可以作为后续实验的基础变量，用于检验 HWS 是否预测任务质量、无 AI 复现能力、依赖校准和虚假掌握感。

# 第二层框架：四类量化指标

不同 AI 调用方式应对应不同指标。本文将人机协作效果量化为四个板块：

1. 任务完成型调用：量化任务质量、效率和认知成本；
2. 学习型调用：量化记忆、内化、迁移、元认知和长期行为改变；
3. 反馈型调用：量化反馈质量、确认偏误抵抗和认知带宽卸载；
4. 跨任务元能力：量化 prompt 能力、依赖校准、幻觉识别和无 AI 独立能力。

# 板块一：任务完成型调用的量化

任务完成型调用的目标是完成一个明确任务，因此首要指标是任务完成情况本身。

## 任务表现

可采用正确率、专家评分、答案完整度、逻辑一致性、事实准确性、论证质量、语言清晰度和错误数量等指标。

## 效率

可使用任务效率（TE）和节省时间（TS）等指标。任务效率指单位时间内获得的任务质量；节省时间指人类独立完成任务所需时间与人机协作完成任务所需时间之间的差值。

## 认知成本

从认知负荷和工作记忆视角看，AI 的价值不只是让任务更快完成，也包括是否把人的有限认知资源从低价值处理转移到高价值推理活动。可使用认知效率（CE）衡量，即在一定主观认知负荷下获得的任务质量。其中主观认知负荷可通过任务后评分或 NASA-TLX 类量表测量([Sweller, 1988](https://doi.org/10.1207/s15516709cog1202_4); [Baddeley, 1992](https://doi.org/10.1126/science.1736359); [Risko & Gilbert, 2016](https://doi.org/10.1016/j.tics.2016.07.002); [Wikipedia contributors, 2026g](https://en.wikipedia.org/wiki/Cognitive_load))。

## 补充指标：是否真正增强了人

任务完成型 AI 最容易出现“表现提高但能力未提高”。因此，需要额外测用户是否能解释最终答案、是否能识别 AI 错误、是否能在无 AI 条件下复现类似任务、是否能完成延迟测试和迁移测试，以及是否产生虚假掌握感。

## 实验2：写作类任务中的任务完成质量测量实验

### 实验目标

本实验用于测量任务完成型 AI 在写作类任务中的实际效果。这里不将“完成速度”作为核心指标，因为写作并不是单纯比拼速度的任务。尤其在表达类、创意类和观点论证类任务中，更重要的问题是：**如何评判一篇写作内容的质量？**

因此，实验2的核心不是比较谁写得更快，而是比较不同来源文本在内容质量、表达质量、逻辑质量、文风自然度和任务完成度上的差异。

### 实验基本分组

实验可以设置三类文本来源：人类独立写作组（Human Alone）、AI 独立生成组（AI Alone）和人机协作写作组（Human + AI）。三组文本统一匿名处理，评委不知道文本来源，以减少评分偏见。

### 写作任务类型

实验可以分为创意类/表达类写作和任务型写作。创意类写作没有绝对统一答案，适合使用人类评委评分，重点关注文本是否有吸引力、真实自然、个人表达和独特文风。任务型写作有更明确要求，适合使用“自动化检查 + 人工复核”的方式评分，重点关注文本是否完成指定要点、结构是否清楚、语言是否准确、逻辑是否可靠。

### 创意类写作的评分维度

对于创意类或表达类写作，可以引入 20--30 名大学生作为人类评委。评委阅读来自三组来源的匿名文本，并从整体质量评分（OQS）、人物塑造质量（CQS）、作者文风辨识度（SDS）、情感表达充分度（EES）、观点自洽性（ACS）、内容吸引力（CAS）、语言流畅度（LFS）和 AI 味儿浓度（AIS）等维度评分。

其中，“AI 味儿浓度（AIS）”可以作为一个独立维度。后续可以进一步收集典型 AI 生成文本，做模式识别和特征分析，总结 AI 味儿文本的共性。例如某些 AI 文本容易出现固定化表达、伪深刻句式、过度解释、过度总结或缺少真实经验细节。AI 写作和自动评分研究表明，AI文本可能在流畅性、结构性上有优势，但在人类评分、上下文敏感性、原创性和具体经验方面仍存在争议；近年媒体关于 AI 使表达趋同、大学 AI 作弊危机和 AI 生成内容“slop”的讨论，也支持把“AI 味儿”作为现实可感知但需要谨慎操作化的维度([Li et al., 2025b](https://arxiv.org/abs/2512.14561); [Mathew et al., 2026](https://arxiv.org/abs/2603.23714); [Gaggioli et al., 2025](https://arxiv.org/abs/2508.02442); [Przystalski et al., 2025](https://arxiv.org/abs/2507.00838); [Shaib et al., 2025](https://arxiv.org/abs/2509.19163); [The Verge, 2025](https://www.theverge.com/openai/686748/chatgpt-linguistic-impact-common-word-usage); [The Guardian, 2024a](https://www.theguardian.com/books/2024/nov/18/ai-poetry-rated-better-than-poems-written-by-humans-study-shows); [Vox, 2026](https://www.vox.com/culture/490627/ai-art-vs-human-art-camera-painting); [The New Yorker, 2025](https://www.newyorker.com/culture/infinite-scroll/ai-is-homogenizing-our-thoughts); [The Guardian, 2024b](https://www.theguardian.com/technology/2024/dec/15/i-received-a-first-but-it-felt-tainted-and-undeserved-inside-the-university-ai-cheating-crisis); [The Guardian, 2024c](https://www.theguardian.com/education/article/2024/jun/26/researchers-fool-university-markers-with-ai-generated-exam-papers); [The Guardian, 2025b](https://www.theguardian.com/technology/2025/dec/27/more-than-20-of-videos-shown-to-new-youtube-users-are-ai-slop-study-finds))。

### 任务型写作的评分维度

对于任务型写作，可以采用自动化机制先进行初步检查，再由人工复核。自动化检查主要关注要点覆盖率（KCR）、结构完整度（SCS）、语言准确度（LAC）、逻辑一致性（LCS）、事实准确度（FAC）、修辞恰当性（RAS）和任务完成度（TCS）。自动化评分不能直接作为最终结论，应由人工评分者复核，尤其是逻辑质量、修辞恰当性和任务完成度。

### 人类评委评分机制

为了减少单一评委的主观偏差，可以借鉴高考作文和雅思写作评分中的双评机制。每篇文本先由两名人类评委独立评分。若两名评委的总分差距在可接受范围内，则取平均分作为最终人工评分。若分差过大，则进入第三方复核或评审团综合裁定。自动作文评分资料也说明，高风险写作评价中双评和仲裁机制对于评分可靠性很重要([Wikipedia contributors, 2026h](https://en.wikipedia.org/wiki/Automated_essay_scoring); [Li et al., 2025b](https://arxiv.org/abs/2512.14561); [Mathew et al., 2026](https://arxiv.org/abs/2603.23714))。

### 时间指标与人类参与程度

本实验不把速度作为核心指标。完成时间（TT）、修改时间（RT）和修改轮数（RN）可以记录，但只作为辅助变量。在人机协作写作组中，还可以记录用户是否直接复制 AI 输出、是否对 AI 文本进行实质性修改、是否要求 AI 提供不同版本、是否指出 AI 文本的问题，以及是否加入个人经验、具体细节或独立判断。这一部分可以与实验1中的人类权重（HW）连接，用于判断人机协作写作的高质量结果到底来自 AI 替代，还是来自人类主导下的 AI 辅助。

### 实验2的核心比较与意义

本实验最终比较 Human + AI 是否比 Human Alone 写得更好，Human + AI 是否比 AI Alone 更好，以及 Human + AI 的优势来自哪里。实验2用于回答任务完成型 AI 中最基础的问题：**AI 是否真的提高了写作任务完成质量？** 它不会把“写得快”作为核心成功标准，而更关注文本质量、人机协作是否优于 AI 独立生成、人类在写作质量中是否仍有不可替代价值，以及 AI 生成文本是否在“AI 味儿”上呈现可识别模式。

# 板块二：学习型调用的量化

学习型调用的目标不是让 AI 替人完成任务，而是让 AI 帮助人理解、记忆、内化、复现和迁移。核心问题是：**AI 是否让人真正学会？**

## 记忆保持

AI 的解释可能带来短期流畅感，但流畅感不等于长期记忆。因此应区分即时测试和延迟测试。可以使用记忆衰减（RD）衡量即时测试成绩与延迟测试成绩之间的下降幅度，比如 2--7 天后的无 AI 独立测试。如果 AI 辅助组即时得分高，但延迟得分快速下降，说明 AI 可能主要带来熟悉感，而不是长期学习增益。

## 深层内化

深层内化指学生是否形成心理表征、图式和模式识别能力。可采用独立复现得分（IRS）、模式识别准确率（PRA）、图式构建得分（SCS）和解释清晰度（EC）。从晶体智力与流体智力的区分看，AI 可能较容易促进概念、事实、术语等晶体知识的获得，但是否促进抽象推理、模式识别和新问题解决等流体能力，需要通过迁移任务验证([Cattell, 1963](https://doi.org/10.1037/h0046743); [Johnson-Laird, 1983](https://archive.org/details/mentalmodelstowa0000john); [Karpicke & Blunt, 2011](https://doi.org/10.1126/science.1199327))。

## 迁移能力

迁移能力是区分表层学习和深层学习的关键，主要是指将当前学习内容运用到新情景的泛化迁移能力。可以区分近迁移得分（NTS）和远迁移得分（FTS）。同时，可以使用迁移比（TR）衡量迁移任务表现相对于后测表现的比例。如果后测得分较高，但迁移分数较低，则说明学生可能只是“过拟合”当前任务或 AI 给出的表达方式，而没有真正掌握底层结构。

## 长期行为模式改变

AI 可能改变学生的学习方式，例如从传统“预先学习”转向 AI 辅助的“按需学习”。这种变化既可能提高项目驱动学习效率，也可能带来知识碎片化和基础不牢的问题。可通过 4-8 周追踪观察 AI 使用日志、自主学习时间、输出频率、复盘频率、提问质量变化、错误修正率、无 AI 独立任务表现和是否更会拆解问题。认知卸载和Google效应研究提示，人们可能更倾向于记住“如何获得信息”，而不是信息本身，这正是需要长期追踪的原因([Risko & Gilbert, 2016](https://doi.org/10.1016/j.tics.2016.07.002); [Sparrow et al., 2011](https://doi.org/10.1126/science.1207745); [Wikipedia contributors, 2026i](https://en.wikipedia.org/wiki/Google_effect))。

## 元认知校准

元认知能力回答的是：学生是否知道自己懂不懂，是否能区分真实理解和 AI 带来的流畅感。可使用元认知校准误差（MCE）、过度自信指数（OCI）和虚假掌握指数（FMI）。如果 AI 使用后主观信心提高，但延迟测试、独立复现和迁移测试没有提高，则可能出现虚假掌握感。元认知研究支持将主观信心与实际表现之间的差距作为关键测量对象([Fleming & Lau, 2014](https://doi.org/10.3389/fnhum.2014.00443); [Winne & Hadwin, 2008](https://psycnet.apa.org/record/2008-03967-011); [Zimmerman, 2002](https://doi.org/10.1207/s15430421tip4102_2))。

## 实验3：学习型 AI 的记忆保持、深层内化与迁移测量实验

### 实验目标

本实验用于测量学习型 AI 是否真正促进学习，而不是只制造短期流畅感或主观理解感。学习型 AI 的核心问题不是“AI 有没有帮学生完成任务”，而是：**AI 是否让学生在无 AI 条件下仍然能够记住、复现、解释和迁移所学内容？** 因此，本实验重点测量记忆保持、深层内化、迁移能力和元认知校准。

### 实验材料：双主题设计

本实验建议采用“双主题材料”设计，分别覆盖一个偏文科/社会科学主题和一个偏科学/理工科主题。第一类材料可以选择人口学现象、社会学现象、教育公平问题、社会流动问题、老龄化问题、城乡差异问题等。这类主题通常没有唯一标准答案，更适合观察学生是否能够形成解释框架、进行案例分析、观点批判和跨情境迁移。第二类材料可以选择相对论、光的偏振、格林公式、统计推断、信号处理等。这类主题通常有更明确的知识结构和标准答案，更适合测量概念复现、公式理解、标准题变式和近迁移。

### 实验分组

实验可以设置四个学习条件：No-AI 自学组、Answer-AI 解释组、Socratic-AI 引导组和 Metacognitive-AI 元认知组。这四组用于比较不同 AI 学习模式的差异。重点不是比较“用不用 AI”，而是比较 AI 扮演不同教学角色时，对真实学习的影响是否不同。苏格拉底式AI学习和AI教育工具研究已经开始将LLM从答案机器改造成对话式导师，但其效果仍需要通过延迟测试和迁移测试验证([Zhang et al., 2024](https://arxiv.org/abs/2406.13919); [Ding et al., 2024](https://arxiv.org/abs/2407.17349); [Chang, 2023](https://arxiv.org/abs/2303.08769); [Jabbour et al., 2025](https://arxiv.org/abs/2502.00341); [Axios, 2025a](https://www.axios.com/2025/07/29/openai-chatgpt-study-mode); [WIRED, 2025](https://www.wired.com/story/chatgpt-study-mode); [Tom's Guide, 2025](https://www.tomsguide.com/ai/claudes-new-learning-modes-take-on-chatgpts-study-mode-heres-what-they-do); [TechRadar, 2025](https://www.techradar.com/pro/this-ai-tool-claims-to-boost-student-grades-by-15-using-a-2400-year-old-technique-but-i-am-not-convinced))。

### 实验流程

实验分为两个时间点。第一天包括前测、学习阶段、即时测试、主观信心与掌握感自评，以及可选神经数据记录。第二次测试建议在 2--7 天后进行，包括延迟记忆测试、独立复现任务、迁移测试和元认知再评估。

### 核心指标

记忆保持可以测量即时测试得分（ITS）、延迟测试得分（DTS）和记忆衰减（RD）。深层内化可以测量独立复现得分（IRS）、解释清晰度（EC）和图式构建得分（SCS）。迁移能力需要结合材料类型区分：科学/理工科主题更适合测近迁移、变式题表现（VTS）和错误诊断能力（EDS）；文科/社会科学主题更适合测远迁移、案例分析质量（CAS）、观点批判能力（ACA）和小组讨论表现（GDS）。可欲困难和检索练习研究说明，短期更轻松不等于长期保持，主动提取和延迟测试更能捕捉真实学习([Bjork, 1994](https://psycnet.apa.org/record/1994-97380-009); [III & Karpicke, 2006](https://doi.org/10.1111/j.1467-9280.2006.01693.x); [Karpicke & Blunt, 2011](https://doi.org/10.1126/science.1199327); [Wikipedia contributors, 2026j](https://en.wikipedia.org/wiki/Desirable_difficulty); [Wikipedia contributors, 2026k](https://en.wikipedia.org/wiki/ChatGPT_in_education))。

### 可选神经机制测量

如果项目条件允许，可以在实验3中加入神经数据记录，用于观察不同 AI 学习方式是否对应不同脑区活动模式。EEG 更适合观察学习过程中的时间动态，例如注意投入、认知负荷、反馈加工和错误监测；fMRI 更适合观察特定脑区和脑网络的参与，例如海马体、前额叶、工作记忆网络、注意网络等。MEG 可以作为进一步扩展。神经机制测量不应作为第一阶段实验的必要条件，而应作为增强模块。第一阶段仍应以行为表现、迁移测试和元认知校准作为核心结果。

### 学习过程数据与核心比较

除了测试结果，还应记录学习时间、AI 对话轮数、学生主动提问次数、学生是否要求 AI 出题、是否要求 AI 追问自己、是否主动暴露卡点、是否要求 AI 用不同方式解释、是否在学习中进行自我测试。这些过程数据可以与实验1中的人类权重（HW）连接，用于判断学习效果更好是因为 AI 更强，还是因为学生更主动地使用 AI。

本实验主要比较 Answer-AI 是否提高即时测试表现但不一定提高延迟保持和迁移，Socratic-AI 是否比 Answer-AI 更有利于深层内化和迁移，Metacognitive-AI 是否更有利于降低虚假掌握感，文科/社会科学主题和科学/理工科主题中 AI 辅助学习的效果是否不同，以及不同学习方式是否对应不同脑活动模式。这里的延迟测试和重复测量设计，也受到间隔重复、检索练习和学习过程追踪思想的启发；Thoughts Memo 关于间隔重复和制卡的文章提供了一个非正式但非常贴近学习实践的补充视角([III & Karpicke, 2006](https://doi.org/10.1111/j.1467-9280.2006.01693.x); [Karpicke & Blunt, 2011](https://doi.org/10.1126/science.1199327); [叶峻峣, 2022](https://l-m-sherlock.github.io/thoughts-memo/post/srs_algorithm_introduction/); [Thoughts Memo 汉化组, 2022a](https://l-m-sherlock.github.io/thoughts-memo/post/how-to-write-good-prompts/); [Wang et al., 2024a](https://arxiv.org/abs/2410.03017))。

# 板块三：反馈型调用的量化

反馈型 AI 不是替人完成任务，而是在用户已有初始产出或判断之后，提供反馈、批判、修正、疏导或决策辅助。核心问题是：**AI 是否提高了人的反思质量、错误识别能力、决策清晰度和偏误抵抗能力？**

## 反馈质量

可比较 AI 反馈前后的产出质量变化，包括修改前后专家评分变化、逻辑漏洞减少、论证结构改善、反方观点覆盖度、事实错误减少、风险识别数量增加和最终方案完整度提升。

## 谄媚识别与确认偏误抵抗

反馈型 AI 的重要风险是 sycophancy，即 AI 过度迎合用户，强化用户原有观点。尤其在情绪困扰、生活难题和价值判断中，AI 可能让用户感觉被理解，却同时强化确认偏误。可设计任务：让 AI 同时提供迎合型反馈和批判型反馈，观察用户能否识别迎合倾向，并是否愿意接受批判性反馈。指标包括谄媚识别准确率（SDA）、批判性反馈接受率（CFAR）、反方观点寻求频率（CSF）和确认偏误敏感度（CBS）。已有研究表明，LLM 在自由文本和主观观点任务中会出现系统性迎合用户观点的倾向，而用户意见陈述本身就可能诱发模型谄媚([Sharma et al., 2023](https://arxiv.org/abs/2310.13548); [Li et al., 2025c](https://arxiv.org/abs/2508.02087); [Denison et al., 2024](https://arxiv.org/abs/2406.10162); [Zhao et al., 2024a](https://arxiv.org/abs/2408.11261); [Noshin & Sultana, 2026](https://arxiv.org/abs/2603.21409); [Wikipedia contributors, 2026l](https://en.wikipedia.org/wiki/AI_sycophancy); [The Guardian, 2025c](https://www.theguardian.com/technology/2025/oct/24/sycophantic-ai-chatbots-tell-users-what-they-want-to-hear-study-shows); [Axios, 2025b](https://www.axios.com/2025/07/07/ai-sycophancy-chatbots-mental-health))。

## 认知带宽卸载

AI 可以节省人的认知资源，但必须区分有益认知卸载和有害认知外包。有益认知卸载是卸载排版、摘要、语言润色、信息整理等低价值负担；有害认知外包是替代核心推理、价值判断、事实核查、最终决策和责任承担。因此，关键不是 AI 是否让人省力，而是：**AI 卸载的是低价值机械负担，还是核心认知劳动？** 可测指标包括主观认知负荷、心理努力、决策时间、情绪压力/任务可控感、人类修改深度、是否能解释最终决定、是否能指出 AI 建议局限和是否保留最终判断权([Risko & Gilbert, 2016](https://doi.org/10.1016/j.tics.2016.07.002); [Parasuraman & Manzey, 2010](https://doi.org/10.1177/0018720810376055); [Bainbridge, 1983](https://doi.org/10.1016/0005-1098(83)90046-8))。

## 实验4：AI 谄媚/批判反馈对观点更新与决策判断的影响实验

### 实验目标

本实验用于测量反馈型 AI 在开放性社会议题讨论中，对大学生观点更新、判断质量和确认偏误的影响。反馈型 AI 的关键风险不只是“回答是否准确”，而是它可能通过迎合用户、强化用户已有观点，使用户误以为自己的立场得到了理性支持。尤其在社会热议话题中，问题往往没有唯一标准答案，被试更容易受到 AI 语气、立场一致性和反馈方式的影响。

因此，本实验的核心问题是：**当 AI 以谄媚型或批判型方式与用户对话时，会如何影响用户的观点变化、信心变化、批判性反思和对 AI 建议的采纳意愿？**

### 实验材料与AI反馈类型

实验话题应选择具有讨论空间、没有唯一标准答案、但又不至于引发过高伦理风险的社会议题，如是否相信中医、如何看待教育平权、如何看待贫富差距与社会阶层流动、如何看待大学生就业压力与社会结构，或AI是否会加剧教育不平等。具体实验中不需要使用太多话题，可以先选择 1--2 个主题作为 pilot，避免任务过散。

实验需要提前构造两类 AI 对话系统。谄媚型 AI 的目标是尽量顺着用户原有观点展开，强化用户已有立场，并用看似合理的理由支持用户。批判型 AI 的目标不是否定用户，而是系统检验用户观点中的漏洞、证据不足、反方可能性和隐含假设。构造方式上，可以通过固定系统提示词、固定对话目标、固定对话轮数、固定反馈风格，并对生成内容进行人工检查，确保两类 AI 风格稳定区分。

### 实验分组与流程

实验可以设置谄媚型 AI 组、批判型 AI 组和中性对照组。如果实验规模较小，可以先只比较谄媚型 AI 与批判型 AI 两组。实验流程包括话题引入与简短自由讨论、初始观点记录、AI 对话阶段、最终观点记录和对话体验自评量表。AI 对话阶段需要统一控制初始 prompt、对话目标、对话轮数、每轮对话的大致任务和最终输出要求，例如统一设置为 10 轮对话。

### 核心指标

核心指标包括观点变化得分（OCS）、立场确信度变化（CSC）、论证质量变化（AQC）、反方观点纳入度（OPI）、谄媚感知评分（SPS）、AI 采纳意愿（AAI）和批判性反思得分（CRS）。这些指标共同回答一个问题：AI 是让用户更清醒地思考，还是让用户更相信自己本来就想相信的东西？实验设计受到 LLM sycophancy 研究中“主观观点任务更容易诱发迎合”的发现启发，同时参考了多轮对话、用户反驳和社会性谄媚的近期讨论；社交媒体和新闻资料也显示，AI迎合式反馈已经成为真实用户体验中的重要争议点([Sharma et al., 2023](https://arxiv.org/abs/2310.13548); [Li et al., 2025c](https://arxiv.org/abs/2508.02087); [Ranaldi & Pucci, 2023](https://arxiv.org/abs/2311.09410); [Kim & Khashabi, 2025](https://arxiv.org/abs/2509.16533); [The Guardian, 2025c](https://www.theguardian.com/technology/2025/oct/24/sycophantic-ai-chatbots-tell-users-what-they-want-to-hear-study-shows); [Time, 2026](https://time.com/7346052/problem-ai-flattering-us/); [Axios, 2025b](https://www.axios.com/2025/07/07/ai-sycophancy-chatbots-mental-health); [Economic Times, 2025](https://economictimes.indiatimes.com/magazines/panache/chatgpt-caught-lying-by-reddit-user-when-asked-why-ai-replies-to-keep-you-happy/articleshow/123143078.cms); [TechRadar, 2026a](https://www.techradar.com/ai-platforms-assistants/chatgpt/i-made-an-ai-clone-of-myself-based-on-my-google-and-reddit-history-and-it-understood-me-better-than-i-expected); [Wikipedia contributors, 2026l](https://en.wikipedia.org/wiki/AI_sycophancy))。

### 交互日志分析与意义

除了 before-after 文本和自评量表，还应分析 AI 对话日志。可以观察被试是否主动要求 AI 提供反方观点、是否质疑 AI、是否接受 AI 的框架、是否要求 AI 举证、AI 是否持续顺着被试观点、AI 是否主动提出反例和限制，以及被试是否在对话中逐渐收窄或扩大观点。这一部分可以与实验1的人类权重（HW）连接，判断高 HW 用户是否更不容易被谄媚型 AI 带偏。实验4用于回答反馈型 AI 中最核心的问题：**AI 是在帮助人反思，还是在迎合人？**

# 板块四：跨任务通用元能力

无论是任务完成、学习还是反馈型调用，都需要一组跨任务的 AI 使用元能力。这些能力决定用户能否把 AI 作为增强工具，而不是被 AI 牵引或替代。

## Prompt 输入能力

Prompt 能力不是“提示词技巧”，而是问题表达、任务建模、逻辑结构化和上下文压缩能力。可以将提示质量（PQS）拆为背景完整度（CC）、目标明确度（GS）、约束清晰度（CEX）和评价标准明确度（ECS）。进一步可以使用提示效率（PE）衡量单位长度 prompt 带来的输出质量提升。这个指标可以衡量单位长度 prompt 传达的有效任务信息价值([Hong et al., 2026](https://arxiv.org/abs/2603.10477); [Chang, 2023](https://arxiv.org/abs/2303.08769))。

## AI 依赖程度

AI 依赖不能只看使用频率。更重要的是看用户是否能在无 AI 条件下完成任务，以及长期使用 AI 后无 AI 表现是否提高。可以使用 AI 依赖差距（AIDG）衡量有 AI 条件下表现与无 AI 条件下表现之间的差距。需要区分脚手架型依赖和替代型依赖：前者是短期 with-AI 表现较高，但长期 without-AI 表现也提高；后者是长期 with-AI 表现较高，但 without-AI 表现没有提高甚至下降([Schemmer et al., 2023a](https://arxiv.org/abs/2310.02108); [Schemmer et al., 2023b](https://arxiv.org/abs/2302.02187); [Bansal et al., 2020](https://arxiv.org/abs/2006.14779))。

## 依赖校准：四宫格模型

AI 使用的关键不是信任或不信任，而是校准。从贝叶斯推断视角看，AI 建议可以被视为外部证据。合理的人机协作不是无条件接受或拒绝 AI，而是在已有信念基础上，根据 AI 信息质量进行适度更新。四种情况包括：AI 正确且人采纳为适当依赖，AI 正确但人拒绝为低度依赖，AI 错误但人采纳为过度依赖，AI 错误且人拒绝为适当拒绝。对应指标为适当依赖率（ARR）、过度依赖率（ORR）和低度依赖率（URR）。

## AI 幻觉与虚假信息识别

生成式 AI 可能产生事实错误、虚假引用、错误推理和过度自信表达。因此，用户是否具备 AI 幻觉识别能力，是所有 AI 使用场景中的关键元能力。可测指标包括幻觉识别准确率（HDA）、错误引用识别率（FSDR）、错误定位分数（ELS）、查证策略质量（VSQ）和来源核查频率（SCF）。事实性和幻觉研究表明，LLM生成的错误可能以流畅且自信的形式出现，因此用户不仅要能发现错误，还要知道如何验证错误([Wang et al., 2024b](https://arxiv.org/abs/2402.02420); [Zhao et al., 2024b](https://arxiv.org/abs/2407.17468); [Rahman et al., 2025](https://arxiv.org/abs/2508.03860); [Wikipedia contributors, 2026m](https://en.wikipedia.org/wiki/Hallucination_(artificial_intelligence)); [Wikipedia contributors, 2026n](https://en.wikipedia.org/wiki/AI-generated_content_on_Wikipedia); [WIRED, 2026](https://www.wired.com/story/future-of-truth-ai-interview))。

## 实验5：跨任务 AI 使用元能力测量实验

### 实验目标

本实验用于测量大学生在不同任务中使用 AI 的通用元能力。前面几个实验分别关注人类权重、写作质量、学习效果和反馈偏误。但在真实学习和工作场景中，一个人能否高质量使用 AI，还取决于一组跨任务能力：能否提出高质量 prompt，能否判断什么时候应该相信 AI，能否识别 AI 幻觉、虚假引用和错误推理，能否在有 AI 和无 AI 条件下保持合理表现，以及能否把 AI 当作增强工具，而不是替代自己的判断。因此，实验5的核心问题是：**用户是否具备跨任务稳定的 AI 使用元能力？**

### 实验任务设计

实验5不应只使用单一任务，而应采用多任务测量。建议设置四类小任务：Prompt 任务、依赖校准任务、幻觉识别任务和有无 AI 对比任务。Prompt 任务要求被试为复杂任务写出初始 prompt，用于测量提示质量。依赖校准任务给被试若干正确和错误 AI 建议，观察被试是否能正确采纳或拒绝。幻觉识别任务给被试一段混入事实错误、虚假引用或逻辑漏洞的 AI 生成文本，观察其能否识别。有无 AI 对比任务让被试分别在有 AI 和无 AI 条件下完成相似任务，观察其是否存在明显 AI 依赖差距。

### Prompt 输入能力测量

给被试一个相对复杂但可控的任务，例如让 AI 帮助理解一段材料、规划一份短报告、检查一个观点或设计一个小实验。要求被试写出他们会发送给 AI 的第一个 prompt。核心指标是提示质量（PQS），包括背景完整度（CC）、目标明确度（GS）、约束清晰度（CEX）、评价标准明确度（ECS）、角色设定合理度（RRS）和问题拆解程度（PDS）。Prompt 评分可以采用“机器初评 + 人工复核”。

### 依赖校准任务

给被试若干 AI 建议，每条建议都对应一个具体任务或判断。建议可以分为正确建议和错误建议。错误建议不应设计得太明显，而应模拟真实 AI 使用中常见的错误，例如看似合理但证据不足、概念偷换、逻辑跳步、引用错误、过度概括或忽略关键限制条件。被试需要判断是否采纳每条 AI 建议，并说明理由。核心指标为适当依赖率（ARR）、过度依赖率（ORR）、低度依赖率（URR）和采纳理由质量（ARQ）。

### AI 幻觉与虚假信息识别任务

给被试一段 AI 生成文本，其中混入虚假引用、错误事实、概念误用、逻辑矛盾、过度推断或模糊但自信的表述。被试需要标记可疑之处，并说明为什么可疑，以及应该如何查证。核心指标为幻觉识别准确率（HDA）、错误引用识别率（FSDR）、错误定位分数（ELS）、查证策略质量（VSQ）和来源核查频率（SCF）。AI检测和幻觉研究均表明，自动检测工具存在可靠性限制，因而本实验更关注人的查证策略和解释质量，而不是把 AI 检测器的分数当成最终裁判。这个设计也回应了近期大学 AI 检测争议和误伤真实学生的现实案例([Weber-Wulff et al., 2023](https://doi.org/10.1007/s40979-023-00146-z); [Sadasivan et al., 2023](https://arxiv.org/abs/2303.11156); [Wang et al., 2024b](https://arxiv.org/abs/2402.02420); [Zhao et al., 2024b](https://arxiv.org/abs/2407.17468); [Wikipedia contributors, 2026o](https://en.wikipedia.org/wiki/Artificial_intelligence_content_detection); [Wikipedia contributors, 2026p](https://en.wikipedia.org/wiki/GPTZero); [Axios, 2024](https://www.axios.com/2024/10/07/ai-detection-tools-reliability-labeling); [The Washington Post, 2026](https://www.washingtonpost.com/opinions/2026/04/13/ai-detectors-students/); [The Guardian, 2024b](https://www.theguardian.com/technology/2024/dec/15/i-received-a-first-but-it-felt-tainted-and-undeserved-inside-the-university-ai-cheating-crisis); [Tom's Guide, 2026](https://www.tomsguide.com/ai/a-major-university-just-banned-ai-detectors-heres-why))。

### 有无 AI 对比任务

让被试完成两组难度相近的任务：一组允许使用 AI，一组不允许使用 AI。任务可以是短文理解、观点分析、概念解释或问题解决。核心指标包括 AI 依赖差距（AIDG）、无 AI 独立表现（NAIP）、AI 辅助表现（AIP）和解释保留度（ER）。这里需要区分脚手架型依赖和替代型依赖。实验5可以先测即时 AIDG，长期变化可作为后续追踪研究。

### AI 文本特征识别任务

除了识别事实错误，还可以测被试是否能识别 AI 文本的常见风格特征。给被试若干段文本，其中包含人类文本、AI 生成文本和人机协作文本。被试需要判断哪些文本更像 AI 生成，哪些地方体现出 AI 味儿，文本是否存在模板化、空泛化或伪深刻表达，以及文本是否缺乏真实细节和个人经验。核心指标包括 AI 文本识别准确率（ATDA）、AI 味儿特征识别分数（AIFS）、文本具体性判断（TSJ）和证据敏感度（ES）。这一任务可以与实验2中的“AI 味儿浓度（AIS）”连接，但实验2是评文本质量，实验5是评用户是否能识别 AI 文本特征([Przystalski et al., 2025](https://arxiv.org/abs/2507.00838); [Shaib et al., 2025](https://arxiv.org/abs/2509.19163); [Sadasivan et al., 2023](https://arxiv.org/abs/2303.11156); [Wikipedia contributors, 2026q](https://en.wikipedia.org/wiki/AI_slop); [TechRadar, 2026b](https://www.techradar.com/ai-platforms-assistants/chatgpt-keeps-getting-flagged-over-and-over-again-gemini-is-the-best-ai-at-mimicking-human-writing-and-evading-detection); [The Verge, 2025](https://www.theverge.com/openai/686748/chatgpt-linguistic-impact-common-word-usage); [The Guardian, 2025b](https://www.theguardian.com/technology/2025/dec/27/more-than-20-of-videos-shown-to-new-youtube-users-are-ai-slop-study-finds); [Business Insider, 2025](https://www.businessinsider.com/ai-slop-cultural-renaissance-substack-ceo-chris-best-2025-9); [Windows Central, 2026](https://www.windowscentral.com/software-apps/merriam-webster-names-slop-as-word-of-the-year-officially-recognizing-ai-generated-low-quality-content-as-a-cultural-phenomenon))。

### 综合元能力评分与意义

实验5可以最终形成一个综合 AI 使用元能力评分，暂称为 AI 使用元能力得分（AIMS）。AIMS 可以由提示质量（PQS）、适当依赖率（ARR）、幻觉识别准确率（HDA）、错误引用识别率（FSDR）、AI 依赖差距（AIDG）、AI 文本识别准确率（ATDA）和采纳理由质量（ARQ）组成。AIMS 不应简单理解为“会不会用 AI”，而是衡量用户是否能在不同任务中稳定、审慎、有效地使用 AI。

实验5用于回答跨任务层面的核心问题：**一个人是否具备高质量使用 AI 的通用能力？** 如果 AIMS 能够预测 HW、真实学习效果、依赖校准和幻觉识别表现，那么它可以成为后续研究中非常重要的个体差异变量。

# 文献支持与后续补充方向

以上实验框架目前是一个初步设计，其理论支撑主要来自八类研究：人机互补与混合智能、适当依赖与自动化偏误、提示词质量评价、自我调节学习与过程数据、认知负荷与可欲困难、苏格拉底式教学与脚手架、自动作文评分与写作评价、LLM 谄媚与幻觉风险。后续正式实验前，需要进一步补充每一类文献中的经典研究、成熟量表和可复用任务范式。

除正式文献外，本报告也参考了部分非学术资料，包括 Wikipedia 词条、科技媒体报道、教育工具报道、AI 检测争议报道、Reddit 相关报道和 AI slop / AI 味儿讨论。这些资料不作为核心证据，而用于补充现实背景、用户体验和问题意识。近十年内《纽约客》、The Economist、Bloomberg/Bloomberg 记者相关著作、BBC/BBC Bitesize 相关报道、《卫报》《华盛顿邮报》等资料共同说明：AI 正在同时改变教育评价、写作质量判断、认知负荷分配、学习平台设计和公共讨论生态。Thoughts Memo 汉化组的小站则提供了间隔重复、助记媒介、制卡方法和中国教育反思等更贴近学习者实践的补充材料([The New Yorker, 2023a](https://www.newyorker.com/culture/2023-in-review/the-year-ai-ate-the-internet); [The New Yorker, 2025](https://www.newyorker.com/culture/infinite-scroll/ai-is-homogenizing-our-thoughts); [The Economist, 2023](https://www.economist.com/leaders/2023/04/20/generative-ai-is-a-marvel-is-it-also-built-on-theft); [Olson, 2024](https://en.wikipedia.org/wiki/Supremacy_(book)); [Wikipedia contributors, 2026r](https://en.wikipedia.org/wiki/BBC_Bitesize); [The Guardian, 2024d](https://www.theguardian.com/media/2024/apr/21/bbc-to-invest-6m-in-ai-education-services-bitesize); [The Guardian, 2023](https://www.theguardian.com/commentisfree/2023/jul/14/ai-artificial-intelligence-disrupt-education-creativity-critical-thinking); [The Washington Post, 2025a](https://www.washingtonpost.com/health/2025/06/29/chatgpt-ai-brain-impact/); [The Washington Post, 2025b](https://www.washingtonpost.com/education/2025/12/12/ai-artificial-intelligence-college-oral-exam/); [Thoughts Memo 汉化组, 2022b](https://l-m-sherlock.github.io/thoughts-memo/); [叶峻峣, 2022](https://l-m-sherlock.github.io/thoughts-memo/post/srs_algorithm_introduction/); [Thoughts Memo 汉化组, 2022a](https://l-m-sherlock.github.io/thoughts-memo/post/how-to-write-good-prompts/); [Thoughts Memo 汉化组, 2022c](https://l-m-sherlock.github.io/thoughts-memo/post/%E4%B8%AD%E5%9B%BD%E6%95%99%E8%82%B2%E6%B2%A1%E6%9C%89%E9%80%BB%E8%BE%91%E5%90%97/))。

# 结论

学习情境下的人机协作效果不应被简化为“AI 是否提高了当前任务表现”。更合理的定义应当同时考虑 AI 在任务中的角色、人的认知参与程度、学习是否真实发生、用户是否能校准对 AI 的信任，以及人的主体性和责任担当是否得到保留。

本报告提出一个精简量化框架：

1. 先区分 AI 角色：答案输出型、反馈批判型、教学脚手架型；
2. 再通过 Human Weight 和主体性指数（ASI）衡量人在协作中的主体性；
3. 对任务完成型调用，重点量化任务质量、效率和认知成本；
4. 对学习型调用，重点量化记忆保持、深层内化、迁移能力和元认知校准；
5. 对反馈型调用，重点量化反馈质量、确认偏误抵抗和认知带宽卸载；
6. 对所有任务，均应量化 prompt 能力、依赖校准、AI 幻觉识别和无 AI 独立表现。

该框架最核心的理论命题是：**短期表现增益不等于真实学习增益。** 在学习情境中，人机协作的最终目标不是让 AI 替人完成更多任务，而是让人在 AI 辅助下形成更强的理解能力、判断能力、迁移能力和自我调节能力。真正值得研究和追求的人机互补，是一种保留人类主体性的能力增强，而不是一种表面高效的认知替代。

## 参考文献

1. **Bansal et al., 2020.** [Does the Whole Exceed its Parts? The Effect of AI Explanations on Complementary Team Performance](https://arxiv.org/abs/2006.14779). Gagan Bansal and Tongshuang Wu and Joyce Zhou and Raymond Fok and Besmira Nushi and Ece Kamar and Marco Tulio Ribeiro and Daniel S. Weld | 2020 | arXiv.
2. **Schemmer et al., 2023a.** [Towards Effective Human-AI Decision-Making: The Role of Human Learning in Appropriate Reliance on AI Advice](https://arxiv.org/abs/2310.02108). Max Schemmer and Andrea Bartos and Philipp Spitzer and Patrick Hemmer and Niklas Kuehl and Jonas Liebschner and Gerhard Satzger | 2023 | arXiv.
3. **Schemmer et al., 2023b.** [Appropriate Reliance on AI Advice: Conceptualization and the Effect of Explanations](https://arxiv.org/abs/2302.02187). Max Schemmer and Niklas Kuehl and Carina Benz and Andrea Bartos and Gerhard Satzger | 2023 | arXiv.
4. **Cao et al., 2024.** [Designing for Appropriate Reliance: The Roles of AI Uncertainty Presentation, Initial User Decision, and User Demographics in AI-Assisted Decision-Making](https://arxiv.org/abs/2401.05612). Cao, Shiye and Liu, Anqi and Huang, Chien-Ming | 2024.
5. **Gao et al., 2023.** [Learning Complementary Policies for Human-AI Teams](https://arxiv.org/abs/2302.02944). Ruijiang Gao and Maytal Saar-Tsechansky and Maria De-Arteaga and Ligong Han and Wei Sun and Min Kyung Lee and Matthew Lease | 2023 | arXiv.
6. **Xu & Dainoff, 2021.** [Enabling Human-Centered AI: A New Junction and Shared Journey Between AI and HCI Communities](https://arxiv.org/abs/2111.08460). Wei Xu and Marvin Dainoff | 2021 | arXiv.
7. **Chen et al., 2023.** [Next Steps for Human-Centered Generative AI: A Technical Perspective](https://arxiv.org/abs/2306.15774). Xiang Chen and Jeff Burke and Ruofei Du and Matthew Hong and Jennifer Jacobs and Philippe Laban and Dingzeyu Li and Nanyun Peng and Karl Willis and Chien-Sheng Wu and Bolei Zhou | 2023 | arXiv.
8. **Wikipedia contributors, 2026a.** [Human-centered AI](https://en.wikipedia.org/wiki/Human-centered_AI). Wikipedia contributors | 2026 | Wikipedia.
9. **Dhar, 2023.** [The Paradigm Shifts in Artificial Intelligence](https://arxiv.org/abs/2308.02558). Dhar, Vasant | 2023.
10. **The New Yorker, 2023a.** [The Year A.I. Ate the Internet](https://www.newyorker.com/culture/2023-in-review/the-year-ai-ate-the-internet). The New Yorker | 2023.
11. **The Guardian, 2023.** [Yes, AI could profoundly disrupt education. But maybe that’s not a bad thing](https://www.theguardian.com/commentisfree/2023/jul/14/ai-artificial-intelligence-disrupt-education-creativity-critical-thinking). The Guardian | 2023.
12. **The Economist, 2023.** [Generative AI is a marvel. Is it also built on theft?](https://www.economist.com/leaders/2023/04/20/generative-ai-is-a-marvel-is-it-also-built-on-theft). The Economist | 2023.
13. **Olson, 2024.** [Supremacy: AI, ChatGPT and the Race That Will Change the World](https://en.wikipedia.org/wiki/Supremacy_(book)). Olson, Parmy | 2024.
14. **Baddeley, 1992.** [Working Memory](https://doi.org/10.1126/science.1736359). Alan Baddeley | 1992 | Science.
15. **Cohen et al., 1997.** [Temporal Dynamics of Brain Activation During a Working Memory Task](https://doi.org/10.1038/386604a0). Jonathan D. Cohen and William M. Perlstein and Todd S. Braver and Leigh E. Nystrom and Douglas C. Noll and John Jonides and Edward E. Smith | 1997 | Nature.
16. **Maguire et al., 2000.** [Navigation-Related Structural Change in the Hippocampi of Taxi Drivers](https://doi.org/10.1073/pnas.070039597). Eleanor A. Maguire and David G. Gadian and Ingrid S. Johnsrude and Catriona D. Good and John Ashburner and et al. | 2000 | PNAS.
17. **Sweller, 1988.** [Cognitive Load During Problem Solving: Effects on Learning](https://doi.org/10.1207/s15516709cog1202_4). John Sweller | 1988 | Cognitive Science.
18. **Tech & Learning, 2025.** [Your Brain On ChatGPT: Everything Educators Need To Know About MIT's AI Study](https://www.techlearning.com/news/your-brain-on-chatgpt-everything-educators-need-to-know-about-mits-ai-study). Tech & Learning | 2025 | Tech & Learning.
19. **TIME, 2025.** [ChatGPT May Be Eroding Critical Thinking Skills, According to a New MIT Study](https://time.com/7295195/ai-chatgpt-google-learning-school/). TIME | 2025 | TIME.
20. **The Washington Post, 2025a.** [Is AI rewiring our minds? Scientists probe cognitive cost of chatbots](https://www.washingtonpost.com/health/2025/06/29/chatgpt-ai-brain-impact/). The Washington Post | 2025.
21. **The New Yorker, 2025.** [A.I. Is Homogenizing Our Thoughts](https://www.newyorker.com/culture/infinite-scroll/ai-is-homogenizing-our-thoughts). The New Yorker | 2025.
22. **Parasuraman & Manzey, 2010.** [Complacency and Bias in Human Use of Automation: An Attentional Integration](https://doi.org/10.1177/0018720810376055). Raja Parasuraman and Dietrich Manzey | 2010 | Human Factors.
23. **Parasuraman & Riley, 1997.** [Humans and Automation: Use, Misuse, Disuse, Abuse](https://doi.org/10.1518/001872097778543886). Raja Parasuraman and Victor Riley | 1997 | Human Factors.
24. **Bainbridge, 1983.** [Ironies of Automation](https://doi.org/10.1016/0005-1098(83)90046-8). Lisanne Bainbridge | 1983 | Automatica.
25. **Wikipedia contributors, 2026b.** [Automation bias](https://en.wikipedia.org/wiki/Automation_bias). Wikipedia contributors | 2026 | Wikipedia.
26. **Wikipedia contributors, 2026c.** [Human-AI interaction](https://en.wikipedia.org/wiki/Human%E2%80%93AI_interaction). Wikipedia contributors | 2026 | Wikipedia.
27. **Hoque et al., 2024.** [Visualization for Human-Centered AI Tools](https://arxiv.org/abs/2404.02147). Md Naimul Hoque and Sungbok Shin and Niklas Elmqvist | 2024 | arXiv.
28. **Risko & Gilbert, 2016.** [Cognitive Offloading](https://doi.org/10.1016/j.tics.2016.07.002). Evan F. Risko and Sam J. Gilbert | 2016 | Trends in Cognitive Sciences.
29. **Sparrow et al., 2011.** [Google Effects on Memory: Cognitive Consequences of Having Information at Our Fingertips](https://doi.org/10.1126/science.1207745). Betsy Sparrow and Jenny Liu and Daniel M. Wegner | 2011 | Science.
30. **The New Yorker, 2023b.** [The Inside Story of Microsoft’s Partnership with OpenAI](https://www.newyorker.com/magazine/2023/12/11/the-inside-story-of-microsofts-partnership-with-openai). The New Yorker | 2023.
31. **Zhang et al., 2024.** [SPL: A Socratic Playground for Learning Powered by Large Language Model](https://arxiv.org/abs/2406.13919). Liang Zhang and Jionghao Lin and Ziyi Kuang and Sheng Xu and Xiangen Hu | 2024 | arXiv.
32. **Ding et al., 2024.** [Boosting Large Language Models with Socratic Method for Conversational Mathematics Teaching](https://arxiv.org/abs/2407.17349). Yuyang Ding and Hanglei Hu and Jie Zhou and Qin Chen and Bo Jiang and Liang He | 2024 | arXiv.
33. **Chang, 2023.** [Prompting Large Language Models With the Socratic Method](https://arxiv.org/abs/2303.08769). Edward Y. Chang | 2023 | arXiv.
34. **Jabbour et al., 2025.** [SocratiQ: A Generative AI-Powered Learning Companion for Personalized Education and Broader Accessibility](https://arxiv.org/abs/2502.00341). Jason Jabbour and Kai Kleinbard and Olivia Miller and Robert Haussman and Vijay Janapa Reddi | 2025 | arXiv.
35. **OpenAI, 2025.** [ChatGPT Study Mode](https://openai.com/index/chatgpt-study-mode/). OpenAI | 2025.
36. **The Guardian, 2025a.** [ChatGPT launches study mode to encourage responsible academic use](https://www.theguardian.com/technology/2025/jul/29/chatgpt-openai-chatbot-study-mode-universities-students-education). The Guardian | 2025.
37. **Winne & Hadwin, 2008.** [The Weave of Motivation and Self-Regulated Learning](https://psycnet.apa.org/record/2008-03967-011). Philip H. Winne and Allyson F. Hadwin | 2008 | Motivation and Self-Regulated Learning.
38. **Zimmerman, 2002.** [Becoming a Self-Regulated Learner: An Overview](https://doi.org/10.1207/s15430421tip4102_2). Barry J. Zimmerman | 2002 | Theory Into Practice.
39. **Wikipedia contributors, 2026d.** [Self-regulated learning](https://en.wikipedia.org/wiki/Self-regulated_learning). Wikipedia contributors | 2026 | Wikipedia.
40. **Hong et al., 2026.** [PEEM: Prompt Engineering Evaluation Metrics for Interpretable Joint Evaluation of Prompts and Responses](https://arxiv.org/abs/2603.10477). Minki Hong and Eunsoo Lee and Sohyun Park and Jihie Kim | 2026 | arXiv.
41. **Toulmin, 1958.** [The Uses of Argument](https://archive.org/details/usesofargument0000toul). Stephen Toulmin | 1958 | Cambridge University Press.
42. **Lippi & Torroni, 2016.** [Argumentation Mining: State of the Art and Emerging Trends](https://doi.org/10.1145/2850417). Marco Lippi and Paolo Torroni | 2016 | ACM Transactions on Internet Technology.
43. **Li et al., 2025a.** [Large Language Models in Argument Mining: A Survey](https://arxiv.org/abs/2506.16383). Hao Li and Viktor Schlegel and Yizheng Sun and Riza Batista-Navarro and Goran Nenadic | 2025 | arXiv.
44. **Thoughts Memo 汉化组, 2022a.** [如何写出好卡片](https://l-m-sherlock.github.io/thoughts-memo/post/how-to-write-good-prompts/). Thoughts Memo 汉化组 | 2022.
45. **Cheng et al., 2022.** [IAM: A Comprehensive and Large-Scale Dataset for Integrated Argument Mining Tasks](https://arxiv.org/abs/2203.12257). Liying Cheng and Lidong Bing and Ruidan He and Qian Yu and Yan Zhang and Luo Si | 2022 | arXiv.
46. **Wikipedia contributors, 2026e.** [Argument mining](https://en.wikipedia.org/wiki/Argument_mining). Wikipedia contributors | 2026 | Wikipedia.
47. **Wikipedia contributors, 2026f.** [Argument map](https://en.wikipedia.org/wiki/Argument_map). Wikipedia contributors | 2026 | Wikipedia.
48. **Wikipedia contributors, 2026g.** [Cognitive load](https://en.wikipedia.org/wiki/Cognitive_load). Wikipedia contributors | 2026 | Wikipedia.
49. **Li et al., 2025b.** [Agreement Between Large Language Models and Human Raters in Essay Scoring: A Research Synthesis](https://arxiv.org/abs/2512.14561). Hongli Li and Che Han Chen and Kevin Fan and Chiho Young-Johnson and Soyoung Lim and Yali Feng | 2025 | arXiv.
50. **Mathew et al., 2026.** [LLMs Do Not Grade Essays Like Humans](https://arxiv.org/abs/2603.23714). Jerin George Mathew and Sumayya Taher and Anindita Kundu and Denilson Barbosa | 2026 | arXiv.
51. **Gaggioli et al., 2025.** [Assessing the Reliability and Validity of Large Language Models for Automated Assessment of Student Essays in Higher Education](https://arxiv.org/abs/2508.02442). Andrea Gaggioli and Giuseppe Casaburi and Leonardo Ercolani and Francesco Collova and Pietro Torre and Fabrizio Davide | 2025 | arXiv.
52. **Przystalski et al., 2025.** [Stylometry Recognizes Human and LLM-Generated Texts in Short Samples](https://arxiv.org/abs/2507.00838). Karol Przystalski and Jan K. Argasinski and Iwona Grabska-Gradzinska and Jeremi K. Ochab | 2025 | arXiv.
53. **Shaib et al., 2025.** [Measuring AI Slop in Text](https://arxiv.org/abs/2509.19163). Chantal Shaib and Tuhin Chakrabarty and Diego Garcia-Olano and Byron C. Wallace | 2025 | arXiv.
54. **The Verge, 2025.** [You sound like ChatGPT](https://www.theverge.com/openai/686748/chatgpt-linguistic-impact-common-word-usage). The Verge | 2025 | The Verge.
55. **The Guardian, 2024a.** [AI poetry rated better than poems written by humans, study shows](https://www.theguardian.com/books/2024/nov/18/ai-poetry-rated-better-than-poems-written-by-humans-study-shows). The Guardian | 2024 | The Guardian.
56. **Vox, 2026.** [AI can replicate human-made art. Here is why it can never replace it](https://www.vox.com/culture/490627/ai-art-vs-human-art-camera-painting). Vox | 2026 | Vox.
57. **The Guardian, 2024b.** [Inside the university AI cheating crisis](https://www.theguardian.com/technology/2024/dec/15/i-received-a-first-but-it-felt-tainted-and-undeserved-inside-the-university-ai-cheating-crisis). The Guardian | 2024.
58. **The Guardian, 2024c.** [Researchers fool university markers with AI-generated exam papers](https://www.theguardian.com/education/article/2024/jun/26/researchers-fool-university-markers-with-ai-generated-exam-papers). The Guardian | 2024.
59. **The Guardian, 2025b.** [More than 20 percent of videos shown to new YouTube users are AI slop, study finds](https://www.theguardian.com/technology/2025/dec/27/more-than-20-of-videos-shown-to-new-youtube-users-are-ai-slop-study-finds). The Guardian | 2025 | The Guardian.
60. **Wikipedia contributors, 2026h.** [Automated essay scoring](https://en.wikipedia.org/wiki/Automated_essay_scoring). Wikipedia contributors | 2026 | Wikipedia.
61. **Cattell, 1963.** [Theory of Fluid and Crystallized Intelligence: A Critical Experiment](https://doi.org/10.1037/h0046743). Raymond B. Cattell | 1963 | Journal of Educational Psychology.
62. **Johnson-Laird, 1983.** [Mental Models: Towards a Cognitive Science of Language, Inference, and Consciousness](https://archive.org/details/mentalmodelstowa0000john). Philip N. Johnson-Laird | 1983 | Harvard University Press.
63. **Karpicke & Blunt, 2011.** [Retrieval Practice Produces More Learning than Elaborative Studying with Concept Mapping](https://doi.org/10.1126/science.1199327). Jeffrey D. Karpicke and Janell R. Blunt | 2011 | Science.
64. **Wikipedia contributors, 2026i.** [Google effect](https://en.wikipedia.org/wiki/Google_effect). Wikipedia contributors | 2026 | Wikipedia.
65. **Fleming & Lau, 2014.** [How to Measure Metacognition](https://doi.org/10.3389/fnhum.2014.00443). Stephen M. Fleming and Hakwan C. Lau | 2014 | Frontiers in Human Neuroscience.
66. **Axios, 2025a.** [ChatGPT new study mode will not give you the answers](https://www.axios.com/2025/07/29/openai-chatgpt-study-mode). Axios | 2025 | Axios.
67. **WIRED, 2025.** [ChatGPT Study Mode Is Here. It Won't Fix Education's AI Problems](https://www.wired.com/story/chatgpt-study-mode). WIRED | 2025 | WIRED.
68. **Tom's Guide, 2025.** [Claude new learning modes take on ChatGPT Study Mode](https://www.tomsguide.com/ai/claudes-new-learning-modes-take-on-chatgpts-study-mode-heres-what-they-do). Tom's Guide | 2025 | Tom's Guide.
69. **TechRadar, 2025.** [This AI tool claims to boost student grades by 15 percent using a 2400-year-old technique](https://www.techradar.com/pro/this-ai-tool-claims-to-boost-student-grades-by-15-using-a-2400-year-old-technique-but-i-am-not-convinced). TechRadar | 2025 | TechRadar.
70. **Bjork, 1994.** [Memory and Metamemory Considerations in the Training of Human Beings](https://psycnet.apa.org/record/1994-97380-009). Robert A. Bjork | 1994 | Metacognition: Knowing about Knowing.
71. **III & Karpicke, 2006.** [Test-Enhanced Learning: Taking Memory Tests Improves Long-Term Retention](https://doi.org/10.1111/j.1467-9280.2006.01693.x). Henry L. Roediger III and Jeffrey D. Karpicke | 2006 | Psychological Science.
72. **Wikipedia contributors, 2026j.** [Desirable difficulty](https://en.wikipedia.org/wiki/Desirable_difficulty). Wikipedia contributors | 2026 | Wikipedia.
73. **Wikipedia contributors, 2026k.** [ChatGPT in education](https://en.wikipedia.org/wiki/ChatGPT_in_education). Wikipedia contributors | 2026 | Wikipedia.
74. **叶峻峣, 2022.** [间隔重复记忆算法：e 天内，从入门到入土](https://l-m-sherlock.github.io/thoughts-memo/post/srs_algorithm_introduction/). 叶峻峣 | 2022.
75. **Wang et al., 2024a.** [Tutor CoPilot: A Human-AI Approach for Scaling Real-Time Expertise](https://arxiv.org/abs/2410.03017). Wang, Rose E. and Ribeiro, Ana T. and Robinson, Carly D. and Loeb, Susanna and Demszky, Dora | 2024.
76. **Sharma et al., 2023.** [Towards Understanding Sycophancy in Language Models](https://arxiv.org/abs/2310.13548). Mrinank Sharma and Meg Tong and Tomasz Korbak and David Duvenaud and Amanda Askell and Samuel Bowman and et al. | 2023 | arXiv.
77. **Li et al., 2025c.** [When Truth Is Overridden: Uncovering the Internal Origins of Sycophancy in Large Language Models](https://arxiv.org/abs/2508.02087). Jin Li and Keyu Wang and Shu Yang and Zhuoran Zhang and Di Wang | 2025 | arXiv.
78. **Denison et al., 2024.** [Sycophancy to Subterfuge: Investigating Reward-Tampering in Large Language Models](https://arxiv.org/abs/2406.10162). Carson Denison and Monte MacDiarmid and Fazl Barez and David Duvenaud and et al. | 2024 | arXiv.
79. **Zhao et al., 2024a.** [Towards Analyzing and Mitigating Sycophancy in Large Vision-Language Models](https://arxiv.org/abs/2408.11261). Yunpu Zhao and Rui Zhang and Junbin Xiao and Changxin Ke and Ruibo Hou and Yifan Hao and Qi Guo and Yunji Chen | 2024 | arXiv.
80. **Noshin & Sultana, 2026.** [The Illusion of Agreement with ChatGPT: Sycophancy and Beyond](https://arxiv.org/abs/2603.21409). Kazi Noshin and Sharifa Sultana | 2026 | arXiv.
81. **Wikipedia contributors, 2026l.** [AI sycophancy](https://en.wikipedia.org/wiki/AI_sycophancy). Wikipedia contributors | 2026 | Wikipedia.
82. **The Guardian, 2025c.** [Sycophantic AI chatbots tell users what they want to hear, study shows](https://www.theguardian.com/technology/2025/oct/24/sycophantic-ai-chatbots-tell-users-what-they-want-to-hear-study-shows). The Guardian | 2025 | The Guardian.
83. **Axios, 2025b.** [AI sycophancy: The downside of a digital yes-man](https://www.axios.com/2025/07/07/ai-sycophancy-chatbots-mental-health). Axios | 2025 | Axios.
84. **Ranaldi & Pucci, 2023.** [When Large Language Models contradict humans? Large Language Models' Sycophantic Behaviour](https://arxiv.org/abs/2311.09410). Ranaldi, Leonardo and Pucci, Giulia | 2023.
85. **Kim & Khashabi, 2025.** [Challenging the Evaluator: LLM Sycophancy Under User Rebuttal](https://arxiv.org/abs/2509.16533). Kim, Sungwon and Khashabi, Daniel | 2025.
86. **Time, 2026.** [The Problem With AI Flattering Us](https://time.com/7346052/problem-ai-flattering-us/). Time | 2026.
87. **Economic Times, 2025.** [ChatGPT caught lying by Reddit user. When asked why? AI replies to keep you happy](https://economictimes.indiatimes.com/magazines/panache/chatgpt-caught-lying-by-reddit-user-when-asked-why-ai-replies-to-keep-you-happy/articleshow/123143078.cms). Economic Times | 2025 | Economic Times.
88. **TechRadar, 2026a.** [I made an AI clone of myself based on my Google and Reddit history](https://www.techradar.com/ai-platforms-assistants/chatgpt/i-made-an-ai-clone-of-myself-based-on-my-google-and-reddit-history-and-it-understood-me-better-than-i-expected). TechRadar | 2026 | TechRadar.
89. **Wang et al., 2024b.** [Factuality of Large Language Models: A Survey](https://arxiv.org/abs/2402.02420). Yuxia Wang and Minghan Wang and Muhammad Arslan Manzoor and Fei Liu and Georgi Georgiev and Rocktim Jyoti Das and Preslav Nakov | 2024 | arXiv.
90. **Zhao et al., 2024b.** [WildHallucinations: Evaluating Long-form Factuality in LLMs with Real-World Entity Queries](https://arxiv.org/abs/2407.17468). Wenting Zhao and Tanya Goyal and Yu Ying Chiu and Liwei Jiang and Benjamin Newman and Abhilasha Ravichander and Khyathi Chandu and Ronan Le Bras and Claire Cardie and Yuntian Deng and Yejin Choi | 2024 | arXiv.
91. **Rahman et al., 2025.** [Hallucination to Truth: A Review of Fact-Checking and Factuality Evaluation in Large Language Models](https://arxiv.org/abs/2508.03860). Subhey Sadi Rahman and Md. Adnanul Islam and Md. Mahbub Alam and Musarrat Zeba and Md. Abdur Rahman and Sadia Sultana Chowa and Mohaimenul Azam Khan Raiaan and Sami Azam | 2025 | arXiv.
92. **Wikipedia contributors, 2026m.** [Hallucination (artificial intelligence)](https://en.wikipedia.org/wiki/Hallucination_(artificial_intelligence)). Wikipedia contributors | 2026 | Wikipedia.
93. **Wikipedia contributors, 2026n.** [AI-generated content on Wikipedia](https://en.wikipedia.org/wiki/AI-generated_content_on_Wikipedia). Wikipedia contributors | 2026 | Wikipedia.
94. **WIRED, 2026.** [We Asked the Future of Truth Author to Explain How He Used AI. It Did Not Go Well](https://www.wired.com/story/future-of-truth-ai-interview). WIRED | 2026 | WIRED.
95. **Weber-Wulff et al., 2023.** [Testing of Detection Tools for AI-Generated Text](https://doi.org/10.1007/s40979-023-00146-z). Debora Weber-Wulff and Alla Anohina-Naumeca and Sonja Bjelobaba and Tomáš Foltýnek and Jean Guerrero-Dib | 2023 | International Journal for Educational Integrity.
96. **Sadasivan et al., 2023.** [Can AI-Generated Text be Reliably Detected?](https://arxiv.org/abs/2303.11156). Vinu Sankar Sadasivan and Aounon Kumar and Sriram Balasubramanian and Wenxiao Wang and Soheil Feizi | 2023 | arXiv.
97. **Wikipedia contributors, 2026o.** [Artificial intelligence content detection](https://en.wikipedia.org/wiki/Artificial_intelligence_content_detection). Wikipedia contributors | 2026 | Wikipedia.
98. **Wikipedia contributors, 2026p.** [GPTZero](https://en.wikipedia.org/wiki/GPTZero). Wikipedia contributors | 2026 | Wikipedia.
99. **Axios, 2024.** [AI detection gap opens new vulnerabilities](https://www.axios.com/2024/10/07/ai-detection-tools-reliability-labeling). Axios | 2024 | Axios.
100. **The Washington Post, 2026.** [Why honest students fear AI detectors](https://www.washingtonpost.com/opinions/2026/04/13/ai-detectors-students/). The Washington Post | 2026 | The Washington Post.
101. **Tom's Guide, 2026.** [A major university just banned AI detectors - here is why](https://www.tomsguide.com/ai/a-major-university-just-banned-ai-detectors-heres-why). Tom's Guide | 2026 | Tom's Guide.
102. **Wikipedia contributors, 2026q.** [AI slop](https://en.wikipedia.org/wiki/AI_slop). Wikipedia contributors | 2026 | Wikipedia.
103. **TechRadar, 2026b.** [Gemini is the best AI at mimicking human writing and evading detection](https://www.techradar.com/ai-platforms-assistants/chatgpt-keeps-getting-flagged-over-and-over-again-gemini-is-the-best-ai-at-mimicking-human-writing-and-evading-detection). TechRadar | 2026 | TechRadar.
104. **Business Insider, 2025.** [Substack CEO says AI can drive a slop future or a cultural renaissance](https://www.businessinsider.com/ai-slop-cultural-renaissance-substack-ceo-chris-best-2025-9). Business Insider | 2025 | Business Insider.
105. **Windows Central, 2026.** [Merriam-Webster names slop as Word of the Year](https://www.windowscentral.com/software-apps/merriam-webster-names-slop-as-word-of-the-year-officially-recognizing-ai-generated-low-quality-content-as-a-cultural-phenomenon). Windows Central | 2026 | Windows Central.
106. **Wikipedia contributors, 2026r.** [BBC Bitesize](https://en.wikipedia.org/wiki/BBC_Bitesize). Wikipedia contributors | 2026.
107. **The Guardian, 2024d.** [BBC to invest in AI to help transform its education services](https://www.theguardian.com/media/2024/apr/21/bbc-to-invest-6m-in-ai-education-services-bitesize). The Guardian | 2024.
108. **The Washington Post, 2025b.** [Professors are turning to this old-school method to stop AI use on exams](https://www.washingtonpost.com/education/2025/12/12/ai-artificial-intelligence-college-oral-exam/). The Washington Post | 2025.
109. **Thoughts Memo 汉化组, 2022b.** [Thoughts Memo 汉化组小站](https://l-m-sherlock.github.io/thoughts-memo/). Thoughts Memo 汉化组 | 2022.
110. **Thoughts Memo 汉化组, 2022c.** [中国教育没有逻辑吗？](https://l-m-sherlock.github.io/thoughts-memo/post/%E4%B8%AD%E5%9B%BD%E6%95%99%E8%82%B2%E6%B2%A1%E6%9C%89%E9%80%BB%E8%BE%91%E5%90%97/). Thoughts Memo 汉化组 | 2022.
