import { useEffect, useRef } from 'react'
import type { ExperimentRendererProps } from '../types'

export default function FilamentLotus({ mode = 'stage' }: ExperimentRendererProps) {
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
      const w = b.width, h = b.height, s = Math.min(w, h) * 0.38
      ctx.fillStyle = '#020203'; ctx.fillRect(0, 0, w, h); ctx.globalCompositeOperation = 'lighter'
      const filaments = compact ? 36 : 86
      for (let n = 0; n < filaments; n += 1) {
        ctx.beginPath()
        for (let i = 0; i <= 520; i += 1) {
          const a = i / 520 * Math.PI * 2
          const r = (0.22 + 0.64 * Math.abs(Math.sin(5 * a + n * 0.015 + t * (0.002 + n * 0.00001)))) * s * (0.78 + n / filaments * 0.22)
          const x = w / 2 + r * Math.cos(a), y = h / 2 + r * Math.sin(a) * 0.78
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
        }
        ctx.lineWidth = compact ? 0.35 : 0.45; ctx.strokeStyle = `hsla(${255 + n * 0.8},88%,75%,${0.018 + n / filaments * 0.035})`; ctx.stroke()
      }
      ctx.globalCompositeOperation = 'source-over'; t += 1; raf = requestAnimationFrame(draw)
    }
    draw(); return () => cancelAnimationFrame(raf)
  }, [mode])
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} aria-label="Filament Lotus generative artwork" />
}
