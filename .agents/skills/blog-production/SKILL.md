---
name: blog-production
description: Integrate an author-approved final blog draft into the N=1 Lab repository with valid frontmatter, media, Markdown or MDX formatting, validation, and an explicit human publication gate. Use after content direction is confirmed or when a complete final draft already exists; do not use to choose the article's value judgment.
---

# Blog Production

Turn a final, author-approved draft into a valid repository entry. This is production work, not first-order editorial judgment.

## Start and scope

1. Read the root `AGENTS.md`, inspect `git status --short`, and read `src/content.config.ts`; the schema is authoritative.
2. Read [repository-content-model.md](references/repository-content-model.md) for repository conventions. For an English-learning entry, also read the legacy [English-learning guide](../personal-blog-publisher/references/english-learning.md).
3. Work only from a final draft or from explicit author-approved direction. If the core problem, position, or draft is still undecided, return the work to `$idea-architect` or `$voice-drafter` instead of deciding it here.

## Produce the entry

- Choose the correct collection and generate schema-valid frontmatter: category or theme, tags, description, stable ASCII slug, `fullSummary`, `sectionSummaries`, and applicable `series` and relationships.
- Use a series only when it is genuinely coherent. Its `seriesOrder` must be unique and positive. Add relationships only when they improve navigation; verify reciprocal links where appropriate.
- Format the final Markdown or MDX for calm, readable hierarchy without rewriting the author's approved position.
- Place published images, audio, and video in the semantic `public/` directory and use root-relative URLs. Do not put raw inputs, transcripts, exports, failed media, or other source material in Git; use the ignored inboxes when a local holding area is needed.
- Check media paths, alt text, captions where useful, source attribution, and factual claims that need qualification. Do not invent missing assets or support.

## Verify and hand off

1. Run `npm run validate`.
2. Run `git diff --check`.
3. Inspect `git status --short`, the content diff, asset paths, collection route, relationships, and series ordering.
4. Report exact changed files and any unresolved production gap.

Validation does not authorize publication. Only when the user explicitly says **publish** may you stage exact related paths with `git add -- <paths>`, create one focused commit, and push only after checks pass. Never use `git add .`; exclude unrelated changes.
