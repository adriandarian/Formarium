import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'glyph-bonsai',
    title: 'Glyph Bonsai',
    collection: 'ascii-art',
    description: 'A wind-bent bonsai grown recursively from typographic branches, leaves, soil, and drifting punctuation.',
    tags: ['ascii', 'bonsai', 'recursive', 'figurative'],
    runtime: 'ascii',
    createdAt: '2026-08-28',
  },
  stage: () => import('./glyph-bonsai'),
  preview: () => import('./glyph-bonsai'),
} satisfies ExperimentDefinition
