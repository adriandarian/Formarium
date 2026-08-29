import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'clifford-reef',
    title: 'Clifford Reef',
    collection: 'mathematical-art',
    description: 'A coral-like strange attractor grown from Clifford map iterations and slowly breathing parameter drift.',
    tags: ['clifford attractor', 'chaos', 'point field', 'reef'],
    runtime: 'canvas',
    mathFunction: 'xₙ₊₁=sin(ayₙ)+c cos(axₙ), yₙ₊₁=sin(bxₙ)+d cos(byₙ)',
    createdAt: '2026-08-28',
  },
  stage: () => import('./clifford-reef'),
  preview: () => import('./clifford-reef'),
} satisfies ExperimentDefinition
