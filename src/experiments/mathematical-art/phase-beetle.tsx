import { useEffect, useRef } from 'react'
import type { ExperimentRendererProps } from '../types'

export default function PhaseBeetle({ mode = 'stage' }: ExperimentRendererProps) {
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
      const w = b.width, h = b.height, s = Math.min(w, h) * 0.22
      ctx.fillStyle = '#020203'; ctx.fillRect(0, 0, w, h); ctx.globalCompositeOperation = 'lighter'
      for (const side of [-1, 1]) {
        for (let band = 0; band < (compact ? 9 : 18); band += 1) {
          ctx.beginPath()
          for (let i = 0; i <= 360; i += 1) {
            const u = i / 360 * Math.PI * 2, phase = band * 0.05 + t * 0.006
            const radial = 0.46 + 0.26 * Math.sin(2 * u + phase) + 0.1 * Math.sin(5 * u - phase)
            const x = w / 2 + side * (0.16 + Math.abs(Math.cos(u)) * radial) * s
            const y = h / 2 + Math.sin(u) * radial * s * 1.55
            if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
          }
          ctx.lineWidth = compact ? 0.5 : 0.7; ctx.strokeStyle = `hsla(${120 + band * 4},80%,72%,${0.045 + band * 0.006})`; ctx.stroke()
        }
      }
      ctx.beginPath(); ctx.moveTo(w / 2, h * 0.3); ctx.lineTo(w / 2, h * 0.72); ctx.strokeStyle = 'rgba(235,255,240,.32)'; ctx.lineWidth = 1; ctx.stroke()
      ctx.globalCompositeOperation = 'source-over'; t += 1; raf = requestAnimationFrame(draw)
    }
    draw(); return () => cancelAnimationFrame(raf)
  }, [mode])
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} aria-label="Phase Beetle generative artwork" />
}
