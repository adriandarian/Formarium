import type { ComponentType } from 'react'
import type { Experiment } from '../data/library'

export interface ExperimentRendererProps {
  experiment: Experiment
}

export type ExperimentRenderer = ComponentType<ExperimentRendererProps>

export interface ExperimentRendererModule {
  default: ExperimentRenderer
}

export type ExperimentLoader = () => Promise<ExperimentRendererModule>
