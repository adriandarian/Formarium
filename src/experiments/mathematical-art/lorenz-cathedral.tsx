import { useEffect, useRef } from 'react'
import type { ExperimentRendererProps } from '../types'

export default function LorenzCathedral({ mode = 'stage' }: ExperimentRendererProps) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const compact = mode === 'preview'
    let frame = 0
    let raf = 0

    const draw = () => {
      const box = canvas.getBoundingClientRect()
      const dpr = Math.min(devicePixelRatio || 1, compact ? 1.25 : 2)
      canvas.width = Math.max(1, Math.floor(box.width * dpr))
      canvas.height = Math.max(1, Math.floor(box.height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const w = box.width
      const h = box.height
      ctx.fillStyle = '#030303'
      ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'
      ctx.lineWidth = compact ? 0.7 : 0.9

      const traces = compact ? 4 : 8
      for (let t = 0; t < traces; t += 1) {
        let x = 0.1 + t * 0.011
        let y = 0
        let z = 0
        const sigma = 10
        const rho = 28 + Math.sin(frame * 0.004 + t) * 1.8
        const beta = 8 / 3
        const dt = 0.006
        ctx.beginPath()
        for (let i = 0; i < (compact ? 1800 : 3600); i += 1) {
          const dx = sigma * (y - x)
          const dy = x * (rho - z) - y
          const dz = x * y - beta * z
          x += dx * dt
          y += dy * dt
          z += dz * dt
          if (i < 80) continue
          const phase = frame * 0.0015
          const px = Math.sin(phase) * x + Math.cos(phase) * y
          const py = z - 25 + 0.18 * x
          const sx = w * 0.5 + px * Math.min(w, h) * 0.011
          const sy = h * 0.55 - py * Math.min(w, h) * 0.014
          if (i === 80) ctx.moveTo(sx, sy)
          else ctx.lineTo(sx, sy)
        }
        const alpha = 0.08 + t / traces * 0.11
        ctx.strokeStyle = `rgba(${170 + t * 8},${190 + t * 6},255,${alpha})`
        ctx.stroke()
        ctx.save()
        ctx.translate(w, 0)
        ctx.scale(-1, 1)
        ctx.stroke()
        ctx.restore()
      }

      ctx.globalCompositeOperation = 'source-over'
      frame += 1
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [mode])

  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} aria-label="Lorenz Cathedral generative artwork" />
}
