export function dailyMetadataErrors(data) {
  const errors = [];
  if (!["draft", "published", "archive"].includes(data.status)) errors.push(["status", "must be draft, published or archive"]);
  const date = data.date;
  if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date) {
    errors.push(["date", "must be a valid YYYY-MM-DD string"]);
  }
  if (!Number.isInteger(data.itemCount) || data.itemCount < 0 || data.itemCount > 18) {
    errors.push(["itemCount", "must be 0–18"]);
  }
  return errors;
}

export function dailyDocumentErrors(data, content, filename) {
  const errors = dailyMetadataErrors(data);
  if (filename && filename !== `${data.date}.md`) errors.push(["date", "must match filename"]);
  if (data.status !== "published") return errors;
  const rich = /^## (CORE|SIGNALS)$/m.test(content);
  if (rich) {
    const groups = [...content.matchAll(/^## (.+)$/gm)].map((m) => m[1]);
    if (!["CORE", "SIGNALS", "CORE,SIGNALS"].includes(groups.join(","))) errors.push(["content", "invalid Core/Signals groups"]);
    if (/^## \d{2} /m.test(content)) errors.push(["content", "grouped items must use H3"]);
  }
  const items = content.replace(/^## (CORE|SIGNALS)\r?\n/gm, "").split(rich ? /^### /m : /^## /m).slice(1);
  if (data.itemCount === 0 && content.trim() !== "今天没有值得占用注意力的新信息。") errors.push(["content", "zero-item Daily requires the empty-day statement only"]);
  if (items.length !== data.itemCount) errors.push(["itemCount", "does not match numbered items"]);
  for (const [index, item] of items.entries()) {
    const [heading, ...lines] = item.split("\n");
    if (!heading.startsWith(`${String(index + 1).padStart(2, "0")} `) || !heading.slice(3).trim()) errors.push([`item ${index + 1}`, "missing numbered title"]);
    if (item.includes("<!-- daily-edition -->")) {
      const reading = item.match(/<details>\s*<summary>展开阅读<\/summary>\s*([\s\S]*?)\s*<\/details>/);
      const intro = item.split("<!-- daily-edition -->")[1]?.split("来源：")[0]?.trim();
      if (!intro || intro.startsWith("<")) errors.push([`item ${index + 1}`, "missing reading hook"]);
      if (!reading?.[1]?.trim() || (item.match(/<details>/g) ?? []).length !== 1 || (item.match(/<\/details>/g) ?? []).length !== 1) errors.push([`item ${index + 1}`, "missing or malformed reading disclosure/body"]);
      if (reading && /<(?:script|iframe|img|style|a)\b/i.test(reading[1])) errors.push([`item ${index + 1}`, "unexpected embedded HTML in reading body"]);
    }
    if (!lines.some((line) => line.trim() && !line.startsWith("来源：") && !line.startsWith("<!--"))) errors.push([`item ${index + 1}`, "missing summary"]);
    const source = lines.find((line) => line.startsWith("来源：")) ?? "";
    const link = source.match(/^来源：\[[^\]\n]+\]\(<(https?:\/\/[^<>\s]+)>\)$/);
    let validLink = false;
    try { const url = new URL(link?.[1]); validLink = !!url.hostname && !url.username && !url.password; } catch {}
    if (!validLink && !["来源：manual", "来源：手动材料（私人心得）"].includes(source)) errors.push([`item ${index + 1}`, "missing valid source link or manual attribution"]);
    if (!/<!-- daily-source: [a-f0-9]{24} -->/.test(item)) errors.push([`item ${index + 1}`, "missing source trace ID"]);
  }
  return errors;
}
