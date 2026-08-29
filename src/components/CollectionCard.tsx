import { Link } from '@tanstack/react-router'
import type { Collection, Experiment } from '../data/library'
import { CollectionPreview } from './CollectionPreview'

interface CollectionCardProps {
  collection: Collection
  count: number
  index: number
  featuredExperiment?: Experiment
}

export function CollectionCard({
  collection,
  count,
  index,
  featuredExperiment,
}: CollectionCardProps) {
  return (
    <Link
      className={`collection-card collection-card--${collection.slug}`}
      to="/catalog/$collection"
      params={{ collection: collection.slug }}
    >
      <div className="collection-card__visual">
        <CollectionPreview collection={collection} experiment={featuredExperiment} />
      </div>

      <div className="collection-card__body">
        <div className="collection-card__index">{String(index + 1).padStart(2, '0')}</div>
        <div className="collection-card__copy">
          <div className="collection-card__meta">
            <span>{count === 1 ? '01 work' : `${String(count).padStart(2, '0')} works`}</span>
            <span>{featuredExperiment ? 'Live collection' : 'Open collection'}</span>
          </div>
          <h2>{collection.title}</h2>
          <p>{collection.description}</p>
          <span className="collection-card__enter">Enter collection <b>↗</b></span>
        </div>
      </div>
    </Link>
  )
}
