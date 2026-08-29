import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'resonant-tangle',
    title: 'Resonant Tangle',
    collection: 'mathematical-art',
    description:
      'A luminous knot of moving points shaped by nested trigonometric fields, radial distance, and a slowly turning phase.',
    tags: ['trigonometric', 'point field', 'phase', 'generative'],
    runtime: 'canvas',
    mathFunction:
      'a(y) = point((99 + k²) cos(d − t/3) + 200, 3 sin(2k) + 0.2/k + (y/9)k(2 + sin(9e − 6d + t)) + 59 sin(d − t/3) + 200)',
    createdAt: '2026-08-29',
  },
  stage: () => import('./resonant-tangle'),
  preview: () => import('./resonant-tangle.preview'),
} satisfies ExperimentDefinition
