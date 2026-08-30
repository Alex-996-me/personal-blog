# Editorial standards by content type

## Long-form article, summary, or review

- Establish one central question or claim before choosing the structure.
- Preserve the author's judgments; separate quotations, source claims, interpretation, and personal experience.
- For a summary, compress reasoning rather than merely shortening every paragraph.
- For a review, include what changed the author's mind, what remains doubtful, and who would benefit; avoid plot/content recap as the whole article.
- Prefer a specific title, one concise description, useful section hierarchy, and only essential media.
- Add `source` and precise attribution where the article depends on external material.
- Link to existing posts/notes with genuine conceptual continuity; create a series only when future or previous entries form a coherent sequence.

## Inspiration

- Use `src/content/inspirations/` when the thought is complete without long scaffolding.
- Preserve brevity. One sharp idea is better than an AI-expanded mini-essay.
- Choose theme `思考`, `生活`, or `科学`, add a restrained tag set, and set `published: true` only when ready.
- Relate it to a post, note, or Moment only when the connection improves rediscovery.

## Moment

- Let images and lived detail lead. Use accurate date/location fields and concise descriptions.
- Put images in `public/images/moments/<slug>/`, optimize oversized files, and keep meaningful ordering.
- Do not manufacture travel-copy enthusiasm or facts not supplied by the author.

## Notion import

- Put the export temporarily in `imports/notion/<slug>/` or `<slug>.zip` and run `npm run publish:notion -- <slug>`.
- Inspect the generated article: imported structure is raw material, not final editorial judgment.
- Remove the completed export from `imports/notion/` after the post and copied assets validate. The repository keeps only `imports/notion/example/`.

## Publication decision

Drafting and validation do not imply publication. Commit and push only after the user explicitly says “publish” or an equivalent unambiguous instruction.
