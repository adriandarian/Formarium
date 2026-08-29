import type { ExperimentRendererProps } from '../types'
import { ParticleRoseCanvas } from './particle-rose.canvas'

export default function ParticleRose({ experiment }: ExperimentRendererProps) {
  return <ParticleRoseCanvas experiment={experiment} />
}
