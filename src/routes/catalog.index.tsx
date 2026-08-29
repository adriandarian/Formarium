import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { CollectionCard } from '../components/CollectionCard'
import { collections, experiments, getFeaturedExperiment } from '../data/library'

export const Route = createFileRoute('/catalog/')({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === 'string' ? search.q : '',
    runtime: typeof search.runtime === 'string' ? search.runtime : 'all',
  }),
  component: CatalogPage,
})

function CatalogPage() {
  const navigate = useNavigate({ from: Route.fullPath })
  const { q, runtime } = Route.useSearch()
  const normalizedQuery = q.trim().toLowerCase()
  const filteredExperiments = experiments.filter((experiment) => {
    const matchesRuntime = runtime === 'all' || experiment.runtime === runtime
    const searchableText = [experiment.title, experiment.description, ...experiment.tags]
      .join(' ')
      .toLowerCase()
    return matchesRuntime && (!normalizedQuery || searchableText.includes(normalizedQuery))
  })
  const visibleCollections = collections.filter((collection) =>
    filteredExperiments.some((experiment) => experiment.collection === collection.slug),
  )
  const liveCollections = collections.filter((collection) =>
    experiments.some((experiment) => experiment.collection === collection.slug),
  ).length

  return (
    <section className="page catalog-page">
      <header className="catalog-hero">
        <div>
          <p className="eyebrow">Formarium / Catalog</p>
          <h1>An index of forms.</h1>
        </div>
        <div className="catalog-hero__note">
          <p>
            Enter through an art form. Each collection gathers every study, specimen,
            and finished experiment made within that visual language.
          </p>
        </div>
      </header>

      <div className="catalog-ledger" aria-label="Catalog summary">
        <div>
          <span>Collections</span>
          <strong>{String(collections.length).padStart(2, '0')}</strong>
        </div>
        <div>
          <span>Works archived</span>
          <strong>{String(experiments.length).padStart(2, '0')}</strong>
        </div>
        <div>
          <span>Live collections</span>
          <strong>{String(liveCollections).padStart(2, '0')}</strong>
        </div>
        <p>Growing continuously — no collection is considered complete.</p>
      </div>

      <div className="catalog-filters" aria-label="Filter catalog">
        <label>
          <span>Search the archive</span>
          <input
            type="search"
            value={q}
            placeholder="Title, tag, or idea"
            onChange={(event) =>
              navigate({ search: (current) => ({ ...current, q: event.target.value }), replace: true })
            }
          />
        </label>
        <label>
          <span>Runtime</span>
          <select
            value={runtime}
            onChange={(event) =>
              navigate({ search: (current) => ({ ...current, runtime: event.target.value }), replace: true })
            }
          >
            <option value="all">All runtimes</option>
            {Array.from(new Set(experiments.map((experiment) => experiment.runtime))).sort().map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>
        <p>{filteredExperiments.length} works in view</p>
      </div>

      <div className="catalog-list">
        {visibleCollections.map((collection, index) => {
          const collectionExperiments = filteredExperiments.filter(
            (item) => item.collection === collection.slug,
          )
          const featuredExperiment = getFeaturedExperiment(collection.slug)

          return (
            <CollectionCard
              key={collection.slug}
              collection={collection}
              count={collectionExperiments.length}
              index={index}
              featuredExperiment={featuredExperiment}
            />
          )
        })}
        {visibleCollections.length === 0 && (
          <div className="empty-state catalog-empty-state">
            <p>No works match those filters.</p>
            <span>Try a broader search or switch runtimes.</span>
          </div>
        )}
      </div>
    </section>
  )
}
