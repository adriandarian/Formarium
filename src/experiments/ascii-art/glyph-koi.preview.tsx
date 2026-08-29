import type { ExperimentRendererProps } from '../types'
import { GlyphKoiCanvas } from './glyph-koi.canvas'

export default function GlyphKoiPreview({ experiment }: ExperimentRendererProps) {
  return <GlyphKoiCanvas experiment={experiment} compact />
}
