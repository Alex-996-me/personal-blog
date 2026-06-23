export type WeeklyMotto = {
  dayEn: string;
  dayZh: string;
  en: string;
  zh: string;
};

export const weeklyMottos: WeeklyMotto[] = [
  {
    dayEn: "Monday",
    dayZh: "周一",
    en: "less is more",
    zh: "少即是多",
  },
  {
    dayEn: "Tuesday",
    dayZh: "周二",
    en: "simple is king",
    zh: "简单为王",
  },
  {
    dayEn: "Wednesday",
    dayZh: "周三",
    en: "action, no words",
    zh: "实践第一",
  },
  {
    dayEn: "Thursday",
    dayZh: "周四",
    en: "compound interest first",
    zh: "复利，复利",
  },
  {
    dayEn: "Friday",
    dayZh: "周五",
    en: "attention is all you need",
    zh: "注意力是一切",
  },
  {
    dayEn: "Saturday",
    dayZh: "周六",
    en: "to make not to take",
    zh: "创造，不要囤积",
  },
  {
    dayEn: "Sunday",
    dayZh: "周日",
    en: "think a further step",
    zh: "多想一步",
  },
];

export function getWeeklyMottoIndex(day = new Date().getDay()) {
  return (day + 6) % 7;
}

export function getWeeklyMottoForDate(date: Date) {
  return weeklyMottos[getWeeklyMottoIndex(date.getDay())];
}
