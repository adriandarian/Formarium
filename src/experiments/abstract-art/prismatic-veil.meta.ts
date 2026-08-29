import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'prismatic-veil',
    title: 'Prismatic Veil',
    collection: 'abstract-art',
    description:
      'A field of translucent spectral curtains woven from layered interference bands, flowing wave equations, and pointer-distorted refraction.',
    tags: ['webgl', 'fragment shader', 'interference', 'spectral'],
    runtime: 'webgl',
    createdAt: '2026-08-28',
  },
  stage: () => import('./prismatic-veil'),
  preview: () => import('./prismatic-veil.preview'),
} satisfies ExperimentDefinition
