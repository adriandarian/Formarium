import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'chromatic-portal',
    title: 'Chromatic Portal',
    collection: 'abstract-art',
    description:
      'A luminous hollow form rendered as a raw WebGL fragment shader, with breathing contours, chromatic glow, and pointer-driven drift.',
    tags: ['webgl', 'fragment shader', 'glow', 'procedural'],
    runtime: 'webgl',
    createdAt: '2026-08-28',
  },
  stage: () => import('./chromatic-portal'),
  preview: () => import('./chromatic-portal.preview'),
} satisfies ExperimentDefinition
