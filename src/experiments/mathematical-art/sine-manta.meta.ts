import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'sine-manta',
    title: 'Sine Manta',
    collection: 'mathematical-art',
    description: 'A manta-like point mesh glides through coupled sine surfaces, with mirrored wings rising and folding under phase interference.',
    tags: ['sine surface', 'parametric', 'creature', 'mesh'],
    runtime: 'canvas',
    mathFunction: 'z(u,v,t)=sin(3u+t)cos(2v−0.7t)(1−|v|)',
    createdAt: '2026-08-28',
  },
  stage: () => import('./sine-manta'),
  preview: () => import('./sine-manta'),
} satisfies ExperimentDefinition
