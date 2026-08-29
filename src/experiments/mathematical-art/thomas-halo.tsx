import { useEffect, useRef } from 'react'
import type { ExperimentRendererProps } from '../types'

export default function ThomasHalo({ mode = 'stage' }: ExperimentRendererProps) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const compact = mode === 'preview'
    let t = 0, raf = 0
    const draw = () => {
      const box = canvas.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, compact ? 1.15 : 2)
      canvas.width = Math.max(1, box.width * dpr); canvas.height = Math.max(1, box.height * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const w = box.width, h = box.height, s = Math.min(w, h) * 0.12
      ctx.fillStyle = '#020303'; ctx.fillRect(0, 0, w, h); ctx.globalCompositeOperation = 'lighter'
      for (let k = 0; k < (compact ? 4 : 8); k += 1) {
        let x = 0.1 + k * .002, y = 0, z = 0, b = .208186 + .002 * Math.sin(t * .004 + k), dt = .035
        ctx.beginPath()
        for (let i = 0; i < (compact ? 3000 : 6000); i += 1) {
          const dx = Math.sin(y) - b * x, dy = Math.sin(z) - b * y, dz = Math.sin(x) - b * z
          x += dx * dt; y += dy * dt; z += dz * dt
          if (i < 180) continue
          const p = t * .001, px = x * Math.cos(p) - z * Math.sin(p), pz = x * Math.sin(p) + z * Math.cos(p)
          const sx = w / 2 + px * s, sy = h / 2 + (y * .72 + pz * .22) * s
          if (i === 180) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy)
        }
        ctx.lineWidth = compact ? .45 : .65; ctx.strokeStyle = `hsla(${175 + k * 9},85%,72%,${.05 + k * .012})`; ctx.stroke()
      }
      ctx.globalCompositeOperation = 'source-over'; t += 1; raf = requestAnimationFrame(draw)
    }
    draw(); return () => cancelAnimationFrame(raf)
  }, [mode])
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} aria-label="Thomas Halo generative artwork" />
}
