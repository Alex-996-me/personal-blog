# N=1 Lab production model

`src/content.config.ts` is the schema source of truth; reread it before editing. This reference records the repository conventions that production work must preserve.

## Collections and metadata

- Long-form posts, reviews, summaries, and English-learning entries live in `src/content/posts/<ascii-slug>.md`.
- Concise ideas live in `src/content/inspirations/<ascii-slug>.md`; use only a schema-valid theme and set `published` only when ready.
- Photo-led records live in `src/content/moments/<ascii-slug>.md`; retain real date, place, and image details.
- Posts require `title`, `date`, `category`, and `description`; tags are arrays. Production may also use `updated`, `cover`, `youtube`, `fullSummary`, `sectionSummaries`, featured fields, `series`, `seriesOrder`, relationship fields, `source`, and `updatedAt` when supported by the final content.
- Relationship values are target slugs without extensions. Check both directions for intentional sequences. Never create a series or relationship just to fill a field.

## Published assets

- Covers: `public/images/covers/`
- Post images: `public/images/posts/<slug>/`
- Moment images: `public/images/moments/<slug>/`
- English audio: `public/audio/english/YYYY-MM-DD/`
- Other audio/video: an existing semantic folder under `public/`

Use URLs such as `/images/posts/example/image-01.webp`, never `public/images/...`. Use descriptive alt text. Keep raw inputs in ignored `.content-inbox` or `.english-inbox`, not in Git.

## Accuracy and quality

For health, science, politics, or contested claims, distinguish a source's claim from established evidence. Preserve the author’s judgment but do not turn uncertainty into fact. Prefer concise, topic-led titles and specific descriptions. A published entry is a curated reader-facing object, never a transcript dump, correction log, failed recording, duplicate export, or filler summary.
