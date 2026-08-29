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
          {experiment.slug === 'orbital-bloom' && (
            <div className="experiment-function">
              <dt>Function</dt>
              <dd>
                <span className="math-equation" aria-label="r of theta equals a times sine of k theta; k approximately equals 5 plus 0.75 times sine of 0.27 t">
                  <span>r(θ) = a · sin(kθ)</span>
                  <span>k ≈ 5 + 0.75 sin(0.27t)</span>
                </span>
                <span className="math-caption">rose radius with a slowly drifting petal count</span>
              </dd>
            </div>
          )}
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
