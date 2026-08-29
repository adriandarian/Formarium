import type { ComponentType } from 'react'
import type { Experiment } from '../data/library'

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
