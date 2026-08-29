import type { Collection, Experiment } from '../types'

export const asciiArtCollection: Collection = {
  slug: 'ascii-art',
  title: 'ASCII Art',
  description: 'Images, motion, and typography reconstructed through characters and glyphs.',
  featuredExperimentSlug: 'glyph-koi',
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
  {
    slug: 'signal-dunes',
    title: 'Signal Dunes',
    collection: 'ascii-art',
    description:
      'A drifting topographic landscape reconstructed from monospaced glyph density, interference waves, and luminous character ridges.',
    tags: ['ascii', 'landscape', 'wave interference', 'typography'],
    runtime: 'ascii',
    createdAt: '2026-08-28',
  },
  {
    slug: 'glyph-koi',
    title: 'Glyph Koi',
    collection: 'ascii-art',
    description:
      'A recognizable swimming koi reconstructed entirely from animated character density, curved body coordinates, fins, scales, and rippling water glyphs.',
    tags: ['ascii', 'koi', 'figurative', 'typography'],
    runtime: 'ascii',
    createdAt: '2026-08-28',
  },
]
