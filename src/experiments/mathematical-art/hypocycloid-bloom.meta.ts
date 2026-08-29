import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'hypocycloid-bloom',
    title: 'Hypocycloid Bloom',
    collection: 'mathematical-art',
    description: 'Sharp hypocycloid cusps overlap into a breathing star-flower whose inner geometry slowly slips between neighboring ratios.',
    tags: ['hypocycloid', 'roulette curve', 'star', 'cusps'],
    runtime: 'canvas',
    mathFunction: 'x=(R−r)cosθ+r cos((R−r)θ/r), y=(R−r)sinθ−r sin((R−r)θ/r)',
    createdAt: '2026-08-28',
  },
  stage: () => import('./hypocycloid-bloom'),
  preview: () => import('./hypocycloid-bloom'),
} satisfies ExperimentDefinition
