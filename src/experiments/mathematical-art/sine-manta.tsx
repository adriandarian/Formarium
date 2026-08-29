import { useEffect, useRef } from 'react'
import type { ExperimentRendererProps } from '../types'

export default function SineManta({ mode = 'stage' }: ExperimentRendererProps) {
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
      const w = b.width, h = b.height, s = Math.min(w, h) * 0.34
      ctx.fillStyle = '#020304'; ctx.fillRect(0, 0, w, h); ctx.globalCompositeOperation = 'lighter'
      const rows = compact ? 22 : 38, cols = compact ? 44 : 72
      for (let j = 0; j <= rows; j += 1) {
        const v = j / rows * 2 - 1; ctx.beginPath()
        for (let i = 0; i <= cols; i += 1) {
          const u = i / cols * 2 - 1
          const wing = Math.sqrt(Math.max(0, 1 - u * u)) * (1 - 0.35 * Math.abs(v))
          const z = Math.sin(3 * u + t * 0.025) * Math.cos(2 * v - t * 0.017) * (1 - Math.abs(v))
          const x = w / 2 + u * s * (1.2 - 0.18 * Math.abs(v))
          const y = h / 2 + v * wing * s * 0.72 - z * s * 0.17 + Math.sin(u * Math.PI) * s * 0.04
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
        }
        ctx.lineWidth = compact ? 0.5 : 0.7; ctx.strokeStyle = `hsla(${195 + j * 2},85%,74%,${0.045 + j / rows * 0.08})`; ctx.stroke()
      }
      ctx.globalCompositeOperation = 'source-over'; t += 1; raf = requestAnimationFrame(draw)
    }
    draw(); return () => cancelAnimationFrame(raf)
  }, [mode])
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} aria-label="Sine Manta generative artwork" />
}
