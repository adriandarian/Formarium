import { useEffect, useRef } from 'react'
import type { ExperimentRendererProps } from '../types'

export default function ButterflyCurve({ mode = 'stage' }: ExperimentRendererProps) {
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
      const w = b.width, h = b.height, s = Math.min(w, h) * 0.095
      ctx.fillStyle = '#030303'; ctx.fillRect(0, 0, w, h); ctx.globalCompositeOperation = 'lighter'
      for (let layer = 0; layer < (compact ? 5 : 10); layer += 1) {
        ctx.beginPath()
        for (let i = 0; i <= 1600; i += 1) {
          const a = i / 1600 * Math.PI * 12
          const r = Math.exp(Math.sin(a)) - 2 * Math.cos(4 * a) + Math.pow(Math.sin((2 * a - Math.PI) / 24), 5)
          const pulse = 1 + 0.035 * Math.sin(t * 0.018 + layer)
          const x = w / 2 + Math.sin(a) * r * s * pulse * (1 + layer * 0.018)
          const y = h / 2 - Math.cos(a) * r * s * pulse * (1 + layer * 0.018)
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
        }
        ctx.lineWidth = compact ? 0.55 : 0.75; ctx.strokeStyle = `hsla(${300 + layer * 4},92%,72%,${0.07 + layer * 0.009})`; ctx.stroke()
      }
      ctx.globalCompositeOperation = 'source-over'; t += 1; raf = requestAnimationFrame(draw)
    }
    draw(); return () => cancelAnimationFrame(raf)
  }, [mode])
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} aria-label="Butterfly Curve generative artwork" />
}
