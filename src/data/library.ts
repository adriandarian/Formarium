import {
  abstractArtCollection,
  abstractArtExperiments,
} from './collections/abstract-art'
import { asciiArtCollection, asciiArtExperiments } from './collections/ascii-art'
import {
  mathematicalArtCollection,
  mathematicalArtExperiments,
} from './collections/mathematical-art'
import {
  particleArtCollection,
  particleArtExperiments,
} from './collections/particle-art'
import { collectionSlugs } from './types'
import type { Collection, Experiment } from './types'

export { collectionSlugs }
export type { ArtRuntime, Collection, CollectionSlug, Experiment } from './types'

export const collections: Collection[] = [
  mathematicalArtCollection,
  asciiArtCollection,
  particleArtCollection,
  abstractArtCollection,
]

export const experiments: Experiment[] = [
  ...mathematicalArtExperiments,
  ...asciiArtExperiments,
  ...particleArtExperiments,
  ...abstractArtExperiments,
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

export function getFeaturedExperiment(collectionSlug: string) {
  const collection = getCollection(collectionSlug)
  if (!collection?.featuredExperimentSlug) return undefined
  return getExperiment(collection.featuredExperimentSlug)
}
