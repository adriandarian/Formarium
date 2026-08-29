import type { ExperimentLoader } from '../types'

export const mathematicalStageLoaders = {
  'jellyfish-study-01': () => import('../mathematical-art/jellyfish-study-01'),
} satisfies Record<string, ExperimentLoader>

export const mathematicalPreviewLoaders = {
  'jellyfish-study-01': () => import('../mathematical-art/jellyfish-study-01.preview'),
} satisfies Record<string, ExperimentLoader>
