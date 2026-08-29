import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'void-soup',
    title: 'Void Soup',
    collection: 'particle-art',
    description:
      'An emergent particle membrane shaped by drifting repulsion fields, moving negative-space cells, and continuously folding filaments.',
    tags: ['particles', 'simulation', 'force field', 'emergent'],
    runtime: 'canvas',
    createdAt: '2026-08-28',
  },
  stage: () => import('./void-soup'),
  preview: () => import('./void-soup.preview'),
} satisfies ExperimentDefinition
