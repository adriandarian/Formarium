---
name: particle
description: Build or extend a Particle Art experiment in the Formarium repository from a motion, force, flock, field, or emergent-system prompt.
---

# Particle Art

Use this repo-local skill when the user invokes `/particle` or asks for a particle artwork. Treat the text after the command as the desired behavior, mood, and visual metaphor.

Before creating anything, inspect the particle registry and collection data and search existing experiment names, metadata, and concepts for a duplicate. If an existing experiment already fulfills the request, extend or refine it instead of adding another entry; only create a new experiment when the concept is genuinely distinct.

Create or edit files under `src/experiments/particle-art/`, including the artwork component and `.meta.ts` metadata, then update the particle registry and collection data when required. Inspect existing particle experiments to match their Canvas lifecycle, animation cleanup, sizing, and preview patterns.

Build a visually coherent system with explicit initialization, resize handling, frame-loop cleanup, bounded particle counts, and graceful behavior when the component is unmounted. Use forces, noise, constraints, or interaction that support the prompt rather than adding controls by default. Keep the canvas responsive and avoid layout overflow. Do not add dependencies unless the prompt requires them.

Run `npm run typecheck` and `npm run build` after changes.

When the artwork is complete and validation passes, open a pull request ready for review for the changes, or update the existing pull request that backs the current branch. Never open a draft pull request.
