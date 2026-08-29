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
├── components/                shared library/catalog UI + experiment hosts
├── data/                      collection + experiment metadata
├── experiments/               artwork modules + stage/preview registries
├── routes/                    TanStack Router file routes
└── styles/                    application styles
```

## Experiment runtime

The catalog only knows an experiment's metadata. The detail route hands that metadata to `ExperimentHost`, which looks up a lazily-loaded stage renderer by slug.

```text
Experiment metadata
        ↓
ExperimentHost
        ↓
stage renderer registry
        ↓
lazy artwork module
```

Every artwork module exposes a React component as its boundary. Inside that boundary it can mount and clean up any visual technology it needs: Canvas, p5.js, Three.js, WebGL/WebGPU, shaders, ASCII renderers, or plain React.

## Catalog previews

Cards use a separate lazy preview registry instead of automatically loading the full artwork. `ExperimentPreview` also uses `IntersectionObserver`, so previews mount only when their cards are near the viewport and unmount when they leave it.

```text
catalog card
    ↓
ExperimentPreview
    ↓
preview renderer registry
    ↓
lightweight animated preview
```

An experiment can share rendering code between its stage and preview, or provide a deliberately cheaper preview when its full runtime is expensive.

## First experiment

`Jellyfish Study 01` is the first Mathematical Art entry. It is a Canvas point-cloud study built from layered trigonometric rings, radial deformation, and oscillating tentacle functions. Its catalog preview uses a reduced point count while the detail page renders the denser version.

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
2. Create its full renderer under `src/experiments/<art-form>/<slug>.tsx`.
3. Create a preview renderer under `src/experiments/<art-form>/<slug>.preview.tsx`.
4. Export both as default React components.
5. Register the stage and preview dynamic imports in `src/experiments/registry.ts`.

Example:

```ts
const stageLoaders = {
  'particle-rose': () => import('./particle-art/particle-rose'),
}

const previewLoaders = {
  'particle-rose': () => import('./particle-art/particle-rose.preview'),
}
```

This keeps the library scalable: browsing the catalog does not require downloading every full artwork runtime.
