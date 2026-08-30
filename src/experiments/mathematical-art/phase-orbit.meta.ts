import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'phase-orbit',
    title: 'Phase Orbit',
    collection: 'mathematical-art',
    description: 'A point-born orbit where cosine bands, magnetic distance, and a drifting phase fold into a luminous field.',
    tags: ['parametric', 'particle', 'motion', 'generative'],
    runtime: 'canvas',
    mathFunction: 'a(y,d)=mag(k=5·cos(i/44), e=y/2−15)/3; point(x,y)=((79+d²+k²)sin(c)+200, 99·cos(c/2)+4·sin(2k)+(y/(77·sin(e/2)+10⁻⁴))·k·e+d³/4·cos(3t−d²/4)+200), c=d/2−t/3+3(i mod 2), y=i/253',
    createdAt: '2026-08-29',
  },
  stage: () => import('./phase-orbit'),
  preview: () => import('./phase-orbit'),
} satisfies ExperimentDefinition
