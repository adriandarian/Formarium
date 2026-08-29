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
      const strands = compact ? 34 : 64
      const samples = compact ? 72 : 135
      context.globalCompositeOperation = 'lighter'

      for (let strand = 0; strand < strands; strand += 1) {
        const y = strand / strands * 2 - 1
        context.beginPath()
        for (let i = 0; i < samples; i += 1) {
          const u = i / (samples - 1)
          const angle = (u - 0.5) * TAU * 1.18
          const k = (4 + Math.cos(y * 3.1)) * Math.cos(angle)
          const d = Math.hypot(k, y * 2.3) - 6
          const c = d / 2 - t / 2 + (strand % 2) * 8
          const radius = (79 + k * k) * scale
          const x = cx + radius * Math.cos(c)
          const py = cy + 99 * scale * Math.sin(c / 3) + (d ** 3 / 5) * scale * Math.sin(t * 3 - d / 0.7) + 3 * scale * Math.sin(k * 2) + y * 13 * scale * k * (y * 0.2 + Math.sin(y * 8 - d * 4))
          if (i === 0) context.moveTo(x, py)
          else context.lineTo(x, py)
        }
        context.strokeStyle = `rgba(245,245,245,${0.035 + (strand % 5) * 0.012})`
        context.lineWidth = compact ? 0.5 : 0.72
        context.stroke()
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
