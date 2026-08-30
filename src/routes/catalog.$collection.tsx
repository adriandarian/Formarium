import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useMemo, useRef, useState } from 'react'
import { CollectionPreview } from '../components/CollectionPreview'
import { ExperimentCard } from '../components/ExperimentCard'
import { ExperimentPreview } from '../components/ExperimentPreview'
import {
  collections,
  getCollection,
  getExperimentsForCollection,
  getFeaturedExperiment,
} from '../data/library'
import type { Collection, Experiment } from '../data/library'

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

  if (collection.slug === 'mathematical-art') {
    return (
      <MathematicalArtCollectionPage
        collection={collection}
        collectionIndex={collectionIndex}
        featuredExperiment={featuredExperiment}
        items={items}
      />
    )
  }

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

type ArchiveSort = 'curated' | 'newest' | 'title'
type ArchiveView = 'grid' | 'list'

const mathematicalSystems = [
  'parametric',
  'chaos',
  'harmonics',
  'particle',
  'point field',
  'iterated map',
  'ode',
  'phase',
  'polar',
  'trigonometric',
  'complex dynamics',
  'surface',
  'topology',
] as const

interface MathematicalArtCollectionPageProps {
  collection: Collection
  collectionIndex: number
  featuredExperiment?: Experiment
  items: Experiment[]
}

function MathematicalArtCollectionPage({
  collection,
  collectionIndex,
  featuredExperiment,
  items,
}: MathematicalArtCollectionPageProps) {
  const [query, setQuery] = useState('')
  const [system, setSystem] = useState('all')
  const [sort, setSort] = useState<ArchiveSort>('curated')
  const [view, setView] = useState<ArchiveView>('grid')
  const [visibleCount, setVisibleCount] = useState(8)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const systems = mathematicalSystems.filter((itemSystem) =>
    items.some((item) => item.tags.includes(itemSystem)),
  )

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const matchingItems = items.filter((item) => {
      const matchesSystem = system === 'all' || item.tags.includes(system)
      const searchText = [item.title, item.description, item.runtime, ...item.tags]
        .join(' ')
        .toLowerCase()
      return matchesSystem && (!normalizedQuery || searchText.includes(normalizedQuery))
    })

    if (sort === 'newest') {
      return [...matchingItems].sort((a, b) =>
        (b.createdAt ?? '').localeCompare(a.createdAt ?? ''),
      )
    }

    if (sort === 'title') {
      return [...matchingItems].sort((a, b) => a.title.localeCompare(b.title))
    }

    return matchingItems
  }, [items, query, system, sort])

  const visibleItems = filteredItems.slice(0, visibleCount)
  const hasMoreItems = visibleCount < filteredItems.length

  useEffect(() => {
    const sentinel = loadMoreRef.current
    if (!sentinel || !hasMoreItems) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.unobserve(sentinel)
        setVisibleCount((count) => Math.min(count + 12, filteredItems.length))
      },
      { rootMargin: '700px 0px' },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [filteredItems.length, hasMoreItems, visibleCount])

  function resetArchiveWindow() {
    setVisibleCount(8)
  }

  return (
    <section className="page collection-page math-gallery">
      <Link className="eyebrow text-link collection-back" to="/catalog" search={{ q: '', runtime: 'all' }}>
        ← Catalog index
      </Link>

      <header className="math-gallery__masthead">
        <div>
          <span className="eyebrow">
            Collection {String(collectionIndex + 1).padStart(2, '0')}
          </span>
          <h1>{collection.title}</h1>
        </div>
        <div className="math-gallery__introduction">
          <p>{collection.description}</p>
          <span>{String(items.length).padStart(2, '0')} works in the archive</span>
        </div>
      </header>

      {featuredExperiment && (
        <article className="math-feature">
          <Link
            className="math-feature__visual"
            to="/experiment/$slug"
            params={{ slug: featuredExperiment.slug }}
            aria-label={`View featured work: ${featuredExperiment.title}`}
          >
            <CollectionPreview
              collection={collection}
              experiment={featuredExperiment}
              immersive
            />
          </Link>
          <div className="math-feature__caption">
            <span className="eyebrow">Featured work</span>
            <h2>{featuredExperiment.title}</h2>
            <p>{featuredExperiment.description}</p>
            <dl>
              <div>
                <dt>Runtime</dt>
                <dd>{featuredExperiment.runtime}</dd>
              </div>
              <div>
                <dt>Vocabulary</dt>
                <dd>{featuredExperiment.tags.slice(0, 3).join(' / ')}</dd>
              </div>
              {featuredExperiment.createdAt && (
                <div>
                  <dt>Archived</dt>
                  <dd>{featuredExperiment.createdAt}</dd>
                </div>
              )}
            </dl>
            <Link
              className="math-feature__enter"
              to="/experiment/$slug"
              params={{ slug: featuredExperiment.slug }}
            >
              <span>View work</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </article>
      )}

      <section className="math-archive" aria-labelledby="math-archive-heading">
        <div className="math-archive__heading">
          <div>
            <span className="eyebrow">Browse the archive</span>
            <h2 id="math-archive-heading">All mathematical works</h2>
          </div>
          <span>
            {filteredItems.length === items.length
              ? `${items.length} on record`
              : `${filteredItems.length} of ${items.length} works`}
          </span>
        </div>

        <div className="math-archive__controls">
          <label className="math-archive__search">
            <span className="sr-only">Search mathematical works</span>
            <span className="math-archive__search-mark" aria-hidden="true" />
            <input
              type="search"
              value={query}
              placeholder="Search titles, tags, or systems"
              onChange={(event) => {
                setQuery(event.target.value)
                resetArchiveWindow()
              }}
            />
          </label>

          <label>
            <span className="sr-only">Filter by mathematical system</span>
            <select
              value={system}
              onChange={(event) => {
                setSystem(event.target.value)
                resetArchiveWindow()
              }}
            >
              <option value="all">All systems</option>
              {systems.map((itemSystem) => (
                <option key={itemSystem} value={itemSystem}>
                  {itemSystem}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="sr-only">Sort archive</span>
            <select
              value={sort}
              onChange={(event) => {
                setSort(event.target.value as ArchiveSort)
                resetArchiveWindow()
              }}
            >
              <option value="curated">Curated order</option>
              <option value="newest">Newest first</option>
              <option value="title">Title A–Z</option>
            </select>
          </label>

          <div className="math-archive__view" aria-label="Archive view">
            <button
              type="button"
              aria-label="Grid view"
              aria-pressed={view === 'grid'}
              onClick={() => setView('grid')}
            >
              <span className="math-archive__grid-icon" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="List view"
              aria-pressed={view === 'list'}
              onClick={() => setView('list')}
            >
              <span className="math-archive__list-icon" aria-hidden="true" />
            </button>
          </div>
        </div>

        {visibleItems.length ? (
          <div className={`math-archive__works math-archive__works--${view}`}>
            {visibleItems.map((experiment, index) => (
              <Link
                className="math-work"
                key={experiment.slug}
                to="/experiment/$slug"
                params={{ slug: experiment.slug }}
              >
                <div className="math-work__preview">
                  <ExperimentPreview experiment={experiment} />
                  <span className="math-work__open" aria-hidden="true">↗</span>
                </div>
                <div className="math-work__caption">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{experiment.title}</h3>
                  <span>{experiment.tags[0] ?? experiment.runtime}</span>
                </div>
                <p>{experiment.description}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="math-archive__empty">
            <span>∅</span>
            <p>No works match this view.</p>
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setSystem('all')
                resetArchiveWindow()
              }}
            >
              Clear filters
            </button>
          </div>
        )}

        {hasMoreItems && (
          <div ref={loadMoreRef} className="math-archive__sentinel" aria-hidden="true" />
        )}
        <span className="sr-only" aria-live="polite">
          Showing {visibleItems.length} of {filteredItems.length} works
        </span>
      </section>
    </section>
  )
}
