# Formarium

A personal interactive library of computational art experiments.

Formarium is a **library first**: the catalog lets visitors browse distinct art forms, enter a collection, and explore every work in that medium. Individual experiments can then open into their own live, interactive view.

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
├── components/                shared library/catalog UI
├── data/                      collection + experiment metadata
├── experiments/               live artwork implementations (next step)
├── routes/                    TanStack Router file routes
└── styles/                    application styles
```

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
2. Add its interactive implementation under `src/experiments/<slug>/`.
3. Mount that renderer in the experiment detail view.

The renderer registry is the next piece of Formarium's architecture and will let each experiment choose its own visual technology while the catalog remains consistent.
