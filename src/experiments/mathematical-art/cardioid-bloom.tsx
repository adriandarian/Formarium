import { useEffect, useRef } from 'react'
import type { ExperimentRendererProps } from '../types'

export default function CardioidBloom({ mode = 'stage' }: ExperimentRendererProps) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const compact = mode === 'preview'
    let t = 0
    let raf = 0
    const draw = () => {
      const box = canvas.getBoundingClientRect()
      const dpr = Math.min(devicePixelRatio || 1, compact ? 1.25 : 2)
      canvas.width = Math.max(1, Math.floor(box.width * dpr))
      canvas.height = Math.max(1, Math.floor(box.height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const w = box.width, h = box.height, s = Math.min(w, h)
      ctx.fillStyle = '#030303'
      ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'
      const layers = compact ? 7 : 13
      for (let layer = 0; layer < layers; layer += 1) {
        ctx.beginPath()
        const phase = t * 0.006 + layer * 0.28
        const scale = 0.15 + layer / layers * 0.26
        for (let i = 0; i <= 480; i += 1) {
          const a = i / 480 * Math.PI * 2
          const r = (1 + Math.cos(a + phase * 0.16)) * scale * s
          const rot = phase * 0.11
          const x = r * Math.cos(a + rot)
          const y = r * Math.sin(a + rot)
          const px = w * 0.5 + x
          const py = h * 0.5 + y
          if (i === 0) ctx.moveTo(px, py)
          else ctx.lineTo(px, py)
        }
        ctx.lineWidth = compact ? 0.7 : 0.9
        ctx.strokeStyle = `hsla(${275 + layer * 5},90%,72%,${0.08 + layer / layers * 0.1})`
        ctx.stroke()
      }
      ctx.globalCompositeOperation = 'source-over'
      t += 1
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [mode])
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} aria-label="Cardioid Bloom generative artwork" />
}
