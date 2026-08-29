import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'glyph-koi',
    title: 'Glyph Koi',
    collection: 'ascii-art',
    description:
      'A recognizable swimming koi reconstructed entirely from animated character density, curved body coordinates, fins, scales, and rippling water glyphs.',
    tags: ['ascii', 'koi', 'figurative', 'typography'],
    runtime: 'ascii',
    createdAt: '2026-08-28',
  },
  stage: () => import('./glyph-koi'),
  preview: () => import('./glyph-koi.preview'),
} satisfies ExperimentDefinition
