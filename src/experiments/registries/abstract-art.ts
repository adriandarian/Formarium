import type { ExperimentLoader } from '../types'

export const abstractStageLoaders = {
  'chromatic-portal': () => import('../abstract-art/chromatic-portal'),
  'spectral-ember': () => import('../abstract-art/spectral-ember'),
  'prismatic-veil': () => import('../abstract-art/prismatic-veil'),
} satisfies Record<string, ExperimentLoader>

export const abstractPreviewLoaders = {
  'chromatic-portal': () => import('../abstract-art/chromatic-portal.preview'),
  'spectral-ember': () => import('../abstract-art/spectral-ember.preview'),
  'prismatic-veil': () => import('../abstract-art/prismatic-veil.preview'),
} satisfies Record<string, ExperimentLoader>
