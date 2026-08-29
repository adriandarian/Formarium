import type { ExperimentRendererProps } from '../types'
import { MagneticGardenCanvas } from './magnetic-garden.canvas'

export default function MagneticGarden({ experiment }: ExperimentRendererProps) {
  return <MagneticGardenCanvas experiment={experiment} />
}
