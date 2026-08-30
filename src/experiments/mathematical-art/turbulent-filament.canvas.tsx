import { useEffect, useRef } from 'react'
import type { Experiment } from '../../data/library'

const TAU = Math.PI * 2

function fitCanvas(canvas: HTMLCanvasElement) {
  const rect = canvas.getBoundingClientRect()
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const width = Math.max(1, Math.floor(rect.width * dpr))
  const height = Math.max(1, Math.floor(rect.height * dpr))
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width
    canvas.height = height
  }
  return { width: width / dpr, height: height / dpr, dpr }
}

export function TurbulentFilamentCanvas({ experiment, compact = false }: { experiment: Experiment; compact?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    let animationFrame = 0
    let mounted = true

    const draw = () => {
      if (!mounted) return
      const { width, height, dpr } = fitCanvas(canvas)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.fillStyle = '#090909'
      context.fillRect(0, 0, width, height)
      const t = frame * 0.034
      const scale = Math.min(width, height) / 400
      const cx = width / 2
      const cy = height / 2
      const points = compact ? 5200 : 12000
      context.globalCompositeOperation = 'lighter'

      for (let i = points; i--;) {
        const y = i / 524
        const angle = i * 0.013
        const k = (4 + Math.cos(y)) * Math.cos(angle)
        const e = y / 5 - 11
        const d = Math.hypot(k, e) - 6
        const c = d / 2.5 - t / 2 + (i % 2) * 9
        const x = cx + (79 + k * k) * scale * Math.cos(c)
        const py = cy + scale * (99 * Math.sin(c / 3) + d * d * Math.sin(t * 3 - d / 0.7) + 3 * Math.sin(k * 2) + Math.sin(y / 9) * k * (e + Math.sin(e * 4 - d * 4)))
        context.fillStyle = `rgba(245,245,245,${compact ? 0.055 : 0.075})`
        context.fillRect(x, py, compact ? 0.55 : 0.72, compact ? 0.55 : 0.72)
      }

      context.globalCompositeOperation = 'source-over'
      context.fillStyle = 'rgba(255,255,255,0.7)'
      context.beginPath()
      context.arc(cx, cy, 1.2 * scale, 0, TAU)
      context.fill()
      if (!reducedMotion) {
        frame += 1
        animationFrame = requestAnimationFrame(draw)
      }
    }
    draw()
    return () => { mounted = false; cancelAnimationFrame(animationFrame) }
  }, [compact])

  return <div className="artwork-canvas-wrap" aria-label={experiment.title}><canvas ref={canvasRef} className="artwork-canvas" /></div>
}
