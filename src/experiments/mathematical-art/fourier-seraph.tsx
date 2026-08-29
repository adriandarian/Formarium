import type { ExperimentRendererProps } from '../types'
import { FourierSeraphCanvas } from './fourier-seraph.canvas'

export default function FourierSeraph({ experiment }: ExperimentRendererProps) {
  return <FourierSeraphCanvas experiment={experiment} />
}
