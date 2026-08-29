import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'vortex-orchard',
    title: 'Vortex Orchard',
    collection: 'particle-art',
    description: 'Rows of living vortices pull particle leaves into tree-like crowns while luminous fruit orbits their cores.',
    tags: ['particles', 'vortex', 'flow field', 'orchard'],
    runtime: 'canvas',
    createdAt: '2026-08-28',
  },
  stage: () => import('./vortex-orchard'),
  preview: () => import('./vortex-orchard'),
} satisfies ExperimentDefinition
