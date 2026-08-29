import type { ExperimentDefinition } from '../types'

export default {
  experiment: {
    slug: 'torus-lattice',
    title: 'Torus Lattice',
    collection: 'mathematical-art',
    description: 'Meridians and longitudes weave a breathing torus into a luminous lattice, rotating through a simple 3D projection.',
    tags: ['torus', 'surface', 'lattice', '3d projection'],
    runtime: 'canvas',
    mathFunction: 'x=(R+r cos v)cos u, y=(R+r cos v)sin u, z=r sin v',
    createdAt: '2026-08-28',
  },
  stage: () => import('./torus-lattice'),
  preview: () => import('./torus-lattice'),
} satisfies ExperimentDefinition
