import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'neon-city-rain',
    title: 'Neon City Rain',
    collection: 'ascii-art',
    description: 'A cyber-noir skyline where windows, signs, rain, reflections, and traffic are all built from glowing characters.',
    tags: ['ascii', 'city', 'rain', 'neon'],
    runtime: 'ascii',
    createdAt: '2026-08-28',
  },
  stage: () => import('./neon-city-rain'),
  preview: () => import('./neon-city-rain'),
} satisfies ExperimentDefinition
