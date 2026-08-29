import { useEffect, useRef } from 'react'
import type { Experiment } from '../../data/library'

interface GlyphKoiCanvasProps {
  experiment: Experiment
  compact?: boolean
}

const ramp = ' .:-=+*#%@'

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

export function GlyphKoiCanvas({ experiment, compact = false }: GlyphKoiCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let animationFrame = 0
    let mounted = true
    let previousFrame = 0
    const startedAt = performance.now()

    const draw = (now: number) => {
      if (!mounted) return

      if (!reducedMotion && now - previousFrame < (compact ? 42 : 34)) {
        animationFrame = requestAnimationFrame(draw)
        return
      }
      previousFrame = now

      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, compact ? 1.2 : 1.75)
      const width = Math.max(1, Math.floor(rect.width * dpr))
      const height = Math.max(1, Math.floor(rect.height * dpr))

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }

      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.fillStyle = '#020202'
      context.fillRect(0, 0, rect.width, rect.height)

      const time = reducedMotion ? 1.4 : (now - startedAt) / 1000
      const fontSize = compact ? 7 : 10
      const cellWidth = fontSize * 0.64
      const cellHeight = fontSize * 1.02
      const columns = Math.ceil(rect.width / cellWidth)
      const rows = Math.ceil(rect.height / cellHeight)
      const scale = Math.min(rect.width, rect.height) * 0.5
      const cx = rect.width * 0.5 + Math.sin(time * 0.55) * rect.width * 0.025
      const cy = rect.height * 0.51 + Math.sin(time * 0.82) * rect.height * 0.018

      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const px = column * cellWidth + cellWidth * 0.5
          const py = row * cellHeight + cellHeight * 0.5
          const x = (px - cx) / scale
          const y = (py - cy) / scale

          const tailInfluence = clamp((-x - 0.18) / 0.82, 0, 1)
          const bodyCurve =
            Math.sin(x * 4.4 - time * 2.15) * (0.035 + tailInfluence * 0.09) +
            Math.sin(x * 8.2 + time * 0.8) * 0.012
          const yy = y - bodyCurve

          const bodyX = (x - 0.03) / 0.72
          const bodyY = yy / 0.3
          const bodyDistance = bodyX * bodyX + bodyY * bodyY
          const insideBody = bodyDistance <= 1 && x > -0.63 && x < 0.71

          const tailWidth = 0.13 + clamp((-x - 0.5) / 0.46, 0, 1) * 0.34
          const tailFork = x < -0.72 ? 0.045 + (-x - 0.72) * 0.18 : 0
          const insideTail =
            x <= -0.48 &&
            x >= -0.98 &&
            Math.abs(yy) < tailWidth &&
            (x > -0.72 || Math.abs(yy) > tailFork)

          const dorsalTop = -0.22 - Math.sin((x + 0.1) * Math.PI * 2.4) * 0.08
          const insideDorsal = x > -0.24 && x < 0.27 && yy < -0.15 && yy > dorsalTop
          const insideLowerFin = x > -0.06 && x < 0.34 && yy > 0.15 && yy < 0.36 - Math.abs(x - 0.14) * 0.45

          const insideFish = insideBody || insideTail || insideDorsal || insideLowerFin

          if (insideFish) {
            const bodyEdge = clamp(1 - bodyDistance, 0, 1)
            const wave =
              Math.sin((x + 0.5) * 12.5 + yy * 9 - time * 0.65) * 0.5 +
              Math.sin(x * 20 - yy * 6 + time * 0.35) * 0.25
            const scalePattern = Math.sin(x * 30 + Math.sin(yy * 18) * 2.2) * 0.16
            const intensity = clamp(0.35 + bodyEdge * 0.47 + wave * 0.12 + scalePattern, 0.08, 1)
            const rampIndex = Math.floor(intensity * (ramp.length - 1))
            let glyph = ramp[rampIndex]

            const eyeDistance = Math.hypot(x - 0.51, yy + 0.07)
            const gillDistance = Math.abs(x - 0.34)
            const stripe = Math.sin((x + 0.3) * 8.6 + yy * 4.5 + time * 0.18)

            if (eyeDistance < 0.055) glyph = eyeDistance < 0.027 ? '@' : 'o'
            else if (gillDistance < 0.025 && Math.abs(yy) < 0.18) glyph = ')'
            else if (insideTail && column % 3 === 0) glyph = '/'
            else if (insideDorsal || insideLowerFin) glyph = stripe > 0 ? '^' : '~'

            if (eyeDistance < 0.055) {
              context.fillStyle = eyeDistance < 0.027 ? 'rgba(12, 12, 12, 0.98)' : 'rgba(245, 245, 238, 0.96)'
            } else if (stripe > 0.34 && x > -0.45 && x < 0.5) {
              context.fillStyle = `rgba(255, ${145 + Math.floor(intensity * 42)}, ${82 + Math.floor(intensity * 45)}, ${0.58 + intensity * 0.36})`
            } else {
              const channel = 205 + Math.floor(intensity * 45)
              context.fillStyle = `rgba(${channel}, ${channel}, ${Math.min(255, channel + 6)}, ${0.48 + intensity * 0.42})`
            }

            context.fillText(glyph, px, py)
            continue
          }

          const waterSeed = (column * 37 + row * 61) % 113
          const ripple = Math.sin(column * 0.42 + row * 0.16 - time * 1.1)
          if (waterSeed < 5 && ripple > -0.2) {
            context.fillStyle = `rgba(132, 172, 205, ${0.08 + (ripple + 1) * 0.035})`
            context.fillText(waterSeed % 2 === 0 ? '~' : '.', px, py)
          }
        }
      }

      const bubbleCount = compact ? 4 : 8
      for (let index = 0; index < bubbleCount; index += 1) {
        const phase = (time * (0.16 + index * 0.008) + index * 0.17) % 1
        const bx = cx + scale * (0.65 + (index % 3) * 0.08 + Math.sin(time + index) * 0.025)
        const by = cy + scale * (0.16 - phase * 0.9)
        context.fillStyle = `rgba(170, 205, 228, ${0.08 + (1 - phase) * 0.12})`
        context.fillText(index % 2 === 0 ? 'o' : '°', bx, by)
      }

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
