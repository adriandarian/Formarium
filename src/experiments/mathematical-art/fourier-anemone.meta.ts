import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'fourier-anemone',
    title: 'Fourier Anemone',
    collection: 'mathematical-art',
    description: 'Dozens of tendrils grow from truncated Fourier sums, each harmonic bending the organism into a continuously recomposed sea-anemone form.',
    tags: ['fourier series', 'harmonics', 'tendrils', 'organism'],
    runtime: 'canvas',
    mathFunction: 'f(θ,t)=Σₙ aₙ sin(nθ+ωₙt)+bₙ cos(nθ−ωₙt)',
    createdAt: '2026-08-28',
  },
  stage: () => import('./fourier-anemone'),
  preview: () => import('./fourier-anemone'),
} satisfies ExperimentDefinition
