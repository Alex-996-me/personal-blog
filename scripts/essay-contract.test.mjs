import assert from "node:assert/strict";
import { test } from "node:test";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { essayPublicationErrors } from "../src/lib/essay-contract.mjs";

const published = { title: "A considered judgment", date: "2026-07-01", updated: "2026-07-02", category: "体悟", description: "A concise thesis.", status: "published" };

test("published Essays require explicit metadata and ordered revision dates", () => {
  assert.deepEqual(essayPublicationErrors(published), []);
  assert.deepEqual(essayPublicationErrors({ ...published, updated: published.date }), []);
  for (const field of Object.keys(published)) {
    const missing = { ...published };
    delete missing[field];
    assert(essayPublicationErrors(missing).some(([key]) => key === field), field);
  }
  for (const field of ["title", "category", "description", "date", "updated"]) {
    for (const value of ["", "   ", null]) assert(essayPublicationErrors({ ...published, [field]: value }).some(([key]) => key === field));
  }
  assert(essayPublicationErrors({ ...published, updated: "2026-06-30" }).some(([key]) => key === "updated"));
  assert(essayPublicationErrors({ ...published, updated: "invalid" }).some(([key]) => key === "updated"));
  assert.deepEqual(essayPublicationErrors({ status: "archive" }), []);
  assert.deepEqual(essayPublicationErrors({ status: "draft" }), []);
});

test("publication validator reports filename and each invalid field", async () => {
  const fixture = await mkdtemp(path.join(tmpdir(), "n1-essay-contract-"));
  try {
    for (const collection of ["posts", "moments", "inspirations"]) await mkdir(path.join(fixture, "src/content", collection), { recursive: true });
    const filename = path.join(fixture, "src/content/posts/invalid.md");
    await writeFile(filename, "---\ntitle: Test\nstatus: published\n---\n");
    const script = new URL("./validate-content.mjs", import.meta.url);
    const run = () => spawnSync(process.execPath, [script.pathname.replace(/^\/(\w:)/, "$1")], { cwd: fixture, encoding: "utf8" });
    const failure = run();
    assert.equal(failure.status, 1);
    for (const field of ["date", "updated", "category", "description"]) assert(failure.stderr.includes(`src/content/posts/invalid.md: ${field}:`), failure.stderr);
    await writeFile(filename, "---\ntitle: Test\ndate: 2026-07-01\nstatus: archive\n---\n");
    assert.equal(run().status, 0);
  } finally {
    assert.equal(path.dirname(path.resolve(fixture)), path.resolve(tmpdir()));
    await rm(fixture, { recursive: true, force: true });
  }
});
