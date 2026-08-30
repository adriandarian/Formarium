import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'phase-echo', title: 'Phase Echo', collection: 'mathematical-art',
    description: 'A shimmering echo-field where trigonometric harmonics fold distance, phase, and power into a living constellation.',
    tags: ['parametric', 'trigonometric', 'particle', 'motion'], runtime: 'canvas',
    mathFunction: 'a(m,d)=‖(9 cos(5i) sin i, 9 cos(3i) cos(2i))‖³/1999+1.5−sin³(t/2+m)/3; point=(99 sin c+kp+200, 99 sin 4c+ep+200), c=d/16−t/48+m, p=d^{sin(d²−t+m)}',
    createdAt: '2026-08-29',
  },
  stage: () => import('./phase-echo'), preview: () => import('./phase-echo'),
} satisfies ExperimentDefinition
