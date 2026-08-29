import type { ExperimentLoader } from '../types'

export const particleStageLoaders = {
  'particle-rose': () => import('../particle-art/particle-rose'),
} satisfies Record<string, ExperimentLoader>

export const particlePreviewLoaders = {
  'particle-rose': () => import('../particle-art/particle-rose.preview'),
} satisfies Record<string, ExperimentLoader>
