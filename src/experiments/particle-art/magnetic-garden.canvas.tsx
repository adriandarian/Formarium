import { useEffect, useRef } from 'react'
import type { Experiment } from '../../data/library'

interface MagneticGardenCanvasProps {
  experiment: Experiment
  compact?: boolean
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  phase: number
  band: number
}

interface PointerState {
  x: number
  y: number
  active: boolean
  down: boolean
}

export function MagneticGardenCanvas({ experiment, compact = false }: MagneticGardenCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointer: PointerState = { x: 0, y: 0, active: false, down: false }
    const particles: Particle[] = []
    let logicalWidth = 0
    let logicalHeight = 0
    let animationFrame = 0
    let mounted = true
    const startedAt = performance.now()

    const seedParticles = (width: number, height: number) => {
      particles.length = 0
      const count = compact ? 620 : 1500
      const bands = compact ? 7 : 11

      for (let index = 0; index < count; index += 1) {
        const band = index % bands
        const t = Math.random()
        const baseY = ((band + 0.5) / bands) * height
        particles.push({
          x: t * width,
          y: baseY + Math.sin(t * Math.PI * 4 + band) * height * 0.035 + (Math.random() - 0.5) * 18,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          phase: Math.random() * Math.PI * 2,
          band,
        })
      }
    }

    const updatePointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      pointer.active = true
    }

    const onPointerDown = (event: PointerEvent) => {
      updatePointer(event)
      pointer.down = true
      canvas.setPointerCapture?.(event.pointerId)
    }

    const onPointerUp = () => {
      pointer.down = false
    }

    const onPointerLeave = () => {
      pointer.active = false
      pointer.down = false
    }

    if (!compact) {
      canvas.addEventListener('pointermove', updatePointer)
      canvas.addEventListener('pointerdown', onPointerDown)
      canvas.addEventListener('pointerup', onPointerUp)
      canvas.addEventListener('pointercancel', onPointerUp)
      canvas.addEventListener('pointerleave', onPointerLeave)
    }

    const draw = (now: number) => {
      if (!mounted) return

      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, compact ? 1.2 : 1.75)
      const width = Math.max(1, Math.floor(rect.width * dpr))
      const height = Math.max(1, Math.floor(rect.height * dpr))

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }

      if (!particles.length || Math.abs(logicalWidth - rect.width) > 2 || Math.abs(logicalHeight - rect.height) > 2) {
        logicalWidth = Math.max(rect.width, 1)
        logicalHeight = Math.max(rect.height, 1)
        seedParticles(logicalWidth, logicalHeight)
      }

      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.fillStyle = compact ? 'rgba(2, 2, 3, 0.28)' : 'rgba(2, 2, 3, 0.18)'
      context.fillRect(0, 0, rect.width, rect.height)
      context.globalCompositeOperation = 'lighter'

      const time = reducedMotion ? 1.6 : (now - startedAt) / 1000
      const centerX = rect.width * 0.5
      const centerY = rect.height * 0.5

      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index]
        const previousX = particle.x
        const previousY = particle.y
        const nx = particle.x / Math.max(rect.width, 1)
        const ny = particle.y / Math.max(rect.height, 1)

        const fieldAngle =
          Math.sin(ny * 10.5 + time * 0.72 + particle.phase) * 1.15 +
          Math.cos(nx * 8.2 - time * 0.48 + particle.band * 0.31) * 0.92 +
          Math.sin((nx + ny) * 13.0 + time * 0.24) * 0.36

        const flowStrength = compact ? 0.026 : 0.032
        particle.vx += Math.cos(fieldAngle) * flowStrength
        particle.vy += Math.sin(fieldAngle) * flowStrength

        const gardenWave = Math.sin(nx * Math.PI * 4 + time * 0.55 + particle.band * 0.5)
        const targetY =
          ((particle.band + 0.5) / (compact ? 7 : 11)) * rect.height +
          gardenWave * rect.height * 0.07
        particle.vy += (targetY - particle.y) * 0.00018

        const dxCenter = centerX - particle.x
        const dyCenter = centerY - particle.y
        particle.vx += dxCenter * 0.000006
        particle.vy += dyCenter * 0.000004

        if (pointer.active && !compact) {
          const dx = pointer.x - particle.x
          const dy = pointer.y - particle.y
          const distanceSquared = dx * dx + dy * dy + 180
          const distance = Math.sqrt(distanceSquared)
          const direction = pointer.down ? -1 : 1
          const force = direction * Math.min(0.48, 440 / distanceSquared)
          particle.vx += (dx / distance) * force
          particle.vy += (dy / distance) * force

          if (!pointer.down && distance < 84) {
            const tangent = 0.016 * (1 - distance / 84)
            particle.vx += (-dy / distance) * tangent
            particle.vy += (dx / distance) * tangent
          }
        }

        particle.vx *= 0.968
        particle.vy *= 0.968
        const speed = Math.hypot(particle.vx, particle.vy)
        const maxSpeed = pointer.down ? 3.4 : 2.15
        if (speed > maxSpeed) {
          particle.vx = (particle.vx / speed) * maxSpeed
          particle.vy = (particle.vy / speed) * maxSpeed
        }

        particle.x += particle.vx
        particle.y += particle.vy

        const margin = 8
        if (particle.x < -margin) particle.x = rect.width + margin
        if (particle.x > rect.width + margin) particle.x = -margin
        if (particle.y < -margin) particle.y = rect.height + margin
        if (particle.y > rect.height + margin) particle.y = -margin

        const energy = Math.min(1, speed / 1.8)
        const hueMix = particle.band / Math.max((compact ? 7 : 11) - 1, 1)
        const red = Math.floor(160 + hueMix * 70 + energy * 20)
        const green = Math.floor(192 + (1 - hueMix) * 34 + energy * 16)
        const blue = Math.floor(224 + energy * 28)

        context.beginPath()
        context.moveTo(previousX, previousY)
        context.lineTo(particle.x, particle.y)
        context.strokeStyle = `rgba(${red}, ${green}, ${Math.min(255, blue)}, ${0.12 + energy * 0.24})`
        context.lineWidth = compact ? 0.55 : 0.72
        context.stroke()

        if (!compact && index % 7 === 0) {
          context.fillStyle = `rgba(245, 248, 255, ${0.08 + energy * 0.18})`
          context.fillRect(particle.x, particle.y, 1.1, 1.1)
        }
      }

      if (pointer.active && !compact) {
        const pulse = 24 + Math.sin(time * 4.2) * 4
        context.beginPath()
        context.arc(pointer.x, pointer.y, pointer.down ? pulse * 1.5 : pulse, 0, Math.PI * 2)
        context.strokeStyle = pointer.down ? 'rgba(255, 126, 184, 0.28)' : 'rgba(178, 224, 255, 0.2)'
        context.lineWidth = 0.8
        context.stroke()
      }

      context.globalCompositeOperation = 'source-over'

      if (!reducedMotion) animationFrame = requestAnimationFrame(draw)
    }

    context.fillStyle = '#020203'
    context.fillRect(0, 0, canvas.width, canvas.height)
    draw(performance.now())

    return () => {
      mounted = false
      cancelAnimationFrame(animationFrame)
      canvas.removeEventListener('pointermove', updatePointer)
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointerup', onPointerUp)
      canvas.removeEventListener('pointercancel', onPointerUp)
      canvas.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [compact])

  return (
    <div className="artwork-canvas-wrap" aria-label={experiment.title}>
      <canvas ref={canvasRef} className="artwork-canvas" />
    </div>
  )
}
