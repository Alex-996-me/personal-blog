---
name: personal-blog-publisher
description: Curate, edit, integrate, validate, and optionally publish material for the N=1 Lab Astro personal blog. Use when the user provides notes, Markdown, DOCX, Notion exports, images, recordings, transcripts, book notes, summaries, reflections, ideas, or Moments and wants a new post, English-learning entry, review, inspiration, life record, revision, cross-linking, or publication. Also use for content-quality checks and repository-native publishing workflow questions.
---

# Personal Blog Publisher

Turn raw material into a finished editorial object inside this repository. Preserve the author's thinking and voice; do not treat publication as archival dumping.

## Start safely

1. Read the root `AGENTS.md` and inspect `git status --short`.
2. Do not overwrite unrelated edits.
3. Classify the request as an English-learning post, long-form post/review, inspiration, Moment, or Notion import.
4. Read `references/content-model.md` plus the relevant editorial reference:
   - English learning: `references/english-learning.md`
   - All other content: `references/editorial-standards.md`

## Build the content

1. Inspect every supplied text and media file. Separate raw evidence, author voice, reusable language, and expendable process material.
2. Choose one clear intellectual center. Compress repetition and remove process debris.
3. Check current content for a genuine series or relationship. Prefer explicit, useful links over isolated publication; never fabricate a connection.
4. Use a stable ASCII slug and the exact schema in `src/content.config.ts`.
5. Place only published assets under `public/`. Keep raw inputs in ignored inboxes and never add them to Git.
6. For factual or contested subjects, use accurate attribution. Browse primary/authoritative sources when freshness or stakes require it.
7. If an expected final asset is missing, finish everything else and report the single remaining gap clearly.

## Validate and hand off

1. Run `npm run validate`.
2. Run `git diff --check` and inspect the content diff.
3. Confirm local asset paths, generated route, relationships, and series ordering.
4. Report exact files changed and any editorial judgment that materially shaped the post.
5. Do not commit or push unless the user explicitly says to publish.
6. When publication is explicit, stage only exact related files, create one focused commit, and push `main` only after all checks pass and unrelated edits are excluded.

## Quality bar

- The result should be worth rereading independently of the workflow that created it.
- Prefer less, but better: no transcript dumps, correction logs, failed recordings, duplicate source exports, filler summaries, or invented certainty.
- Make titles topic-led, descriptions specific, hierarchy calm, and cross-links helpful.
