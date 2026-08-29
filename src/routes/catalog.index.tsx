import { createFileRoute } from '@tanstack/react-router'
import { CollectionCard } from '../components/CollectionCard'
import { collections, experiments } from '../data/library'

export const Route = createFileRoute('/catalog/')({
  component: CatalogPage,
})

function CatalogPage() {
  return (
    <section className="page">
      <div className="page-heading">
        <p className="eyebrow">Catalog</p>
        <h1>Browse by art form.</h1>
        <p>Enter a collection to explore every experiment made in that medium.</p>
      </div>

      <div className="catalog-grid">
        {collections.map((collection) => (
          <CollectionCard
            key={collection.slug}
            collection={collection}
            count={experiments.filter((item) => item.collection === collection.slug).length}
          />
        ))}
      </div>
    </section>
  )
}
