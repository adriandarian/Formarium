import { useEffect, useRef } from 'react'
import type { ExperimentRendererProps } from '../types'

export default function WhisperField({ experiment, mode = 'stage' }: ExperimentRendererProps) {
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
      const iterations = compact ? 4200 : 20000
      context.fillStyle = compact ? 'rgba(238, 245, 255, 0.3)' : 'rgba(238, 245, 255, 0.2)'

      for (let i = iterations; i > 0; i -= 1) {
        const y = i / 995
        const k = (4 + Math.cos(y * 31 + time)) * Math.cos(i / 99)
        const e = y / 5 - 11
        const d = Math.hypot(k, e) - 6
        const c = d / 2 - time / 2 + (i % 3) * 8
        const x = (79 + k * k) * Math.cos(c)
        const pointY = 99 * Math.sin(c / 3) + d * d * Math.sin(time * 3 - d) + 3 * Math.sin(k * 2) + y / 13 * k * (e + Math.sin(e * 4 - d * 4))
        context.globalAlpha = Math.min(0.8, 0.08 + Math.abs(d) * 0.018)
        const size = compact ? 0.6 : 0.8
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
