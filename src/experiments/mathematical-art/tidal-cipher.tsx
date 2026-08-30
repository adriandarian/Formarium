import { useEffect, useRef } from 'react'
import type { ExperimentRendererProps } from '../types'

export default function TidalCipher({ experiment, mode = 'stage' }: ExperimentRendererProps) {
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
      context.fillStyle = compact ? 'rgba(236, 242, 255, 0.34)' : 'rgba(236, 242, 255, 0.24)'

      const scale = Math.min(bounds.width, bounds.height) / 400
      const offsetX = bounds.width / 2 - 200 * scale
      const offsetY = bounds.height / 2 - 200 * scale
      const samples = compact ? 4200 : 10000
      for (let i = samples; i > 0; i -= 1) {
        const y = i / 295
        const k = (5 + Math.sin(y * 2 - time / 2) * 2) * Math.cos(i / 29)
        const e = y / 7 - 13
        const d = Math.hypot(k, e) - 6
        const safeK = Math.abs(k) < 0.05 ? (k < 0 ? -0.05 : 0.05) : k
        const q = 3 * Math.sin(safeK * 2) + Math.cos(y) / safeK + Math.sin(y / 25) * safeK * (9 + 4 * Math.sin(e * 9 - d * 3 + time * 2))
        const c = d - time
        const pointX = q + 50 * Math.cos(c) + 200
        const pointY = q * Math.sin(c) + d * 39 + 200
        context.fillRect(offsetX + pointX * scale, offsetY + pointY * scale, compact ? 0.65 : 0.85, compact ? 0.65 : 0.85)
      }

      if (!reducedMotion) {
        time += Math.PI / 240
        animationFrame = requestAnimationFrame(draw)
      }
    }

    draw()
    return () => { mounted = false; cancelAnimationFrame(animationFrame) }
  }, [mode])

  return <canvas ref={canvasRef} className="artwork-canvas" aria-label={experiment.title} />
}
