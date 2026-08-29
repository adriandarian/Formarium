import type { ExperimentRendererProps } from '../types'
import { SpectralEmberWebGL } from './spectral-ember.webgl'

export default function SpectralEmber({ experiment }: ExperimentRendererProps) {
  return <SpectralEmberWebGL experiment={experiment} />
}
