import { useEffect, useRef } from 'react'
import type { ExperimentRendererProps } from '../types'

export default function TorusLattice({ mode = 'stage' }: ExperimentRendererProps) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const compact = mode === 'preview'
    let frame = 0, raf = 0
    const draw = () => {
      const b = canvas.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, compact ? 1.15 : 2)
      canvas.width = Math.max(1, b.width * dpr); canvas.height = Math.max(1, b.height * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const w = b.width, h = b.height, s = Math.min(w, h) * .12, rot = frame * .004
      const R = 2.05, r = .72 + .08 * Math.sin(frame * .01)
      ctx.fillStyle = '#020303'; ctx.fillRect(0, 0, w, h); ctx.globalCompositeOperation = 'lighter'
      const rings = compact ? 18 : 34
      for (let j = 0; j < rings; j += 1) {
        const v = j / rings * Math.PI * 2; ctx.beginPath()
        for (let i = 0; i <= 360; i += 1) {
          const u = i / 360 * Math.PI * 2
          const x = (R + r * Math.cos(v)) * Math.cos(u), y = (R + r * Math.cos(v)) * Math.sin(u), z = r * Math.sin(v)
          const xr = x * Math.cos(rot) - z * Math.sin(rot), zr = x * Math.sin(rot) + z * Math.cos(rot)
          const px = w / 2 + xr * s, py = h / 2 + (y * .58 - zr * .3) * s
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py)
        }
        ctx.lineWidth = compact ? .4 : .6; ctx.strokeStyle = `hsla(${180 + j * 3},88%,72%,${.035 + j / rings * .055})`; ctx.stroke()
      }
      ctx.globalCompositeOperation = 'source-over'; frame += 1; raf = requestAnimationFrame(draw)
    }
    draw(); return () => cancelAnimationFrame(raf)
  }, [mode])
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} aria-label="Torus Lattice generative artwork" />
}
