import type { Inspiration, Post } from "./blog";
import { getPostHref, stripMarkdownToText } from "./blog";

export type InspirationRecommendation = {
  post: Post;
  score: number;
  matchedTerms: string[];
};

const MIN_RECOMMENDATION_SCORE = 24;
const MAX_PHRASE_MATCHES = 2;

const ignoredTerms = new Set([
  "关于",
  "这是",
  "一个",
  "我们",
  "自己",
  "这个",
  "那些",
  "事情",
  "东西",
  "文章",
  "内容",
  "方法",
  "问题",
  "思考",
  "生活",
  "科学",
  "训练",
  "读书",
  "健康",
  "工具",
]);

function normalize(value: string) {
  return stripMarkdownToText(value).toLocaleLowerCase("zh-CN");
}

function uniqueTerms(values: string[]) {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

function isUsefulTerm(value: string) {
  const normalized = value.trim();
  return normalized.length >= 2 && normalized.length <= 12 && !ignoredTerms.has(normalized);
}

function getChinesePhrases(value: string) {
  const phrases = new Set<string>();
  const chineseChunks = value.match(/[\u4e00-\u9fff]+/gu) ?? [];

  chineseChunks.forEach((chunk) => {
    for (let length = 3; length <= 5; length += 1) {
      for (let index = 0; index <= chunk.length - length; index += 1) {
        const phrase = chunk.slice(index, index + length);
        if (isUsefulTerm(phrase)) {
          phrases.add(phrase);
        }
      }
    }
  });

  const latinWords = value.match(/[a-z][a-z0-9-]{2,}/giu) ?? [];
  latinWords.forEach((word) => {
    if (isUsefulTerm(word)) {
      phrases.add(word.toLocaleLowerCase("zh-CN"));
    }
  });

  return phrases;
}

function getPostMetadataText(post: Post) {
  return normalize([
    post.data.title,
    post.data.description,
    post.data.category,
    post.data.tags.join(" "),
  ].join("\n"));
}

function getInspirationMetadataText(inspiration: Inspiration) {
  return normalize([
    inspiration.data.title,
    inspiration.data.description,
    inspiration.data.tags.join(" "),
  ].join("\n"));
}

function collectTagMatches(inspiration: Inspiration, post: Post) {
  const inspirationTags = uniqueTerms(inspiration.data.tags.filter(isUsefulTerm));
  const postTags = uniqueTerms(post.data.tags.filter(isUsefulTerm));
  const inspirationMetadata = getInspirationMetadataText(inspiration);
  const postMetadata = getPostMetadataText(post);
  const postTagSet = new Set(postTags);
  const matchedTerms = new Set<string>();
  let score = 0;

  const tagScore = (term: string, shared: boolean) => {
    const isSpecific = term.length >= 3;
    if (shared) {
      return isSpecific ? 30 : 18;
    }
    return isSpecific ? 18 : 10;
  };

  inspirationTags.forEach((tag) => {
    if (postTagSet.has(tag)) {
      score += tagScore(tag, true);
      matchedTerms.add(tag);
      return;
    }

    if (postMetadata.includes(tag)) {
      score += tagScore(tag, false);
      matchedTerms.add(tag);
    }
  });

  postTags.forEach((tag) => {
    if (!matchedTerms.has(tag) && inspirationMetadata.includes(tag)) {
      score += tagScore(tag, false);
      matchedTerms.add(tag);
    }
  });

  return { score, matchedTerms };
}

function collectPhraseMatches(inspiration: Inspiration, post: Post, matchedTerms: Set<string>) {
  const inspirationPhrases = getChinesePhrases(getInspirationMetadataText(inspiration));
  const postMetadata = getPostMetadataText(post);
  const matches = [...inspirationPhrases]
    .filter((phrase) => !matchedTerms.has(phrase) && postMetadata.includes(phrase))
    .sort((left, right) => right.length - left.length)
    .slice(0, MAX_PHRASE_MATCHES);

  matches.forEach((match) => matchedTerms.add(match));
  return matches.length * 5;
}

export function getInspirationRecommendation(
  inspiration: Inspiration,
  posts: Post[],
): InspirationRecommendation | null {
  const candidates = posts
    .map((post) => {
      const tagResult = collectTagMatches(inspiration, post);
      const phraseScore = collectPhraseMatches(inspiration, post, tagResult.matchedTerms);
      const score = tagResult.score + phraseScore;

      return {
        post,
        score,
        matchedTerms: [...tagResult.matchedTerms],
      };
    })
    .filter((candidate) => candidate.score >= MIN_RECOMMENDATION_SCORE && candidate.matchedTerms.length > 0)
    .sort((left, right) => right.score - left.score || right.post.data.date.valueOf() - left.post.data.date.valueOf());

  return candidates[0] ?? null;
}

export function getInspirationRecommendationHref(recommendation: InspirationRecommendation) {
  return getPostHref(recommendation.post);
}
