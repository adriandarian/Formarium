import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'flocking-halo',
    title: 'Flocking Halo',
    collection: 'particle-art',
    description: 'A circular flock that behaves like a living halo, balancing alignment, cohesion, separation, and orbital attraction.',
    tags: ['particles', 'boids', 'flocking', 'emergent'],
    runtime: 'canvas',
    createdAt: '2026-08-28',
  },
  stage: () => import('./flocking-halo'),
  preview: () => import('./flocking-halo'),
} satisfies ExperimentDefinition
