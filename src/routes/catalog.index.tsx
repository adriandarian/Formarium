import { createFileRoute } from '@tanstack/react-router'
import { CollectionCard } from '../components/CollectionCard'
import { collections, experiments } from '../data/library'

export const Route = createFileRoute('/catalog/')({
  component: CatalogPage,
})

function CatalogPage() {
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

      <div className="catalog-list">
        {collections.map((collection, index) => {
          const collectionExperiments = experiments.filter(
            (item) => item.collection === collection.slug,
          )

          return (
            <CollectionCard
              key={collection.slug}
              collection={collection}
              count={collectionExperiments.length}
              index={index}
              featuredExperiment={collectionExperiments[0]}
            />
          )
        })}
      </div>
    </section>
  )
}
