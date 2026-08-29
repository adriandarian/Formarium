import type { ExperimentRendererProps } from '../types'
import { HarmonicMothCanvas } from './harmonic-moth.canvas'

export default function HarmonicMoth({ experiment }: ExperimentRendererProps) {
  return <HarmonicMothCanvas experiment={experiment} />
}
