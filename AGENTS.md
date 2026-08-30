# N=1 Lab repository rules

## Source of truth

- Treat `src/content.config.ts` as the canonical content schema.
- Published Markdown belongs only in `src/content/posts`, `src/content/inspirations`, or `src/content/moments`.
- Published media belongs under `public/images`, `public/audio`, or `public/videos` and must use root-relative URLs.
- Raw source material belongs in ignored `.content-inbox` or `.english-inbox`, never in Git.

## Editing

- Preserve the author's position and voice. Curate raw material; do not publish transcripts, correction logs, failed recordings, or duplicate source exports.
- Use stable ASCII slugs. Do not encode study duration in an English-learning title or filename.
- When a post belongs to a sequence, set `series` and a unique positive `seriesOrder`; add useful explicit relationships rather than isolated posts.
- For health, science, politics, and contested claims, distinguish source claims from established evidence and never invent support.
- Never overwrite unrelated working-tree changes.

## Validation and Git

- Run `npm run validate` and `git diff --check` after content changes.
- Inspect `git status --short` before and after work.
- Do not commit or push unless the user explicitly asks to publish.
- For publication, stage only exact files, use one focused commit, and push only after validation passes.

## Workflow

- Use the repository skill `$personal-blog-publisher` for new or revised content.
- Keep reusable process rules in `.agents/skills/personal-blog-publisher`; keep reader-facing instructions in `docs/workflows/PUBLISHING_SOP.md`.
