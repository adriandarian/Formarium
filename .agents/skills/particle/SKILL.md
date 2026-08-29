---
name: particle
description: Build or extend a Particle Art experiment in the Formarium repository from a motion, force, flock, field, or emergent-system prompt.
---

# Particle Art

Use this repo-local skill when the user invokes `/particle` or asks for a particle artwork. Treat the text after the command as the desired behavior, mood, and visual metaphor.

Create or edit files under `src/experiments/particle-art/`, including the artwork component and `.meta.ts` metadata, then update the particle registry and collection data when required. Inspect existing particle experiments to match their Canvas lifecycle, animation cleanup, sizing, and preview patterns.

Build a visually coherent system with explicit initialization, resize handling, frame-loop cleanup, bounded particle counts, and graceful behavior when the component is unmounted. Use forces, noise, constraints, or interaction that support the prompt rather than adding controls by default. Keep the canvas responsive and avoid layout overflow. Do not add dependencies unless the prompt requires them.

Run `npm run typecheck` and `npm run build` after changes.
