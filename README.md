<div align="center">

# Formarium

### A living archive of visual experiments.

Mathematical forms, ASCII studies, particle systems, shaders, and whatever comes next — collected in one quietly playful, interactive library.

[Explore the catalog](#the-catalog) · [Run it locally](#development) · [Add an experiment](#adding-an-experiment)

</div>

![An orbital field of luminous computational threads](docs/README-assets/orbital-field.png)

## What is Formarium?

Formarium is a library-first home for computational art. Browse by art form, open a work, and spend a little time with the system behind it. Each experiment is a self-contained React boundary, so the library can hold very different kinds of runtimes without flattening them into one visual language.

The catalog is data-driven: new collections and experiments can be added without redesigning the application.

## The catalog

| Collection | What to expect |
| --- | --- |
| **Mathematical Art** | Parametric curves, attractors, fields, and trigonometric studies |
| **ASCII Art** | Glyphs, typographic landscapes, and low-resolution visual systems |
| **Particle Art** | Flocks, fields, swarms, and emergent motion |
| **Abstract Art** | Shader-like compositions, light, texture, and atmosphere |

![A luminous mathematical bloom made from layered parametric curves](docs/README-assets/mathematical-bloom.png)

## Designed for experimentation

- **Library first** — browse collections and works before committing to a runtime.
- **Lazy by default** — full artwork modules load only when an experiment is opened.
- **Preview-aware** — cards use lightweight preview renderers and mount them near the viewport.
- **Runtime-agnostic** — Canvas, WebGL, WebGPU, p5.js, Three.js, shaders, ASCII, or plain React can live behind the same boundary.
- **Small, legible architecture** — metadata, registries, routes, and renderers have clear jobs.

![An ASCII-inspired landscape dissolving into a particle field](docs/README-assets/ascii-field.png)

## How an experiment travels

```text
collection metadata
        ↓
catalog card → lightweight preview
        ↓
experiment route
        ↓
ExperimentHost → stage renderer registry → lazy artwork module
```

The catalog never needs to know how an artwork works. It only needs its metadata and a registered preview or stage renderer.

## Stack

- React 19
- TypeScript
- Vite
- TanStack Router with file-based routing

## Routes

```text
/                              all experiments
/catalog                       browse art forms
/catalog/$collection           one art-form collection
/experiment/$slug              individual live experiment
```

## Development

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
```

Type-check the project with:

```bash
npm run typecheck
```

## Adding an experiment

1. Add metadata to `src/data/library.ts`.
2. Create the full renderer under `src/experiments/<art-form>/<slug>.tsx`.
3. Create a preview renderer under `src/experiments/<art-form>/<slug>.preview.tsx`.
4. Export both as default React components.
5. Register their dynamic imports in `src/experiments/registry.ts`.

```ts
const stageLoaders = {
  'my-new-work': () => import('./particle-art/my-new-work'),
}

const previewLoaders = {
  'my-new-work': () => import('./particle-art/my-new-work.preview'),
}
```

This separation keeps browsing fast while leaving each artwork free to be as strange, dense, or computationally ambitious as it needs to be.

## Project structure

```text
src/
├── components/                shared library, catalog, and experiment UI
├── data/                      collection and experiment metadata
├── experiments/               artwork modules and renderer registries
├── routes/                    TanStack Router file routes
└── styles/                    application styles
```

<div align="center">

Made for curious systems, beautiful accidents, and the next experiment.

</div>
