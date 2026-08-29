import type { ExperimentRendererProps } from '../types'
import { VoidSoupCanvas } from './void-soup.canvas'

export default function VoidSoup({ experiment }: ExperimentRendererProps) {
  return <VoidSoupCanvas experiment={experiment} />
}
