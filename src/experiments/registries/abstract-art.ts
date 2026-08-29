import type { ExperimentLoader } from '../types'

export const abstractStageLoaders = {
  'chromatic-portal': () => import('../abstract-art/chromatic-portal'),
} satisfies Record<string, ExperimentLoader>

export const abstractPreviewLoaders = {
  'chromatic-portal': () => import('../abstract-art/chromatic-portal.preview'),
} satisfies Record<string, ExperimentLoader>
