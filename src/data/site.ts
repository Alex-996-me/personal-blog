export type CategoryDefinition = {
  name: string;
  slug: string;
  description: string;
};

export const siteConfig = {
  title: "留白博客",
  description: "记录个人日志、读书、健康、训练、脑科学与工具实践的中文博客。",
  tagline: "一个大二学生的公开日记本，写身体、训练、学习、迷茫和一些暂时没有答案的问题。",
  author: {
    name: "海粟",
    shortBio: "大二学生。关心身体、营养、训练、脑科学、学习和生活意义，慢慢把自己的困惑和记录写下来。",
    bio: "这是一个公开日记本，不是自媒体，也不是作品集。我会写读书、播客、训练、饮食实验、大学阶段的迷茫、保研或留学的犹豫、AI 工具，以及一些还没有想明白的问题。我不保证自己一直正确，但希望自己能一直诚实。",
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
