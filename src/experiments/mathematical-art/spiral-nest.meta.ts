import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'spiral-nest',
    title: 'Spiral Nest',
    collection: 'mathematical-art',
    description: 'Archimedean and logarithmic spirals braid into a breathing shell-like nest of rotating mathematical strands.',
    tags: ['spiral', 'logarithmic spiral', 'archimedean', 'braid'],
    runtime: 'canvas',
    mathFunction: 'r₁ = a + bθ,  r₂ = ae^{bθ}',
    createdAt: '2026-08-28',
  },
  stage: () => import('./spiral-nest'),
  preview: () => import('./spiral-nest'),
} satisfies ExperimentDefinition
