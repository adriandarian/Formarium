import { useEffect, useRef } from 'react'
import type { ExperimentRendererProps } from '../types'

export default function RosslerBloom({ mode = 'stage' }: ExperimentRendererProps) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const compact = mode === 'preview'
    let t = 0, raf = 0
    const draw = () => {
      const b = canvas.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, compact ? 1.15 : 2)
      canvas.width = Math.max(1, b.width * dpr); canvas.height = Math.max(1, b.height * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const w = b.width, h = b.height, s = Math.min(w, h) * 0.025
      ctx.fillStyle = '#030303'; ctx.fillRect(0, 0, w, h); ctx.globalCompositeOperation = 'lighter'
      for (let trace = 0; trace < (compact ? 4 : 9); trace += 1) {
        let x = 0.1 + trace * 0.015, y = 0, z = 0, a = 0.2, bb = 0.2, c = 5.7 + 0.12 * Math.sin(t * 0.004 + trace)
        ctx.beginPath()
        for (let i = 0; i < (compact ? 2600 : 5200); i += 1) {
          const dt = 0.012, dx = -y - z, dy = x + a * y, dz = bb + z * (x - c)
          x += dx * dt; y += dy * dt; z += dz * dt
          if (i < 120) continue
          const p = t * 0.001, px = x * Math.cos(p) - y * Math.sin(p), py = x * Math.sin(p) + y * Math.cos(p)
          const sx = w / 2 + px * s, sy = h / 2 + (py * 0.72 - z * 0.22) * s
          if (i === 120) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy)
        }
        ctx.lineWidth = compact ? 0.5 : 0.7; ctx.strokeStyle = `hsla(${335 + trace * 5},90%,72%,${0.055 + trace * 0.012})`; ctx.stroke()
      }
      ctx.globalCompositeOperation = 'source-over'; t += 1; raf = requestAnimationFrame(draw)
    }
    draw(); return () => cancelAnimationFrame(raf)
  }, [mode])
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} aria-label="Rössler Bloom generative artwork" />
}
