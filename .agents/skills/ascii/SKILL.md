---
name: ascii
description: Build or extend an ASCII Art experiment in the Formarium repository from a text, glyph, typographic, or low-resolution visual prompt.
---

# ASCII Art

Use this repo-local skill when the user invokes `/ascii` or asks for an ASCII artwork. Treat the text after the command as the visual and thematic specification.

Before creating anything, inspect the ASCII registry and collection data and search existing experiment names, metadata, and concepts for a duplicate. If an existing experiment already fulfills the request, extend or refine it instead of adding another entry; only create a new experiment when the concept is genuinely distinct.

Create or edit files under `src/experiments/ascii-art/`, including the artwork component and `.meta.ts` metadata, then update the ASCII registry and collection data when required. Inspect nearby ASCII experiments before choosing whether the work belongs in plain React, Canvas, or a preview/runtime pair.

Use deliberate monospace composition, a controlled character palette, and responsive sizing. Preserve whitespace, contrast, and legibility across viewport sizes; do not introduce horizontal page scrolling. Make animation deterministic or bounded enough to remain an artwork rather than unreadable noise. Follow existing metadata, route, preview, and naming conventions.

Run `npm run typecheck` and `npm run build` after changes.

When the artwork is complete and validation passes, open a pull request ready for review for the changes, or update the existing pull request that backs the current branch. Never open a draft pull request.
