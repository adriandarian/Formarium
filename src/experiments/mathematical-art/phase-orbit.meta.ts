import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'phase-orbit',
    title: 'Phase Orbit',
    collection: 'mathematical-art',
    description: 'A luminous phase field where magnetic distance, cosine bands, and a conditional singularity braid into a restless orbit.',
    tags: ['parametric', 'particle', 'motion', 'generative'],
    runtime: 'canvas',
    mathFunction: 'a=(y,d=mag(k=5·cos(i/56), e=y/3−16)/3)→point((19d+29+k²)sin(c)+200, 66·sin(c/3)+4·sin(2k)+(d³/3)sin(3t−d²/4)+y/(y<9?7:203·sin(e/2))·k·e+200), c=d/2−t/3, y=i/253',
    createdAt: '2026-08-29',
  },
  stage: () => import('./phase-orbit'),
  preview: () => import('./phase-orbit'),
} satisfies ExperimentDefinition
