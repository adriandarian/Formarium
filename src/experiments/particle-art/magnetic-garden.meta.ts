import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'magnetic-garden',
    title: 'Magnetic Garden',
    collection: 'particle-art',
    description:
      'An interactive field of luminous particle strands that grows through moving vector currents, bends toward the pointer, and bursts outward under pressure.',
    tags: ['particles', 'interactive', 'vector field', 'magnetism'],
    runtime: 'canvas',
    createdAt: '2026-08-28',
  },
  stage: () => import('./magnetic-garden'),
  preview: () => import('./magnetic-garden.preview'),
} satisfies ExperimentDefinition
