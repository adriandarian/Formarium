import type { ExperimentRendererProps } from '../types'
import { PrismaticVeilWebGL } from './prismatic-veil.webgl'

export default function PrismaticVeilPreview({ experiment }: ExperimentRendererProps) {
  return <PrismaticVeilWebGL experiment={experiment} compact />
}
