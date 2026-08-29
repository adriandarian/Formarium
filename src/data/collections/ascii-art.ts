import type { Collection, Experiment } from '../types'

export const asciiArtCollection: Collection = {
  slug: 'ascii-art',
  title: 'ASCII Art',
  description: 'Images, motion, and typography reconstructed through characters and glyphs.',
  featuredExperimentSlug: 'glyph-bloom',
}

export const asciiArtExperiments: Experiment[] = [
  {
    slug: 'glyph-bloom',
    title: 'Glyph Bloom',
    collection: 'ascii-art',
    description:
      'A rotating five-petal field reconstructed entirely from changing character density, luminance, and typographic texture.',
    tags: ['ascii', 'glyph field', 'typography', 'procedural'],
    runtime: 'ascii',
    createdAt: '2026-08-28',
  },
]
