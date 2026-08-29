import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'butterfly-curve',
    title: 'Butterfly Curve',
    collection: 'mathematical-art',
    description: 'The classic transcendental butterfly curve is multiplied into fluttering spectral wings with slowly shifting phase and scale.',
    tags: ['butterfly curve', 'transcendental', 'polar', 'organism'],
    runtime: 'canvas',
    mathFunction: 'r = e^{sin θ} − 2cos(4θ) + sin⁵((2θ−π)/24)',
    createdAt: '2026-08-28',
  },
  stage: () => import('./butterfly-curve'),
  preview: () => import('./butterfly-curve'),
} satisfies ExperimentDefinition
