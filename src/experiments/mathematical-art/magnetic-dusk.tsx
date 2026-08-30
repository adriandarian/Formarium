import { useEffect, useRef } from 'react'
import type { ExperimentRendererProps } from '../types'

export default function MagneticDusk({ experiment, mode = 'stage' }: ExperimentRendererProps) {
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

      const time = reducedMotion ? 0 : frame * Math.PI / 60
      const scale = Math.min(bounds.width, bounds.height) / 400
      const originX = bounds.width / 2 - 200 * scale
      const originY = bounds.height / 2 - 200 * scale
      const iterations = compact ? 4200 : 10000
      context.fillStyle = compact ? 'rgba(235, 242, 255, 0.32)' : 'rgba(235, 242, 255, 0.22)'

      for (let i = iterations; i > 0; i -= 1) {
        const y = i / 295
        const k = 4 * Math.cos(i / 29)
        const e = y / 5 - 13
        const d = Math.hypot(k, e) - 4
        const c = d - time / 3
        const x = (d * d / 0.7 - k * k * 2 + y) * Math.cos(c)
        const pointY = 3 * Math.sin(k * 2) + Math.cos(y) / k + y / 9 * k * (3 + Math.sin(e * 9 - d * 3 + time)) + 79 * Math.sin(c / 3) + d ** 2 / 3 * Math.cos(time - d * d / 9)
        context.globalAlpha = Math.min(0.85, 0.08 + Math.abs(d) * 0.025)
        context.fillRect(originX + (x + 200) * scale, originY + (pointY + 200) * scale, compact ? 0.65 : 0.85, compact ? 0.65 : 0.85)
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
