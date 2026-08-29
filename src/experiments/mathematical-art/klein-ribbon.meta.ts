import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'klein-ribbon',
    title: 'Klein Ribbon',
    collection: 'mathematical-art',
    description: 'A Klein-bottle-inspired parameterization is sampled as luminous ribbons, revealing a self-intersecting topological sculpture in rotating projection.',
    tags: ['klein bottle', 'topology', 'surface', '3d projection'],
    runtime: 'canvas',
    mathFunction: 'K(u,v): self-intersecting Klein-bottle immersion in ℝ³',
    createdAt: '2026-08-28',
  },
  stage: () => import('./klein-ribbon'),
  preview: () => import('./klein-ribbon'),
} satisfies ExperimentDefinition
