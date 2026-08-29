# Formarium

A personal interactive library of computational art experiments.

Formarium is a **library first**: the catalog lets visitors browse distinct art forms, enter a collection, and explore every work in that medium. Individual experiments then open into their own live, interactive view.

## Initial catalog

- Mathematical Art
- ASCII Art
- Particle Art
- Abstract Art

The catalog is data-driven so new art forms can be added without redesigning the application.

## Stack

- React
- TypeScript
- Vite
- TanStack Router with file-based routing

Individual art experiments are intentionally runtime-agnostic. A work can use p5.js, Three.js, Canvas, WebGL, WebGPU, GLSL/WGSL, ASCII rendering, or plain React without forcing the rest of the library to use the same technology.

## Routes

```text
/                              all experiments
/catalog                       browse art forms
/catalog/$collection           one art-form collection
/experiment/$slug              individual live experiment
```

## Structure

```text
src/
├── components/                shared library/catalog UI + ExperimentHost
├── data/                      collection + experiment metadata
├── experiments/               live artwork modules + renderer registry
├── routes/                    TanStack Router file routes
└── styles/                    application styles
```

## Experiment runtime

The catalog only knows an experiment's metadata. The detail route hands that metadata to `ExperimentHost`, which looks up a lazily-loaded renderer by slug.

```text
Experiment metadata
        ↓
ExperimentHost
        ↓
renderer registry
        ↓
lazy artwork module
```

Every artwork module exposes a React component as its boundary. Inside that boundary it can mount and clean up any visual technology it needs: Canvas, p5.js, Three.js, WebGL/WebGPU, shaders, ASCII renderers, or plain React.

## Development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Adding an experiment

1. Add its metadata to `src/data/library.ts`.
2. Create its renderer under `src/experiments/<art-form>/<slug>.tsx` (or a folder if the experiment needs multiple files).
3. Export the renderer as the module's default React component.
4. Register the slug with a dynamic import in `src/experiments/registry.ts`.

Example registry entry:

```ts
const loaders = {
  'particle-rose': () => import('./particle-art/particle-rose'),
} satisfies Record<string, ExperimentLoader>
```

This keeps the library lightweight: visitors only download an artwork's renderer when they actually open that experiment.
