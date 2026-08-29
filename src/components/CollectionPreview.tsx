import type { Collection, Experiment } from '../data/library'
import { ExperimentPreview } from './ExperimentPreview'

interface CollectionPreviewProps {
  collection: Collection
  experiment?: Experiment
  immersive?: boolean
}

const asciiLines = [
  '::==++**##@@##**++==::',
  ' ..:://FORMARIUM\\::.. ',
  '[[[]]]  001101  [[[]]]',
  '  %%%%  glyph  %%%%  ',
  '..--==++**++==--..',
  '  /\\/\\/\\/\\/\\  ',
]

export function CollectionPreview({
  collection,
  experiment,
  immersive = false,
}: CollectionPreviewProps) {
  if (experiment) {
    return (
      <div
        className={`collection-visual collection-visual--live${immersive ? ' collection-visual--immersive' : ''}`}
      >
        <ExperimentPreview experiment={experiment} />
        <span className="collection-visual__live-label">Live specimen</span>
      </div>
    )
  }

  if (collection.slug === 'ascii-art') {
    return (
      <div className="collection-visual collection-visual--ascii" aria-hidden="true">
        <div className="ascii-sheet">
          {asciiLines.concat(asciiLines).map((line, index) => (
            <span key={`${line}-${index}`}>{line}</span>
          ))}
        </div>
        <span className="collection-visual__caption">Glyph field</span>
      </div>
    )
  }

  if (collection.slug === 'particle-art') {
    return (
      <div className="collection-visual collection-visual--particles" aria-hidden="true">
        <div className="particle-field">
          {Array.from({ length: 46 }, (_, index) => {
            const left = (index * 37 + 11) % 96
            const top = (index * index * 13 + 7) % 92
            const size = 2 + (index % 4)

            return (
              <i
                key={index}
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  width: size,
                  height: size,
                  animationDelay: `${-(index % 9) * 0.24}s`,
                }}
              />
            )
          })}
          <span className="particle-field__orbit particle-field__orbit--one" />
          <span className="particle-field__orbit particle-field__orbit--two" />
        </div>
        <span className="collection-visual__caption">Emergent field</span>
      </div>
    )
  }

  if (collection.slug === 'abstract-art') {
    return (
      <div className="collection-visual collection-visual--abstract" aria-hidden="true">
        <span className="abstract-form abstract-form--one" />
        <span className="abstract-form abstract-form--two" />
        <span className="abstract-form abstract-form--three" />
        <span className="collection-visual__caption">Luminous form</span>
      </div>
    )
  }

  return (
    <div className="collection-visual collection-visual--math" aria-hidden="true">
      <span className="math-ring math-ring--one" />
      <span className="math-ring math-ring--two" />
      <span className="math-ring math-ring--three" />
      <span className="math-function">f(t) → form</span>
      <span className="collection-visual__caption">Parametric study</span>
    </div>
  )
}
