import { useEffect, useRef } from 'react'
import type { ExperimentRendererProps } from '../types'

export default function RibbonEel({ mode = 'stage' }: ExperimentRendererProps) {
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
      const w = b.width, h = b.height
      ctx.fillStyle = '#020304'; ctx.fillRect(0, 0, w, h); ctx.globalCompositeOperation = 'lighter'
      const ribbons = compact ? 9 : 17
      for (let k = 0; k < ribbons; k += 1) {
        const offset = (k - (ribbons - 1) / 2) * (compact ? 2.1 : 2.4); ctx.beginPath()
        for (let i = 0; i <= 260; i += 1) {
          const q = i / 260, x = w * (0.08 + q * 0.84)
          const amp = h * (0.05 + 0.11 * Math.sin(q * Math.PI))
          const y0 = h / 2 + amp * Math.sin(q * Math.PI * 4 - t * 0.035) + amp * 0.32 * Math.sin(q * Math.PI * 8 + t * 0.018)
          const y = y0 + offset * Math.cos(q * Math.PI * 4 - t * 0.035)
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
        }
        ctx.lineWidth = compact ? 0.7 : 0.9; ctx.strokeStyle = `hsla(${175 + k * 5},92%,72%,${0.055 + k / ribbons * 0.08})`; ctx.stroke()
      }
      ctx.globalCompositeOperation = 'source-over'; t += 1; raf = requestAnimationFrame(draw)
    }
    draw(); return () => cancelAnimationFrame(raf)
  }, [mode])
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} aria-label="Ribbon Eel generative artwork" />
}
