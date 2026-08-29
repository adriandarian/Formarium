import { useEffect, useRef } from 'react'
import type { ExperimentRendererProps } from '../types'

export default function DomainGarden({ mode = 'stage' }: ExperimentRendererProps) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const compact = mode === 'preview'
    let frame = 0, raf = 0
    const draw = () => {
      if (frame % (compact ? 7 : 5) === 0) {
        const box = canvas.getBoundingClientRect(), rw = compact ? 130 : 196, rh = Math.max(82, Math.round(rw * box.height / Math.max(1, box.width)))
        canvas.width = rw; canvas.height = rh
        const image = ctx.createImageData(rw, rh), data = image.data, rot = frame * .0015
        for (let py = 0; py < rh; py += 1) for (let px = 0; px < rw; px += 1) {
          const ax = (px / rw - .5) * 4, ay = (py / rh - .5) * 3
          const zr = ax * Math.cos(rot) - ay * Math.sin(rot), zi = ax * Math.sin(rot) + ay * Math.cos(rot)
          const z2r = zr * zr - zi * zi, z2i = 2 * zr * zi
          const z3r = z2r * zr - z2i * zi, z3i = z2r * zi + z2i * zr
          const nr = z3r - 1, ni = z3i, dr = z3r + 1, di = z3i, den = dr * dr + di * di + 1e-8
          const fr = (nr * dr + ni * di) / den, fi = (ni * dr - nr * di) / den
          const arg = Math.atan2(fi, fr), mag = Math.log1p(Math.hypot(fr, fi)), bands = .6 + .4 * Math.cos(mag * 7)
          const o = (py * rw + px) * 4
          data[o] = Math.round((128 + 118 * Math.cos(arg)) * bands)
          data[o + 1] = Math.round((128 + 118 * Math.cos(arg - 2.094)) * bands)
          data[o + 2] = Math.round((128 + 118 * Math.cos(arg + 2.094)) * bands)
          data[o + 3] = 255
        }
        ctx.putImageData(image, 0, 0)
      }
      frame += 1; raf = requestAnimationFrame(draw)
    }
    draw(); return () => cancelAnimationFrame(raf)
  }, [mode])
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} aria-label="Domain Garden complex-plane artwork" />
}
