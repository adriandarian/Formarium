import { useEffect, useRef } from 'react'
import type { ExperimentRendererProps } from '../types'

export default function MagneticPetal({ mode = 'stage' }: ExperimentRendererProps) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    const compact = mode === 'preview'
    let animationFrame = 0
    let time = 0

    const draw = () => {
      const bounds = canvas.getBoundingClientRect()
      const pixelRatio = Math.min(window.devicePixelRatio || 1, compact ? 1.2 : 1.8)
      canvas.width = Math.max(1, Math.floor(bounds.width * pixelRatio))
      canvas.height = Math.max(1, Math.floor(bounds.height * pixelRatio))
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      context.fillStyle = '#090909'
      context.fillRect(0, 0, bounds.width, bounds.height)

      const scale = Math.min(bounds.width, bounds.height) / 440
      const originX = bounds.width / 2 - 200 * scale
      const originY = bounds.height / 2 - 200 * scale
      const iterations = compact ? 3600 : 11000

      context.fillStyle = compact ? 'rgba(246, 170, 92, 0.14)' : 'rgba(246, 170, 92, 0.1)'
      context.shadowBlur = compact ? 0 : 2
      context.shadowColor = 'rgba(255, 101, 61, 0.4)'

      for (let i = 0; i < iterations; i += 1) {
        const m = (i % 4) * 5
        const k = 2 * Math.cos(i * 342)
        const e = 2 * Math.sin(i * 271)
        const d = Math.max(Math.hypot(k, e) / 1.6, 0.001)
        const c = (d * d) / 9 - time / 8 + m
        const p = 5 + 2 * Math.sin(d * 8 - time * 3 + m)
        const x = k * (p + (9 / d) * Math.sin(k * 2) + 89 * Math.sin(c) + 200)
        const y = 79 * Math.sin(c * 2) + (9 / d) * Math.sin(e * 2) + e * p + 200
        const radius = compact ? 0.55 : 0.72
        context.fillRect(originX + x * scale, originY + y * scale, radius, radius)
      }

      context.shadowBlur = 0
      time += Math.PI / 60
      animationFrame = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animationFrame)
  }, [mode])

  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} aria-label="Magnetic Petal mathematical artwork" />
}
