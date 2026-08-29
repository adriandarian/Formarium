---
name: abstract
description: Build or extend an Abstract Art experiment in the Formarium repository from a mood, material, light, texture, or atmospheric visual prompt.
---

# Abstract Art

Use this repo-local skill when the user invokes `/abstract` or asks for an abstract artwork. Treat the text after the command as the intended atmosphere, palette, material, and motion language.

Before creating anything, inspect the abstract registry and collection data and search existing experiment names, metadata, and concepts for a duplicate. If an existing experiment already fulfills the request, extend or refine it instead of adding another entry; only create a new experiment when the concept is genuinely distinct.

Create or edit files under `src/experiments/abstract-art/`, including the artwork component and `.meta.ts` metadata, then update the abstract registry and collection data when required. Inspect neighboring experiments and reuse their established Canvas, SVG, WebGL, preview, and cleanup patterns instead of inventing a parallel architecture.

Translate the prompt into a strong composition with intentional color, depth, texture, and motion. Keep expensive rendering bounded, handle resize and unmount cleanup, respect reduced-motion where practical, and ensure the artwork remains legible without requiring interaction. Keep the layout responsive with no accidental page scrolling and avoid new dependencies unless necessary.

Run `npm run typecheck` and `npm run build` after changes.

When the artwork is complete and validation passes, open a pull request ready for review for the changes, or update the existing pull request that backs the current branch. Never open a draft pull request.
