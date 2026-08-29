import type { ExperimentLoader } from '../types'

export const asciiStageLoaders = {
  'glyph-bloom': () => import('../ascii-art/glyph-bloom'),
  'signal-dunes': () => import('../ascii-art/signal-dunes'),
} satisfies Record<string, ExperimentLoader>

export const asciiPreviewLoaders = {
  'glyph-bloom': () => import('../ascii-art/glyph-bloom.preview'),
  'signal-dunes': () => import('../ascii-art/signal-dunes.preview'),
} satisfies Record<string, ExperimentLoader>
