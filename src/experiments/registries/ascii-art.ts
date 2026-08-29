import type { ExperimentLoader } from '../types'

export const asciiStageLoaders = {
  'glyph-bloom': () => import('../ascii-art/glyph-bloom'),
} satisfies Record<string, ExperimentLoader>

export const asciiPreviewLoaders = {
  'glyph-bloom': () => import('../ascii-art/glyph-bloom.preview'),
} satisfies Record<string, ExperimentLoader>
