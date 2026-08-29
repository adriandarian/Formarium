import { useEffect, useRef } from 'react'
import type { ExperimentRendererProps } from '../types'

export default function JuliaBloom({ mode = 'stage' }: ExperimentRendererProps) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const compact = mode === 'preview'
    let frame = 0, raf = 0
    const draw = () => {
      if (frame % (compact ? 5 : 3) === 0) {
        const box = canvas.getBoundingClientRect(), rw = compact ? 128 : 196
        const rh = Math.max(80, Math.round(rw * box.height / Math.max(1, box.width)))
        canvas.width = rw; canvas.height = rh
        const image = ctx.createImageData(rw, rh), data = image.data, maxIter = compact ? 34 : 52
        const cR = -.76 + .055 * Math.cos(frame * .008), cI = .12 + .055 * Math.sin(frame * .006)
        for (let py = 0; py < rh; py += 1) for (let px = 0; px < rw; px += 1) {
          let x = (px / rw - .5) * 3.2, y = (py / rh - .5) * 2.3, i = 0
          while (x * x + y * y < 4 && i < maxIter) { const nx = x * x - y * y + cR; y = 2 * x * y + cI; x = nx; i += 1 }
          const q = i / maxIter, o = (py * rw + px) * 4
          data[o] = Math.round(38 + 205 * Math.pow(q, .55)); data[o + 1] = Math.round(18 + 110 * q); data[o + 2] = Math.round(55 + 200 * (1 - Math.abs(.55 - q))); data[o + 3] = 255
        }
        ctx.putImageData(image, 0, 0)
      }
      frame += 1; raf = requestAnimationFrame(draw)
    }
    draw(); return () => cancelAnimationFrame(raf)
  }, [mode])
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block', imageRendering: 'auto' }} aria-label="Julia Bloom fractal artwork" />
}
