import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'rossler-bloom',
    title: 'Rössler Bloom',
    collection: 'mathematical-art',
    description: 'Rössler trajectories unfurl into layered chaotic petals, hovering between a spiral flower and an unstable orbit.',
    tags: ['rossler attractor', 'chaos', 'ode', 'strange attractor'],
    runtime: 'canvas',
    mathFunction: 'ẋ=−y−z, ẏ=x+ay, ż=b+z(x−c)',
    createdAt: '2026-08-28',
  },
  stage: () => import('./rossler-bloom'),
  preview: () => import('./rossler-bloom'),
} satisfies ExperimentDefinition
