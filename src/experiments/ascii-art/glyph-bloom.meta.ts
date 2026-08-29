import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'glyph-bloom',
    title: 'Glyph Bloom',
    collection: 'ascii-art',
    description:
      'A rotating five-petal field reconstructed entirely from changing character density, luminance, and typographic texture.',
    tags: ['ascii', 'glyph field', 'typography', 'procedural'],
    runtime: 'ascii',
    createdAt: '2026-08-28',
  },
  stage: () => import('./glyph-bloom'),
  preview: () => import('./glyph-bloom.preview'),
} satisfies ExperimentDefinition
