import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'phase-orbit',
    title: 'Phase Orbit',
    collection: 'mathematical-art',
    description: 'A point-born orbit where cosine bands, magnetic distance, and a drifting phase fold into a luminous field.',
    tags: ['parametric', 'particle', 'motion', 'generative'],
    runtime: 'canvas',
    mathFunction: 'a(y,d)=mag(k=5 cos(9y), e=y−35)/2.5;  point(x,y)=((79+k²+4d)sin c+200, 89 sin(c/2)+(7/d)sin(2k)+(yk e/44)+3d sin(9t−2d+sin(t)/0.6³)+200)',
    createdAt: '2026-08-29',
  },
  stage: () => import('./phase-orbit'),
  preview: () => import('./phase-orbit'),
} satisfies ExperimentDefinition
