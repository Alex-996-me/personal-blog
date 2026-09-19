import test from 'node:test';
import assert from 'node:assert/strict';
import { parseDailyEditions, readingMinutes } from '../src/lib/daily-presentation.mjs';

const id = 'abcdef012345abcdef012345';
const source = 'https://example.org/reading';
const edition = `## 01 A \\*specific\\* idea &amp; a comparison

<!-- daily-edition -->

A hook.

来源：[Public source](<${source}>)

<details>
<summary>展开阅读</summary>

First paragraph: 2 &lt; 3.

Second paragraph with \\*literal punctuation\\*.

</details>

<!-- daily-source: ${id} -->`;

test('reading view preserves paragraphs, attribution and stable IDs without changing Markdown', () => {
  const [item] = parseDailyEditions(edition, {[source]: {coverImage:'https://example.org/hero.jpg'}});
  assert.equal(item.id,id);
  assert.equal(item.title,'A *specific* idea & a comparison');
  assert.deepEqual(item.paragraphs,['First paragraph: 2 < 3.','Second paragraph with *literal punctuation*.']);
  assert.equal(item.hook,'A hook.');
  assert.equal(item.sourceUrl,source);
  assert.equal(item.coverImage,'https://example.org/hero.jpg');
  assert.equal(item.coverAlt,'');
});

test('manual notes never acquire a cover or source link; zero and legacy issues render', () => {
  const privateEdition=edition.replace(`来源：[Public source](<${source}>)`,'来源：manual');
  const [item]=parseDailyEditions(privateEdition,{undefined:{coverImage:'https://example.org/private.jpg'}});
  assert.equal(item.coverImage,undefined);
  assert.equal(item.sourceUrl,undefined);
  assert.equal(item.sourceName,'manual');
  assert.equal(item.sourceType,'manual');
  assert.deepEqual(parseDailyEditions('今天没有值得占用注意力的新信息。'),[]);
  const [legacy]=parseDailyEditions(`## CORE\n\n### 01 Short title\n\nShort text.\n\n来源：[Public source](<${source}>)\n\n<!-- daily-source: ${id} -->`);
  assert.equal(legacy.body,'Short text.');
  assert.equal(legacy.hook,'');
});

test('reading estimates use a fixed speed and cover metadata cannot inject non-HTTPS URLs', () => {
  assert.equal(readingMinutes('字'.repeat(251)),2);
  assert.equal(readingMinutes('word '.repeat(250)),1);
  assert.throws(()=>parseDailyEditions(edition,{[source]:{coverImage:'javascript:alert(1)'}}),/HTTPS/);
});
