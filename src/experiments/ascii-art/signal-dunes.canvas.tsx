import { useEffect, useRef } from 'react'
import type { Experiment } from '../../data/library'

const RAMP = ' .:-=+*#%@'

interface SignalDunesCanvasProps {
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

export function SignalDunesCanvas({ experiment, compact = false }: SignalDunesCanvasProps) {
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

      const t = frame * 0.018
      const columns = compact ? 62 : Math.max(78, Math.min(126, Math.floor(width / 8)))
      const cellW = width / columns
      const cellH = cellW * 1.68
      const rows = Math.ceil(height / cellH)
      const fontSize = Math.max(7, cellW * 1.18)

      context.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`
      context.textAlign = 'center'
      context.textBaseline = 'middle'

      for (let row = 0; row < rows; row += 1) {
        const ny = row / Math.max(1, rows - 1)
        for (let col = 0; col < columns; col += 1) {
          const nx = col / Math.max(1, columns - 1)
          const x = (nx - 0.5) * 2
          const y = (ny - 0.5) * 2

          const horizon = y + 0.18
          const duneA = Math.sin(x * 4.4 - t * 0.9 + Math.sin(y * 2.2 + t * 0.45))
          const duneB = Math.sin(x * 8.1 + y * 3.4 + t * 0.58) * 0.46
          const duneC = Math.cos(x * 2.2 - y * 7.5 - t * 0.36) * 0.32
          const interference = duneA * 0.5 + duneB + duneC
          const ridge = Math.exp(-Math.pow(horizon - interference * 0.19, 2) * 18)
          const depth = Math.max(0, 1 - Math.abs(y - interference * 0.15) * 0.68)
          const haze = Math.max(0, 1 - Math.abs(y + 0.55) * 1.9) * 0.16
          const value = Math.max(0, Math.min(1, ridge * 0.84 + depth * 0.28 + haze))

          if (value < 0.11) continue

          const rampIndex = Math.min(RAMP.length - 1, Math.floor(value * (RAMP.length - 1)))
          const char = RAMP[rampIndex]
          const shimmer = 0.76 + Math.sin(t * 1.8 + col * 0.22 + row * 0.13) * 0.16
          const alpha = Math.max(0.08, value * shimmer)
          const hue = 250 + Math.sin(nx * 5 + t * 0.4) * 18
          const lightness = 56 + value * 34

          context.fillStyle = `hsla(${hue}, 30%, ${lightness}%, ${alpha})`
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
