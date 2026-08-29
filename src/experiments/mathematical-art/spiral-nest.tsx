import { useEffect, useRef } from 'react'
import type { ExperimentRendererProps } from '../types'

export default function SpiralNest({ mode = 'stage' }: ExperimentRendererProps) {
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
      const w = b.width, h = b.height, s = Math.min(w, h)
      ctx.fillStyle = '#030303'; ctx.fillRect(0, 0, w, h); ctx.globalCompositeOperation = 'lighter'
      const strands = compact ? 9 : 18
      for (let k = 0; k < strands; k += 1) {
        ctx.beginPath()
        for (let i = 0; i < 850; i += 1) {
          const a = i / 850 * Math.PI * 10
          const mix = k / Math.max(1, strands - 1)
          const ra = (0.018 + 0.0105 * a) * s
          const rl = 0.018 * Math.exp(0.11 * a) * s
          const r = (ra * (1 - mix) + rl * mix) * (0.88 + 0.12 * Math.sin(t * 0.01 + k))
          const phase = k * Math.PI * 2 / strands + t * 0.0015 * (k % 2 ? 1 : -1)
          const x = w / 2 + r * Math.cos(a + phase), y = h / 2 + r * Math.sin(a + phase)
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
        }
        ctx.lineWidth = compact ? 0.55 : 0.8; ctx.strokeStyle = `hsla(${185 + k * 6},90%,70%,${0.045 + k / strands * 0.07})`; ctx.stroke()
      }
      ctx.globalCompositeOperation = 'source-over'; t += 1; raf = requestAnimationFrame(draw)
    }
    draw(); return () => cancelAnimationFrame(raf)
  }, [mode])
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} aria-label="Spiral Nest generative artwork" />
}
