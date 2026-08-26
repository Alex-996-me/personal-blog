---
title: CLI学习笔记
date: "2026-08-26"
updated: "2026-08-26"
category: 工具
tags:
  - 命令行窗口CLI
  - vibecoding
  - 个人成长
description: 更新CLI知识，按需学习每天积累一点点
cover: /images/covers/cli_gui.png

---

## cli入门

（更新时间：2026/8/26）

### 先创建一个仓库，看看状态

- git init ：把一个工作的文件夹变成代码仓库

- git status --short --branch: 用精简格式告诉我，发生了什么变化，以及分支情况如何。

注意这里的XY状态。 X=【暂存区状态】 Y=【工作区状态】

![](/images/posts/cli_learning/1.png)

### 搜内容，搜文件，搜拓展名

- rg -n -i：模糊搜索结果（内容），返回行号，忽略大小写。

for example:

rg -n -i "openai|qwen|api" (在整个项目里面搜索openai,qwen和api，不区分大小写。告诉我具体行号。)

![](/images/posts/cli_learning/2.png)

- rg -l -i: 搜索模糊结果，只需要文件名，忽略大小写

for example:

rg -l -i "chatgpt" (在整个项目里面搜索chatgpt，只需要具体的文件名不需要返回行号)

![](/images/posts/cli_learning/2.5.png)

- fd -t(type) 以及 fd -e(extention): 前者用于返回筛选文件类型、后者用于筛选拓展名。可以使用 | fzf来进一步筛选需要的文件。

for example:

fd -t f -e md (找到一个文件，它的拓展名是.md)

![](/images/posts/cli_learning/3.png)

- rg -n -i "chatgpt" -g "*.md" : 用于寻找所有含有关键词“chatgpt”的文件里面是.md的文件

![](/images/posts/cli_learning/4.png)

- Get-Content "behavior\B7_AIC_robustness\B7D1b_AI_specific_calibration_random_interaction_v1.0\00_README\README_B7D1b_运行说明.md" |
    Select-Object -Skip 2 -First 3

你先拿到这个运行说明.md的内容，跳过最前面的2行，然后给我3行正文内容。

![](/images/posts/cli_learning/5.png)













