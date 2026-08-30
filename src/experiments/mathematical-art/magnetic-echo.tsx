import { useEffect, useRef } from 'react'
import type { ExperimentRendererProps } from '../types'

export default function MagneticEcho({ experiment, mode = 'stage' }: ExperimentRendererProps) {
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
      const dpr = Math.min(window.devicePixelRatio || 1, compact ? 1.2 : 2)
      const width = Math.max(1, Math.floor(bounds.width * dpr))
      const height = Math.max(1, Math.floor(bounds.height * dpr))
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }

      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.fillStyle = '#090909'
      context.fillRect(0, 0, bounds.width, bounds.height)
      context.fillStyle = compact ? 'rgba(235, 239, 255, 0.3)' : 'rgba(235, 239, 255, 0.22)'

      const scale = Math.min(bounds.width, bounds.height) / 400
      const offsetX = bounds.width / 2 - 200 * scale
      const offsetY = bounds.height / 2 - 200 * scale
      const samples = compact ? 4200 : 10000
      for (let i = samples; i > 0; i -= 1) {
        const y = i / 295
        const k = 4 * Math.cos(i / 29)
        const e = y / 4 - 16
        const d = Math.hypot(k, e) - 5
        const safeD = Math.abs(d) < 0.08 ? (d < 0 ? -0.08 : 0.08) : d
        const c = safeD - time / 3
        const x = safeD * safeD / 0.7 - k * k * 2 + y
        const pointX = x * Math.cos(c)
        const pointY = 3 * Math.sin(k * 2) + Math.cos(y) / k + y / 9 * k * (3 + Math.sin(e * 9 - safeD * 3 + time)) + 79 * Math.sin(c / 3) + Math.pow(Math.abs(safeD), 2 / 3) * Math.sin(time - safeD * safeD / 7)
        context.fillRect(offsetX + (pointX + 200) * scale, offsetY + (pointY + 200) * scale, compact ? 0.65 : 0.85, compact ? 0.65 : 0.85)
      }

      if (!reducedMotion) {
        time += Math.PI / 40
        animationFrame = requestAnimationFrame(draw)
      }
    }

    draw()
    return () => { mounted = false; cancelAnimationFrame(animationFrame) }
  }, [mode])

  return <canvas ref={canvasRef} className="artwork-canvas" aria-label={experiment.title} />
}
