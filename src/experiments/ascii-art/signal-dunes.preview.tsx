import type { ExperimentRendererProps } from '../types'
import { SignalDunesCanvas } from './signal-dunes.canvas'

export default function SignalDunesPreview({ experiment }: ExperimentRendererProps) {
  return <SignalDunesCanvas experiment={experiment} compact />
}
