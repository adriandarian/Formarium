import { lazy, type LazyExoticComponent } from 'react'
import type {
  ExperimentDefinitionModule,
  ExperimentLoader,
  ExperimentRenderer,
  ExperimentRenderMode,
} from './types'

const definitionModules = import.meta.glob<ExperimentDefinitionModule>(
  './*/*.meta.ts',
  { eager: true },
)

const stageLoaders: Record<string, ExperimentLoader> = {}
const previewLoaders: Record<string, ExperimentLoader> = {}

for (const module of Object.values(definitionModules)) {
  const { experiment, stage, preview } = module.default
  stageLoaders[experiment.slug] = stage
  if (preview) previewLoaders[experiment.slug] = preview
}

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
  const loader = getRegistry(mode)[slug]
  if (!loader) return null

  const cache = getCache(mode)
  const cached = cache.get(slug)
  if (cached) return cached

  const renderer = lazy(loader)
  cache.set(slug, renderer)
  return renderer
}
