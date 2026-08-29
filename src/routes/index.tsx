import { createFileRoute, Link } from '@tanstack/react-router'
import { experiments } from '../data/library'
import { ExperimentCard } from '../components/ExperimentCard'

export const Route = createFileRoute('/')({
  component: LibraryPage,
})

function LibraryPage() {
  return (
    <section className="page">
      <div className="page-heading page-heading--hero">
        <p className="eyebrow">Personal computational art library</p>
        <h1>A living archive of visual experiments.</h1>
        <p>
          Mathematical forms, ASCII studies, particle systems, shaders, and whatever comes next.
        </p>
        <Link className="text-link" to="/catalog">
          Browse the catalog →
        </Link>
      </div>

      <div className="section-heading">
        <h2>Library</h2>
        <span>{experiments.length} works</span>
      </div>

      {experiments.length ? (
        <div className="experiment-grid">
          {experiments.map((experiment) => (
            <ExperimentCard key={experiment.slug} experiment={experiment} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>The shelves are ready.</p>
          <span>Your first experiment will appear here.</span>
        </div>
      )}
    </section>
  )
}
