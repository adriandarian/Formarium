import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'reaction-crown',
    title: 'Reaction Crown',
    collection: 'mathematical-art',
    description: 'A polar crown that mutates through reaction-diffusion inspired wave coupling and cellular phase interference.',
    tags: ['reaction diffusion', 'polar', 'cellular', 'wave field'],
    runtime: 'canvas',
    mathFunction: 'r(θ,t)=1+Σ aₙ sin(nθ+ωₙt)+0.12 sin(17θ−0.6t)',
    createdAt: '2026-08-28',
  },
  stage: () => import('./reaction-crown'),
  preview: () => import('./reaction-crown'),
} satisfies ExperimentDefinition
