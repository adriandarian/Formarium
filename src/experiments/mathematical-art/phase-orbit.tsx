import { useEffect, useRef } from 'react'
import type { ExperimentRendererProps } from '../types'

export default function PhaseOrbit({ experiment, mode = 'stage' }: ExperimentRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    const compact = mode === 'preview'
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    let animationFrame = 0
    let mounted = true

    const draw = () => {
      if (!mounted) return
      const bounds = canvas.getBoundingClientRect()
      const pixelRatio = Math.min(window.devicePixelRatio || 1, compact ? 1.2 : 2)
      const width = Math.max(1, Math.floor(bounds.width * pixelRatio))
      const height = Math.max(1, Math.floor(bounds.height * pixelRatio))
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      context.fillStyle = '#090909'
      context.fillRect(0, 0, bounds.width, bounds.height)

      const time = reducedMotion ? 0 : frame * Math.PI / 80
      const scale = Math.min(bounds.width, bounds.height) / 400
      const originX = bounds.width / 2 - 200 * scale
      const originY = bounds.height / 2 - 200 * scale
      const iterations = compact ? 4200 : 10000
      context.fillStyle = compact ? 'rgba(231, 238, 255, 0.28)' : 'rgba(231, 238, 255, 0.2)'

      for (let i = iterations; i > 0; i -= 1) {
        const y = i / 253
        const k = 5 * Math.cos(i / 44)
        const e = y / 2 - 15
        const d = Math.max(Math.hypot(k, e) / 3, 0.001)
        const c = d / 2 - time / 3 + (i % 2) * 3
        const x = (79 + d * d + k * k) * Math.sin(c)
        const pointY = 99 * Math.cos(c / 2) + 4 * Math.sin(k * 2) + y / (77 * Math.sin(e / 2) + 0.0001) * k * e + d ** 3 / 4 * Math.cos(time * 3 - d * d / 4)
        const alpha = Math.min(0.8, 0.08 + d * 0.018)
        context.globalAlpha = alpha
        const size = compact ? 0.65 : 0.85
        context.fillRect(originX + (x + 200) * scale, originY + (pointY + 200) * scale, size, size)
      }

      context.globalAlpha = 1
      if (!reducedMotion) {
        frame += 1
        animationFrame = requestAnimationFrame(draw)
      }
    }

    draw()
    return () => {
      mounted = false
      cancelAnimationFrame(animationFrame)
    }
  }, [mode])

  return <canvas ref={canvasRef} className="artwork-canvas" aria-label={experiment.title} />
}
