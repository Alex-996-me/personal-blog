function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function normalizeSummaryHeading(value) {
  return String(value).trim().replace(/\s+/g, " ");
}

function normalizeAnchorSlug(value) {
  const normalized = String(value)
    .trim()
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}\s-]+/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return normalized || "section";
}

function createSlugger() {
  const counts = new Map();

  return (value) => {
    const base = normalizeAnchorSlug(value);
    const current = counts.get(base) ?? 0;
    counts.set(base, current + 1);
    return current === 0 ? base : `${base}-${current + 1}`;
  };
}

function createTextNode(value) {
  return {
    type: "text",
    value,
  };
}

function getMdastText(node) {
  if (!node || typeof node !== "object") {
    return "";
  }

  if (typeof node.value === "string") {
    return node.value;
  }

  if (!Array.isArray(node.children)) {
    return "";
  }

  return node.children.map((child) => getMdastText(child)).join("");
}

function getHastText(node) {
  if (!node || typeof node !== "object") {
    return "";
  }

  if (node.type === "text") {
    return node.value ?? "";
  }

  if (!Array.isArray(node.children)) {
    return "";
  }

  return node.children.map((child) => getHastText(child)).join("");
}

function extractYoutubeId(value) {
  const input = value.trim();
  if (!input) {
    return "";
  }

  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
    return input;
  }

  try {
    const url = new URL(input);
    if (url.hostname.includes("youtu.be")) {
      return url.pathname.replace("/", "");
    }
    if (url.searchParams.get("v")) {
      return url.searchParams.get("v") ?? "";
    }
    const parts = url.pathname.split("/").filter(Boolean);
    return parts.at(-1) ?? "";
  } catch {
    return "";
  }
}

function getYoutubeEmbedUrl(value) {
  const id = extractYoutubeId(value);
  return id ? `https://www.youtube.com/embed/${id}` : "";
}

function getBilibiliEmbedUrl(value) {
  try {
    const url = new URL(value.trim());
    const bvidMatch = url.pathname.match(/\/video\/(BV[0-9A-Za-z]+)/i);
    if (bvidMatch) {
      return `https://player.bilibili.com/player.html?bvid=${bvidMatch[1]}&page=1`;
    }

    const aidMatch = url.pathname.match(/\/video\/av(\d+)/i);
    if (aidMatch) {
      return `https://player.bilibili.com/player.html?aid=${aidMatch[1]}&page=1`;
    }
  } catch {
    return "";
  }

  return "";
}

function renderSummaryBlock(items, title, variant) {
  if (!Array.isArray(items) || items.length === 0) {
    return "";
  }

  const list = items
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");

  return [
    `<!-- ${variant}-summary:start -->`,
    `<section class="section-summary section-summary--${variant}">`,
    `<p class="section-summary__title">${escapeHtml(title)}</p>`,
    `<ul>${list}</ul>`,
    `</section>`,
    `<!-- ${variant}-summary:end -->`,
  ].join("");
}

function createVideoEmbedNode(url) {
  const youtubeEmbedUrl = getYoutubeEmbedUrl(url);
  const bilibiliEmbedUrl = youtubeEmbedUrl ? "" : getBilibiliEmbedUrl(url);
  const embedUrl = youtubeEmbedUrl || bilibiliEmbedUrl;

  if (!embedUrl) {
    return null;
  }

  const label = youtubeEmbedUrl ? "YouTube 视频" : "Bilibili 视频";

  return {
    type: "html",
    value: [
      '<div class="video-embed video-embed--inline">',
      `<iframe src="${escapeHtml(embedUrl)}" title="${label}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
      "</div>",
    ].join(""),
  };
}

function getStandaloneLinkHref(node) {
  if (!node || node.type !== "paragraph" || !Array.isArray(node.children)) {
    return "";
  }

  const meaningfulChildren = node.children.filter((child) => {
    if (child.type === "text") {
      return child.value.trim().length > 0;
    }
    return true;
  });

  if (meaningfulChildren.length !== 1) {
    return "";
  }

  const child = meaningfulChildren[0];
  if (child.type !== "link") {
    return "";
  }

  return typeof child.url === "string" ? child.url : "";
}

export function remarkEnhanceBlogMarkdown() {
  return (tree, file) => {
    const frontmatter = file?.data?.astro?.frontmatter ?? {};
    const sectionSummaries = new Map(
      (frontmatter.sectionSummaries ?? []).map((entry) => [
        normalizeSummaryHeading(entry.heading),
        Array.isArray(entry.summary) ? entry.summary : [],
      ]),
    );
    const fullSummary = Array.isArray(frontmatter.fullSummary) ? frontmatter.fullSummary : [];
    const nextChildren = [];

    if (fullSummary.length > 0) {
      nextChildren.push({
        type: "html",
        value: renderSummaryBlock(fullSummary, "全文要点", "full"),
      });
    }

    for (const node of tree.children ?? []) {
      const standaloneHref = getStandaloneLinkHref(node);
      if (standaloneHref) {
        const embedNode = createVideoEmbedNode(standaloneHref);
        if (embedNode) {
          nextChildren.push(embedNode);
          continue;
        }
      }

      nextChildren.push(node);

      if (node.type === "heading" && node.depth === 2) {
        const heading = normalizeSummaryHeading(getMdastText(node));
        const summary = sectionSummaries.get(heading);
        if (summary && summary.length > 0) {
          nextChildren.push({
            type: "html",
            value: renderSummaryBlock(summary, "本节要点", "section"),
          });
        }
      }
    }

    tree.children = nextChildren;
  };
}

function isExternalHref(href) {
  return /^https?:\/\//i.test(href) || href.startsWith("//");
}

function createElement(tagName, properties = {}, children = []) {
  return {
    type: "element",
    tagName,
    properties,
    children,
  };
}

function getTableMetrics(tableNode) {
  const rows = [];

  const visit = (node) => {
    if (!node || typeof node !== "object") {
      return;
    }

    if (node.type === "element" && node.tagName === "tr") {
      rows.push(node);
    }

    if (Array.isArray(node.children)) {
      node.children.forEach(visit);
    }
  };

  visit(tableNode);

  const columnCount = rows.reduce((count, row) => {
    const cells = (row.children ?? []).filter(
      (child) =>
        child.type === "element" && (child.tagName === "td" || child.tagName === "th"),
    );
    return Math.max(count, cells.length);
  }, 0);

  const hasHeader = rows[0]?.children?.some(
    (child) => child.type === "element" && child.tagName === "th",
  );
  const rowCount = Math.max(rows.length - (hasHeader ? 1 : 0), 0);
  const textLength = getHastText(tableNode).replace(/\s+/g, " ").trim().length;

  return { rowCount, columnCount, textLength };
}

function buildTocList(items) {
  const rootItems = [];
  let currentParent = null;

  for (const item of items) {
    const listItem = createElement("li", {}, [
      createElement("a", { href: `#${item.id}` }, [createTextNode(item.text)]),
    ]);

    if (item.depth === 2 || !currentParent) {
      rootItems.push(listItem);
      currentParent = item.depth === 2 ? listItem : currentParent;
      continue;
    }

    let sublist = currentParent.children.find(
      (child) => child.type === "element" && child.tagName === "ul",
    );

    if (!sublist) {
      sublist = createElement("ul", { className: ["article-toc__sublist"] }, []);
      currentParent.children.push(sublist);
    }

    sublist.children.push(listItem);
  }

  return createElement("ul", { className: ["article-toc__list"] }, rootItems);
}

function createTocBlock(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return createElement("details", { className: ["article-toc"] }, [
    createElement("summary", { className: ["article-toc__summary"] }, [
      createTextNode("目录"),
    ]),
    createElement("div", { className: ["article-toc__body"] }, [buildTocList(items)]),
  ]);
}

export function rehypeEnhanceBlogContent() {
  return (tree) => {
    const makeSlug = createSlugger();
    const tocItems = [];

    const visit = (node, parent = null, index = -1) => {
      if (!node || typeof node !== "object") {
        return;
      }

      if (node.type === "element" && /^h[2-4]$/.test(node.tagName)) {
        const headingText = getHastText(node).replace(/\s+/g, " ").trim();
        if (headingText) {
          const depth = Number(node.tagName.replace("h", ""));
          const id =
            typeof node.properties?.id === "string" && node.properties.id.trim()
              ? node.properties.id.trim()
              : makeSlug(headingText);

          node.properties = {
            ...node.properties,
            id,
          };

          if (depth <= 3) {
            tocItems.push({
              id,
              text: headingText,
              depth,
            });
          }
        }
      }

      if (node.type === "element" && node.tagName === "a") {
        const href = typeof node.properties?.href === "string" ? node.properties.href : "";
        if (href && isExternalHref(href)) {
          node.properties = {
            ...node.properties,
            target: "_blank",
            rel: "noopener noreferrer",
          };
        }
      }

      if (
        parent &&
        node.type === "element" &&
        node.tagName === "table" &&
        Array.isArray(parent.children) &&
        !(parent.type === "element" && parent.tagName === "details")
      ) {
        const metrics = getTableMetrics(node);
        const shouldCollapse =
          metrics.rowCount > 8 || metrics.columnCount > 5 || metrics.textLength > 1200;

        const wrappedTable = createElement("div", { className: ["table-scroll"] }, [node]);
        const replacement = shouldCollapse
          ? createElement("details", { className: ["collapsible-table"] }, [
              createElement("summary", {}, [
                createElement("span", { className: ["collapsible-table__title"] }, [
                  createTextNode("展开查看数据表格"),
                ]),
                createElement("span", { className: ["collapsible-table__meta"] }, [
                  createTextNode(`共 ${metrics.rowCount} 行，${metrics.columnCount} 列。`),
                ]),
              ]),
              wrappedTable,
            ])
          : wrappedTable;

        parent.children[index] = replacement;
        return;
      }

      if (Array.isArray(node.children)) {
        node.children.forEach((child, childIndex) => visit(child, node, childIndex));
      }
    };

    visit(tree);

    const tocBlock = createTocBlock(tocItems);
    if (tocBlock) {
      tree.children.unshift(tocBlock);
    }
  };
}
