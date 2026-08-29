import type { Collection, Experiment } from '../types'

export const abstractArtCollection: Collection = {
  slug: 'abstract-art',
  title: 'Abstract Art',
  description: 'Shaders, luminous forms, procedural effects, and visual studies without fixed representation.',
  featuredExperimentSlug: 'spectral-ember',
}

export const abstractArtExperiments: Experiment[] = [
  {
    slug: 'chromatic-portal',
    title: 'Chromatic Portal',
    collection: 'abstract-art',
    description:
      'A luminous hollow form rendered as a raw WebGL fragment shader, with breathing contours, chromatic glow, and pointer-driven drift.',
    tags: ['webgl', 'fragment shader', 'glow', 'procedural'],
    runtime: 'webgl',
    createdAt: '2026-08-28',
  },
  {
    slug: 'spectral-ember',
    title: 'Spectral Ember',
    collection: 'abstract-art',
    description:
      'A breathing energy flame built from a raw fragment shader, layered spectral contours, a white-hot core, and drifting sparks.',
    tags: ['webgl', 'fragment shader', 'energy', 'chromatic'],
    runtime: 'webgl',
    createdAt: '2026-08-28',
  },
]
