import type { ExperimentRendererProps } from '../types'
import { TurbulentFilamentCanvas } from './turbulent-filament.canvas'

export default function TurbulentFilamentPreview({ experiment }: ExperimentRendererProps) {
  return <TurbulentFilamentCanvas experiment={experiment} compact />
}
