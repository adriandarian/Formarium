import { useEffect, useRef } from 'react'
import type { Experiment } from '../../data/library'

const TAU = Math.PI * 2

interface OrbitalBloomCanvasProps {
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

export function OrbitalBloomCanvas({ experiment, compact = false }: OrbitalBloomCanvasProps) {
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
      context.fillStyle = '#030303'
      context.fillRect(0, 0, width, height)

      const t = frame * 0.009
      const cx = width * 0.5
      const cy = height * 0.5
      const scale = Math.min(width, height) * (compact ? 0.34 : 0.38)
      const rings = compact ? 7 : 11
      const points = compact ? 260 : 520

      context.globalCompositeOperation = 'lighter'

      for (let ring = 0; ring < rings; ring += 1) {
        const ringPhase = ring / rings
        const radialOffset = (ring - (rings - 1) / 2) * scale * 0.032
        const spin = t * (0.45 + ringPhase * 0.42) * (ring % 2 ? -1 : 1)

        for (let i = 0; i < points; i += 1) {
          const u = i / points
          const a = u * TAU
          const petals = 5 + Math.sin(t * 0.27) * 0.75
          const rose = Math.sin(a * petals + spin) * 0.5 + 0.5
          const breathing = 1 + Math.sin(t * 1.4 + a * 2 + ringPhase * 5) * 0.035
          const radius = (0.26 + rose * 0.72) * scale * breathing + radialOffset
          const warp = Math.sin(a * 3 - t * 1.6 + ringPhase * 8) * scale * 0.045
          const x = cx + Math.cos(a + spin * 0.22) * radius + Math.cos(a * 2.1 + t) * warp
          const y = cy + Math.sin(a + spin * 0.22) * radius * 0.78 + Math.sin(a * 1.7 - t) * warp
          const depth = Math.sin(a * 2 + ringPhase * TAU + t)
          const alpha = 0.055 + (depth + 1) * 0.055 + (1 - Math.abs(ringPhase - 0.5)) * 0.035
          const size = compact ? 0.55 + (depth + 1) * 0.24 : 0.6 + (depth + 1) * 0.32

          context.beginPath()
          context.fillStyle = `rgba(246, 246, 246, ${alpha})`
          context.arc(x, y, size, 0, TAU)
          context.fill()
        }
      }

      const orbiters = compact ? 18 : 34
      for (let i = 0; i < orbiters; i += 1) {
        const q = i / orbiters
        const a = q * TAU + t * (0.5 + (i % 3) * 0.12)
        const ellipse = scale * (0.42 + (i % 5) * 0.09)
        const x = cx + Math.cos(a) * ellipse
        const y = cy + Math.sin(a * 1.23 + i) * ellipse * 0.34
        const pulse = 0.55 + Math.sin(t * 2.2 + i) * 0.28

        context.beginPath()
        context.fillStyle = `rgba(255,255,255,${0.16 + pulse * 0.2})`
        context.arc(x, y, compact ? 0.9 : 1.2, 0, TAU)
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
