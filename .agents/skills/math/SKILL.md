---
name: math
description: Build or extend a Mathematical Art experiment in the Formarium repository from an equation, parametric rule, field, or attractor prompt.
---

# Mathematical Art

Use this repo-local skill when the user invokes `/math` or asks for a mathematical artwork. Treat the text after the command as the artistic specification; for example, `/math x = sin(3t), y = cos(5t)` should become a polished, self-contained experiment.

Before creating anything, inspect the mathematical-art registry and collection data and search existing experiment names, metadata, equations, and concepts for a duplicate. If an existing experiment already fulfills the request, extend or refine it instead of adding another entry; only create a new experiment when the concept is genuinely distinct.

Create or edit the appropriate files under `src/experiments/mathematical-art/`, including the artwork component and its `.meta.ts` metadata, then register it in the mathematical-art registry and collection data when needed. Inspect neighboring experiments first and follow their runtime, naming, preview, and metadata patterns.

Render the equation as visible artwork context using the project’s existing math styling or a LaTeX-like font treatment. Keep the complete equation visible at all viewport sizes: use flexible layout, `min-width: 0`, and wrapping rather than horizontal scrolling. Prefer Canvas or SVG for parametric curves and fields unless the prompt clearly calls for another runtime.

Give the work a distinct visual concept, meaningful motion or interaction where appropriate, restrained controls, and a lightweight preview if the collection convention uses one. Avoid adding dependencies unless necessary. Run `npm run typecheck` and `npm run build` after changes.

When the artwork is complete and validation passes, open a draft pull request for the changes, or update the existing pull request that backs the current branch. Keep it draft until the requested work is complete.
