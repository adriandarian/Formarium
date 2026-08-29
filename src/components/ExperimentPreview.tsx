import { useEffect, useRef, useState } from 'react'
import type { Experiment } from '../data/library'
import { ExperimentHost } from './ExperimentHost'

interface ExperimentPreviewProps {
  experiment: Experiment
}

export function ExperimentPreview({ experiment }: ExperimentPreviewProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [isNearViewport, setIsNearViewport] = useState(false)

  useEffect(() => {
    const element = rootRef.current
    if (!element) return

    if (!('IntersectionObserver' in window)) {
      setIsNearViewport(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsNearViewport(entry.isIntersecting),
      { rootMargin: '240px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={rootRef} className="experiment-preview" aria-hidden="true">
      {isNearViewport ? (
        <ExperimentHost experiment={experiment} mode="preview" />
      ) : (
        <div className="experiment-preview__idle" />
      )}
    </div>
  )
}
