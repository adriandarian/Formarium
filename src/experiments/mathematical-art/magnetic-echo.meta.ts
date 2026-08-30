import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'magnetic-echo',
    title: 'Magnetic Echo',
    collection: 'mathematical-art',
    description: 'A dark, resonant field where magnetic distance bends thousands of echoes into a living contour.',
    tags: ['parametric', 'particle', 'motion', 'generative'],
    runtime: 'canvas',
    mathFunction: 'a(y,d)=mag(k=4 cos(i/29), e=y/4−16)−5; point(x,y)=((d²/.7−2k²+y)cos(d−t/3)+200, 3sin(2k)+cos(y)/k+(y/9)k(3+sin(9e−3d+t))+79sin((d−t/3)/3)+|d|^{2/3}sin(t−d²/7)+200)',
    createdAt: '2026-08-29',
  },
  stage: () => import('./magnetic-echo'),
  preview: () => import('./magnetic-echo'),
} satisfies ExperimentDefinition
