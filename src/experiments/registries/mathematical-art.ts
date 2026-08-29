import type { ExperimentLoader } from '../types'

export const mathematicalStageLoaders = {
  'jellyfish-study-01': () => import('../mathematical-art/jellyfish-study-01'),
  'orbital-bloom': () => import('../mathematical-art/orbital-bloom'),
  'harmonic-moth': () => import('../mathematical-art/harmonic-moth'),
} satisfies Record<string, ExperimentLoader>

export const mathematicalPreviewLoaders = {
  'jellyfish-study-01': () => import('../mathematical-art/jellyfish-study-01.preview'),
  'orbital-bloom': () => import('../mathematical-art/orbital-bloom.preview'),
  'harmonic-moth': () => import('../mathematical-art/harmonic-moth.preview'),
} satisfies Record<string, ExperimentLoader>
