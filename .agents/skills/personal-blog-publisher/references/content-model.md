# Repository content model

Always verify against `src/content.config.ts`; it is the source of truth.

## Collections

- `src/content/posts/<ascii-slug>.md`: long-form posts, reviews, summaries, and English-learning entries.
- `src/content/inspirations/<ascii-slug>.md`: concise ideas using theme `思考`, `生活`, or `科学`.
- `src/content/moments/<ascii-slug>.md`: photo-led life/place records.

## Post fields

Required: `title`, `date`, `category`, `description`. Keep `tags` as an array. Valid categories: `日志`, `自学`, `体悟`, `健康`, `训练`, `工具`, `世界`.

Optional editorial fields include `updated`, `cover`, `youtube`, `fullSummary`, `sectionSummaries`, `featured`, `featuredRank`, `featuredHome`, `series`, `seriesOrder`, `relatedPosts`, `relatedNotes`, `relatedMoments`, `source`, and `updatedAt`.

If `series` is present, assign a unique positive `seriesOrder`. Relationship values are target slugs without file extensions. Check both directions when two entries form an intentional sequence.

## Assets

- Covers: `public/images/covers/`
- Post images: `public/images/posts/<slug>/`
- Moment images: `public/images/moments/<slug>/`
- English audio: `public/audio/english/YYYY-MM-DD/`
- Other published videos/audio: their existing semantic folder under `public/`

Use root-relative URLs such as `/images/posts/example/image-01.webp`. Do not include `public` in URLs. Use descriptive alt text and captions only when they add context.

## Validation

Run `npm run validate`. It checks content relationships, local resources, series-order collisions, Astro schema/build output, and search indexing. Also run `git diff --check` and inspect `git status --short`.
