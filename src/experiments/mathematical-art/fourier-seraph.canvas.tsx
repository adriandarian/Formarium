import { useEffect, useRef } from 'react'
import type { Experiment } from '../../data/library'

interface FourierSeraphCanvasProps {
  experiment: Experiment
  compact?: boolean
}

interface Point {
  x: number
  y: number
}

function rotate(point: Point, angle: number): Point {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  return {
    x: point.x * cos - point.y * sin,
    y: point.x * sin + point.y * cos,
  }
}

function wingPoint(theta: number, pair: number, time: number): Point {
  const phase = pair * 0.82
  const radius =
    0.42 +
    0.11 * Math.sin((3 + pair) * theta + time * (0.54 + pair * 0.08) + phase) +
    0.065 * Math.sin((7 + pair * 2) * theta - time * 0.37) +
    0.035 * Math.cos(11 * theta + time * 0.21 + phase)

  const x = radius * Math.cos(theta) + 0.075 * Math.cos(5 * theta + time * 0.45)
  const y = radius * (0.64 + pair * 0.09) * Math.sin(theta) + 0.05 * Math.sin(9 * theta - time * 0.3)
  return { x, y }
}

export function FourierSeraphCanvas({ experiment, compact = false }: FourierSeraphCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let animationFrame = 0
    let mounted = true
    const startedAt = performance.now()

    const draw = (now: number) => {
      if (!mounted) return

      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, compact ? 1.25 : 2)
      const width = Math.max(1, Math.floor(rect.width * dpr))
      const height = Math.max(1, Math.floor(rect.height * dpr))

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }

      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.fillStyle = '#020202'
      context.fillRect(0, 0, rect.width, rect.height)

      const time = reducedMotion ? 1.8 : (now - startedAt) / 1000
      const cx = rect.width * 0.5
      const cy = rect.height * 0.51
      const scale = Math.min(rect.width, rect.height) * (compact ? 0.36 : 0.4)
      const pairs = 3
      const samples = compact ? 72 : 110
      const filaments = compact ? 8 : 14

      context.save()
      context.translate(cx, cy)
      context.globalCompositeOperation = 'lighter'

      for (let pair = 0; pair < pairs; pair += 1) {
        const spread = 0.28 + pair * 0.34
        const pairScale = 1 - pair * 0.09

        for (const side of [-1, 1]) {
          context.beginPath()

          for (let index = 0; index <= samples; index += 1) {
            const theta = (index / samples) * Math.PI * 2
            const local = wingPoint(theta, pair, time)
            const transformed = rotate(local, side * spread)
            const x = side * (0.18 + Math.abs(transformed.x) * pairScale) * scale
            const y = (transformed.y - (pair - 1) * 0.045) * scale

            if (index === 0) context.moveTo(x, y)
            else context.lineTo(x, y)
          }

          context.closePath()
          context.strokeStyle = `rgba(236, 240, 255, ${0.28 - pair * 0.045})`
          context.lineWidth = compact ? 0.7 : 0.9
          context.stroke()

          for (let filament = 0; filament < filaments; filament += 1) {
            const theta = (filament / filaments) * Math.PI * 2 + time * 0.055 * (pair + 1)
            const endpoint = wingPoint(theta, pair, time)
            const transformed = rotate(endpoint, side * spread)
            const ex = side * (0.18 + Math.abs(transformed.x) * pairScale) * scale
            const ey = (transformed.y - (pair - 1) * 0.045) * scale
            const bodyY = Math.sin(theta * 2 + time * 0.6) * scale * 0.025

            context.beginPath()
            context.moveTo(side * scale * 0.025, bodyY)
            context.quadraticCurveTo(
              side * ex * 0.55,
              ey * 0.28 + Math.sin(theta * 4 + time) * scale * 0.035,
              ex,
              ey,
            )
            context.strokeStyle = `rgba(172, 190, 255, ${0.07 + (filament % 3) * 0.018})`
            context.lineWidth = 0.55
            context.stroke()
          }
        }
      }

      const spinePoints = compact ? 22 : 34
      for (let index = 0; index < spinePoints; index += 1) {
        const progress = index / Math.max(spinePoints - 1, 1)
        const y = (progress - 0.5) * scale * 1.34
        const wobble = Math.sin(progress * Math.PI * 8 + time * 1.15) * scale * 0.012
        const radius = (compact ? 1.2 : 1.6) + Math.sin(progress * Math.PI) * 1.8
        context.beginPath()
        context.arc(wobble, y, radius, 0, Math.PI * 2)
        context.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.sin(progress * Math.PI) * 0.45})`
        context.fill()
      }

      for (let ring = 0; ring < (compact ? 3 : 5); ring += 1) {
        const radius = scale * (0.055 + ring * 0.027 + Math.sin(time * 0.9 + ring) * 0.004)
        context.beginPath()
        context.ellipse(0, -scale * 0.46, radius, radius * 0.34, time * 0.08 + ring * 0.3, 0, Math.PI * 2)
        context.strokeStyle = `rgba(255, 255, 255, ${0.18 - ring * 0.022})`
        context.lineWidth = 0.7
        context.stroke()
      }

      const tendrilCount = compact ? 4 : 6
      for (const side of [-1, 1]) {
        for (let tendril = 0; tendril < tendrilCount; tendril += 1) {
          context.beginPath()
          for (let step = 0; step <= 48; step += 1) {
            const u = step / 48
            const x =
              side * scale * (0.025 + u * (0.22 + tendril * 0.018)) +
              Math.sin(u * Math.PI * (3 + tendril * 0.3) + time * 0.75) * scale * 0.025 * u
            const y = -scale * 0.54 - u * scale * (0.18 + tendril * 0.017)
            if (step === 0) context.moveTo(x, y)
            else context.lineTo(x, y)
          }
          context.strokeStyle = 'rgba(220, 228, 255, 0.16)'
          context.lineWidth = 0.55
          context.stroke()
        }
      }

      context.restore()

      if (!reducedMotion) animationFrame = requestAnimationFrame(draw)
    }

    draw(performance.now())

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
