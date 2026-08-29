import { useEffect, useRef } from 'react'
import type { Experiment } from '../../data/library'

interface ParticleRoseCanvasProps {
  experiment: Experiment
  compact?: boolean
}

interface Point3D {
  x: number
  y: number
  z: number
  seed: number
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

function makeRosePoints(compact: boolean): Point3D[] {
  const points: Point3D[] = []
  const petals = compact ? 13 : 21
  const layers = compact ? 28 : 44
  const samples = compact ? 34 : 52

  for (let petal = 0; petal < petals; petal += 1) {
    const petalAngle = (petal / petals) * Math.PI * 2
    for (let layer = 0; layer < layers; layer += 1) {
      const v = layer / Math.max(1, layers - 1)
      const curl = v * 1.9
      const width = Math.sin(v * Math.PI) * (0.16 + v * 0.18)
      const length = 0.16 + v * 0.9

      for (let sample = 0; sample < samples; sample += 1) {
        const q = sample / Math.max(1, samples - 1) - 0.5
        const localAngle = petalAngle + q * width * 2.8 + curl * 0.16
        const radius = length * (0.58 + Math.cos(q * Math.PI) * 0.42)
        const x = Math.cos(localAngle) * radius
        const z = Math.sin(localAngle) * radius
        const petalCup = Math.cos(q * Math.PI) * 0.24
        const y = -v * 0.78 + petalCup + Math.sin(v * Math.PI * 2 + petalAngle) * 0.045

        points.push({ x, y, z, seed: (petal * 17 + layer * 7 + sample) % 97 })
      }
    }
  }

  return points
}

export function ParticleRoseCanvas({ experiment, compact = false }: ParticleRoseCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    const points = makeRosePoints(compact)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    let animationFrame = 0
    let mounted = true

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointerRef.current.x = ((event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 2
      pointerRef.current.y = ((event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * 2
    }

    if (!compact) canvas.addEventListener('pointermove', onPointerMove)

    const draw = () => {
      if (!mounted) return

      const { width, height, dpr } = fitCanvas(canvas)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.fillStyle = '#030303'
      context.fillRect(0, 0, width, height)

      const t = frame * 0.008
      const pointer = pointerRef.current
      const yaw = t * 0.42 + pointer.x * 0.34
      const pitch = -0.18 + Math.sin(t * 0.52) * 0.08 + pointer.y * 0.16
      const cosY = Math.cos(yaw)
      const sinY = Math.sin(yaw)
      const cosX = Math.cos(pitch)
      const sinX = Math.sin(pitch)
      const scale = Math.min(width, height) * (compact ? 0.34 : 0.39)
      const cx = width * 0.5
      const cy = height * (compact ? 0.54 : 0.55)

      context.globalCompositeOperation = 'lighter'

      for (const point of points) {
        const x1 = point.x * cosY - point.z * sinY
        const z1 = point.x * sinY + point.z * cosY
        const y1 = point.y * cosX - z1 * sinX
        const z2 = point.y * sinX + z1 * cosX
        const perspective = 1.25 / (1.8 + z2 * 0.56)
        const x = cx + x1 * scale * perspective
        const y = cy + y1 * scale * perspective
        const depth = Math.max(0, Math.min(1, (z2 + 1.1) / 2.2))
        const shimmer = 0.65 + Math.sin(t * 2 + point.seed) * 0.35
        const alpha = 0.09 + depth * 0.28 + shimmer * 0.08
        const size = (compact ? 0.52 : 0.66) + depth * (compact ? 0.48 : 0.72)
        const hue = 324 + depth * 22 + Math.sin(point.seed) * 5

        context.beginPath()
        context.fillStyle = `hsla(${hue}, 76%, ${72 + depth * 20}%, ${alpha})`
        context.arc(x, y, size, 0, Math.PI * 2)
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
      canvas.removeEventListener('pointermove', onPointerMove)
    }
  }, [compact])

  return (
    <div className="artwork-canvas-wrap" aria-label={experiment.title}>
      <canvas ref={canvasRef} className="artwork-canvas" />
    </div>
  )
}
