import { readdir } from "node:fs/promises";
import matter from "gray-matter";
import { readOptional, atomicWrite } from "./daily-core.mjs";

// Local metadata only. Bodies stay in the existing ignored daily snapshots, referenced
// by filename + ID. 14 rolling days by publication date; no archive crawling.
export const RESERVOIR_DAYS = 14;
export function eligible(record, active, now = new Date()) {
  const age = now - new Date(record.publishedAt);
  return record.status === "eligible" && active.has(record.source) && age >= 0 && age <= RESERVOIR_DAYS * 86400000;
}
export function addRecords(reservoir, inputs, ref, date) {
  for (const item of inputs.filter((i) => i.access === "public" && i.publishedAt)) {
    if (!reservoir.items[item.id]) reservoir.items[item.id] = {
      id: item.id, source: item.source, publishedAt: item.publishedAt,
      discoveredAt: date, ref, status: "eligible",
    };
  }
}
export function recordDecisions(reservoir, gate, dropped, date) {
  for (const decision of [...(gate?.drop ?? []), ...dropped]) {
    const record = reservoir.items[decision.id];
    if (!record || record.status === "published") continue;
    record.lastConsidered = date;
    // Missing evidence / attention limit is not a permanent value judgment.
    if (!["deferred", "needs_context"].includes(decision.reason)) {
      record.status = "rejected"; record.reason = decision.reason;
    }
  }
}
export async function loadReservoir(date) {
  const file = "daily/.local/reservoir.json";
  const reservoir = JSON.parse(await readOptional(file, '{"items":{}}'));
  if (!reservoir.migrated) {
    // Only recent normalized snapshots; never send old Daily prose to the LLM.
    for (const name of (await readdir("daily/.local")).filter((n) => /^\d{4}-\d{2}-\d{2}\.json$/.test(n)).sort()) {
      if (Date.parse(date) - Date.parse(name.slice(0, 10)) > RESERVOIR_DAYS * 86400000) continue;
      const snapshot = JSON.parse(await readOptional(`daily/.local/${name}`));
      addRecords(reservoir, snapshot.inputs ?? [], name, name.slice(0, 10));
      recordDecisions(reservoir, snapshot.gate, snapshot.dropped ?? [], name.slice(0, 10));
    }
    reservoir.migrated = true;
  }
  // Publication is determined by actual documents, not by generation or legacy seen.
  // This also handles manually approved publication without modifying that workflow.
  for (const name of (await readdir("src/content/daily")).filter((n) => /^\d{4}-\d{2}-\d{2}\.md$/.test(n))) {
    const doc = matter(await readOptional(`src/content/daily/${name}`));
    if (!["published", "archive"].includes(doc.data.status)) continue;
    for (const [, id] of doc.content.matchAll(/<!-- daily-source: ([a-f0-9]{24}) -->/g)) {
      reservoir.items[id] = { ...reservoir.items[id], id, status: "published", publishedDaily: doc.data.date };
    }
  }
  await atomicWrite(file, JSON.stringify(reservoir, null, 2) + "\n");
  return reservoir;
}
export async function reservoirInputs(reservoir, active, now = new Date()) {
  const snapshots = new Map(), result = [];
  const records = Object.values(reservoir.items).filter((r) => eligible(r, active, now))
    .sort((a, b) => (a.lastConsidered ?? "").localeCompare(b.lastConsidered ?? "") || a.discoveredAt.localeCompare(b.discoveredAt));
  for (const record of records) {
    if (!/^\d{4}-\d{2}-\d{2}(?:\.candidates)?\.json$/.test(record.ref)) throw Error("Invalid reservoir snapshot reference");
    if (!snapshots.has(record.ref)) snapshots.set(record.ref, JSON.parse(await readOptional(`daily/.local/${record.ref}`, '{"inputs":[]}')));
    const item = snapshots.get(record.ref).inputs.find((i) => i.id === record.id);
    if (!item) throw Error(`Reservoir snapshot missing candidate ${record.id}; restore its local snapshot`);
    result.push(item);
  }
  return result;
}
