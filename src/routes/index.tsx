import { createFileRoute, Link } from '@tanstack/react-router'
import { CollectionPreview } from '../components/CollectionPreview'
import {
  collections,
  experiments,
  getExperimentsForCollection,
  getFeaturedExperiment,
} from '../data/library'

export const Route = createFileRoute('/')({
  component: LibraryPage,
})

function LibraryPage() {
  const featuredExperiment = getFeaturedExperiment('mathematical-art') ?? experiments[0]
  const datedExperiments = experiments.filter((experiment) => experiment.createdAt)
  const latestExperiment = [...datedExperiments].sort((a, b) =>
    (b.createdAt ?? '').localeCompare(a.createdAt ?? ''),
  )[0]
  const runtimes = new Set(experiments.map((experiment) => experiment.runtime))

  return (
    <section className="page home-page">
      <header className="home-hero">
        <div className="home-hero__copy">
          <div>
            <span className="eyebrow">Independent computational art archive</span>
            <h1>Forms that refuse to stay still.</h1>
          </div>

          <div className="home-hero__introduction">
            <p>
              A living library of mathematical organisms, typographic landscapes,
              particle systems, and luminous abstractions.
            </p>
            <div className="home-hero__actions">
              <Link className="home-hero__primary" to="/catalog" search={{ q: '', runtime: 'all' }}>
                Enter the catalog <span aria-hidden="true">↗</span>
              </Link>
              {featuredExperiment && (
                <Link
                  className="text-link"
                  to="/experiment/$slug"
                  params={{ slug: featuredExperiment.slug }}
                >
                  View featured work
                </Link>
              )}
            </div>
          </div>

          <div className="home-hero__edition">
            <span>Formarium / Index 001</span>
            <span>Ongoing archive</span>
          </div>
        </div>

        {featuredExperiment && (
          <Link
            className="home-feature"
            to="/experiment/$slug"
            params={{ slug: featuredExperiment.slug }}
            aria-label={`View featured work: ${featuredExperiment.title}`}
          >
            <CollectionPreview
              collection={collections[0]}
              experiment={featuredExperiment}
              immersive
            />
            <div className="home-feature__label">
              <div>
                <span>Featured work</span>
                <h2>{featuredExperiment.title}</h2>
              </div>
              <span aria-hidden="true">↗</span>
            </div>
          </Link>
        )}
      </header>

      <dl className="home-ledger" aria-label="Archive overview">
        <div>
          <dt>Works</dt>
          <dd>{String(experiments.length).padStart(2, '0')}</dd>
        </div>
        <div>
          <dt>Collections</dt>
          <dd>{String(collections.length).padStart(2, '0')}</dd>
        </div>
        <div>
          <dt>Runtimes</dt>
          <dd>{String(runtimes.size).padStart(2, '0')}</dd>
        </div>
        <div className="home-ledger__latest">
          <dt>Latest entry</dt>
          <dd>{latestExperiment?.title ?? 'Archive open'}</dd>
        </div>
      </dl>

      <section className="home-collections" aria-labelledby="home-collections-heading">
        <div className="home-section-heading">
          <div>
            <span className="eyebrow">Explore the archive</span>
            <h2 id="home-collections-heading">Four ways into Formarium.</h2>
          </div>
          <p>Each room follows a different material logic. All of them remain in motion.</p>
        </div>

        <div className="home-collection-grid">
          {collections.map((collection, index) => {
            const count = getExperimentsForCollection(collection.slug).length
            const collectionFeature = getFeaturedExperiment(collection.slug)

            return (
              <Link
                className={`home-collection home-collection--${collection.slug}`}
                key={collection.slug}
                to="/catalog/$collection"
                params={{ collection: collection.slug }}
              >
                <div className="home-collection__visual">
                  <CollectionPreview
                    collection={collection}
                    experiment={collectionFeature}
                  />
                  <span className="home-collection__index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="home-collection__caption">
                  <div>
                    <h3>{collection.title}</h3>
                    <p>{collection.description}</p>
                  </div>
                  <div className="home-collection__meta">
                    <span>{String(count).padStart(2, '0')} works</span>
                    <span aria-hidden="true">↗</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <footer className="home-footer">
        <span>Every work runs live in the browser.</span>
        <Link to="/catalog" search={{ q: '', runtime: 'all' }}>
          Browse the complete index <span aria-hidden="true">→</span>
        </Link>
      </footer>
    </section>
  )
}
