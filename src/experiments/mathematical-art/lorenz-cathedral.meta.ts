import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'lorenz-cathedral',
    title: 'Lorenz Cathedral',
    collection: 'mathematical-art',
    description: 'A mirrored architectural apparition traced from coupled Lorenz attractors, layered into luminous nave-like arches.',
    tags: ['lorenz attractor', 'chaos', 'dynamical system', 'architecture'],
    runtime: 'canvas',
    mathFunction: 'dx/dt = σ(y−x), dy/dt = x(ρ−z)−y, dz/dt = xy−βz',
    createdAt: '2026-08-28',
  },
  stage: () => import('./lorenz-cathedral'),
  preview: () => import('./lorenz-cathedral'),
} satisfies ExperimentDefinition
