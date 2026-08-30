import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'turbulent-filament',
    title: 'Turbulent Filament',
    collection: 'mathematical-art',
    description: 'A luminous filament woven from nested cosine waves, magnetic distance, cubic displacement, and a restless drifting phase.',
    tags: ['parametric', 'filament', 'motion', 'generative'],
    runtime: 'canvas',
    mathFunction: 'a(y)=point((79+k²)cos(c)+200, 99sin(c/3)+200+d²sin(3t−d/0.7)+3sin(2k)+sin(y/9)·k·(e+sin(4e−4d)); k=(4+cos y)cos i, e=y/5−11, d=mag(k)−6, c=d/2−t/2+i mod 2·9',
    createdAt: '2026-08-29',
  },
  stage: () => import('./turbulent-filament'),
  preview: () => import('./turbulent-filament.preview'),
} satisfies ExperimentDefinition
