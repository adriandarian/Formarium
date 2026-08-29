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

// Experiments are intentionally data-driven. Add each new work here and give its
// interactive renderer a matching module under src/experiments/.
export const experiments: Experiment[] = []

export function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug)
}

export function getExperimentsForCollection(slug: string) {
  return experiments.filter((experiment) => experiment.collection === slug)
}

export function getExperiment(slug: string) {
  return experiments.find((experiment) => experiment.slug === slug)
}
