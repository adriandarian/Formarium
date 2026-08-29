import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'fourier-seraph',
    title: 'Fourier Seraph',
    collection: 'mathematical-art',
    description:
      'A six-winged harmonic organism assembled from nested Fourier loops, mirrored epicycle filaments, and a pulsing axial spine.',
    mathFunction:
      'ρ(θ) = 0.42 + 0.11 sin((3 + p)θ + 0.54t) + 0.065 sin((7 + 2p)θ − 0.37t) + 0.035 cos(11θ + 0.21t)',
    tags: ['fourier', 'epicycles', 'harmonics', 'organism'],
    runtime: 'canvas',
    createdAt: '2026-08-28',
  },
  stage: () => import('./fourier-seraph'),
  preview: () => import('./fourier-seraph.preview'),
} satisfies ExperimentDefinition
