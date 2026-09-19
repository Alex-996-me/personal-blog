import { mkdir, open, unlink } from "node:fs/promises";
import matter from "gray-matter";
import { today, hash, readOptional, atomicWrite, parseFeed, readDatedInbox, readManualUrl, dedupe, llmConfig, loadDailyContext, renderDaily, fetchText } from "./daily-core.mjs";
import { SELECTION_VERSION, selectDaily } from "./daily-selection.mjs";
import { loadReservoir, reservoirInputs, addRecords, recordDecisions } from "./daily-reservoir.mjs";

const date = today();
const target = `src/content/daily/${date}.md`;
const local = "daily/.local";
let lock;
try {
  await mkdir(local, { recursive: true });
  lock = await open(`${local}/run.lock`, "wx");
  const config = llmConfig();
  const { editorial, profile } = await loadDailyContext();
  const previous = await readOptional(target);
  if (previous && matter(previous).data.status !== "draft") throw Error(`${target}: already published/archived; generation will not overwrite it`);
  const inbox = await readDatedInbox(date);
  const state = JSON.parse(await readOptional(`${local}/state.json`, '{"seen":{}}'));
  const cached = JSON.parse(await readOptional(`${local}/${date}.json`, '{"inputs":[]}'));
  const sources = JSON.parse(await readOptional("data/daily-sources.json", "[]"));
  const stableInputs = (items) => items.map(({ collectedAt, ...item }) => item);
  // Collection is independent of prompt changes; calibration can reuse today's inputs.
  const collectionKey = hash(JSON.stringify({ sources, inbox: stableInputs(inbox), version: "reservoir-14d-v1" }));
  const legacyKey = hash(JSON.stringify({ sources, inbox: stableInputs(inbox), version: "rich-reservoir-v1" }));
  const pendingPath = `${local}/${date}.pending.json`;
  let pending = JSON.parse(await readOptional(pendingPath, "null"));
  if (!pending && [collectionKey, legacyKey].includes(cached.collectionKey)) pending = { collectionKey, inputs: cached.inputs };
  const activeSources = new Set(sources.filter((source) => source.enabled).map((source) => source.name));
  const reservoir = await loadReservoir(date);
  // Deactivating a feed also removes its candidates from same-day replay; keep dedupe history.
  cached.inputs = cached.inputs.filter((item) => reservoir.items[item.id]?.status !== "published" && (!item.publishedAt || activeSources.has(item.source)));
  let inputs;
  if (pending?.collectionKey === collectionKey) {
    inputs = pending.inputs;
    await atomicWrite(pendingPath, JSON.stringify(pending, null, 2) + "\n");
    console.log(`Resuming ${inputs.length} saved candidates; no feed or manual URL refetch`);
  } else {
    const collected = [];
    let healthyFeeds = 0;
    for (const source of sources.filter((source) => source.enabled)) {
      if (source.type !== "feed" || source.access !== "public") throw Error(`${source.id}: D1 only supports public feeds`);
      try {
        const items = parseFeed(await fetchText(source.feed, source.name), source);
        healthyFeeds++;
        const fresh = items.filter((item) => !["published", "rejected"].includes(reservoir.items[item.id]?.status));
        collected.push(...fresh);
        console.log(`${source.name}: ${items.length} in window, ${fresh.length} eligible`);
      } catch (error) {
        console.warn(`Skipped feed: ${error.message}`);
      }
    }
    const manual = dedupe(inbox).filter((item) => reservoir.items[item.id]?.status !== "published" && (!state.seen[item.id] || cached.inputs.some((i) => i.id === item.id)));
    for (const item of manual) {
      if (item.text.length > 16000) throw Error(`Manual text exceeds 16,000 characters; use a shorter extract in daily/inbox/${date}/inbox.md`);
      const known = [...cached.inputs, ...collected].find((input) => input.id === item.id);
      collected.push(known ?? (item.url && item.access === "public" ? await readManualUrl(item) : item));
    }
    const ref = `${date}.candidates.json`;
    const saved = JSON.parse(await readOptional(`${local}/${ref}`, '{"inputs":[]}'));
    const stored = dedupe([...saved.inputs, ...cached.inputs, ...collected]);
    await atomicWrite(`${local}/${ref}`, JSON.stringify({ inputs: stored }, null, 2) + "\n");
    addRecords(reservoir, stored, ref, date);
    await atomicWrite(`${local}/reservoir.json`, JSON.stringify(reservoir, null, 2) + "\n");
    const unread = await reservoirInputs(reservoir, activeSources);
    const manualIds = new Set(manual.map((i) => i.id));
    const manualItems = stored.filter((i) => manualIds.has(i.id) || (!i.publishedAt && cached.inputs.some((c) => c.id === i.id)));
    // Bounded gate queue, manual first; remaining public candidates stay in reservoir.
    if (manualItems.length > 40) throw Error("More than 40 manual items today; inbox preserved. Split into dated reading sessions.");
    inputs = dedupe([...manualItems, ...unread]).slice(0, 40);
    console.log(`Reservoir eligible: ${unread.length}; manual: ${manualItems.length}; today's gate queue: ${inputs.length}`);
    if (!inputs.length && !healthyFeeds && sources.some((source) => source.enabled)) throw Error("All enabled feeds failed and no inputs are available; no draft changed");
    pending = { collectionKey, inputs };
    // Commit collection before any model call; failures never require repeating collection.
    await atomicWrite(pendingPath, JSON.stringify(pending, null, 2) + "\n");
  }
  const fingerprint = hash(JSON.stringify(stableInputs(inputs)) + editorial + config.model + SELECTION_VERSION);
  if (previous && cached.fingerprint === fingerprint) {
    console.log(`Unchanged: collected ${inputs.length}, retained ${matter(previous).data.itemCount}. Draft preserved: ${target}`);
  } else {
    console.log(`Collected ${inputs.length} unique inputs (${inputs.filter((item) => item.access === "private").length} private); requesting AI selection…`);
    const metrics = [];
    const report = (metric) => { metrics.push(metric); console.log(JSON.stringify(metric)); };
    const gateKey = hash(JSON.stringify(stableInputs(inputs)) + profile + config.model + SELECTION_VERSION);
    const notesKey = hash(fingerprint + config.endpoint.href);
    let decision;
    const items = inputs.length ? await selectDaily(inputs, editorial, profile, config, {
      gate: pending.gateKey === gateKey ? pending.gate : undefined,
      saveGate: async (gate) => {
        pending.gateKey = gateKey; pending.gate = gate;
        await atomicWrite(pendingPath, JSON.stringify(pending, null, 2) + "\n");
      }, report,
      notesCache: pending.notesKey === notesKey ? pending.notes : {},
      saveNotes: async (notes) => {
        pending.notesKey = notesKey; pending.notes = notes;
        await atomicWrite(pendingPath, JSON.stringify(pending, null, 2) + "\n");
      },
      saveDecision: async (output) => { decision = output; },
    }) : [];
    const markdown = renderDaily(date, items);
    // Keep a recovery copy even when the author edited yesterday's generated text.
    if (previous) await atomicWrite(`${local}/backups/${date}-${hash(previous)}.md`, previous);
    await atomicWrite(target, markdown);
    await atomicWrite(`${local}/${date}.json`, JSON.stringify({ collectionKey, fingerprint, inputs, gate: pending.gate, dropped: decision?.drop ?? [], decision, metrics }, null, 2) + "\n");
    recordDecisions(reservoir, pending.gate, decision?.drop ?? [], date);
    for (const item of inputs) if (reservoir.items[item.id]) reservoir.items[item.id].lastConsidered = date;
    await atomicWrite(`${local}/reservoir.json`, JSON.stringify(reservoir, null, 2) + "\n");
    console.log(`Collected ${inputs.length}; retained ${items.length}. Draft: ${target}`);
    console.log(`Preview: npm run dev → /personal-blog/daily/${date}/. Inbox preserved; no publication or Git action.`);
  }
  for (const item of inputs) state.seen[item.id] = date;
  await atomicWrite(`${local}/state.json`, JSON.stringify(state, null, 2) + "\n");
  await unlink(pendingPath).catch((error) => { if (error.code !== "ENOENT") throw error; });
} catch (error) {
  console.error(error.code === "EEXIST" ? "Daily is already running. If it crashed, remove daily/.local/run.lock after checking no Daily command is running." : `Daily failed: ${error.message}`);
  process.exitCode = 1;
} finally {
  if (lock) { await lock.close(); await unlink(`${local}/run.lock`); }
}
