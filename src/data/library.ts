import { abstractArtCollection } from './collections/abstract-art'
import { asciiArtCollection } from './collections/ascii-art'
import { mathematicalArtCollection } from './collections/mathematical-art'
import { particleArtCollection } from './collections/particle-art'
import { collectionSlugs } from './types'
import type { Collection, Experiment } from './types'
import type { ExperimentDefinitionModule } from '../experiments/types'

export { collectionSlugs }
export type { ArtRuntime, Collection, CollectionSlug, Experiment } from './types'

export const collections: Collection[] = [
  mathematicalArtCollection,
  asciiArtCollection,
  particleArtCollection,
  abstractArtCollection,
]

const definitionModules = import.meta.glob<ExperimentDefinitionModule>(
  '../experiments/*/*.meta.ts',
  { eager: true },
)

const collectionOrder = new Map(
  collections.map((collection, index) => [collection.slug, index]),
)

export const experiments: Experiment[] = Object.values(definitionModules)
  .map((module) => module.default.experiment)
  .sort((a, b) => {
    const collectionDelta =
      (collectionOrder.get(a.collection) ?? Number.MAX_SAFE_INTEGER) -
      (collectionOrder.get(b.collection) ?? Number.MAX_SAFE_INTEGER)
    if (collectionDelta !== 0) return collectionDelta
    if (a.createdAt !== b.createdAt) return a.createdAt.localeCompare(b.createdAt)
    return a.title.localeCompare(b.title)
  })

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
