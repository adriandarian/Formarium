import { useEffect, useRef } from 'react'
import type { Experiment } from '../../data/library'

function fitCanvas(canvas: HTMLCanvasElement) {
  const rect = canvas.getBoundingClientRect()
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const width = Math.max(1, Math.floor(rect.width * dpr))
  const height = Math.max(1, Math.floor(rect.height * dpr))
  if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height }
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
      const t = frame * Math.PI / 80
      const scale = Math.min(width, height) / 400
      const iterations = compact ? 6500 : 20000
      context.fillStyle = compact ? 'rgba(245,245,245,0.34)' : 'rgba(245,245,245,0.23)'
      context.globalCompositeOperation = 'lighter'
      for (let i = iterations; i--;) {
        const y = i / 663
        const k = (4 + Math.cos(y)) * Math.cos(i)
        const e = y / 5 - 11
        const d = Math.hypot(k, e) - 5
        const c = d / 2.5 - t / 2 + (i % 2) * 8
        const x = (79 + k * k) * Math.cos(c)
        const pointY = 99 * Math.sin(c / 3) + d * d * Math.sin(t * 2 - d) + 3 * Math.sin(k * 2) + Math.sin(y / 9 + 6) * k * (e + Math.sin(e * 4 - d * 4))
        context.fillRect(width / 2 + (x - 200) * scale, height / 2 + (pointY - 200) * scale, compact ? 0.7 : 0.9, compact ? 0.7 : 0.9)
      }
      context.globalCompositeOperation = 'source-over'
      if (!reducedMotion) { frame += 1; animationFrame = requestAnimationFrame(draw) }
    }
    draw()
    return () => { mounted = false; cancelAnimationFrame(animationFrame) }
  }, [compact])
  return <div className="artwork-canvas-wrap" aria-label={experiment.title}><canvas ref={canvasRef} className="artwork-canvas" /></div>
}
