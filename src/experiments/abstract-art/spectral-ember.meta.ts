import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'spectral-ember',
    title: 'Spectral Ember',
    collection: 'abstract-art',
    description:
      'A breathing energy flame built from a raw fragment shader, layered spectral contours, a white-hot core, and drifting sparks.',
    tags: ['webgl', 'fragment shader', 'energy', 'chromatic'],
    runtime: 'webgl',
    createdAt: '2026-08-28',
  },
  stage: () => import('./spectral-ember'),
  preview: () => import('./spectral-ember.preview'),
} satisfies ExperimentDefinition
