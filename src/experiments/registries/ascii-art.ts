import type { ExperimentLoader } from '../types'

export const asciiStageLoaders = {
  'glyph-bloom': () => import('../ascii-art/glyph-bloom'),
  'signal-dunes': () => import('../ascii-art/signal-dunes'),
  'glyph-koi': () => import('../ascii-art/glyph-koi'),
} satisfies Record<string, ExperimentLoader>

export const asciiPreviewLoaders = {
  'glyph-bloom': () => import('../ascii-art/glyph-bloom.preview'),
  'signal-dunes': () => import('../ascii-art/signal-dunes.preview'),
  'glyph-koi': () => import('../ascii-art/glyph-koi.preview'),
} satisfies Record<string, ExperimentLoader>
