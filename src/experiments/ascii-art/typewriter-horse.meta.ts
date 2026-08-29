import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'typewriter-horse',
    title: 'Typewriter Horse',
    collection: 'ascii-art',
    description: 'A galloping horse silhouette rebuilt frame by frame from typewriter glyph density and moving dust punctuation.',
    tags: ['ascii', 'horse', 'motion', 'figurative'],
    runtime: 'ascii',
    createdAt: '2026-08-28',
  },
  stage: () => import('./typewriter-horse'),
  preview: () => import('./typewriter-horse'),
} satisfies ExperimentDefinition
