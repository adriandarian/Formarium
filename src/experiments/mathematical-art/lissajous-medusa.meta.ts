import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'lissajous-medusa',
    title: 'Lissajous Medusa',
    collection: 'mathematical-art',
    description: 'A drifting medusa assembled from nested Lissajous lobes and phase-shifted harmonic tentacles.',
    tags: ['lissajous', 'harmonics', 'parametric', 'creature'],
    runtime: 'canvas',
    mathFunction: 'x = A sin(at + δ), y = B sin(bt)',
    createdAt: '2026-08-28',
  },
  stage: () => import('./lissajous-medusa'),
  preview: () => import('./lissajous-medusa'),
} satisfies ExperimentDefinition
