import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'thomas-halo',
    title: 'Thomas Halo',
    collection: 'mathematical-art',
    description: 'The cyclic symmetry of the Thomas attractor folds chaotic trajectories into a hovering three-axis halo of luminous loops.',
    tags: ['thomas attractor', 'chaos', 'cyclic symmetry', 'ode'],
    runtime: 'canvas',
    mathFunction: 'ẋ=sin y−bx, ẏ=sin z−by, ż=sin x−bz',
    createdAt: '2026-08-28',
  },
  stage: () => import('./thomas-halo'),
  preview: () => import('./thomas-halo'),
} satisfies ExperimentDefinition
