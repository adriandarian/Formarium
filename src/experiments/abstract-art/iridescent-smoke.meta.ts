import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'iridescent-smoke',
    title: 'Iridescent Smoke',
    collection: 'abstract-art',
    description: 'Slow volumetric-looking smoke folds through pearlescent color bands and dark translucent eddies.',
    tags: ['webgl', 'shader', 'smoke', 'iridescent'],
    runtime: 'webgl',
    createdAt: '2026-08-28',
  },
  stage: () => import('./iridescent-smoke'),
  preview: () => import('./iridescent-smoke'),
} satisfies ExperimentDefinition
