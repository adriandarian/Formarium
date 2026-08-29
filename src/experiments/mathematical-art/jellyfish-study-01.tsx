import type { ExperimentRendererProps } from '../types'
import { JellyfishCanvas } from './jellyfish-study-01.canvas'

export default function JellyfishStudy01({ experiment }: ExperimentRendererProps) {
  return <JellyfishCanvas experiment={experiment} />
}
