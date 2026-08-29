import { useEffect, useRef } from 'react'
import type { ExperimentRendererProps } from '../types'

export default function GingerbreadSwarm({ mode = 'stage' }: ExperimentRendererProps) {
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
      const w = b.width, h = b.height, s = Math.min(w, h) * .0065
      ctx.fillStyle = '#030302'; ctx.fillRect(0, 0, w, h); ctx.globalCompositeOperation = 'lighter'
      const seeds = compact ? 34 : 72
      for (let seed = 0; seed < seeds; seed += 1) {
        let x = -2.1 + seed * .003 + .02 * Math.sin(frame * .008), y = .25 + seed * .001
        ctx.beginPath()
        for (let i = 0; i < (compact ? 260 : 520); i += 1) {
          const nx = 1 - y + Math.abs(x), ny = x; x = nx; y = ny
          const px = w / 2 + x * s, py = h / 2 + y * s
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py)
        }
        ctx.lineWidth = compact ? .4 : .55; ctx.strokeStyle = `hsla(${35 + seed * 1.8},90%,72%,${.025 + seed / seeds * .045})`; ctx.stroke()
      }
      ctx.globalCompositeOperation = 'source-over'; frame += 1; raf = requestAnimationFrame(draw)
    }
    draw(); return () => cancelAnimationFrame(raf)
  }, [mode])
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} aria-label="Gingerbread Swarm generative artwork" />
}
