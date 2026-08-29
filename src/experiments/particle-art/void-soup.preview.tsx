import type { ExperimentRendererProps } from '../types'
import { VoidSoupCanvas } from './void-soup.canvas'

export default function VoidSoupPreview({ experiment }: ExperimentRendererProps) {
  return <VoidSoupCanvas experiment={experiment} compact />
}
