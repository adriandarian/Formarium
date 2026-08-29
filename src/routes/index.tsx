import { createFileRoute, Link } from '@tanstack/react-router'
import { experiments } from '../data/library'
import { ExperimentCard } from '../components/ExperimentCard'
import orbitalFieldArtwork from '../assets/orbital-field-concept.png'

export const Route = createFileRoute('/')({
  component: LibraryPage,
})

function LibraryPage() {
  return (
    <section className="page page--landing">
      <div className="landing-hero">
        <OrbitalField />
        <div className="page-heading page-heading--hero">
          <p className="eyebrow">Personal computational art library</p>
          <h1>A living archive of visual experiments.</h1>
          <p>
            Mathematical forms, ASCII studies, particle systems, shaders, and whatever comes next.
          </p>
          <Link className="text-link" to="/catalog" search={{ q: '', runtime: 'all' }}>
            Browse the catalog →
          </Link>
        </div>
      </div>

      <div className="section-heading">
        <h2>Library</h2>
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

function OrbitalField() {
  return (
    <img
      className="orbital-field"
      src={orbitalFieldArtwork}
      alt=""
      aria-hidden="true"
    />
  )
}
