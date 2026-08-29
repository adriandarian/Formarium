import { lazy, type LazyExoticComponent } from 'react'
import {
  abstractPreviewLoaders,
  abstractStageLoaders,
} from './registries/abstract-art'
import { asciiPreviewLoaders, asciiStageLoaders } from './registries/ascii-art'
import {
  mathematicalPreviewLoaders,
  mathematicalStageLoaders,
} from './registries/mathematical-art'
import {
  particlePreviewLoaders,
  particleStageLoaders,
} from './registries/particle-art'
import type {
  ExperimentLoader,
  ExperimentRenderer,
  ExperimentRenderMode,
} from './types'

const stageLoaders = {
  ...mathematicalStageLoaders,
  ...asciiStageLoaders,
  ...particleStageLoaders,
  ...abstractStageLoaders,
} satisfies Record<string, ExperimentLoader>

const previewLoaders = {
  ...mathematicalPreviewLoaders,
  ...asciiPreviewLoaders,
  ...particlePreviewLoaders,
  ...abstractPreviewLoaders,
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
