import { useEffect, useRef } from 'react'
import type { Experiment } from '../../data/library'

interface VoidSoupCanvasProps {
  experiment: Experiment
  compact?: boolean
}

interface SeedPoint {
  x: number
  y: number
  phase: number
  weight: number
}

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

function makePoints(count: number): SeedPoint[] {
  let state = 873421
  const random = () => {
    state = (state * 1664525 + 1013904223) >>> 0
    return state / 4294967296
  }

  return Array.from({ length: count }, () => ({
    x: random(),
    y: random(),
    phase: random() * Math.PI * 2,
    weight: 0.55 + random() * 0.9,
  }))
}

export function VoidSoupCanvas({ experiment, compact = false }: VoidSoupCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    const points = makePoints(compact ? 2300 : 5200)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    let animationFrame = 0
    let mounted = true

    const draw = () => {
      if (!mounted) return

      const { width, height, dpr } = fitCanvas(canvas)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.fillStyle = '#020202'
      context.fillRect(0, 0, width, height)

      const t = frame * 0.008
      const aspect = width / Math.max(height, 1)
      const voids = [
        { x: 0.31 + Math.sin(t * 0.73) * 0.07, y: 0.35 + Math.cos(t * 0.61) * 0.06, r: 0.16 },
        { x: 0.64 + Math.cos(t * 0.52) * 0.08, y: 0.39 + Math.sin(t * 0.81) * 0.07, r: 0.13 },
        { x: 0.47 + Math.sin(t * 0.44 + 2.1) * 0.09, y: 0.68 + Math.cos(t * 0.66) * 0.05, r: 0.17 },
        { x: 0.78 + Math.cos(t * 0.58 + 1.2) * 0.05, y: 0.72 + Math.sin(t * 0.49) * 0.05, r: 0.11 },
      ]

      context.globalCompositeOperation = 'lighter'

      for (const point of points) {
        let x = point.x + Math.sin(t * 0.7 + point.phase + point.y * 12) * 0.008
        let y = point.y + Math.cos(t * 0.58 + point.phase * 0.7 + point.x * 10) * 0.008
        let edgeEnergy = 0

        for (const field of voids) {
          const dx = (x - field.x) * aspect
          const dy = y - field.y
          const distance = Math.hypot(dx, dy) || 0.0001
          const influence = Math.max(0, field.r * 1.75 - distance)

          if (influence > 0) {
            const push = Math.pow(influence / (field.r * 1.75), 2) * field.r * 0.78
            x += (dx / distance) * push / aspect
            y += (dy / distance) * push
          }

          const edgeDistance = Math.abs(distance - field.r)
          edgeEnergy += Math.max(0, 1 - edgeDistance / 0.055)
        }

        const filament = Math.sin((x + y) * 34 + t * 1.8 + point.phase) * 0.5 + 0.5
        const alpha = Math.min(0.62, 0.04 + edgeEnergy * 0.22 + filament * 0.045)
        const size = (compact ? 0.48 : 0.62) * point.weight + edgeEnergy * 0.18

        context.beginPath()
        context.fillStyle = `rgba(245,245,245,${alpha})`
        context.arc(x * width, y * height, size, 0, Math.PI * 2)
        context.fill()
      }

      context.globalCompositeOperation = 'source-over'

      if (!reducedMotion) {
        frame += 1
        animationFrame = requestAnimationFrame(draw)
      }
    }

    draw()

    return () => {
      mounted = false
      cancelAnimationFrame(animationFrame)
    }
  }, [compact])

  return (
    <div className="artwork-canvas-wrap" aria-label={experiment.title}>
      <canvas ref={canvasRef} className="artwork-canvas" />
    </div>
  )
}
