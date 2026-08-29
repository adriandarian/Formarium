import { createFileRoute, Link } from '@tanstack/react-router'
import { ExperimentHost } from '../components/ExperimentHost'
import { getCollection, getExperiment } from '../data/library'

export const Route = createFileRoute('/experiment/$slug')({
  component: ExperimentPage,
})

function ExperimentPage() {
  const { slug } = Route.useParams()
  const experiment = getExperiment(slug)

  if (!experiment) {
    return (
      <section className="page">
        <div className="empty-state">
          <p>Experiment not found.</p>
          <Link className="text-link" to="/">
            Return to library →
          </Link>
        </div>
      </section>
    )
  }

  const collection = getCollection(experiment.collection)

  return (
    <section className="experiment-page">
      <div className="experiment-stage">
        <ExperimentHost experiment={experiment} />
      </div>
      <aside className="experiment-info">
        {collection && (
          <Link
            className="eyebrow text-link"
            to="/catalog/$collection"
            params={{ collection: collection.slug }}
          >
            ← {collection.title}
          </Link>
        )}
        <h1>{experiment.title}</h1>
        <p>{experiment.description}</p>
        <dl>
          <div>
            <dt>Runtime</dt>
            <dd>{experiment.runtime}</dd>
          </div>
          <div>
            <dt>Tags</dt>
            <dd>{experiment.tags.join(', ') || '—'}</dd>
          </div>
        </dl>
      </aside>
    </section>
  )
}
