import { createFileRoute, Link } from '@tanstack/react-router'
import { ExperimentCard } from '../components/ExperimentCard'
import { getCollection, getExperimentsForCollection } from '../data/library'

export const Route = createFileRoute('/catalog/$collection')({
  component: CollectionPage,
})

function CollectionPage() {
  const { collection: slug } = Route.useParams()
  const collection = getCollection(slug)
  const items = getExperimentsForCollection(slug)

  if (!collection) {
    return (
      <section className="page">
        <div className="empty-state">
          <p>Collection not found.</p>
          <Link className="text-link" to="/catalog">
            Return to catalog →
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="page">
      <div className="page-heading">
        <Link className="eyebrow text-link" to="/catalog">
          ← Catalog
        </Link>
        <h1>{collection.title}</h1>
        <p>{collection.description}</p>
      </div>

      <div className="section-heading">
        <h2>Experiments</h2>
        <span>{items.length} works</span>
      </div>

      {items.length ? (
        <div className="experiment-grid">
          {items.map((experiment) => (
            <ExperimentCard key={experiment.slug} experiment={experiment} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>This collection is ready for its first piece.</p>
          <span>Add an experiment to src/data/library.ts.</span>
        </div>
      )}
    </section>
  )
}
