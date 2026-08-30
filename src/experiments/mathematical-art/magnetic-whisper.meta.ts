import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'magnetic-whisper',
    title: 'Magnetic Whisper',
    collection: 'mathematical-art',
    description: 'A warm, breathing constellation formed by a magnetic distance field and a fourfold phase fold.',
    tags: ['parametric', 'particle', 'motion', 'generative'],
    runtime: 'canvas',
    mathFunction: 'a(m,d)=mag(k=9 cos(5i) sin(i), e=9 cos(4i) sin(3i))³/999+1.2−sin(t/2+m)³/4; point(x,y)=(99 sin(c+k p)+200, 99 sin(4c)+e p+200), p=d sin(d²−t+m), c=d/9−t/48+m',
    createdAt: '2026-08-29',
  },
  stage: () => import('./magnetic-whisper'),
  preview: () => import('./magnetic-whisper'),
} satisfies ExperimentDefinition
