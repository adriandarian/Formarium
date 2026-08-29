import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'constellation-loom',
    title: 'Constellation Loom',
    collection: 'particle-art',
    description: 'A drifting star field that continuously weaves nearby points into transient constellations, with the pointer acting like a shuttle.',
    tags: ['particles', 'network', 'constellation', 'interactive'],
    runtime: 'canvas',
    createdAt: '2026-08-28',
  },
  stage: () => import('./constellation-loom'),
  preview: () => import('./constellation-loom'),
} satisfies ExperimentDefinition
