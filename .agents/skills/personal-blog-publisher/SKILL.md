---
name: personal-blog-publisher
description: Backward-compatible entry point for the N=1 Lab publishing workflow. Route raw material to idea architecture, approved direction to drafting, and final text to repository production; use when existing prompts or documentation invoke $personal-blog-publisher.
---

# Personal Blog Publisher (legacy entry point)

This skill preserves `$personal-blog-publisher` as a compatibility wrapper. It does not replace the three focused skills.

## Route the request

- Raw notes, transcripts, readings, ideas, or quotes without an author-approved direction: invoke `$idea-architect` and stop at its `AUTHOR DECISION REQUIRED` gate.
- A confirmed editorial brief, explicit position, and author material; or an existing draft that needs editing: invoke `$voice-drafter` and stop at its `AUTHOR PASS` gate.
- A final author-approved manuscript that needs frontmatter, media, formatting, validation, or repository integration: invoke `$blog-production`.
- If the user explicitly asks to publish, perform the production validation first, then let `$blog-production` follow its precise-file publication gate.

Do not skip an author decision simply because this legacy entry point was invoked. The legacy references remain available for older workflows; new production work follows `$blog-production`.
