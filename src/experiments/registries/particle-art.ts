import type { ExperimentLoader } from '../types'

export const particleStageLoaders = {
  'particle-rose': () => import('../particle-art/particle-rose'),
  'void-soup': () => import('../particle-art/void-soup'),
  'magnetic-garden': () => import('../particle-art/magnetic-garden'),
} satisfies Record<string, ExperimentLoader>

export const particlePreviewLoaders = {
  'particle-rose': () => import('../particle-art/particle-rose.preview'),
  'void-soup': () => import('../particle-art/void-soup.preview'),
  'magnetic-garden': () => import('../particle-art/magnetic-garden.preview'),
} satisfies Record<string, ExperimentLoader>
