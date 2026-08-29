import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'chromatic-faultline',
    title: 'Chromatic Faultline',
    collection: 'abstract-art',
    description: 'A living diagonal fracture splits the image into sliding spectral strata, glowing along a restless fault seam.',
    tags: ['webgl', 'shader', 'fracture', 'chromatic'],
    runtime: 'webgl',
    createdAt: '2026-08-28',
  },
  stage: () => import('./chromatic-faultline'),
  preview: () => import('./chromatic-faultline'),
} satisfies ExperimentDefinition
