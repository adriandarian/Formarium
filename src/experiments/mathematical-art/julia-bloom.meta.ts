import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'julia-bloom',
    title: 'Julia Bloom',
    collection: 'mathematical-art',
    description: 'A slowly drifting Julia-set parameter causes recursive boundaries to open and close like a fractal flower under magnification.',
    tags: ['julia set', 'fractal', 'complex dynamics', 'iteration'],
    runtime: 'canvas',
    mathFunction: 'zₙ₊₁=zₙ²+c',
    createdAt: '2026-08-28',
  },
  stage: () => import('./julia-bloom'),
  preview: () => import('./julia-bloom'),
} satisfies ExperimentDefinition
