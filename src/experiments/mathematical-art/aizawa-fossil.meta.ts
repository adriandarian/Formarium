import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'aizawa-fossil',
    title: 'Aizawa Fossil',
    collection: 'mathematical-art',
    description: 'Aizawa attractor trajectories accumulate into a hollow, fossil-like cavity with layered chaotic ribs and a slowly rotating core.',
    tags: ['aizawa attractor', 'chaos', 'ode', 'fossil'],
    runtime: 'canvas',
    mathFunction: 'ẋ=(z−b)x−dy, ẏ=dx+(z−b)y, ż=c+az−z³/3−(x²+y²)(1+ez)+fz x³',
    createdAt: '2026-08-28',
  },
  stage: () => import('./aizawa-fossil'),
  preview: () => import('./aizawa-fossil'),
} satisfies ExperimentDefinition
