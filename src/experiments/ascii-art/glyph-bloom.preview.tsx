import type { ExperimentRendererProps } from '../types'
import { GlyphBloomCanvas } from './glyph-bloom.canvas'

export default function GlyphBloomPreview({ experiment }: ExperimentRendererProps) {
  return <GlyphBloomCanvas experiment={experiment} compact />
}
