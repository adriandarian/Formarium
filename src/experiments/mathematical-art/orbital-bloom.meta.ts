import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'orbital-bloom',
    title: 'Orbital Bloom',
    collection: 'mathematical-art',
    description:
      'A breathing rose curve assembled from hundreds of orbiting points, layered phase offsets, and slowly drifting harmonic frequencies.',
    tags: ['rose curve', 'harmonics', 'parametric', 'point field'],
    runtime: 'canvas',
    mathFunction: 'r(θ) = a · sin(kθ),  k ≈ 5 + 0.75 sin(0.27t)',
    createdAt: '2026-08-28',
  },
  stage: () => import('./orbital-bloom'),
  preview: () => import('./orbital-bloom.preview'),
} satisfies ExperimentDefinition
