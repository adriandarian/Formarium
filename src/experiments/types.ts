import type { ComponentType } from 'react'
import type { Experiment } from '../data/types'

export type ExperimentRenderMode = 'stage' | 'preview'

export interface ExperimentRendererProps {
  experiment: Experiment
  mode?: ExperimentRenderMode
}

export type ExperimentRenderer = ComponentType<ExperimentRendererProps>

export interface ExperimentRendererModule {
  default: ExperimentRenderer
}

export type ExperimentLoader = () => Promise<ExperimentRendererModule>

export interface ExperimentDefinition {
  experiment: Experiment
  stage: ExperimentLoader
  preview?: ExperimentLoader
}

export interface ExperimentDefinitionModule {
  default: ExperimentDefinition
}
