import {
  Component,
  Suspense,
  type ErrorInfo,
  type ReactNode,
} from 'react'
import type { Experiment } from '../data/library'
import { getExperimentRenderer } from '../experiments/registry'
import type { ExperimentRenderMode } from '../experiments/types'

interface ExperimentHostProps {
  experiment: Experiment
  mode?: ExperimentRenderMode
}

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ExperimentErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Experiment renderer failed', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="experiment-runtime-state" role="alert">
          <p>This experiment could not be rendered.</p>
          <span>Check the browser console for renderer details.</span>
        </div>
      )
    }

    return this.props.children
  }
}

function RuntimeLoadingState() {
  return (
    <div className="experiment-runtime-state" aria-live="polite">
      <p>Loading experiment…</p>
    </div>
  )
}

export function ExperimentHost({
  experiment,
  mode = 'stage',
}: ExperimentHostProps) {
  const Renderer = getExperimentRenderer(experiment.slug, mode)

  if (!Renderer) {
    return (
      <div className={`experiment-host experiment-host--${mode}`}>
        <div className="experiment-runtime-state">
          <p>{mode === 'preview' ? 'Preview unavailable.' : 'Renderer not registered yet.'}</p>
          {mode === 'stage' && (
            <span>
              Add the artwork module to <code>src/experiments/registry.ts</code>.
            </span>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={`experiment-host experiment-host--${mode}`}>
      <ExperimentErrorBoundary key={`${experiment.slug}:${mode}`}>
        <Suspense fallback={<RuntimeLoadingState />}>
          <Renderer experiment={experiment} mode={mode} />
        </Suspense>
      </ExperimentErrorBoundary>
    </div>
  )
}
