import { useEffect, useRef } from 'react'
import type { ExperimentRendererProps } from '../types'

export default function PhaseEcho({ experiment, mode = 'stage' }: ExperimentRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current, context = canvas?.getContext('2d')
    if (!canvas || !context) return
    const compact = mode === 'preview', reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0, animationFrame = 0
    const draw = () => {
      const bounds = canvas.getBoundingClientRect(), pixelRatio = Math.min(window.devicePixelRatio || 1, compact ? 1.2 : 2)
      const width = Math.max(1, Math.floor(bounds.width * pixelRatio)), height = Math.max(1, Math.floor(bounds.height * pixelRatio))
      if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height }
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      context.fillStyle = '#08090d'; context.fillRect(0, 0, bounds.width, bounds.height); context.globalCompositeOperation = 'lighter'
      const t = reducedMotion ? 0 : frame * Math.PI / 20, scale = Math.min(bounds.width, bounds.height) / 400
      const ox = bounds.width / 2 - 200 * scale, oy = bounds.height / 2 - 200 * scale
      for (let i = compact ? 2600 : 10000; i > 0; i -= 1) {
        const m = (i % 16) * 13, k = 9 * Math.cos(i * 5) * Math.sin(i), e = 9 * Math.cos(i * 3) * Math.cos(i * 2)
        const d = Math.hypot(k, e) ** 3 / 1999 + 1.5 - Math.sin(t / 2 + m) ** 3 / 3, p = d ** Math.sin(d * d - t + m), c = d / 16 - t / 48 + m
        context.fillStyle = `hsla(${188 + 75 * (0.5 + 0.5 * Math.sin(m * 0.08 + d))}, 86%, 72%, ${compact ? 0.18 : 0.12})`
        context.fillRect(ox + (99 * Math.sin(c) + k * p + 200) * scale, oy + (99 * Math.sin(c * 4) + e * p + 200) * scale, compact ? 0.8 : 1, compact ? 0.8 : 1)
      }
      context.globalCompositeOperation = 'source-over'
      if (!reducedMotion) { frame += 1; animationFrame = requestAnimationFrame(draw) }
    }
    draw(); return () => cancelAnimationFrame(animationFrame)
  }, [mode])
  return <canvas ref={canvasRef} className="artwork-canvas" aria-label={experiment.title} />
}
