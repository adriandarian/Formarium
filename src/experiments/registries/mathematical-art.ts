import type { ExperimentLoader } from '../types'

export const mathematicalStageLoaders = {
  'jellyfish-study-01': () => import('../mathematical-art/jellyfish-study-01'),
  'orbital-bloom': () => import('../mathematical-art/orbital-bloom'),
} satisfies Record<string, ExperimentLoader>

export const mathematicalPreviewLoaders = {
  'jellyfish-study-01': () => import('../mathematical-art/jellyfish-study-01.preview'),
  'orbital-bloom': () => import('../mathematical-art/orbital-bloom.preview'),
} satisfies Record<string, ExperimentLoader>
