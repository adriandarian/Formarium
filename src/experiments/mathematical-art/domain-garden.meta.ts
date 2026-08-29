import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'domain-garden',
    title: 'Domain Garden',
    collection: 'mathematical-art',
    description: 'Domain coloring turns the phase and magnitude of a rational complex function into a garden of singularities, petals, and contour bands.',
    tags: ['domain coloring', 'complex plane', 'phase', 'rational function'],
    runtime: 'canvas',
    mathFunction: 'f(z)=(z³−1)/(z³+1)',
    createdAt: '2026-08-28',
  },
  stage: () => import('./domain-garden'),
  preview: () => import('./domain-garden'),
} satisfies ExperimentDefinition
