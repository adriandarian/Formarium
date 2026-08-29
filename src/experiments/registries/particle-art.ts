import type { ExperimentLoader } from '../types'

export const particleStageLoaders = {
  'particle-rose': () => import('../particle-art/particle-rose'),
  'void-soup': () => import('../particle-art/void-soup'),
} satisfies Record<string, ExperimentLoader>

export const particlePreviewLoaders = {
  'particle-rose': () => import('../particle-art/particle-rose.preview'),
  'void-soup': () => import('../particle-art/void-soup.preview'),
} satisfies Record<string, ExperimentLoader>
