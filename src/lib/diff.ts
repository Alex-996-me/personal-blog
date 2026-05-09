import { diffWordsWithSpace } from "diff";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function normalizeMarkdownForDiff(input: string) {
  return input
    .replace(/\r\n/g, "\n")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "[$1]")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^#{1,6}\s*/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "• ")
    .replace(/^\s*\d+\.\s+/gm, "")
    .trim();
}

export function renderDiffHtml(previousBody: string, currentBody: string) {
  const segmenter =
    typeof Intl !== "undefined"
      ? new Intl.Segmenter("zh-CN", { granularity: "word" })
      : undefined;

  const parts = diffWordsWithSpace(
    normalizeMarkdownForDiff(previousBody),
    normalizeMarkdownForDiff(currentBody),
    segmenter ? { intlSegmenter: segmenter } : {},
  );

  return parts
    .map((part) => {
      const html = escapeHtml(part.value).replace(/\n/g, "<br />");
      if (part.added) {
        return `<span class="diff-added">${html}</span>`;
      }
      if (part.removed) {
        return `<span class="diff-removed">${html}</span>`;
      }
      return html;
    })
    .join("");
}
