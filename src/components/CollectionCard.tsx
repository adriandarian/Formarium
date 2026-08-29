import { Link } from '@tanstack/react-router'
import type { Collection } from '../data/library'

interface CollectionCardProps {
  collection: Collection
  count: number
}

export function CollectionCard({ collection, count }: CollectionCardProps) {
  return (
    <Link
      className="collection-card"
      to="/catalog/$collection"
      params={{ collection: collection.slug }}
    >
      <div className="collection-card__preview" aria-hidden="true" />
      <div className="collection-card__body">
        <div className="collection-card__meta">
          <span>{String(count).padStart(2, '0')} experiments</span>
          <span>Explore →</span>
        </div>
        <h2>{collection.title}</h2>
        <p>{collection.description}</p>
      </div>
    </Link>
  )
}
