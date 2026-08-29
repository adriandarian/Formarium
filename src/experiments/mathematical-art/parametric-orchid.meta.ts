import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'parametric-orchid',
    title: 'Parametric Orchid',
    collection: 'mathematical-art',
    description: 'Rotational petal loops and nested radial harmonics unfold into an orchid-like specimen that continuously opens and closes.',
    tags: ['parametric', 'flower', 'symmetry', 'polar'],
    runtime: 'canvas',
    mathFunction: 'r(θ,t)=sin³(3θ)+0.35 sin(7θ+t)',
    createdAt: '2026-08-28',
  },
  stage: () => import('./parametric-orchid'),
  preview: () => import('./parametric-orchid'),
} satisfies ExperimentDefinition
