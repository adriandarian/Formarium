import { useEffect, useRef } from 'react'
import type { Experiment } from '../../data/library'

const RAMP = ' .,:;irsXA253hMHGS#9B&@'

interface GlyphBloomCanvasProps {
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

export function GlyphBloomCanvas({ experiment, compact = false }: GlyphBloomCanvasProps) {
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

      const t = frame * 0.02
      const columns = compact ? 54 : Math.max(68, Math.min(108, Math.floor(width / 10)))
      const cellW = width / columns
      const cellH = cellW * 1.72
      const rows = Math.ceil(height / cellH)
      const fontSize = Math.max(7, cellW * 1.22)

      context.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`
      context.textAlign = 'center'
      context.textBaseline = 'middle'

      const aspect = width / Math.max(height, 1)

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < columns; col += 1) {
          const nx = ((col + 0.5) / columns - 0.5) * 2 * aspect
          const ny = ((row + 0.5) / rows - 0.5) * 2
          const angle = t * 0.24
          const rx = nx * Math.cos(angle) - ny * Math.sin(angle)
          const ry = nx * Math.sin(angle) + ny * Math.cos(angle)
          const polar = Math.atan2(ry, rx)
          const radius = Math.hypot(rx, ry)

          const petals = 0.54 + Math.cos(polar * 5 - t * 0.7) * 0.14
          const breathing = Math.sin(t * 1.3 + polar * 3) * 0.035
          const shell = 1 - Math.abs(radius - petals - breathing) / 0.13
          const inner = Math.max(0, 1 - radius / (petals + 0.04)) * 0.34
          const ripple = (Math.sin(radius * 18 - t * 2.2) + 1) * 0.08
          const diagonal = (Math.sin((rx - ry) * 8 + t) + 1) * 0.045
          const value = Math.max(0, Math.min(1, shell + inner + ripple + diagonal - 0.12))

          if (value < 0.08) continue

          const rampIndex = Math.min(RAMP.length - 1, Math.floor(value * (RAMP.length - 1)))
          const char = RAMP[rampIndex]
          const alpha = 0.16 + value * 0.82
          const lightness = 62 + value * 30
          const hue = 270 + Math.sin(polar * 2 + t) * 18

          context.fillStyle = `hsla(${hue}, 38%, ${lightness}%, ${alpha})`
          context.fillText(char, (col + 0.5) * cellW, (row + 0.5) * cellH)
        }
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
