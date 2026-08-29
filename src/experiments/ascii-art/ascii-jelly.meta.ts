import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'ascii-jelly',
    title: 'ASCII Jelly',
    collection: 'ascii-art',
    description: 'A translucent jellyfish rendered entirely from shifting characters, density bands, and trailing glyph tentacles.',
    tags: ['ascii', 'jellyfish', 'glyph field', 'organic motion'],
    runtime: 'ascii',
    createdAt: '2026-08-28',
  },
  stage: () => import('./ascii-jelly'),
  preview: () => import('./ascii-jelly'),
} satisfies ExperimentDefinition
