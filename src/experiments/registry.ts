import { lazy, type LazyExoticComponent } from 'react'
import type {
  ExperimentLoader,
  ExperimentRenderer,
  ExperimentRenderMode,
} from './types'

const stageLoaders = {
  'jellyfish-study-01': () => import('./mathematical-art/jellyfish-study-01'),
  'chromatic-portal': () => import('./abstract-art/chromatic-portal'),
} satisfies Record<string, ExperimentLoader>

const previewLoaders = {
  'jellyfish-study-01': () => import('./mathematical-art/jellyfish-study-01.preview'),
  'chromatic-portal': () => import('./abstract-art/chromatic-portal.preview'),
} satisfies Record<string, ExperimentLoader>

const stageCache = new Map<string, LazyExoticComponent<ExperimentRenderer>>()
const previewCache = new Map<string, LazyExoticComponent<ExperimentRenderer>>()

function getRegistry(mode: ExperimentRenderMode) {
  return mode === 'preview' ? previewLoaders : stageLoaders
}

function getCache(mode: ExperimentRenderMode) {
  return mode === 'preview' ? previewCache : stageCache
}

export function hasExperimentRenderer(
  slug: string,
  mode: ExperimentRenderMode = 'stage',
) {
  return Object.prototype.hasOwnProperty.call(getRegistry(mode), slug)
}

export function getExperimentRenderer(
  slug: string,
  mode: ExperimentRenderMode = 'stage',
) {
  const loader = (getRegistry(mode) as Record<string, ExperimentLoader>)[slug]
  if (!loader) return null

  const cache = getCache(mode)
  const cached = cache.get(slug)
  if (cached) return cached

  const renderer = lazy(loader)
  cache.set(slug, renderer)
  return renderer
}
