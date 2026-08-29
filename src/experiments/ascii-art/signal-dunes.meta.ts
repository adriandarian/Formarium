import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'signal-dunes',
    title: 'Signal Dunes',
    collection: 'ascii-art',
    description:
      'A drifting topographic landscape reconstructed from monospaced glyph density, interference waves, and luminous character ridges.',
    tags: ['ascii', 'landscape', 'wave interference', 'typography'],
    runtime: 'ascii',
    createdAt: '2026-08-28',
  },
  stage: () => import('./signal-dunes'),
  preview: () => import('./signal-dunes.preview'),
} satisfies ExperimentDefinition
