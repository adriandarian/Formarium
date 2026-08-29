import { useEffect, useRef } from 'react'
import type { ExperimentRendererProps } from '../types'

export default function IkedaStorm({ mode = 'stage' }: ExperimentRendererProps) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const compact = mode === 'preview'
    let frame = 0, raf = 0
    const draw = () => {
      const b = canvas.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, compact ? 1.1 : 1.7)
      canvas.width = Math.max(1, b.width * dpr); canvas.height = Math.max(1, b.height * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const w = b.width, h = b.height, s = Math.min(w, h) * .19
      ctx.fillStyle = '#020203'; ctx.fillRect(0, 0, w, h); ctx.globalCompositeOperation = 'lighter'
      const seeds = compact ? 45 : 95, steps = compact ? 360 : 700, u = .9 + .015 * Math.sin(frame * .008)
      for (let seed = 0; seed < seeds; seed += 1) {
        let x = Math.sin(seed * 12.9898) * .3, y = Math.cos(seed * 7.233) * .3
        ctx.beginPath()
        for (let i = 0; i < steps; i += 1) {
          const q = .4 - 6 / (1 + x * x + y * y), c = Math.cos(q), sn = Math.sin(q)
          const nx = 1 + u * (x * c - y * sn), ny = u * (x * sn + y * c); x = nx; y = ny
          const px = w / 2 + (x - .8) * s, py = h / 2 + y * s
          if (i < 15) continue
          if (i === 15) ctx.moveTo(px, py); else ctx.lineTo(px, py)
        }
        ctx.lineWidth = compact ? .35 : .5; ctx.strokeStyle = `hsla(${225 + seed % 45},92%,70%,${.015 + seed / seeds * .03})`; ctx.stroke()
      }
      ctx.globalCompositeOperation = 'source-over'; frame += 1; raf = requestAnimationFrame(draw)
    }
    draw(); return () => cancelAnimationFrame(raf)
  }, [mode])
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} aria-label="Ikeda Storm generative artwork" />
}
