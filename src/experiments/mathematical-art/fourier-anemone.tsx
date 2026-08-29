import { useEffect, useRef } from 'react'
import type { ExperimentRendererProps } from '../types'

export default function FourierAnemone({ mode = 'stage' }: ExperimentRendererProps) {
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
      const w = b.width, h = b.height, s = Math.min(w, h)
      ctx.fillStyle = '#020203'; ctx.fillRect(0, 0, w, h); ctx.globalCompositeOperation = 'lighter'
      const arms = compact ? 28 : 54
      for (let arm = 0; arm < arms; arm += 1) {
        const base = arm / arms * Math.PI * 2; ctx.beginPath()
        for (let i = 0; i <= 110; i += 1) {
          const q = i / 110, r = s * (0.06 + q * 0.34)
          let bend = 0
          for (let n = 1; n <= 5; n += 1) bend += Math.sin(n * q * Math.PI * 2 + t * 0.012 * n + arm * 0.17) / (n * n)
          const a = base + bend * (0.35 + q * 0.6)
          const x = w / 2 + Math.cos(a) * r, y = h / 2 + Math.sin(a) * r
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
        }
        ctx.lineWidth = compact ? 0.45 : 0.7; ctx.strokeStyle = `hsla(${265 + arm * 2.5},92%,72%,${0.035 + arm / arms * 0.07})`; ctx.stroke()
      }
      ctx.globalCompositeOperation = 'source-over'; t += 1; raf = requestAnimationFrame(draw)
    }
    draw(); return () => cancelAnimationFrame(raf)
  }, [mode])
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} aria-label="Fourier Anemone generative artwork" />
}
