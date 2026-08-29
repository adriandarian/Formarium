import { createFileRoute, Link } from '@tanstack/react-router'
import { CollectionPreview } from '../components/CollectionPreview'
import { ExperimentCard } from '../components/ExperimentCard'
import {
  collections,
  getCollection,
  getExperimentsForCollection,
  getFeaturedExperiment,
} from '../data/library'

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
          <Link className="text-link" to="/catalog" search={{ q: '', runtime: 'all' }}>
            Return to catalog →
          </Link>
        </div>
      </section>
    )
  }

  const collectionIndex = collections.findIndex((item) => item.slug === collection.slug)
  const featuredExperiment = getFeaturedExperiment(collection.slug)
  const runtimes = Array.from(new Set(items.map((item) => item.runtime)))
  const tags = Array.from(new Set(items.flatMap((item) => item.tags)))

  return (
    <section className="page collection-page">
      <Link className="eyebrow text-link collection-back" to="/catalog" search={{ q: '', runtime: 'all' }}>
        ← Catalog index
      </Link>

      <header className="collection-hero">
        <div className="collection-hero__copy">
          <div className="collection-hero__number">
            Collection {String(collectionIndex + 1).padStart(2, '0')}
          </div>
          <h1>{collection.title}</h1>
          <p>{collection.description}</p>
          <div className="collection-hero__status">
            <span>{items.length === 1 ? '01 archived work' : `${String(items.length).padStart(2, '0')} archived works`}</span>
            <span>{items.length ? 'Active collection' : 'Awaiting first work'}</span>
          </div>
        </div>

        <div className="collection-hero__visual">
          <CollectionPreview
            collection={collection}
            experiment={featuredExperiment}
            immersive
          />
        </div>
      </header>

      <div className="collection-ledger">
        <div>
          <span>Works</span>
          <strong>{String(items.length).padStart(2, '0')}</strong>
        </div>
        <div>
          <span>Runtimes</span>
          <strong>{runtimes.length ? runtimes.join(' / ') : '—'}</strong>
        </div>
        <div>
          <span>Vocabulary</span>
          <strong>{tags.length ? tags.slice(0, 4).join(' / ') : 'Open'}</strong>
        </div>
      </div>

      <section className="collection-works">
        <div className="section-heading section-heading--archive">
          <div>
            <span className="eyebrow">Archive</span>
            <h2>Works in this collection</h2>
          </div>
          <span>{items.length ? `${items.length} on record` : 'No works yet'}</span>
        </div>

        {items.length ? (
          <div className="experiment-grid experiment-grid--collection">
            {items.map((experiment) => (
              <ExperimentCard key={experiment.slug} experiment={experiment} />
            ))}
          </div>
        ) : (
          <div className="collection-empty">
            <span className="collection-empty__mark">∅</span>
            <div>
              <p>This room is open, but nothing has been archived here yet.</p>
              <span>The first work will appear here when it enters Formarium.</span>
            </div>
          </div>
        )}
      </section>
    </section>
  )
}
