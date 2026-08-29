import type { ExperimentRendererProps } from '../types'
import { SignalDunesCanvas } from './signal-dunes.canvas'

export default function SignalDunes({ experiment }: ExperimentRendererProps) {
  return <SignalDunesCanvas experiment={experiment} />
}
