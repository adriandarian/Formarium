import type { ExperimentRendererProps } from '../types'
import { ChromaticPortalWebGL } from './chromatic-portal.webgl'

export default function ChromaticPortal({ experiment }: ExperimentRendererProps) {
  return <ChromaticPortalWebGL experiment={experiment} />
}
