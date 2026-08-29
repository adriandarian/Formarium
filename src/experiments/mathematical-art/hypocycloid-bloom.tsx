import { useEffect, useRef } from 'react'
import type { ExperimentRendererProps } from '../types'

export default function HypocycloidBloom({ mode = 'stage' }: ExperimentRendererProps) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const compact = mode === 'preview'
    let t = 0, raf = 0
    const draw = () => {
      const b = canvas.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, compact ? 1.2 : 2)
      canvas.width = Math.max(1, b.width * dpr); canvas.height = Math.max(1, b.height * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const w = b.width, h = b.height, s = Math.min(w, h) * 0.075
      ctx.fillStyle = '#030303'; ctx.fillRect(0, 0, w, h); ctx.globalCompositeOperation = 'lighter'
      for (let ring = 0; ring < (compact ? 7 : 13); ring += 1) {
        const R = 6 + 0.18 * Math.sin(t * 0.006 + ring), r = 1 + ring * 0.012, phase = ring * 0.12 + t * 0.0012
        ctx.beginPath()
        for (let i = 0; i <= 900; i += 1) {
          const a = i / 900 * Math.PI * 2
          const x = (R - r) * Math.cos(a) + r * Math.cos((R - r) / r * a)
          const y = (R - r) * Math.sin(a) - r * Math.sin((R - r) / r * a)
          const px = w / 2 + (x * Math.cos(phase) - y * Math.sin(phase)) * s
          const py = h / 2 + (x * Math.sin(phase) + y * Math.cos(phase)) * s
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py)
        }
        ctx.lineWidth = compact ? 0.55 : 0.78; ctx.strokeStyle = `hsla(${320 + ring * 3},90%,75%,${0.045 + ring * 0.008})`; ctx.stroke()
      }
      ctx.globalCompositeOperation = 'source-over'; t += 1; raf = requestAnimationFrame(draw)
    }
    draw(); return () => cancelAnimationFrame(raf)
  }, [mode])
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} aria-label="Hypocycloid Bloom generative artwork" />
}
