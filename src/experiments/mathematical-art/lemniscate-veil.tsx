import { useEffect, useRef } from 'react'
import type { ExperimentRendererProps } from '../types'

export default function LemniscateVeil({ mode = 'stage' }: ExperimentRendererProps) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const compact = mode === 'preview'
    let t = 0, raf = 0
    const draw = () => {
      const b = canvas.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, compact ? 1.25 : 2)
      canvas.width = Math.max(1, Math.floor(b.width * dpr)); canvas.height = Math.max(1, Math.floor(b.height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const w = b.width, h = b.height, s = Math.min(w, h) * 0.42
      ctx.fillStyle = '#030303'; ctx.fillRect(0, 0, w, h); ctx.globalCompositeOperation = 'lighter'
      for (let layer = 0; layer < (compact ? 8 : 16); layer += 1) {
        const rot = t * 0.002 + layer * Math.PI / (compact ? 8 : 16)
        ctx.beginPath(); let drawing = false
        for (let i = 0; i <= 900; i += 1) {
          const a = i / 900 * Math.PI * 2, c = Math.cos(2 * a)
          if (c <= 0) { drawing = false; continue }
          const r = Math.sqrt(c) * s * (0.72 + layer * 0.016)
          const x = r * Math.cos(a), y = r * Math.sin(a)
          const px = w / 2 + x * Math.cos(rot) - y * Math.sin(rot)
          const py = h / 2 + x * Math.sin(rot) + y * Math.cos(rot)
          if (!drawing) { ctx.moveTo(px, py); drawing = true } else ctx.lineTo(px, py)
        }
        ctx.lineWidth = compact ? 0.65 : 0.85
        ctx.strokeStyle = `hsla(${205 + layer * 5},90%,76%,${0.055 + layer * 0.006})`; ctx.stroke()
      }
      ctx.globalCompositeOperation = 'source-over'; t += 1; raf = requestAnimationFrame(draw)
    }
    draw(); return () => cancelAnimationFrame(raf)
  }, [mode])
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} aria-label="Lemniscate Veil generative artwork" />
}
