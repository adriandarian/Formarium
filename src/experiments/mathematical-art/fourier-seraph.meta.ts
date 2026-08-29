import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'fourier-seraph',
    title: 'Fourier Seraph',
    collection: 'mathematical-art',
    description:
      'A six-winged harmonic organism assembled from nested Fourier loops, mirrored epicycle filaments, and a pulsing axial spine.',
    tags: ['fourier', 'epicycles', 'harmonics', 'organism'],
    runtime: 'canvas',
    createdAt: '2026-08-28',
  },
  stage: () => import('./fourier-seraph'),
  preview: () => import('./fourier-seraph.preview'),
} satisfies ExperimentDefinition
