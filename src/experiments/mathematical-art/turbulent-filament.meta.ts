import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'turbulent-filament',
    title: 'Turbulent Filament',
    collection: 'mathematical-art',
    description: 'A luminous filament woven from nested cosine waves, cubic displacement, and a restless drifting phase.',
    tags: ['parametric', 'filament', 'motion', 'generative'],
    runtime: 'canvas',
    mathFunction: 'k=(4+cos y)cos i, d=√(k²+(y·2.3)²)−6;  x=(79+k²)cos c+200,  y=99sin(c/3)+(d³/5)sin(3t−d/.7)+…',
    createdAt: '2026-08-29',
  },
  stage: () => import('./turbulent-filament'),
  preview: () => import('./turbulent-filament.preview'),
} satisfies ExperimentDefinition
