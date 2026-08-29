import type { ExperimentRendererProps } from '../types'
import { TurbulentFilamentCanvas } from './turbulent-filament.canvas'

export default function TurbulentFilament({ experiment }: ExperimentRendererProps) {
  return <TurbulentFilamentCanvas experiment={experiment} />
}
