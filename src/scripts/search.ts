type Result = { title: string; description: string; kind: string; section: string; date: string; url: string; text?: string; updated?: string; snippet?: string };
type PagefindResult = { url: string; excerpt: string; meta: Record<string, string> };
type Pagefind = { search(query: string): Promise<{ results: { data(): Promise<PagefindResult> }[] }> };
let engine: Promise<Pagefind> | undefined;
let fallback: Promise<Result[]> | undefined;
const escapeHtml = (text = "") => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const labels: Record<string, string> = { ARTICLE: "文章", MOMENT: "生活" };
const base = import.meta.env.BASE_URL.replace(/\/$/, "");
const contentUrl = (value: string) => {
  const url = new URL(value, location.origin);
  if (url.origin !== location.origin) return "";
  if (base && !url.pathname.startsWith(base + "/")) url.pathname = base + url.pathname;
  return url.pathname.startsWith(base + "/posts/") || url.pathname.startsWith(base + "/moments/") ? url.pathname : "";
};
for (const root of document.querySelectorAll<HTMLElement>("[data-search-root]")) {
  const input = root.querySelector<HTMLInputElement>("[data-search-input]")!;
  const results = root.querySelector<HTMLElement>("[data-search-results]")!;
  const status = root.querySelector<HTMLElement>("[data-search-status]")!;
  const panel = root.querySelector<HTMLElement>("[data-search-panel]")!;
  const links = () => [...results.querySelectorAll<HTMLAnchorElement>("a")];
  const open = () => { panel.hidden = false; input.setAttribute("aria-expanded", "true"); };
  const close = () => { panel.hidden = true; input.setAttribute("aria-expanded", "false"); ++request; clearTimeout(timer); };
  const navigateResults = (direction: number) => {
    const items = links();
    if (!items.length) return;
    const index = items.indexOf(document.activeElement as HTMLAnchorElement);
    const next = index < 0 ? (direction > 0 ? 0 : items.length - 1) : (index + direction + items.length) % items.length;
    items[next].focus();
  };
  let request = 0;
  let timer: ReturnType<typeof setTimeout>;
  const run = async (query: string, current: number) => {
    const cleaned = query.trim();

    if (!cleaned) { results.replaceChildren(); close(); return; }
    open();
    results.replaceChildren();
    status.textContent = "正在搜索…";
    try {
      let entries: Result[];
      try {
        engine ??= import(/* @vite-ignore */ root.dataset.pagefindUrl!) as Promise<Pagefind>;
        const response = await (await engine).search(cleaned);
        const data = await Promise.all(response.results.slice(0, 6).map((result) => result.data()));
        entries = data.map(({ url, meta, excerpt }) => ({ url, title: meta.title, description: meta.description || new DOMParser().parseFromString(excerpt ?? "", "text/html").body.textContent?.slice(0, 140) || "", kind: meta.type, section: meta.section ?? "", date: meta.date ?? "" }));
      } catch {
        engine = undefined;
        fallback ??= fetch(root.dataset.fallbackIndex!).then((response) => { if (!response.ok) throw Error("Search unavailable"); return response.json(); });
        const words = cleaned.toLowerCase().split(/\s+/);
        entries = (await fallback).filter((entry) => words.every((word) => `${entry.title} ${entry.description} ${entry.text ?? ""}`.toLowerCase().includes(word))).slice(0, 6).map((entry) => ({ ...entry, date: entry.kind === "ARTICLE" ? entry.updated ?? entry.date : entry.date, description: entry.description || entry.snippet || entry.text?.slice(0, 140) || "" }));
      }
      if (current !== request) return;
      entries = entries.filter((entry) => labels[entry.kind] && contentUrl(entry.url));
      status.textContent = entries.length ? `显示 ${entries.length} 条相关内容。` : "没有找到相关内容。";
      results.innerHTML = entries.map((entry) => `<a class="search-result" href="${escapeHtml(contentUrl(entry.url))}"><span class="search-result__type">${labels[entry.kind]}</span><strong>${escapeHtml(entry.title)}</strong>${entry.description ? `<p>${escapeHtml(entry.description)}</p>` : ""}<small>${escapeHtml([entry.section, entry.date?.replaceAll("-", ".")].filter(Boolean).join(" · "))}</small></a>`).join("");
    } catch {
      fallback = undefined;
      if (current === request) { results.replaceChildren(); status.textContent = "搜索暂不可用，请稍后再试。"; }
    }
  };
  input.addEventListener("input", () => {
    clearTimeout(timer);
    const current = ++request;
    results.replaceChildren();
    if (!input.value.trim()) { close(); return; }
    open();
    status.textContent = "正在搜索…";
    timer = setTimeout(() => void run(input.value, current), 180);
  });

  input.addEventListener("focus", () => {
    if (!input.value.trim()) return;
    if (links().length) open();
    else void run(input.value, ++request);
  });
  root.addEventListener("keydown", (event) => {
    if (event.key === "Escape") { event.preventDefault(); input.focus(); close(); }
    else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (panel.hidden) void run(input.value, ++request);
      else navigateResults(event.key === "ArrowDown" ? 1 : -1);
    } else if (event.key === "Enter" && event.target === input && !panel.hidden && links().length) {
      event.preventDefault(); links()[0].click();
    }
  });
  root.addEventListener("focusout", (event) => { if (!root.contains(event.relatedTarget as Node)) close(); });
  document.addEventListener("pointerdown", (event) => { if (!root.contains(event.target as Node)) close(); });
  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); input.focus(); }
  });
  if (location.hash === "#header-search-input") {
    input.value = new URLSearchParams(location.search).get("q") ?? "";
    input.focus();
    // Fragment navigation may focus the input before this script attaches listeners.
    if (input.value.trim() && panel.hidden) void run(input.value, ++request);
  }
}
