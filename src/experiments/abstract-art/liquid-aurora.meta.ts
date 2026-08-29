import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'liquid-aurora',
    title: 'Liquid Aurora',
    collection: 'abstract-art',
    description: 'Silky auroral ribbons pour across the frame as layered spectral waves, haze, and soft interference light.',
    tags: ['webgl', 'shader', 'aurora', 'spectral'],
    runtime: 'webgl',
    createdAt: '2026-08-28',
  },
  stage: () => import('./liquid-aurora'),
  preview: () => import('./liquid-aurora'),
} satisfies ExperimentDefinition
