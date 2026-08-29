import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'zeta-tide',
    title: 'Zeta Tide',
    collection: 'mathematical-art',
    description: 'A truncated Dirichlet-eta continuation traces the Riemann zeta function along neighboring vertical lines, turning complex values into tidal loops and interference seams.',
    tags: ['riemann zeta', 'complex analysis', 'eta function', 'critical strip'],
    runtime: 'canvas',
    mathFunction: 'ζ(s)=η(s)/(1−2^{1−s}), η(s)=Σₙ≥1(−1)ⁿ⁻¹n⁻ˢ',
    createdAt: '2026-08-28',
  },
  stage: () => import('./zeta-tide'),
  preview: () => import('./zeta-tide'),
} satisfies ExperimentDefinition
