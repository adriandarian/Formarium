import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'harmonic-moth',
    title: 'Harmonic Moth',
    collection: 'mathematical-art',
    description:
      'A bilateral organism generated from coupled sine fields, mirrored parametric wings, and slowly shifting harmonic interference.',
    tags: ['harmonics', 'symmetry', 'parametric', 'creature'],
    runtime: 'canvas',
    mathFunction: 'y(x, t) = sin(3x + t) · cos(2x − 0.7t),  x ∈ [−π, π]',
    createdAt: '2026-08-28',
  },
  stage: () => import('./harmonic-moth'),
  preview: () => import('./harmonic-moth.preview'),
} satisfies ExperimentDefinition
