import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'glass-singularity',
    title: 'Glass Singularity',
    collection: 'abstract-art',
    description: 'A refractive glass lens collapses light into a dark central singularity with chromatic edge splitting.',
    tags: ['webgl', 'shader', 'glass', 'refraction'],
    runtime: 'webgl',
    createdAt: '2026-08-28',
  },
  stage: () => import('./glass-singularity'),
  preview: () => import('./glass-singularity'),
} satisfies ExperimentDefinition
