# English-learning editorial workflow

The standard is curation: less, but better. Each entry should work both as language review and as an independently valuable article about its subject.

Use the 2026-08-30 post as the reference implementation and preserve its philosophy rather than mechanically copying its headings.

## Input handling

The user may provide a source title/URL, transcript, noticed expressions, draft reflection, revision/feedback, final speaking recording, and a note about the idea that mattered. Raw material is not the post.

Do not publish raw transcripts, speaking markup, failed recordings, original uncorrected drafts, line-by-line feedback, exhaustive word lists, study duration, or low-value process notes.

## Identity and frontmatter

- Visible title: `YYYY/M/D-中文主题标题`; make the intellectual subject—not duration—the identity.
- Filename: `src/content/posts/YYYY-MM-DD-stable-topic-slug.md`.
- Category: `自学`.
- Tags: `English` plus a small number of real topic tags.
- Series: `English Learning`, with the next unique `seriesOrder`.
- Add useful `relatedPosts`, including reverse linkage when building a chronological series.
- Include `youtube` only for a YouTube source; otherwise put sources in `source` or the body as appropriate.

## Default information architecture

1. One idea worth keeping
2. The Idea
3. Language Worth Keeping
4. Pronunciation Checkpoints
5. My Reflection
6. Speaking
7. Continue reading (rendered through series/relationship metadata)

Headings may change, but preserve that logic.

### One idea worth keeping

Near the top, use one blockquote for the single intellectual takeaway worth revisiting. It is not merely an English sentence.

### The Idea

Write a polished English synthesis of roughly 350–500 words when the source supports it. Target natural C1 English: preserve reasoning and causal chains, cut conversational clutter, reorganize for clarity, and never invent evidence.

For health, science, politics, or disputed topics, distinguish claims from established fact with language such as “the speaker argues” or “the evidence discussed includes.” Mention evidence limitations when they materially affect interpretation.

### Language Worth Keeping

Choose about 5–8 transferable expressions maximum. Correct misheard forms. For each, bold the expression, explain it briefly, and give one natural example. Avoid dictionary dumps.

### Pronunciation Checkpoints

Use only 4–6 difficult/high-value words and optionally 1–2 rhythm sentences. Avoid excessive IPA unless a phoneme is the actual learning target.

### My Reflection

Publish only the refined version, normally 100–180 words. Preserve the author's idea and voice while fixing grammar, collocation, tense, and sentence control. Do not inflate it into a generic essay.

### Speaking

Publish only the final recording. Preserve its real extension and MIME type; place it under `public/audio/english/YYYY-MM-DD/` with a stable name such as `final.m4a`, and embed the matching URL. If absent, prepare the post and report the missing final recording.

## Final check

Ensure the new entry has a topic-led title, one strong takeaway, a compact language section, a refined personal reflection, the correct audio reference, a unique series order, and working links to adjacent English-learning entries.
