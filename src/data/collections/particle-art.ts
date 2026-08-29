import type { Collection, Experiment } from '../types'

export const particleArtCollection: Collection = {
  slug: 'particle-art',
  title: 'Particle Art',
  description: 'Point clouds, force fields, simulations, and emergent particle structures.',
  featuredExperimentSlug: 'particle-rose',
}

export const particleArtExperiments: Experiment[] = [
  {
    slug: 'particle-rose',
    title: 'Particle Rose',
    collection: 'particle-art',
    description:
      'A rotating rose sculpture assembled from thousands of luminous points, layered petals, depth projection, and subtle pointer-driven parallax.',
    tags: ['particles', 'point cloud', '3d projection', 'interactive'],
    runtime: 'canvas',
    createdAt: '2026-08-28',
  },
]
