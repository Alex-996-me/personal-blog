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

## Publishing workflow

For a new article, use the full human-agent workflow:

`$idea-architect` → **HUMAN GATE 1** → `$voice-drafter` → **HUMAN GATE 2** → `$blog-production` → validation → **HUMAN PUBLISH GATE**.

- At Gate 1, the author chooses the core problem, angle, material to preserve, and directions to cut.
- At Gate 2, the author reviews the draft and `AUTHOR PASS`, then supplies any necessary rewrites or distinctive language.
- At the publish gate, the author explicitly decides whether to commit and push. Validation alone never authorizes publication.
- If the user already has a complete final draft, start with `$blog-production`.
- If the user only wants to edit an existing draft, start with `$voice-drafter`.
- `$personal-blog-publisher` remains a backward-compatible orchestration wrapper for older prompts and documentation.

Keep reusable workflow rules in `.agents/skills/`; keep reader-facing instructions in `docs/workflows/PUBLISHING_SOP.md`.
