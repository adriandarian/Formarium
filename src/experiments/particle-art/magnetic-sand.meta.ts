import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'magnetic-sand',
    title: 'Magnetic Sand',
    collection: 'particle-art',
    description: 'A bed of luminous grains that aligns to a moving dipole field and ripples as the virtual magnet crosses the surface.',
    tags: ['particles', 'magnetic field', 'sand', 'interactive'],
    runtime: 'canvas',
    createdAt: '2026-08-28',
  },
  stage: () => import('./magnetic-sand'),
  preview: () => import('./magnetic-sand'),
} satisfies ExperimentDefinition
