import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'newton-basin-flower',
    title: 'Newton Basin Flower',
    collection: 'mathematical-art',
    description: 'Newton iteration for the roots of z³−1 partitions the complex plane into three interlocking attraction basins that read like recursive petals.',
    tags: ['newton fractal', 'complex dynamics', 'roots', 'basins'],
    runtime: 'canvas',
    mathFunction: 'zₙ₊₁=zₙ−(zₙ³−1)/(3zₙ²)',
    createdAt: '2026-08-28',
  },
  stage: () => import('./newton-basin-flower'),
  preview: () => import('./newton-basin-flower'),
} satisfies ExperimentDefinition
