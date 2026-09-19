export type CategoryDefinition = {
  name: string;
  slug: string;
  description: string;
  hidden?: boolean;
};

export type ModuleDefinition = {
  name: string;
  href: string;
  description: string;
};

export type TopicTileDefinition = {
  name: string;
  slug: string;
  href: string;
  description: string;
  icon: "reading" | "health" | "training" | "neuroscience" | "tools" | "world";
};

export const inspirationThemeNames = ["思考", "生活", "科学"] as const;

export type InspirationThemeDefinition = {
  name: (typeof inspirationThemeNames)[number];
  slug: string;
  description: string;
  mark: string;
  code: string;
};

export const siteConfig = {
  title: "N=1 Lab",
  description: "海粟的个人实验：从生活与实践中形成判断，留下经过选择的文章与生活记录。",
  tagline: "要实践，不要幻想；要思考，不要盲从。",
  author: {
    name: "海粟",
    handle: "@n1lab",
    avatarLabel: "N1",
    portrait: "/images/home/author-life.jpg",
    shortBio: "数学与数理基础科学背景的学生。关心身体、训练、学习，以及怎样过好日常生活。",
    bio: "N=1 Lab 是我持续进行的个人实验。认真的思考来自生活与实践，这里留下经过选择的文章，也留下一些想记住的日常。判断会随经验修正，但公开之前，我希望先把它想清楚。",
  },
  defaultOgImage: "/images/og-default.svg",
};

export const categories: CategoryDefinition[] = [
  {
    name: "日志",
    slug: "journal",
    description: "旧的阶段性记录入口，保留历史文章使用。",
    hidden: true,
  },
  {
    name: "自学",
    slug: "self-learning",
    description: "语言、技术、课程与长期自主学习项目的实践记录。",
  },
  {
    name: "体悟",
    slug: "insights",
    description: "读书、学习、注意力与认识世界之后的再思考。",
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
    name: "工具",
    slug: "tools",
    description: "记录真正帮到我的工具、方法与工作流。",
  },
  {
    name: "世界",
    slug: "world",
    description: "关于关系、行业、选择与更大的现实。",
  },
];

export const visibleCategories = categories.filter((category) => !category.hidden);

export const topicMatrix: TopicTileDefinition[] = [
  {
    name: "体悟",
    slug: "insights",
    href: "/categories/insights/",
    description: "读书、学习、注意力与认识世界之后的再思考。",
    icon: "reading",
  },
  {
    name: "健康",
    slug: "health",
    href: "/categories/health/",
    description: "饮食、睡眠、恢复、体检与身体实验。",
    icon: "health",
  },
  {
    name: "训练",
    slug: "training",
    href: "/categories/training/",
    description: "杠铃、壶铃、动作记录和训练方法。",
    icon: "training",
  },
  {
    name: "工具",
    slug: "tools",
    href: "/categories/tools/",
    description: "真正帮到我的软件、工作流与方法论。",
    icon: "tools",
  },
  {
    name: "世界",
    slug: "world",
    href: "/categories/world/",
    description: "关系、行业、选择与现实观察。",
    icon: "world",
  },
];

export const inspirationThemes: InspirationThemeDefinition[] = [
  {
    name: "思考",
    slug: "thinking",
    description: "放判断、学习、做事方法、系统感和那些还在发酵的观念。",
    mark: "思",
    code: "THINK",
  },
  {
    name: "生活",
    slug: "living",
    description: "放日常观察、身体感受、经验判断和更贴身的生活记录。",
    mark: "生",
    code: "LIVING",
  },
  {
    name: "科学",
    slug: "science",
    description: "放脑科学、营养、机制、模型，以及更偏知识性的短笔记。",
    mark: "科",
    code: "SCIENCE",
  },
];

export const modules: ModuleDefinition[] = [
  {
    name: "生活记录",
    href: "/moments/",
    description: "日常生活的图文记录。",
  },
];

export const navigation = [
  { label: "文章", href: "/articles/" },
  { label: "生活", href: "/moments/" },
  { label: "邮报", href: "/daily/" },
  { label: "关于", href: "/about/" },
];
