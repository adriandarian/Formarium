import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'tidal-cipher',
    title: 'Tidal Cipher',
    collection: 'mathematical-art',
    description: 'A pale tidal cipher assembled from magnetic distance, nested phase, and ten thousand drifting points.',
    tags: ['parametric', 'particle', 'motion', 'generative'],
    runtime: 'canvas',
    mathFunction: 'a(y,d)=mag(k=(5+2·sin(2y−t/2))cos(i/29), e=y/7−13)−6; q=3sin(2k)+cos(y)/k+sin(y/25)k(9+4sin(9e−3d+2t)); point=((q+50cos(d−t)+200), qsin(d−t)+39d+200), y=i/295',
    createdAt: '2026-08-29',
  },
  stage: () => import('./tidal-cipher'),
  preview: () => import('./tidal-cipher'),
} satisfies ExperimentDefinition
