import { useEffect, useRef } from 'react'
import type { ExperimentRendererProps } from '../types'

export default function NewtonBasinFlower({ mode = 'stage' }: ExperimentRendererProps) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const compact = mode === 'preview'
    let frame = 0, raf = 0
    const roots = [[1, 0], [-.5, Math.sqrt(3) / 2], [-.5, -Math.sqrt(3) / 2]] as const
    const draw = () => {
      if (frame % (compact ? 7 : 5) === 0) {
        const box = canvas.getBoundingClientRect(), rw = compact ? 122 : 184, rh = Math.max(82, Math.round(rw * box.height / Math.max(1, box.width)))
        canvas.width = rw; canvas.height = rh
        const image = ctx.createImageData(rw, rh), data = image.data, maxIter = compact ? 18 : 28, rot = frame * .002
        for (let py = 0; py < rh; py += 1) for (let px = 0; px < rw; px += 1) {
          let ar = (px / rw - .5) * 3.2, ai = (py / rh - .5) * 2.4
          let zr = ar * Math.cos(rot) - ai * Math.sin(rot), zi = ar * Math.sin(rot) + ai * Math.cos(rot), iter = 0
          for (; iter < maxIter; iter += 1) {
            const z2r = zr * zr - zi * zi, z2i = 2 * zr * zi
            const z3r = z2r * zr - z2i * zi - 1, z3i = z2r * zi + z2i * zr
            const dr = 3 * z2r, di = 3 * z2i, den = dr * dr + di * di + 1e-12
            const qr = (z3r * dr + z3i * di) / den, qi = (z3i * dr - z3r * di) / den
            zr -= qr; zi -= qi
            if (qr * qr + qi * qi < 1e-10) break
          }
          let root = 0, best = Infinity
          roots.forEach(([rr, ri], index) => { const d = (zr - rr) ** 2 + (zi - ri) ** 2; if (d < best) { best = d; root = index } })
          const q = 1 - iter / maxIter, palette = [[245, 88, 185], [90, 210, 255], [255, 196, 92]][root], o = (py * rw + px) * 4
          data[o] = Math.round(palette[0] * (.25 + .75 * q)); data[o + 1] = Math.round(palette[1] * (.25 + .75 * q)); data[o + 2] = Math.round(palette[2] * (.25 + .75 * q)); data[o + 3] = 255
        }
        ctx.putImageData(image, 0, 0)
      }
      frame += 1; raf = requestAnimationFrame(draw)
    }
    draw(); return () => cancelAnimationFrame(raf)
  }, [mode])
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} aria-label="Newton Basin Flower fractal artwork" />
}
