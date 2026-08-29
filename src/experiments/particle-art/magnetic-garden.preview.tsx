import type { ExperimentRendererProps } from '../types'
import { MagneticGardenCanvas } from './magnetic-garden.canvas'

export default function MagneticGardenPreview({ experiment }: ExperimentRendererProps) {
  return <MagneticGardenCanvas experiment={experiment} compact />
}
