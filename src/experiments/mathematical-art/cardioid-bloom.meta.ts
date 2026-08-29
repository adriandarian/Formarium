import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'cardioid-bloom',
    title: 'Cardioid Bloom',
    collection: 'mathematical-art',
    description: 'Layered cardioids pulse into a heart-like radial bloom while phase-shifted traces slowly rotate through one another.',
    tags: ['polar curve', 'cardioid', 'radial', 'harmonic'],
    runtime: 'canvas',
    mathFunction: 'r(θ) = a(1 + cos θ)',
    createdAt: '2026-08-28',
  },
  stage: () => import('./cardioid-bloom'),
  preview: () => import('./cardioid-bloom'),
} satisfies ExperimentDefinition
