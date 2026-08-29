import type { ExperimentRendererProps } from '../types'
import { ParticleRoseCanvas } from './particle-rose.canvas'

export default function ParticleRosePreview({ experiment }: ExperimentRendererProps) {
  return <ParticleRoseCanvas experiment={experiment} compact />
}
