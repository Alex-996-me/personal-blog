// Presentation only: read the deterministic Markdown without changing source prose.
const decode = (value) => value.replace(/\\([\\`*_{}\[\]()#!|])/g, "$1")
  .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");

export function readingMinutes(text) {
  // Approximation: 250 Chinese characters (or Latin words) per minute.
  const chinese = (text.match(/\p{Script=Han}/gu) ?? []).length;
  const words = (text.match(/[\p{Script=Latin}\d]+/gu) ?? []).length;
  return Math.max(1, Math.ceil((chinese + words) / 250));
}

export function parseDailyEditions(markdown, covers = {}) {
  const blocks = markdown.split(/^#{2,3} (?=\d{2} )/m).slice(1);
  return blocks.map((block) => {
    const title = block.match(/^\d{2} (.+)/)?.[1]?.trim();
    const id = block.match(/<!-- daily-source: ([a-f0-9]{24}) -->/)?.[1];
    const source = block.match(/^来源：\[([^\]\n]+)\]\(<(https?:\/\/[^<>\s]+)>\)/m);
    const manualSource = block.match(/^来源：(manual|auto-subscribe)\s*$/m);
    const reading = block.match(/<details>\s*<summary>展开阅读<\/summary>\s*([\s\S]*?)\s*<\/details>/)?.[1];
    const intro = block.includes("<!-- daily-edition -->")
      ? block.split("<!-- daily-edition -->")[1].split("来源：")[0].trim()
      : block.slice(block.indexOf("\n") + 1).split("来源：")[0].trim();
    if (!title || !id || !intro) throw Error("Daily presentation: malformed edition");
    const body = decode(reading?.trim() || intro);
    const sourceUrl = source?.[2];
    const cover = source ? covers[sourceUrl] : undefined;
    const image = cover?.coverImage;
    if (image && !/^https:\/\//.test(image)) throw Error("Daily cover must use a public HTTPS URL");
    return {
      id, title: decode(title), hook: reading ? decode(intro) : "",
      body, paragraphs: body.split(/\r?\n\s*\r?\n/), minutes: readingMinutes(body),
      sourceName: source ? decode(source[1]) : manualSource?.[1] ?? "manual",
      sourceType: source ? "auto-subscribe" : manualSource?.[1] ?? "manual",
      sourceUrl, coverImage: image, coverAlt: cover?.coverAlt ?? "",
    };
  });
}
