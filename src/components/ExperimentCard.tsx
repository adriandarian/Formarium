import { Link } from '@tanstack/react-router'
import type { Experiment } from '../data/library'
import { ExperimentPreview } from './ExperimentPreview'

export function ExperimentCard({ experiment }: { experiment: Experiment }) {
  return (
    <Link
      className="experiment-card"
      to="/experiment/$slug"
      params={{ slug: experiment.slug }}
    >
      <div className="experiment-card__preview">
        <ExperimentPreview experiment={experiment} />
      </div>
      <div className="experiment-card__body">
        <div className="experiment-card__meta">
          <span>{experiment.runtime}</span>
          <span>{experiment.tags.join(' · ')}</span>
        </div>
        <h2>{experiment.title}</h2>
        <p>{experiment.description}</p>
      </div>
    </Link>
  )
}
