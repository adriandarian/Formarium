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
  featuredExperimentSlug?: string
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
