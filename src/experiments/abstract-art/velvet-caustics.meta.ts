import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'velvet-caustics',
    title: 'Velvet Caustics',
    collection: 'abstract-art',
    description: 'Soft liquid caustic filaments crawl across a deep velvet field, folding into luminous cellular knots.',
    tags: ['webgl', 'shader', 'caustics', 'liquid light'],
    runtime: 'webgl',
    createdAt: '2026-08-28',
  },
  stage: () => import('./velvet-caustics'),
  preview: () => import('./velvet-caustics'),
} satisfies ExperimentDefinition
