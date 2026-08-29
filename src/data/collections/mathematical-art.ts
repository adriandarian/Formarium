import type { Collection, Experiment } from '../types'

export const mathematicalArtCollection: Collection = {
  slug: 'mathematical-art',
  title: 'Mathematical Art',
  description: 'Animated forms and systems shaped by equations, functions, and procedural motion.',
  featuredExperimentSlug: 'jellyfish-study-01',
}

export const mathematicalArtExperiments: Experiment[] = [
  {
    slug: 'jellyfish-study-01',
    title: 'Jellyfish Study 01',
    collection: 'mathematical-art',
    description:
      'A point-cloud organism built from layered trigonometric rings, radial deformation, and oscillating tentacle functions.',
    tags: ['parametric', 'trigonometry', 'point cloud', 'organic motion'],
    runtime: 'canvas',
    createdAt: '2026-08-28',
  },
]
