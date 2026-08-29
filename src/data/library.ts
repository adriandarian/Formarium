export const collectionSlugs = [
  'mathematical-art',
  'ascii-art',
  'particle-art',
  'abstract-art',
] as const

export type CollectionSlug = (typeof collectionSlugs)[number]

export type ArtRuntime =
  | 'react'
  | 'canvas'
  | 'p5'
  | 'three'
  | 'webgl'
  | 'webgpu'
  | 'shader'
  | 'ascii'

export interface Collection {
  slug: CollectionSlug
  title: string
  description: string
}

export interface Experiment {
  slug: string
  title: string
  collection: CollectionSlug
  description: string
  tags: string[]
  runtime: ArtRuntime
  createdAt?: string
}

export const collections: Collection[] = [
  {
    slug: 'mathematical-art',
    title: 'Mathematical Art',
    description: 'Animated forms and systems shaped by equations, functions, and procedural motion.',
  },
  {
    slug: 'ascii-art',
    title: 'ASCII Art',
    description: 'Images, motion, and typography reconstructed through characters and glyphs.',
  },
  {
    slug: 'particle-art',
    title: 'Particle Art',
    description: 'Point clouds, force fields, simulations, and emergent particle structures.',
  },
  {
    slug: 'abstract-art',
    title: 'Abstract Art',
    description: 'Shaders, luminous forms, procedural effects, and visual studies without fixed representation.',
  },
]

export const experiments: Experiment[] = [
  {
    slug: 'jellyfish-study-01',
    title: 'Jellyfish Study 01',
    collection: 'mathematical-art',
    description:
      'A point-cloud organism built from layered trigonometric rings, radial deformation, and oscillating tentacle functions.',
    tags: ['parametric', 'trigonometry', 'point cloud', 'organic motion'],
    runtime: 'canvas',
    createdAt: '2026-08-28',
  },
  {
    slug: 'chromatic-portal',
    title: 'Chromatic Portal',
    collection: 'abstract-art',
    description:
      'A luminous hollow form rendered as a raw WebGL fragment shader, with breathing contours, chromatic glow, and pointer-driven drift.',
    tags: ['webgl', 'fragment shader', 'glow', 'procedural'],
    runtime: 'webgl',
    createdAt: '2026-08-28',
  },
]

export function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug)
}

export function getExperimentsForCollection(slug: string) {
  return experiments.filter((experiment) => experiment.collection === slug)
}

export function getExperiment(slug: string) {
  return experiments.find((experiment) => experiment.slug === slug)
}
