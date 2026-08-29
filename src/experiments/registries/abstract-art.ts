import type { ExperimentLoader } from '../types'

export const abstractStageLoaders = {
  'chromatic-portal': () => import('../abstract-art/chromatic-portal'),
  'spectral-ember': () => import('../abstract-art/spectral-ember'),
} satisfies Record<string, ExperimentLoader>

export const abstractPreviewLoaders = {
  'chromatic-portal': () => import('../abstract-art/chromatic-portal.preview'),
  'spectral-ember': () => import('../abstract-art/spectral-ember.preview'),
} satisfies Record<string, ExperimentLoader>
