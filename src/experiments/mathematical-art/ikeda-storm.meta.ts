import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'ikeda-storm',
    title: 'Ikeda Storm',
    collection: 'mathematical-art',
    description: 'Iterated Ikeda-map points condense into a rotating chaotic storm with dense eyes, spiral arms, and flickering orbital dust.',
    tags: ['ikeda map', 'chaos', 'iterated map', 'storm'],
    runtime: 'canvas',
    mathFunction: 't=0.4−6/(1+x²+y²); x′=1+u(x cos t−y sin t); y′=u(x sin t+y cos t)',
    createdAt: '2026-08-28',
  },
  stage: () => import('./ikeda-storm'),
  preview: () => import('./ikeda-storm'),
} satisfies ExperimentDefinition
