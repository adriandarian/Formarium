import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'whispering-lantern',
    title: 'Whispering Lantern',
    collection: 'mathematical-art',
    description:
      'A floating lantern of points, folded from nested cosine waves and a softly breathing radial field.',
    tags: ['trigonometric', 'point field', 'motion', 'generative'],
    runtime: 'canvas',
    mathFunction:
      'a(y,t)=point(4k/d−e sin k+k(12+6d sin(d²−t+cos(t/3)+0.3 sin e))/d²+200, 12 sin(2.6d−t)+66d+40), k=(8+sin(i/19+t))cos(i/49), d=√(k²+e²), e=y/8−12',
    createdAt: '2026-08-29',
  },
  stage: () => import('./whispering-lantern'),
  preview: () => import('./whispering-lantern.preview'),
} satisfies ExperimentDefinition
