const region = document.querySelector<HTMLElement>("[data-essay-reading]");
const body = region?.querySelector<HTMLElement>("[data-essay-body]");
const progress = document.querySelector<HTMLElement>("[data-reading-progress]");

if (region && body && progress) {
  // Use rendered headings and existing IDs, never a second slug algorithm.
  const headings = [...body.querySelectorAll<HTMLHeadingElement>("h2[id]")].filter(
    (heading) => !/^(参考资料|参考文献|参考|references|bibliography|sources)$/i.test(heading.textContent?.trim() ?? ""),
  );
  const links: HTMLAnchorElement[] = [];
  if (headings.length >= 3) {
    const rail = document.createElement("div");
    rail.className = "essay-section-rail";
    rail.setAttribute("data-pagefind-ignore", "");
    const nav = document.createElement("nav");
    nav.setAttribute("aria-label", "文章章节");
    const list = document.createElement("ol");
    for (const heading of headings) {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = `#${encodeURIComponent(heading.id)}`;
      link.textContent = heading.textContent;
      item.append(link);
      list.append(item);
      links.push(link);
    }
    nav.append(list);
    rail.append(nav);
    region.append(rail);
  }

  let start = 0;
  let end = 0;
  let sectionPositions: number[] = [];
  let active = -1;
  let frame = 0;
  let needsMeasure = true;
  const update = () => {
    frame = 0;
    const scroll = window.scrollY;
    if (needsMeasure) {
      const rect = body.getBoundingClientRect();
      // Start when the body reaches the reading line; finish when its end is visible.
      start = rect.top + scroll - 32;
      end = rect.bottom + scroll - window.innerHeight;
      sectionPositions = headings.map((heading) => heading.getBoundingClientRect().top + scroll);
      needsMeasure = false;
    }
    const fraction = end > start ? (scroll - start) / (end - start) : (scroll >= start ? 1 : 0);
    progress.style.transform = `scaleX(${Math.max(0, Math.min(1, fraction))})`;
    let current = -1;
    for (let i = 0; i < sectionPositions.length; i++) {
      if (sectionPositions[i] <= scroll + 96) current = i;
      else break;
    }
    if (current !== active) {
      links[active]?.removeAttribute("aria-current");
      links[current]?.setAttribute("aria-current", "location");
      active = current;
    }
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
  const measure = () => { needsMeasure = true; schedule(); };
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", measure, { passive: true });
  window.addEventListener("pageshow", measure);
  new ResizeObserver(measure).observe(region.closest("article")!);
  void document.fonts.ready.then(measure);
  progress.hidden = false;
  measure();
}
