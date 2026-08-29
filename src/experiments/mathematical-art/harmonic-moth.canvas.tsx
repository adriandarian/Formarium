import { useEffect, useRef } from 'react'
import type { Experiment } from '../../data/library'

const TAU = Math.PI * 2

interface HarmonicMothCanvasProps {
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

export function HarmonicMothCanvas({ experiment, compact = false }: HarmonicMothCanvasProps) {
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

      const t = frame * 0.012
      const cx = width * 0.5
      const cy = height * 0.51
      const scale = Math.min(width, height) * (compact ? 0.34 : 0.39)
      const layers = compact ? 18 : 30
      const samples = compact ? 72 : 116

      context.globalCompositeOperation = 'lighter'

      for (const side of [-1, 1] as const) {
        for (let layer = 0; layer < layers; layer += 1) {
          const v = layer / Math.max(1, layers - 1)
          const layerFade = 1 - Math.abs(v - 0.5) * 0.9

          for (let i = 0; i < samples; i += 1) {
            const u = i / Math.max(1, samples - 1)
            const a = (u - 0.5) * Math.PI * 1.9
            const wave = Math.sin(a * 3 + t * 1.3 + v * 5.2) * 0.075
            const flutter = Math.sin(t * 2.2 + a * 2.4 + v * TAU) * 0.035
            const lobe = 0.4 + 0.58 * Math.pow(Math.abs(Math.cos(a * 0.72)), 0.72)
            const taper = 0.18 + 0.82 * Math.sin(u * Math.PI)
            const radius = (0.28 + v * 0.76) * lobe * taper * (1 + wave + flutter)
            const sweep = a * 0.24 + Math.sin(a * 2 - t * 0.65) * 0.06

            const x = cx + side * (0.055 + Math.abs(Math.cos(a + sweep)) * radius) * scale
            const y = cy + Math.sin(a) * radius * scale * 0.76 - (v - 0.48) * scale * 0.14
            const vein = Math.sin(a * 6 + v * 14 - t * 1.5)
            const alpha = 0.055 + layerFade * 0.07 + (vein + 1) * 0.035
            const size = compact ? 0.6 : 0.78

            context.beginPath()
            context.fillStyle = `rgba(246,246,246,${alpha})`
            context.arc(x, y, size, 0, TAU)
            context.fill()
          }
        }
      }

      context.globalCompositeOperation = 'source-over'
      context.strokeStyle = 'rgba(255,255,255,0.28)'
      context.lineWidth = compact ? 0.55 : 0.75

      for (const side of [-1, 1] as const) {
        context.beginPath()
        for (let i = 0; i <= 52; i += 1) {
          const u = i / 52
          const bend = Math.sin(u * Math.PI) * (0.1 + Math.sin(t * 1.2 + side) * 0.018)
          const x = cx + side * scale * (0.02 + u * 0.2 + bend)
          const y = cy - scale * (0.12 + u * 0.78 - Math.sin(u * Math.PI * 1.3) * 0.11)
          if (i === 0) context.moveTo(x, y)
          else context.lineTo(x, y)
        }
        context.stroke()
      }

      const bodySegments = compact ? 22 : 34
      for (let i = 0; i < bodySegments; i += 1) {
        const u = i / Math.max(1, bodySegments - 1)
        const y = cy - scale * 0.32 + u * scale * 0.73
        const pulse = 1 + Math.sin(t * 1.8 + u * 7) * 0.08
        const radius = scale * (0.024 + Math.sin(u * Math.PI) * 0.025) * pulse
        context.beginPath()
        context.fillStyle = `rgba(255,255,255,${0.18 + Math.sin(u * Math.PI) * 0.2})`
        context.arc(cx, y, radius, 0, TAU)
        context.fill()
      }

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
