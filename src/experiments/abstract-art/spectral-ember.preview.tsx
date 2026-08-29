import type { ExperimentRendererProps } from '../types'
import { SpectralEmberWebGL } from './spectral-ember.webgl'

export default function SpectralEmberPreview({ experiment }: ExperimentRendererProps) {
  return <SpectralEmberWebGL experiment={experiment} compact />
}
