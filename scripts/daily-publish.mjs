import { open, mkdir, unlink } from "node:fs/promises";
import { createInterface } from "node:readline/promises";
import { spawnSync } from "node:child_process";
import matter from "gray-matter";
import { today, readOptional, atomicWrite } from "./daily-core.mjs";
import { dailyDocumentErrors, dailyMetadataErrors } from "../src/lib/daily-contract.mjs";

const date = today(), target = `src/content/daily/${date}.md`;
let lock, prompt;
try {
  await mkdir("daily/.local", { recursive: true });
  lock = await open("daily/.local/run.lock", "wx");
  const original = await readOptional(target);
  if (!original) throw Error(`${target}: draft does not exist; run npm run daily first`);
  const parsed = matter(original);
  if (parsed.data.status !== "draft") throw Error(`${target}: status must be draft`);
  // Deleting/reordering a whole item during review never requires hand numbering.
  let itemCount = 0;
  const content = parsed.content.replace(/^(#{2,3}) \d{2} /gm, (_, level) => `${level} ${String(++itemCount).padStart(2, "0")} `);
  const data = { ...parsed.data, status: "published", itemCount };
  const errors = [...dailyMetadataErrors(parsed.data), ...dailyDocumentErrors(data, content, `${date}.md`)];
  if (errors.length) throw Error(`${target}: ${errors.map(([field, message]) => `${field}: ${message}`).join("; ")}`);
  // Existing project validator runs before mutation; candidate publication was checked above.
  const check = spawnSync(process.execPath, ["scripts/validate-content.mjs"], { stdio: "inherit" });
  if (check.status !== 0) throw Error("Project content validation failed; draft unchanged");
  console.log(`Review ${target}, including source accuracy and manual material, before approving.`);
  prompt = createInterface({ input: process.stdin, output: process.stdout });
  let answer;
  try { answer = await prompt.question(`Publish ${date}? (y/N) `); } catch { answer = ""; }
  if (!/^y(?:es)?$/i.test(answer.trim())) {
    console.log("Cancelled. Draft unchanged.");
  } else {
    if (await readOptional(target) !== original) throw Error("Draft changed during confirmation; review it and run again");
    const published = matter.stringify(content, data);
    await atomicWrite(`daily/.local/backups/${date}-before-publish.md`, original);
    await atomicWrite(target, published);
    console.log(`Published locally: ${target}. No Git commit/push performed.`);
  }
} catch (error) {
  console.error(error.code === "EEXIST" ? "Another Daily command is running; try again after it finishes." : `Daily publication failed: ${error.message}`);
  process.exitCode = 1;
} finally {
  prompt?.close();
  if (lock) { await lock.close(); await unlink("daily/.local/run.lock"); }
}
