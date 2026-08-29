import { lazy, type LazyExoticComponent } from 'react'
import type { ExperimentLoader, ExperimentRenderer } from './types'

// Keep every artwork behind a dynamic import so opening the library does not
// download every renderer. Register new experiments here by slug.
const loaders = {
  // 'particle-rose': () => import('./particle-art/particle-rose'),
  // 'jellyfish-01': () => import('./mathematical-art/jellyfish-01'),
} satisfies Record<string, ExperimentLoader>

const rendererCache = new Map<string, LazyExoticComponent<ExperimentRenderer>>()

export function hasExperimentRenderer(slug: string) {
  return Object.prototype.hasOwnProperty.call(loaders, slug)
}

export function getExperimentRenderer(slug: string) {
  const loader = (loaders as Record<string, ExperimentLoader>)[slug]

  if (!loader) {
    return null
  }

  const cached = rendererCache.get(slug)
  if (cached) {
    return cached
  }

  const renderer = lazy(loader)
  rendererCache.set(slug, renderer)
  return renderer
}
