import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'magnetic-petal',
    title: 'Magnetic Petal',
    collection: 'mathematical-art',
    description:
      'A glowing petal field traced by four rotating magnetic seeds and a breathing polar distortion.',
    tags: ['parametric', 'motion', 'petal', 'generative'],
    runtime: 'canvas',
    mathFunction:
      'a(m,d)=mag(k=2 cos(342i), e=2 sin(271i))/1.6;  point(x,y) = (k(p+9 sin(2k)/d+89 sin(c)+200), 79 sin(2c)+9 sin(2e)/d+ep+200)',
    createdAt: '2026-08-29',
  },
  stage: () => import('./magnetic-petal'),
  preview: () => import('./magnetic-petal'),
} satisfies ExperimentDefinition
