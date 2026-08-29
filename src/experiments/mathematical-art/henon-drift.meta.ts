import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'henon-drift',
    title: 'Hénon Drift',
    collection: 'mathematical-art',
    description: 'Hénon-map iterations accumulate as drifting sediment arcs, revealing the attractor as a delicate weather system of mathematical dust.',
    tags: ['henon map', 'chaos', 'iterated map', 'dust'],
    runtime: 'canvas',
    mathFunction: 'xₙ₊₁=1−axₙ²+yₙ, yₙ₊₁=bxₙ',
    createdAt: '2026-08-28',
  },
  stage: () => import('./henon-drift'),
  preview: () => import('./henon-drift'),
} satisfies ExperimentDefinition
