import { useEffect, useRef } from 'react'
import type { Experiment } from '../../data/library'

const TAU = Math.PI * 2

interface JellyfishCanvasProps {
  experiment: Experiment
  compact?: boolean
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

export function JellyfishCanvas({ experiment, compact = false }: JellyfishCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    let animationFrame = 0
    let mounted = true

    const draw = () => {
      if (!mounted) return

      const { width, height, dpr } = fitCanvas(canvas)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.clearRect(0, 0, width, height)
      context.fillStyle = '#030303'
      context.fillRect(0, 0, width, height)

      const t = frame * 0.012
      const scale = Math.min(width, height) * (compact ? 0.32 : 0.29)
      const cx = width * 0.5
      const cy = height * (compact ? 0.42 : 0.43)
      const rings = compact ? 10 : 18
      const pointsPerRing = compact ? 56 : 96
      const tentacles = compact ? 16 : 26
      const tentacleSegments = compact ? 26 : 42

      context.globalCompositeOperation = 'lighter'

      for (let ring = 0; ring < rings; ring += 1) {
        const v = ring / Math.max(1, rings - 1)
        const bell = Math.sin(v * Math.PI)
        const radial = (0.17 + bell * 0.83) * scale
        const yBase = (v - 0.52) * scale * 1.58
        const pulse = Math.sin(t * 1.8 + v * 6.5) * scale * 0.035

        for (let point = 0; point < pointsPerRing; point += 1) {
          const u = point / pointsPerRing
          const angle = u * TAU
          const depth = Math.sin(angle)
          const deform = 1 + Math.sin(angle * 4 + t * 1.15 + v * 3) * 0.06
          const taper = 1 - Math.pow(v, 2.2) * 0.28
          const x = cx + Math.cos(angle) * radial * deform * taper
          const y =
            cy +
            yBase +
            pulse +
            Math.cos(angle * 2 + t + v * 4) * scale * 0.018
          const alpha = 0.12 + (depth + 1) * 0.15 + (1 - v) * 0.16
          const size = compact ? 0.75 + (depth + 1) * 0.36 : 0.75 + (depth + 1) * 0.5

          context.beginPath()
          context.fillStyle = `rgba(245, 245, 245, ${alpha})`
          context.arc(x, y, size, 0, TAU)
          context.fill()
        }
      }

      for (let tentacle = 0; tentacle < tentacles; tentacle += 1) {
        const angle = (tentacle / tentacles) * TAU
        const rootRadius = scale * 0.34
        const rootX = cx + Math.cos(angle) * rootRadius
        const rootY = cy + scale * 0.52 + Math.sin(angle * 2 + t) * scale * 0.025

        for (let segment = 0; segment < tentacleSegments; segment += 1) {
          const q = segment / Math.max(1, tentacleSegments - 1)
          const sway =
            Math.sin(t * 2.1 + tentacle * 0.72 + q * 7) *
            scale *
            (0.02 + q * 0.11)
          const curl =
            Math.cos(t * 1.35 + tentacle * 0.33 + q * 4.5) *
            scale *
            q *
            0.035
          const x = rootX + sway + Math.cos(angle) * curl
          const y = rootY + q * scale * (compact ? 0.95 : 1.18)
          const alpha = (1 - q * 0.72) * 0.28

          context.beginPath()
          context.fillStyle = `rgba(236, 236, 236, ${alpha})`
          context.arc(x, y, Math.max(0.5, 1.05 - q * 0.42), 0, TAU)
          context.fill()
        }
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
