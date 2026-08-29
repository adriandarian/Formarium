import { useEffect, useRef } from 'react'
import type { ExperimentRendererProps } from '../types'

export default function KleinRibbon({ mode = 'stage' }: ExperimentRendererProps) {
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
      const w = b.width, h = b.height, s = Math.min(w, h) * .115, rot = frame * .003
      ctx.fillStyle = '#020203'; ctx.fillRect(0, 0, w, h); ctx.globalCompositeOperation = 'lighter'
      const bands = compact ? 18 : 34
      for (let j = 0; j < bands; j += 1) {
        const v = j / bands * Math.PI * 2; ctx.beginPath()
        for (let i = 0; i <= 420; i += 1) {
          const u = i / 420 * Math.PI * 2
          const q = 2 + Math.cos(u / 2) * Math.sin(v) - Math.sin(u / 2) * Math.sin(2 * v)
          const x = q * Math.cos(u), y = q * Math.sin(u), z = Math.sin(u / 2) * Math.sin(v) + Math.cos(u / 2) * Math.sin(2 * v)
          const xr = x * Math.cos(rot) - z * Math.sin(rot), zr = x * Math.sin(rot) + z * Math.cos(rot)
          const px = w / 2 + xr * s, py = h / 2 + (y * .62 - zr * .25) * s
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py)
        }
        ctx.lineWidth = compact ? .45 : .65; ctx.strokeStyle = `hsla(${260 + j * 2.5},88%,74%,${.04 + j / bands * .07})`; ctx.stroke()
      }
      ctx.globalCompositeOperation = 'source-over'; frame += 1; raf = requestAnimationFrame(draw)
    }
    draw(); return () => cancelAnimationFrame(raf)
  }, [mode])
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} aria-label="Klein Ribbon generative artwork" />
}
