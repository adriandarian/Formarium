import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'particle-rose',
    title: 'Particle Rose',
    collection: 'particle-art',
    description:
      'A rotating rose sculpture assembled from thousands of luminous points, layered petals, depth projection, and subtle pointer-driven parallax.',
    tags: ['particles', 'point cloud', '3d projection', 'interactive'],
    runtime: 'canvas',
    createdAt: '2026-08-28',
  },
  stage: () => import('./particle-rose'),
  preview: () => import('./particle-rose.preview'),
} satisfies ExperimentDefinition
