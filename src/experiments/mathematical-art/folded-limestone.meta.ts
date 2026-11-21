import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'folded-limestone',
    title: 'Folded Limestone',
    collection: 'mathematical-art',
    description: 'Sixteen nested folds carve a shifting relief from a grayscale field.',
    tags: ['fractal', 'inversion', 'ray marching'],
    runtime: 'webgl',
    mathFunction: 'e = 7.5 / |p · ((0.55 + 0.005 cos t)p + 0.3)|, p′ = (0, 4, −1) − |e|p| − (3, 4, 3)|',
    createdAt: '2026-11-21',
  },
  stage: () => import('./folded-limestone'),
  preview: () => import('./folded-limestone'),
} satisfies ExperimentDefinition
