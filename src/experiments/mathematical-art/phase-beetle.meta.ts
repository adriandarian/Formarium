import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'phase-beetle',
    title: 'Phase Beetle',
    collection: 'mathematical-art',
    description: 'Mirrored phase-shifted lobes form a beetle-like shell whose wing cases, antennae, and segmented body oscillate as one harmonic system.',
    tags: ['phase', 'symmetry', 'parametric', 'creature'],
    runtime: 'canvas',
    mathFunction: 'x=sin(2u+φ)cos(v), y=sin(3v+t)sin(u)',
    createdAt: '2026-08-28',
  },
  stage: () => import('./phase-beetle'),
  preview: () => import('./phase-beetle'),
} satisfies ExperimentDefinition
