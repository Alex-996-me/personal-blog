function cleanInlineMarkdown(value) {
  return value
    .replace(/!\[[^\]]*]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/~~([^~]+)~~/g, "$1")
    .replace(/<\/?[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function splitIntoSentences(text) {
  return cleanInlineMarkdown(text)
    .split(/(?<=[。！？.!?])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function takeMeaningfulLines(markdown) {
  return markdown
    .split("\n")
    .map((line) => cleanInlineMarkdown(line))
    .filter(
      (line) =>
        line &&
        !line.startsWith("#") &&
        !line.startsWith("|") &&
        !line.startsWith("```") &&
        !line.startsWith("<") &&
        !line.startsWith(">"),
    );
}

function dedupeSummaryItems(items) {
  const seen = new Set();
  const results = [];

  for (const item of items) {
    const normalized = item.replace(/[。！？.!?]+$/g, "").trim();
    if (!normalized || seen.has(normalized)) {
      continue;
    }

    seen.add(normalized);
    results.push(item.trim());
  }

  return results;
}

export function splitMarkdownByH2(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const sections = [];
  const introLines = [];
  let current = null;
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
    }

    if (!inCodeBlock && /^##\s+/.test(line)) {
      if (current) {
        current.content = current.lines.join("\n").trim();
        sections.push(current);
      }

      current = {
        heading: line.replace(/^##\s+/, "").trim(),
        lines: [],
        content: "",
      };
      continue;
    }

    if (current) {
      current.lines.push(line);
    } else {
      introLines.push(line);
    }
  }

  if (current) {
    current.content = current.lines.join("\n").trim();
    sections.push(current);
  }

  return {
    intro: introLines.join("\n").trim(),
    sections,
  };
}

function buildFallbackSummaryItems(text, label) {
  const tableLineCount = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("|")).length;

  if (tableLineCount >= 2) {
    return [
      `这一节是一张围绕“${label}”的数据表。`,
      "适合先看表头，再挑和正文相关的几列细读。",
      "如果你想让读者更快抓住重点，可以手动补 1 到 2 条观察。",
    ];
  }

  const sentences = splitIntoSentences(text).filter((item) => item.length >= 8);
  const bullets = sentences.slice(0, 5).map((item) => item.replace(/[。！？.!?]+$/, ""));

  if (bullets.length >= 3) {
    return bullets;
  }

  const lines = takeMeaningfulLines(text)
    .map((line) => line.replace(/^[-*+]\s+/, "").trim())
    .filter((line) => line.length >= 8)
    .slice(0, 5);

  if (lines.length >= 3 || bullets.length + lines.length >= 3) {
    return dedupeSummaryItems([...bullets, ...lines]).slice(0, 5);
  }

  const fallback = dedupeSummaryItems([...bullets, ...lines]);
  if (label) {
    fallback.push(`这一节围绕“${label}”展开。`);
  }
  fallback.push("可以根据正文补充更具体的观察、判断或数据。");
  fallback.push("如果你希望这一节更完整，可以手动把关键结论写进 summary。");
  return dedupeSummaryItems(fallback).slice(0, 5);
}

function normalizeSummaryPayload(payload, sections) {
  const normalizedSections = (payload.sectionSummaries ?? [])
    .map((entry) => ({
      heading: String(entry.heading ?? "").trim(),
      summary: Array.isArray(entry.summary)
        ? entry.summary.map((item) => String(item).trim()).filter(Boolean).slice(0, 5)
        : [],
    }))
    .filter((entry) => entry.heading && entry.summary.length > 0);

  const allowedHeadings = new Set(sections.map((section) => section.heading));

  return {
    fullSummary: Array.isArray(payload.fullSummary)
      ? payload.fullSummary.map((item) => String(item).trim()).filter(Boolean).slice(0, 5)
      : [],
    sectionSummaries: normalizedSections.filter((entry) => allowedHeadings.has(entry.heading)),
  };
}

function tryParseJson(text) {
  const raw = String(text ?? "").trim();
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(raw.slice(start, end + 1));
      } catch {
        return null;
      }
    }
  }

  return null;
}

async function generateSummariesWithOpenAI({ title, intro, sections, apiKey, model }) {
  const prompt = {
    title,
    intro,
    sections: sections.map((section) => ({
      heading: section.heading,
      content: cleanInlineMarkdown(section.content).slice(0, 2200),
    })),
    instructions: [
      "请为这篇中文个人博客文章生成读者导览型总结。",
      "语气要克制、清晰，不要鸡汤，不要公众号风。",
      "如果文章有 H2，就为每个 H2 生成 3-5 条 bullet。",
      "如果某个 H2 内容很短，可以不给它 summary。",
      "如果没有 H2，请生成 3-5 条全文要点。",
      "只输出 JSON，不要额外解释。",
      'JSON 结构必须是 {"fullSummary": string[], "sectionSummaries": [{"heading": string, "summary": string[]}]}。',
    ],
  };

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text: "你是一个克制、清晰的中文编辑助手，负责为个人博客文章生成简短导览总结。",
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: JSON.stringify(prompt),
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API 请求失败：${response.status}`);
  }

  const payload = await response.json();
  const text = payload.output_text ?? "";
  const parsed = tryParseJson(text);

  if (!parsed) {
    throw new Error("无法解析 OpenAI 返回的 JSON 总结。");
  }

  return normalizeSummaryPayload(parsed, sections);
}

export async function generateSummaryData(markdown, options = {}) {
  const { intro, sections } = splitMarkdownByH2(markdown);
  const meaningfulSections = sections.filter(
    (section) => cleanInlineMarkdown(section.content).length >= 80,
  );
  const apiKey = options.apiKey ?? process.env.OPENAI_API_KEY ?? "";
  const model = options.model ?? process.env.OPENAI_MODEL ?? "gpt-5-mini";

  if (apiKey) {
    try {
      return {
        ...(await generateSummariesWithOpenAI({
          title: options.title ?? "",
          intro,
          sections,
          apiKey,
          model,
        })),
        usedAI: true,
      };
    } catch (error) {
      console.warn(`OpenAI 自动总结失败，已回退到占位总结：${error.message}`);
    }
  }

  if (meaningfulSections.length === 0) {
    const combined = cleanInlineMarkdown([intro, ...sections.map((section) => section.content)].join("\n"));
    return {
      fullSummary: buildFallbackSummaryItems(combined, options.title ?? "全文"),
      sectionSummaries: [],
      usedAI: false,
    };
  }

  return {
    fullSummary: intro ? buildFallbackSummaryItems(intro, options.title ?? "全文") : [],
    sectionSummaries: meaningfulSections.map((section) => ({
      heading: section.heading,
      summary: buildFallbackSummaryItems(section.content, section.heading),
    })),
    usedAI: false,
  };
}
