import { useEffect, useRef } from 'react'
import type { ExperimentRendererProps } from '../types'

export default function AizawaFossil({ mode = 'stage' }: ExperimentRendererProps) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const compact = mode === 'preview'
    let t = 0, raf = 0
    const draw = () => {
      const box = canvas.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, compact ? 1.15 : 2)
      canvas.width = Math.max(1, box.width * dpr); canvas.height = Math.max(1, box.height * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const w = box.width, h = box.height, s = Math.min(w, h) * 0.19
      ctx.fillStyle = '#030303'; ctx.fillRect(0, 0, w, h); ctx.globalCompositeOperation = 'lighter'
      const traces = compact ? 5 : 10
      for (let k = 0; k < traces; k += 1) {
        let x = 0.1 + k * 0.003, y = 0, z = 0
        const a = .95, b = .7, c = .6, d = 3.5, e = .25, f = .1, dt = .004
        ctx.beginPath()
        const steps = compact ? 3500 : 6800
        for (let i = 0; i < steps; i += 1) {
          const dx = (z - b) * x - d * y
          const dy = d * x + (z - b) * y
          const dz = c + a * z - z * z * z / 3 - (x * x + y * y) * (1 + e * z) + f * z * x * x * x
          x += dx * dt; y += dy * dt; z += dz * dt
          if (i < 200) continue
          const p = t * 0.0014, px = x * Math.cos(p) - y * Math.sin(p), depth = x * Math.sin(p) + y * Math.cos(p)
          const sx = w / 2 + px * s, sy = h / 2 + (z * 0.8 + depth * 0.18) * s
          if (i === 200) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy)
        }
        ctx.lineWidth = compact ? .45 : .65; ctx.strokeStyle = `hsla(${28 + k * 4},70%,72%,${.045 + k * .009})`; ctx.stroke()
      }
      ctx.globalCompositeOperation = 'source-over'; t += 1; raf = requestAnimationFrame(draw)
    }
    draw(); return () => cancelAnimationFrame(raf)
  }, [mode])
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} aria-label="Aizawa Fossil generative artwork" />
}
