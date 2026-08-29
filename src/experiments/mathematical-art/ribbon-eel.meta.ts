import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'ribbon-eel',
    title: 'Ribbon Eel',
    collection: 'mathematical-art',
    description: 'A sinusoidal spine carries offset normal curves into a long ribbon organism that swims through phase-shifted traveling waves.',
    tags: ['traveling wave', 'parametric', 'ribbon', 'creature'],
    runtime: 'canvas',
    mathFunction: 'y(x,t)=A sin(kx−ωt)+B sin(2kx+0.6ωt)',
    createdAt: '2026-08-28',
  },
  stage: () => import('./ribbon-eel'),
  preview: () => import('./ribbon-eel'),
} satisfies ExperimentDefinition
