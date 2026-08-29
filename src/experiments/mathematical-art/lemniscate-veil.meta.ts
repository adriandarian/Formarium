import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'lemniscate-veil',
    title: 'Lemniscate Veil',
    collection: 'mathematical-art',
    description: 'Bernoulli lemniscates overlap as rotating infinity ribbons, producing a soft woven veil of intersecting mathematical loops.',
    tags: ['lemniscate', 'polar curve', 'infinity', 'ribbon'],
    runtime: 'canvas',
    mathFunction: 'r² = a² cos(2θ)',
    createdAt: '2026-08-28',
  },
  stage: () => import('./lemniscate-veil'),
  preview: () => import('./lemniscate-veil'),
} satisfies ExperimentDefinition
