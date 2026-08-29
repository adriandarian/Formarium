import type { ExperimentRendererProps } from '../types'
import { OrbitalBloomCanvas } from './orbital-bloom.canvas'

export default function OrbitalBloom({ experiment }: ExperimentRendererProps) {
  return <OrbitalBloomCanvas experiment={experiment} />
}
