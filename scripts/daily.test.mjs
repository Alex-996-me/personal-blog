import test from "node:test";
import assert from "node:assert/strict";
import matter from "gray-matter";
import fs from "node:fs/promises";
import { canonicalUrl, dedupe, manualInputs, readDatedInbox, dailyInputContent, summarize, parseFeed, renderDaily, validateOutput } from "./daily-core.mjs";
import { dailyDocumentErrors } from "../src/lib/daily-contract.mjs";
import { candidateCards, validateGate, selectDaily, validateEditionOutput, deepEditorial } from "./daily-selection.mjs";
import { boundDailyTexts, requestDailyJson, dailyRequestBody } from "./daily-core.mjs";
import { eligible, addRecords, recordDecisions } from "./daily-reservoir.mjs";

test("manual blocks stay private; URL tracking variants deduplicate", () => {
  const items = manualInputs("https://example.org/a?utm_source=x\nhttps://example.org/a\n\nprivate text\nsecond line\n---\nprivate   text\nsecond line");
  assert.equal(items.length, 4);
  assert.equal(dedupe(items).length, 2);
  assert.equal(items[2].access, "private");
  assert.equal(items[2].url, undefined);
  assert.equal(canonicalUrl("https://example.org/a?b=2&a=1"), "https://example.org/a?a=1&b=2");
  assert.throws(() => canonicalUrl("file:///secret"));
});

test("RSS/Atom parsing honors the explicit collection window", () => {
  const source = { id: "demo", name: "Demo" }, now = new Date("2026-09-18T12:00:00Z");
  const xml = '<rss><channel><item><title>A &amp; B</title><link>https://example.org/a</link><pubDate>2026-09-17</pubDate><description><![CDATA[<p>Useful <strong>text</strong></p>]]></description></item><item><title>Old</title><guid>old</guid><pubDate>2026-01-01</pubDate><description>Old</description></item><item><title>Future</title><guid>future</guid><pubDate>2026-09-20</pubDate><description>Future</description></item></channel></rss>';
  const items = parseFeed(xml, source, now);
  assert.equal(items.length, 1); assert.equal(items[0].title, "A & B");
  const atom = '<feed><entry><id>one</id><title>Atom</title><link href="https://example.org/a"/><updated>2026-09-17</updated><summary>Useful text</summary></entry></feed>';
  assert.equal(parseFeed(atom, source, now)[0].id, items[0].id);
  assert.throws(() => parseFeed("<rss>", source, now), /invalid XML/);
});

test("model cannot invent sources, duplicate items or reproduce private text", () => {
  const inputs = manualInputs("These private materials include a long passage that must not be reproduced in the public Daily.");
  assert.deepEqual(validateOutput({ items: [] }, inputs), []);
  const item = { id: inputs[0].id, title: "Takeaway", summary: "A brief personal conclusion." };
  assert.equal(validateOutput({ items: [item] }, inputs)[0].sourceName, "manual");
  assert.throws(() => validateOutput({ items: [{ ...item, id: "unknown" }] }, inputs), /unknown/);
  assert.throws(() => validateOutput({ items: [item, item] }, inputs), /duplicate/);
  assert.throws(() => validateOutput({ items: [{ ...item, summary: inputs[0].text }] }, inputs), /private wording/);
  assert.throws(() => validateOutput({ items: [{ ...item, summary: "x".repeat(241) }] }, inputs), /summary/);
});

test("deterministic Markdown validates attribution/count and escapes model markup", () => {
  const [source] = manualInputs("https://example.org/article");
  const items = validateOutput({ items: [{ id: source.id, title: "<script>test</script>", summary: "A [link](javascript:test) is just text." }] }, [source]);
  const { data, content } = matter(renderDaily("2026-09-18", items));
  assert.ok(!content.includes("<script>"));
  assert.deepEqual(dailyDocumentErrors({ ...data, status: "published" }, content, "2026-09-18.md"), []);
  assert.ok(dailyDocumentErrors({ ...data, status: "published", itemCount: 2 }, content).length);
  assert.ok(dailyDocumentErrors({ ...data, status: "published" }, content.replace("来源：", "unknown:")).length);
  assert.ok(dailyDocumentErrors({ ...data, date: "2026-02-30" }, content).length);
  const empty = matter(renderDaily("2026-09-18", []));
  assert.deepEqual(dailyDocumentErrors(empty.data, empty.content), []);
  assert.deepEqual(dailyDocumentErrors({ ...empty.data, status: "published" }, empty.content), []);
  assert.ok(dailyDocumentErrors({ ...empty.data, status: "published" }, "Unexpected content").length);
});

test("manual editions pass publication validation without inventing a source URL", () => {
  const [input] = manualInputs("An original manually supplied reading.");
  const items = validateOutput({ items: [{ id: input.id, title: "Manual reading", summary: "A transformed interpretation." }] }, [input]);
  const doc = matter(renderDaily("2026-09-19", items));
  assert.ok(doc.content.includes("来源：manual"));
  assert.deepEqual(dailyDocumentErrors({ ...doc.data, status: "published" }, doc.content), []);
  assert.ok(dailyDocumentErrors({ ...doc.data, status: "published" }, doc.content.replace("来源：manual", "来源：unknown")).length);
});

test("manual metadata cannot make ambiguous prose or restricted URLs public", () => {
  const items = manualInputs("source: private author\naccess: paid\n\nhttps://example.org/paid\n\nParagraph one.\n\nParagraph two.\n---\naccess: public\n\nAmbiguous private prose.\n---\nhttps://example.org/a?token=secret\n---\nhttps://example.org/share/secret");
  assert.equal(items.length, 4);
  assert.ok(items.every((item) => item.access === "private" && !item.url));
  assert.ok(items[0].text.includes("Paragraph two"));
  const output = validateOutput({ items: [{ id: items[0].id, title: "Takeaway", summary: "A safe high-level lesson." }] }, [{ ...items[0], url: "https://example.org/private" }]);
  assert.equal(output[0].sourceName, "manual"); assert.equal(output[0].sourceUrl, undefined);
});

test("dated attachments use private multimodal inputs; rejection preserves files", async () => {
  const directory = "daily/inbox/2099-12-31";
  await fs.mkdir("daily/inbox", { recursive: true });
  // Never overwrite a real folder, even in a test.
  await fs.mkdir(directory);
  const originalFetch = globalThis.fetch;
  const png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a3ioAAAAASUVORK5CYII=", "base64");
  try {
    await fs.writeFile(`${directory}/inbox.md`, "source: paid notes\naccess: private\n\nA note.\n\n![attached](001.png)");
    await fs.writeFile(`${directory}/001.png`, png);
    await fs.writeFile(`${directory}/002.png`, png);
    const items = await readDatedInbox("2099-12-31");
    assert.equal(items.length, 2); assert.ok(items.every((i) => i.access === "private"));
    assert.equal(items[0].attachments[0].filename, "001.png");
    const request = await dailyInputContent(items);
    assert.equal(request.filter((part) => part.type === "image_url").length, 2);
    assert.ok(request.some((part) => part.image_url?.url.startsWith("data:image/png;base64,")));
    let callCount = 0;
    globalThis.fetch = async (_url, options) => {
      callCount++;
      const payload = JSON.parse(options.body);
      assert.equal(payload.messages[1].content.filter((p) => p.type === "image_url").length, 2);
      return new Response("provider rejected images", { status: 400 });
    };
    await assert.rejects(summarize(items, "Test editorial", { endpoint: "http://localhost/test", key: "test", model: "test" }), /HTTP 400.*001.png.*002.png.*multimodal/);
    assert.equal(callCount, 1);
    assert.deepEqual(await fs.readFile(`${directory}/001.png`), png);
    await fs.writeFile(`${directory}/001.png`, "changed");
    await assert.rejects(dailyInputContent(items), /changed/);
    await fs.writeFile(`${directory}/inbox.md`, "![unsafe](../outside.png)");
    await assert.rejects(readDatedInbox("2099-12-31"), /unsafe/);
  } finally {
    globalThis.fetch = originalFetch;
    for (const file of ["inbox.md", "001.png", "002.png"]) await fs.unlink(`${directory}/${file}`).catch(() => {});
    await fs.rmdir(directory);
  }
});

test("gate cards omit full text/paths and require exhaustive unique decisions", () => {
  const inputs = [
    { id: "a", source: "Demo", title: "A", access: "public", text: "full".repeat(2000), excerpt: "Feed excerpt" },
    { id: "b", source: "Manual", access: "private", text: "private".repeat(200), attachments: [{ filename: "image.png", path: "private/path" }] },
  ];
  const cards = candidateCards(inputs);
  assert.equal(cards[0].snippet, "Feed excerpt");
  assert.equal(cards[1].snippet.length, 900);
  assert.ok(!JSON.stringify(cards).includes("private/path"));
  assert.ok(cards.every((card) => !card.text && !card.attachments));
  const gate = { deepRead: [{ id: "b", reason: "needs_context" }], drop: [{ id: "a", reason: "no_delta" }] };
  assert.deepEqual(validateGate(gate, inputs), gate);
  assert.throws(() => validateGate({ ...gate, drop: [] }, inputs), /every candidate/);
  assert.throws(() => validateGate({ ...gate, drop: [...gate.drop, ...gate.drop] }, inputs), /duplicate/);
  assert.throws(() => validateGate({ deepRead: [], drop: [{ id: "a", reason: "no_delta" }, { id: "b", reason: "no_delta" }] }, inputs), /unseen images/);
  const bounded = boundDailyTexts(inputs, 500);
  assert.equal(bounded[0].originalTextChars, 8000);
  assert.equal(bounded[0].truncated, true);
  assert.equal(inputs[0].text.length, 8000);
});

test("gate excludes dropped text; deep notes are cached and final editor sees notes only", async () => {
  const originalFetch = globalThis.fetch;
  const inputs = [{ id: "keep", source: "Demo", access: "public", text: "RAW_KEEP_TEXT ".repeat(300) }, { id: "drop", source: "Demo", access: "public", text: "x".repeat(1000) + "DROPPED_FULL_TEXT" }];
  const gate = { deepRead: [{ id: "keep", reason: "potential_delta" }], drop: [{ id: "drop", reason: "no_delta" }] };
  const calls = [], metrics = []; let checkpoint, notes;
  globalThis.fetch = async (_url, options) => {
    calls.push(options.body);
    let output;
    if(calls.length === 1) output = gate;
    else if(calls.length === 2) return new Response("gateway failure", { status: 504 });
    else if(calls.length === 3) output = { notes: [testNote("keep")] };
    else output = { items: [{ id: "keep", title: "A mechanism", hook: "A useful reading.", body: "Evidence and mechanism.\n\nA related implication." }], drop: [] };
    return Response.json({ choices: [{ message: { content: JSON.stringify(output) } }] });
  };
  try {
    const output = await selectDaily(inputs, "CANONICAL_CONTRACT", "LOCAL_PROFILE", { endpoint: "http://localhost/test", key: "test", model: "test" }, { saveGate: async (v) => { checkpoint=v; }, saveNotes: async(v)=>{notes=v;}, report: (m)=>metrics.push(m) });
    assert.equal(output.length, 1); assert.deepEqual(checkpoint, gate); assert.ok(notes);
    assert.equal(calls.length, 4);
    assert.ok(!calls[0].includes("CANONICAL_CONTRACT"));
    assert.ok(calls.slice(1).every((body)=>!body.includes("DROPPED_FULL_TEXT")));
    assert.ok(calls[1].includes("RAW_KEEP_TEXT"));
    assert.ok(!calls.at(-1).includes("RAW_KEEP_TEXT"));
    assert.ok(calls.every((body)=>Buffer.byteLength(body)<=72000));
    assert.equal(metrics.filter((m)=>m.status===504).length,1);
  } finally { globalThis.fetch=originalFetch; }
});

test("saved gate skips the first pass, zero shortlist needs no API, persistent 504 stops after one retry", async () => {
  const originalFetch = globalThis.fetch;
  const input = { id: "a", source: "Demo", access: "public", text: "Evidence. ".repeat(1500) };
  const config = { endpoint: "http://localhost/test", key: "test", model: "test" };
  let calls = 0;
  globalThis.fetch = async () => { calls++; return new Response("gateway failed", { status: 504 }); };
  try {
    const empty = await selectDaily([input], "Editorial", "Profile", config, { gate: { deepRead: [], drop: [{ id: "a", reason: "no_delta" }] } });
    assert.deepEqual(empty, []); assert.equal(calls, 0);
    await assert.rejects(selectDaily([input], "Editorial", "Profile", config, { gate: { deepRead: [{ id: "a", reason: "potential_delta" }], drop: [] } }), /Deep read 1\/1: HTTP 504.*payload bytes/);
    assert.equal(calls, 2);
  } finally { globalThis.fetch = originalFetch; }
});

test("reservoir keeps deferred candidates, excludes expired/rejected/published and stores references only", () => {
  const reservoir = { items: {} }, now = new Date("2026-09-19T12:00:00Z"), active = new Set(["Demo"]);
  const items = ["good", "reject", "defer", "published", "old"].map((id) => ({ id, source: "Demo", publishedAt: id === "old" ? "2026-09-01" : "2026-09-10", access: "public", text: "ORIGINAL_BODY" }));
  addRecords(reservoir, items, "2026-09-18.json", "2026-09-18");
  recordDecisions(reservoir, { drop: [{ id: "reject", reason: "no_delta" }] }, [{ id: "defer", reason: "deferred" }], "2026-09-18");
  reservoir.items.published.status = "published";
  // Rediscovery must not reset tombstones or discovery date.
  addRecords(reservoir, items, "2026-09-19.json", "2026-09-19");
  assert.deepEqual(Object.values(reservoir.items).filter((r) => eligible(r, active, now)).map((r) => r.id), ["good", "defer"]);
  assert.equal(reservoir.items.good.discoveredAt, "2026-09-18");
  assert.ok(!JSON.stringify(reservoir).includes("ORIGINAL_BODY"));
  assert.equal(eligible(reservoir.items.good, new Set(), now), false);
});

test("reading editions preserve paragraphs, disclosure, provenance and private limits", () => {
  const inputs = manualInputs("https://example.org/a\nhttps://example.org/b");
  const first = { id: inputs[0].id, title: "Specific mechanism", hook: "A source worth reading.", body: "A clear opening.\n\nThe mechanism and a concrete example." };
  const output = { items: [first], drop: [{ id: inputs[1].id, reason: "deferred" }] };
  const items = validateEditionOutput(output, inputs);
  const doc = matter(renderDaily("2026-09-19", items));
  assert.match(doc.content, /<details>/); assert.match(doc.content, /<summary>/);
  assert.ok(doc.content.includes("A clear opening.\n\nThe mechanism"));
  assert.deepEqual(dailyDocumentErrors({ ...doc.data, status: "published" }, doc.content), []);
  assert.ok(dailyDocumentErrors({ ...doc.data, status: "published" }, doc.content.replace("</details>", "")).length);
  assert.throws(()=>validateEditionOutput({...output,items:[first,first]},inputs),/duplicate/);
  assert.throws(()=>validateEditionOutput({...output,items:[{...first,hook:""}]},inputs),/hook/);
  assert.throws(()=>validateEditionOutput({...output,items:[{...first,body:"<script>bad</script>"}]},inputs),/markup/);
  assert.throws(()=>validateEditionOutput({...output,drop:[]},inputs),/each shortlisted/);
  const privateInput = { id: "private", source: "Secret", access: "private", text: "Confidential source input with distinctive words which must never appear in public." };
  assert.throws(()=>validateEditionOutput({items:[{...first,id:"private",body:"a".repeat(241)}],drop:[]},[privateInput]),/summary/);
  assert.throws(()=>validateEditionOutput({items:[{...first,id:"private",hook:"https:\/\/private.example/secret"}],drop:[]},[privateInput]),/URLs/);
});

function testNote(id) {
  return { id, centralArgument: "A central argument", strongestInsights: "Connected insights", concreteExamples: "An observation", importantMechanisms: "A causal mechanism", usefulEvidence: "A comparison", surprisingClaim: "A surprising result", readerRelevantConnections: "", materialToDiscard: "", truthGuard: "A necessary condition" };
}

test("streamed final JSON handles split UTF-8/events and rejects partial or truncated output", async () => {
  const originalFetch = globalThis.fetch;
  const config = { endpoint: "http://localhost/test", key: "test", model: "test" };
  const expected = { items: [{ title: "阅读", body: "正文" }], drop: [] };
  const json = JSON.stringify(expected);
  const envelope = (content, finish) => `data: ${JSON.stringify({ choices: [{ delta: { content }, finish_reason: finish }] })}\r\n\r\n`;
  let payload = envelope(json.slice(0, 15), null) + envelope(json.slice(15), "stop") + "data: [DONE]\n\n";
  globalThis.fetch = async (_url, options) => {
    assert.equal(JSON.parse(options.body).stream, true);
    const bytes = new TextEncoder().encode(payload);
    return new Response(new ReadableStream({ start(controller) {
      for (let i = 0; i < bytes.length; i += 7) controller.enqueue(bytes.slice(i, i + 7));
      controller.close();
    } }), { headers: { "content-type": "text/event-stream" } });
  };
  try {
    const run = () => requestDailyJson(config, () => dailyRequestBody(config, "Test", "Notes"), { stage: "Final editor", stream: true });
    assert.deepEqual(await run(), expected);
    payload = envelope(json.slice(0, 15), null);
    await assert.rejects(run(), /Incomplete streamed completion/);
    payload = envelope(json, "length") + "data: [DONE]\n\n";
    await assert.rejects(run(), /Incomplete streamed completion/);
  } finally { globalThis.fetch = originalFetch; }
});

test("bounded batches preserve provenance; final composition sees notes only; saved notes skip deep calls", async () => {
  const originalFetch = globalThis.fetch;
  const inputs = Array.from({ length: 8 }, (_, n) => ({ id: `input${n}`, source: "Demo", access: "public", text: "RAW_FULL_BODY ".repeat(1400) }));
  const config = { endpoint: "http://localhost/test", key: "test", model: "test" }, cache = {}, calls = [];
  globalThis.fetch = async (_url, options) => {
    calls.push(options.body);
    const payload = JSON.parse(options.body), supplied = JSON.parse(payload.messages[1].content);
    let output;
    if (payload.messages[0].content.includes('"notes"')) {
      assert.ok(supplied.every((i) => i.text.includes("RAW_FULL_BODY")));
      output = { notes: supplied.map((i) => testNote(i.id)) };
    } else {
      assert.ok(!options.body.includes("RAW_FULL_BODY"));
      assert.equal(supplied.length, 8);
      output = { items: [], drop: supplied.map((i) => ({ id: i.id, reason: "deferred" })) };
    }
    return Response.json({ choices: [{ message: { content: JSON.stringify(output) } }] });
  };
  try {
    const options = { report: () => {}, notesCache: cache, saveNotes: async () => {} };
    const result = await deepEditorial(inputs, "Editorial", config, options);
    assert.equal(result.drop.length, 8);
    assert.ok(calls.length > 2);
    assert.ok(calls.every((body) => Buffer.byteLength(body) <= 72000));
    const count = calls.length;
    await deepEditorial(inputs, "Editorial", config, options);
    assert.equal(calls.length, count + 1);
  } finally { globalThis.fetch = originalFetch; }
});
