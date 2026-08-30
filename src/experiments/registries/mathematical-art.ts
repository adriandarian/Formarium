import type { ExperimentLoader } from '../types'

export const mathematicalStageLoaders = {
  'jellyfish-study-01': () => import('../mathematical-art/jellyfish-study-01'),
  'orbital-bloom': () => import('../mathematical-art/orbital-bloom'),
  'harmonic-moth': () => import('../mathematical-art/harmonic-moth'),
  'fourier-seraph': () => import('../mathematical-art/fourier-seraph'),
  'turbulent-filament': () => import('../mathematical-art/turbulent-filament'),
  'whispering-lantern': () => import('../mathematical-art/whispering-lantern'),
  'magnetic-echo': () => import('../mathematical-art/magnetic-echo'),
  'phase-orbit': () => import('../mathematical-art/phase-orbit'),
} satisfies Record<string, ExperimentLoader>

export const mathematicalPreviewLoaders = {
  'jellyfish-study-01': () => import('../mathematical-art/jellyfish-study-01.preview'),
  'orbital-bloom': () => import('../mathematical-art/orbital-bloom.preview'),
  'harmonic-moth': () => import('../mathematical-art/harmonic-moth.preview'),
  'fourier-seraph': () => import('../mathematical-art/fourier-seraph.preview'),
  'turbulent-filament': () => import('../mathematical-art/turbulent-filament.preview'),
  'whispering-lantern': () => import('../mathematical-art/whispering-lantern.preview'),
  'magnetic-echo': () => import('../mathematical-art/magnetic-echo'),
  'phase-orbit': () => import('../mathematical-art/phase-orbit'),
} satisfies Record<string, ExperimentLoader>
