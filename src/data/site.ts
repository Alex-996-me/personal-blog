export type CategoryDefinition = {
  name: string;
  slug: string;
  description: string;
};

export const siteConfig = {
  title: "留白博客",
  description: "记录个人日志、读书、健康、训练、脑科学与工具实践的中文博客。",
  tagline: "把还没想明白的生活，慢慢写清楚。",
  author: {
    name: "海粟",
    shortBio: "一名还在摸索方向的学生，用博客记录训练、阅读、健康实验与思考。",
    bio: "我想把日常、读书笔记、训练体会、健康实验、脑科学兴趣和一些趁手工具都认真存档。博客对我来说不是产品，而是一种整理自我、对抗遗忘的方式。",
  },
  defaultOgImage: "/images/og-default.svg",
};

export const categories: CategoryDefinition[] = [
  {
    name: "日志",
    slug: "journal",
    description: "记录阶段性心情、选择、迷茫与成长。",
  },
  {
    name: "读书",
    slug: "reading",
    description: "记录阅读时的触动、摘记与追问。",
  },
  {
    name: "健康",
    slug: "health",
    description: "饮食、睡眠、恢复与身体状态实验。",
  },
  {
    name: "训练",
    slug: "training",
    description: "关于力量训练、壶铃与长期训练习惯。",
  },
  {
    name: "脑科学",
    slug: "neuroscience",
    description: "关于注意力、学习、情绪与大脑的兴趣记录。",
  },
  {
    name: "工具",
    slug: "tools",
    description: "记录真正帮到我的工具、方法与工作流。",
  },
];

export const navigation = [
  { label: "首页", href: "/" },
  { label: "日志", href: "/categories/journal/" },
  { label: "读书", href: "/categories/reading/" },
  { label: "健康", href: "/categories/health/" },
  { label: "训练", href: "/categories/training/" },
  { label: "脑科学", href: "/categories/neuroscience/" },
  { label: "工具", href: "/categories/tools/" },
  { label: "关于", href: "/about/" },
];
