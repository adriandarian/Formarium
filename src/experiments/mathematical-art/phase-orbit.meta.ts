import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'phase-orbit',
    title: 'Phase Orbit',
    collection: 'mathematical-art',
    description: 'A point-born orbit where cosine bands, magnetic distance, and a drifting phase fold into a luminous field.',
    tags: ['parametric', 'particle', 'motion', 'generative'],
    runtime: 'canvas',
    mathFunction: 'a(y,d)=mag(k=5 cos(9y), e=y/2−15)/3+sin(t)^4;  point(x,y)=((79+k²)sin(c)+200, 89 sin(c/2)+(7/d)sin(2k)+(y/(y<6?7:99 sin(e/2)+1))ke+(d³/6)sin(9t−2d)+200), c=d/2−t',
    createdAt: '2026-08-29',
  },
  stage: () => import('./phase-orbit'),
  preview: () => import('./phase-orbit'),
} satisfies ExperimentDefinition
