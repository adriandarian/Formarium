import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'whisper-field',
    title: 'Whisper Field',
    collection: 'mathematical-art',
    description: 'A living field of folded orbits, where cosine bands and magnetic distance whisper a shifting figure into being.',
    tags: ['parametric', 'particle', 'motion', 'generative'],
    runtime: 'canvas',
    mathFunction: 'a(y,d)=mag(k=(4+cos(y·31+t))cos(i/99), e=y/5−11)−6; point(x,y)=((79+k²)cos(c)+200, 99sin(c/3)+d²sin(3t−d)+3sin(2k)+(y/13)k(e+sin(4e−4d))), c=d/2−t/2+8(i mod 3)',
    createdAt: '2026-08-29',
  },
  stage: () => import('./whisper-field'),
  preview: () => import('./whisper-field'),
} satisfies ExperimentDefinition
