import type { Collection, Experiment } from '../types'

export const mathematicalArtCollection: Collection = {
  slug: 'mathematical-art',
  title: 'Mathematical Art',
  description: 'Animated forms and systems shaped by equations, functions, and procedural motion.',
  featuredExperimentSlug: 'fourier-seraph',
}

export const mathematicalArtExperiments: Experiment[] = [
  {
    slug: 'jellyfish-study-01',
    title: 'Jellyfish Study 01',
    collection: 'mathematical-art',
    description:
      'A point-cloud organism built from layered trigonometric rings, radial deformation, and oscillating tentacle functions.',
    tags: ['parametric', 'trigonometry', 'point cloud', 'organic motion'],
    runtime: 'canvas',
    mathFunction: 'r(θ, t) = (0.17 + sin(πv) · 0.83) · s + 0.035s · sin(1.8t + 6.5v)',
    createdAt: '2026-08-28',
  },
  {
    slug: 'orbital-bloom',
    title: 'Orbital Bloom',
    collection: 'mathematical-art',
    description:
      'A breathing rose curve assembled from hundreds of orbiting points, layered phase offsets, and slowly drifting harmonic frequencies.',
    tags: ['rose curve', 'harmonics', 'parametric', 'point field'],
    runtime: 'canvas',
    mathFunction: 'r(θ) = a · sin(kθ),  k ≈ 5 + 0.75 sin(0.27t)',
    createdAt: '2026-08-28',
  },
  {
    slug: 'harmonic-moth',
    title: 'Harmonic Moth',
    collection: 'mathematical-art',
    description:
      'A bilateral organism generated from coupled sine fields, mirrored parametric wings, and slowly shifting harmonic interference.',
    tags: ['harmonics', 'symmetry', 'parametric', 'creature'],
    runtime: 'canvas',
    mathFunction: 'y(x, t) = sin(3x + t) · cos(2x − 0.7t),  x ∈ [−π, π]',
    createdAt: '2026-08-28',
  },
  {
    slug: 'fourier-seraph',
    title: 'Fourier Seraph',
    collection: 'mathematical-art',
    description:
      'A six-winged harmonic organism assembled from nested Fourier loops, mirrored epicycle filaments, and a pulsing axial spine.',
    tags: ['fourier', 'epicycles', 'harmonics', 'organism'],
    runtime: 'canvas',
    createdAt: '2026-08-28',
  },
]
