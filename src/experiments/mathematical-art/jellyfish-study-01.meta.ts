import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'jellyfish-study-01',
    title: 'Jellyfish Study 01',
    collection: 'mathematical-art',
    description:
      'A point-cloud organism built from layered trigonometric rings, radial deformation, and oscillating tentacle functions.',
    tags: ['parametric', 'trigonometry', 'point cloud', 'organic motion'],
    runtime: 'canvas',
    mathFunction: 'r(θ, t) = (0.17 + sin(πv) · 0.83) · s + 0.035s · sin(1.8t + 6.5v)',
    createdAt: '2026-08-28',
  },
  stage: () => import('./jellyfish-study-01'),
  preview: () => import('./jellyfish-study-01.preview'),
} satisfies ExperimentDefinition
