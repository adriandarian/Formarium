import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'epicycloid-halo',
    title: 'Epicycloid Halo',
    collection: 'mathematical-art',
    description: 'Nested epicycloids rotate at neighboring ratios, producing a luminous mechanical halo of cusps, beads, and orbiting echoes.',
    tags: ['epicycloid', 'roulette curve', 'cusps', 'orbit'],
    runtime: 'canvas',
    mathFunction: 'x=(R+r)cosθ−r cos((R+r)θ/r), y=(R+r)sinθ−r sin((R+r)θ/r)',
    createdAt: '2026-08-28',
  },
  stage: () => import('./epicycloid-halo'),
  preview: () => import('./epicycloid-halo'),
} satisfies ExperimentDefinition
