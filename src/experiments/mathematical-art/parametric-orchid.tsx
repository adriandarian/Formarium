import { useEffect, useRef } from 'react'
import type { ExperimentRendererProps } from '../types'

export default function ParametricOrchid({ mode = 'stage' }: ExperimentRendererProps) {
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
      const w = b.width, h = b.height, s = Math.min(w, h) * 0.25
      ctx.fillStyle = '#030203'; ctx.fillRect(0, 0, w, h); ctx.globalCompositeOperation = 'lighter'
      for (let layer = 0; layer < (compact ? 8 : 16); layer += 1) {
        ctx.beginPath()
        for (let i = 0; i <= 900; i += 1) {
          const a = i / 900 * Math.PI * 2
          const r = Math.abs(Math.pow(Math.sin(3 * a + layer * 0.035), 3) + 0.35 * Math.sin(7 * a + t * 0.014 + layer * 0.12))
          const pulse = 0.72 + layer * 0.028 + 0.04 * Math.sin(t * 0.01 + layer)
          const x = w / 2 + Math.cos(a) * r * s * pulse
          const y = h / 2 + Math.sin(a) * r * s * pulse * (0.78 + 0.1 * Math.cos(a * 3))
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
        }
        ctx.lineWidth = compact ? 0.55 : 0.75; ctx.strokeStyle = `hsla(${305 + layer * 3},88%,76%,${0.05 + layer * 0.006})`; ctx.stroke()
      }
      ctx.globalCompositeOperation = 'source-over'; t += 1; raf = requestAnimationFrame(draw)
    }
    draw(); return () => cancelAnimationFrame(raf)
  }, [mode])
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} aria-label="Parametric Orchid generative artwork" />
}
