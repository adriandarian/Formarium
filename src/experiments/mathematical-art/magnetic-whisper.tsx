import { useEffect, useRef } from 'react'
import type { ExperimentRendererProps } from '../types'

export default function MagneticWhisper({ experiment, mode = 'stage' }: ExperimentRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    const compact = mode === 'preview'
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let time = 0
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

      const scale = Math.min(bounds.width, bounds.height) / 400
      const offsetX = bounds.width / 2 - 200 * scale
      const offsetY = bounds.height / 2 - 200 * scale
      const phase = reducedMotion ? 0 : time
      const iterations = compact ? 5200 : 10000
      const dot = compact ? 0.7 : 0.9

      for (let index = iterations; index > 0; index -= 1) {
        const i = index / 360
        const k = 9 * Math.cos(i * 5) * Math.sin(i)
        const e = Math.cos(i * 4) * Math.sin(i * 3) * 9
        const distance = Math.hypot(k, e) ** 3 / 999 + 1.2 - Math.sin(phase / 2 + i) ** 3 / 4
        const d = Math.max(distance, 0.025)
        const p = d * Math.sin(d * d - phase + i)
        const c = d / 9 - phase / 48 + i
        const x = 99 * Math.sin(c + k * p) + 200
        const y = 99 * Math.sin(c * 4) + e * p + 200
        const glow = Math.min(0.9, 0.08 + d * 0.08)
        context.fillStyle = `rgba(255, ${Math.round(165 + glow * 80)}, ${Math.round(90 + glow * 100)}, ${compact ? glow * 0.48 : glow * 0.62})`
        context.fillRect(offsetX + x * scale, offsetY + y * scale, dot, dot)
      }

      if (!reducedMotion) {
        time += Math.PI / 20
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
