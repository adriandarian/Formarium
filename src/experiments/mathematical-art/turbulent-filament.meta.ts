import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'turbulent-filament',
    title: 'Equatorial Pulse',
    collection: 'mathematical-art',
    description: 'A dark, breathing constellation traced by nested cosine fields and a drifting equatorial phase.',
    tags: ['parametric', 'filament', 'motion', 'generative'],
    runtime: 'canvas',
    mathFunction: 'a=(y,d=mag(k=(4+cos(y))·cos(i),e=y/5−11)−5)→point((79+k²)·cos(c)+200,99·sin(c/3)+200+d²·sin(2t−d)+3·sin(2k)+sin(y/9+6)·k·(e+sin(4e−4d))); c=d/2.5−t/2+(i mod 2)·8',
    createdAt: '2026-08-29',
  },
  stage: () => import('./turbulent-filament'),
  preview: () => import('./turbulent-filament.preview'),
} satisfies ExperimentDefinition
