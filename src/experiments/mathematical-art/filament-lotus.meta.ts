import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'filament-lotus',
    title: 'Filament Lotus',
    collection: 'mathematical-art',
    description: 'Hundreds of nested radial sinusoid filaments assemble a lotus whose petals shimmer through tiny frequency and phase differences.',
    tags: ['radial', 'harmonics', 'filaments', 'lotus'],
    runtime: 'canvas',
    mathFunction: 'rₙ(θ,t)=Aₙ sin(kθ+φₙ+tωₙ)',
    createdAt: '2026-08-28',
  },
  stage: () => import('./filament-lotus'),
  preview: () => import('./filament-lotus'),
} satisfies ExperimentDefinition
