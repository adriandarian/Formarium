import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'magnetic-dusk',
    title: 'Magnetic Dusk',
    collection: 'mathematical-art',
    description: 'A dark, drifting constellation folded from magnetic distance, cosine bands, and a restless vertical wave.',
    tags: ['parametric', 'particle', 'motion', 'generative'],
    runtime: 'canvas',
    mathFunction: 'a(y,d)=mag(k=4 cos(i/29),e=y/5−13)−4; point(x,y)=((d²/.7−2k²+y)cos(d−t/3)+200, 3sin(2k)+cos(y)/k+(yk/9)(3+sin(9e−3d+t))+79sin((d−t/3)/3)+d²cos(t−d²/9)/3+200), y=i/295',
    createdAt: '2026-08-29',
  },
  stage: () => import('./magnetic-dusk'),
  preview: () => import('./magnetic-dusk'),
} satisfies ExperimentDefinition
