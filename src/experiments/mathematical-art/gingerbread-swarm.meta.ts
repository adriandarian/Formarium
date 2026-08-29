import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'gingerbread-swarm',
    title: 'Gingerbread Swarm',
    collection: 'mathematical-art',
    description: 'The Gingerbreadman map becomes an angular flock of iterative trails, scattering and regrouping into a restless mathematical swarm.',
    tags: ['gingerbreadman map', 'chaos', 'iterated map', 'swarm'],
    runtime: 'canvas',
    mathFunction: 'xₙ₊₁=1−yₙ+|xₙ|, yₙ₊₁=xₙ',
    createdAt: '2026-08-28',
  },
  stage: () => import('./gingerbread-swarm'),
  preview: () => import('./gingerbread-swarm'),
} satisfies ExperimentDefinition
