import type { ExperimentRendererProps } from '../types'
import { PrismaticVeilWebGL } from './prismatic-veil.webgl'

export default function PrismaticVeil({ experiment }: ExperimentRendererProps) {
  return <PrismaticVeilWebGL experiment={experiment} />
}
