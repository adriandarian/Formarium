import type { ExperimentRendererProps } from '../types'
import { GlyphKoiCanvas } from './glyph-koi.canvas'

export default function GlyphKoi({ experiment }: ExperimentRendererProps) {
  return <GlyphKoiCanvas experiment={experiment} />
}
