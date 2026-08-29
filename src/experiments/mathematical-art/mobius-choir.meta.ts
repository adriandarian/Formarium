import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'mobius-choir',
    title: 'Möbius Choir',
    collection: 'mathematical-art',
    description: 'A choir of rotating Möbius ribbons whose harmonic phases continuously braid and unbraid.',
    tags: ['mobius', 'topology', 'ribbon', 'harmonics'],
    runtime: 'canvas',
    mathFunction: 'x=(1+v/2 cos(u/2))cos u, y=(1+v/2 cos(u/2))sin u, z=v/2 sin(u/2)',
    createdAt: '2026-08-28',
  },
  stage: () => import('./mobius-choir'),
  preview: () => import('./mobius-choir'),
} satisfies ExperimentDefinition
