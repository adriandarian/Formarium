import { useEffect, useRef } from 'react'
import type { ExperimentRendererProps } from '../types'

export default function ZetaTide({ mode = 'stage' }: ExperimentRendererProps) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const compact = mode === 'preview'
    let frame = 0, raf = 0

    const zeta = (sigma: number, tau: number) => {
      let er = 0, ei = 0
      const terms = compact ? 34 : 60
      for (let n = 1; n <= terms; n += 1) {
        const sign = n % 2 ? 1 : -1, ln = Math.log(n), amp = sign * Math.exp(-sigma * ln), a = -tau * ln
        er += amp * Math.cos(a); ei += amp * Math.sin(a)
      }
      const amp2 = Math.pow(2, 1 - sigma), a2 = -tau * Math.log(2)
      const dr = 1 - amp2 * Math.cos(a2), di = -amp2 * Math.sin(a2), den = dr * dr + di * di + 1e-9
      return [(er * dr + ei * di) / den, (ei * dr - er * di) / den] as const
    }

    const draw = () => {
      const box = canvas.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, compact ? 1.15 : 2)
      canvas.width = Math.max(1, box.width * dpr); canvas.height = Math.max(1, box.height * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const w = box.width, h = box.height, s = Math.min(w, h) * .17
      ctx.fillStyle = '#020203'; ctx.fillRect(0, 0, w, h); ctx.globalCompositeOperation = 'lighter'
      const bands = compact ? 5 : 9
      for (let band = 0; band < bands; band += 1) {
        const sigma = .5 + (band - (bands - 1) / 2) * .045, phase = frame * .012 + band * .5
        ctx.beginPath()
        const samples = compact ? 360 : 680
        for (let i = 0; i <= samples; i += 1) {
          const tau = 5 + i / samples * 31 + phase, [zr, zi] = zeta(sigma, tau)
          const x = w / 2 + Math.tanh(zr * .42) * s * 1.6
          const y = h / 2 + (i / samples - .5) * h * .8 + Math.tanh(zi * .35) * s * .42
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
        }
        ctx.lineWidth = compact ? .55 : .8; ctx.strokeStyle = `hsla(${210 + band * 12},90%,74%,${.055 + band / bands * .08})`; ctx.stroke()
      }
      ctx.globalCompositeOperation = 'source-over'; frame += 1; raf = requestAnimationFrame(draw)
    }
    draw(); return () => cancelAnimationFrame(raf)
  }, [mode])
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} aria-label="Zeta Tide complex-analysis artwork" />
}
