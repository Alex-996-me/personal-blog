---
title: CLI学习笔记
date: "2026-08-26"
updated: "2026-09-01"
category: 工具
tags:
  - 命令行窗口CLI
  - Codex
  - Git
  - Agent
  - 个人成长
description: CLI、Prompt、AGENTS.md、Skill 与 Git 的持续学习记录。
cover: /images/covers/cli_gui.png
fullSummary:
  - 记录 CLI 搜索与文件读取的基础命令。
  - 记录 Prompt、AGENTS.md、Skill、Workflow 与 Git 的实用结构。
sectionSummaries:
  - heading: CLI 入门
    summary:
      - 用 git status、rg、fd 与 Get-Content 查看仓库和文件。
  - heading: 2026/9/1
    summary:
      - 用固定结构编写 Prompt，并将复杂任务拆为 Prompt 链。
      - 用 AGENTS.md、Skill 与 Workflow 固化长期协作规则。
      - 区分 Git 工作区、暂存区、本地分支和远端跟踪引用。
---

## CLI 入门

（最新更新时间：2026/9/1）

### 先创建一个仓库，看看状态

把当前工作文件夹变成 Git repository：

```bash
git init
```

用精简格式查看发生了什么，以及当前分支：

```bash
git status --short --branch
```

`XY` 是两个区域的状态：

| 位置 | 含义 |
| --- | --- |
| `X` | 暂存区（staging area）状态 |
| `Y` | 工作区（working tree）状态 |

<img src="/images/posts/cli_learning/1.png" alt="git status --short --branch 的终端截图" />

### 搜内容、搜文件、搜扩展名

#### 在内容里找关键词：`rg`

搜索整个项目中出现的关键词，显示行号并忽略大小写：

```bash
rg -n -i "openai|qwen|api"
```

只返回包含关键词的文件名：

```bash
rg -l -i "chatgpt"
```

只在 Markdown 文件中搜索：

```bash
rg -n -i "chatgpt" -g "*.md"
```

<img src="/images/posts/cli_learning/2.png" alt="rg 搜索结果截图" />

#### 按文件类型找文件：`fd`

```bash
fd -t f -e md
```

- `-t f`：只找普通文件。
- `-e md`：只找 `.md` 扩展名。
- 后面可以接 `| fzf`，继续从结果中交互筛选。

#### 局部读取文件：`Get-Content`

```powershell
Get-Content "README.md" | Select-Object -Skip 2 -First 3
```

读取文件，跳过前两行，再取三行正文。适合长 README、日志和配置文件。

<img src="/images/posts/cli_learning/5.png" alt="Get-Content 局部读取文件截图" />

## 2026/9/1

### Prompt

常用结构：

```text
角色 + 任务 + 背景 + 格式 + 限制
```

长材料放前面，要求放后面。

```text
[原始材料、代码、报错、上下文]

角色：……
任务：……
背景：……
输出格式：……
限制：……
```

| 原则 | 做法 |
| --- | --- |
| `why > what` | 说明判断原因，不只给结论。 |
| 给示例 | 少讲抽象概念；同时说明反例。 |
| 一个任务一个 Prompt | 复杂任务拆成 Prompt 链。 |
| 指定格式 | 直接要求表格、步骤、JSON 或固定小标题。 |
| 自检 | 检查遗漏、矛盾和未经验证的结论。 |
| 角色翻转 | 缺少关键条件时，允许 AI 先问一个问题。 |
| 持续迭代 | 在同一对话中继续推进，保留上下文。 |

示例：

```text
你是一位资深产品经理。

任务：分析“用户可在 App 内直接发起视频会议”的可行性。

背景：B2B SaaS；目标用户为中小企业。

输出格式：
1. 优势
2. 风险
3. 建议

限制：
- 每条说明原因。
- 300 字以内。
- 不要假设不存在的用户数据或技术条件。
- 输出前检查：是否遗漏成本、权限、合规或稳定性风险。
```

Prompt 链：

```text
原始材料 → 整理问题与缺口 → 选择方向 → 生成草稿 → 自检与修改
```

### AGENTS.md

`AGENTS.md` 用于固定长期规则。

```text
全局 AGENTS.md
├── 默认语言、沟通方式
├── 安全边界
├── Git / 数据纪律
└── 通用 coding 偏好

项目 AGENTS.md
├── 项目目标、技术栈、目录结构
├── 命名与代码规范
├── build / test 命令
└── 项目专属红线
```

通用规则示例：

- 用中文，口语化，少废话。
- 结论先行；原理后置。
- 不准讨好，不准谄媚；直接指出问题。
- 不准多此一举；不生成审计报告、废文件。
- 少写、少改；只改当前任务必要的部分。
- 同一种排查连续两轮没有推进，停止重试，改查文档、版本、最小复现或参考实现。
- 长任务说明当前进度。
- 只记录高成本、可复现、跨项目可迁移的错误经验。

### Skill 与 Workflow

Skill：针对一个具体场景保存的可复用指令。

```text
清晰触发条件 + 单一职责 + 明确输入 + 明确输出 + 可验证完成条件
```

会议纪要 Skill 示例：

```text
角色：会议纪要整理助手

输入：会议录音转写稿或手写笔记。

输出：
- 会议主题
- 参与人员
- 核心决议
- 待办事项（负责人、截止日期）
- 遗留问题

限制：
- 只提取原文信息。
- 不补充、不推测。
- 缺失字段写「待补充」。
- 未提截止日期写「未定」。
```

`$skill-name`：请求调用已安装、可用的命名 Skill。
`$ARGUMENTS`：Skill 模板中的动态占位符；是否使用取决于具体设计。

Workflow：多个 Skill 按顺序协作。

```text
Prompt → Skill → Workflow → 更成熟的 Workflow → 更大 Workflow 的一个 Skill
```

俄罗斯套娃。

```text
人：目标、判断、个人经验、排版取舍、发布决定、担责
AI：整理、结构、格式、验证、重复劳动
```

### Git

基本状态：

```text
工作区 ──git add──> 暂存区 ──git commit──> 本地提交历史 ──git push──> GitHub 远端仓库
```

`origin/main` 是本地保存的远端 `main` 跟踪引用。

```text
main         当前本地分支
origin/main  本地已知的远端 main 状态
GitHub main  远端真实 main 状态
```

```bash
git status --short --branch
```

查看精简状态和当前分支。

```bash
git switch branch-name
git switch -c branch-name
```

切换分支；创建并切换分支。

```bash
git fetch origin
```

获取远端更新，更新本地远端跟踪引用；不直接改工作区。

```bash
git pull
```

获取远端更新，并整合到当前分支。

```bash
git diff
git diff --staged
```

- `git diff`：工作区相对暂存区的改动。
- `git diff --staged`：暂存区相对最近一次 commit 的改动。

```bash
git fetch origin
git diff main...origin/main
```

查看远端 `main` 从共同祖先开始新增的改动。

```text
编辑文件 → git add → git commit → git push
```

