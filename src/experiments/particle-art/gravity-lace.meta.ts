import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'gravity-lace',
    title: 'Gravity Lace',
    collection: 'particle-art',
    description: 'Thousands of particles stitch luminous lace around moving gravity wells and slingshot through their shared field.',
    tags: ['particles', 'gravity', 'n-body', 'trails'],
    runtime: 'canvas',
    createdAt: '2026-08-28',
  },
  stage: () => import('./gravity-lace'),
  preview: () => import('./gravity-lace'),
} satisfies ExperimentDefinition
