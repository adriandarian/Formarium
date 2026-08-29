import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'moonlit-pagoda',
    title: 'Moonlit Pagoda',
    collection: 'ascii-art',
    description: 'A quiet pagoda, moon, mountains, and reflected water composed entirely from animated monospaced characters.',
    tags: ['ascii', 'pagoda', 'landscape', 'night'],
    runtime: 'ascii',
    createdAt: '2026-08-28',
  },
  stage: () => import('./moonlit-pagoda'),
  preview: () => import('./moonlit-pagoda'),
} satisfies ExperimentDefinition
