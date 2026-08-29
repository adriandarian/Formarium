import { useEffect, useRef } from 'react'
import type { ExperimentRendererProps } from '../types'

export default function ResonantTangle({ experiment, mode = 'stage' }: ExperimentRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    let animationFrame = 0
    let mounted = true

    const draw = () => {
      if (!mounted) return
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, mode === 'preview' ? 1.2 : 2)
      const width = Math.max(1, Math.floor(rect.width * dpr))
      const height = Math.max(1, Math.floor(rect.height * dpr))
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }

      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.fillStyle = '#090909'
      context.fillRect(0, 0, rect.width, rect.height)
      context.fillStyle = 'rgba(238, 240, 255, 0.72)'

      const time = reducedMotion ? 0.8 : frame * 0.012
      const scale = Math.min(rect.width, rect.height) / 400
      const count = mode === 'preview' ? 3000 : 10000

      for (let index = count; index > 0; index -= 1) {
        const y = index / 235
        const k = (5 + Math.sin(y - time) * 2) * Math.cos(index / 40)
        const e = y / 6 - 13
        const distance = Math.hypot(k, e) / 4
        const angle = distance - time / 3
        const x = (99 + k * k) * Math.cos(angle) + 200
        const pointY =
          3 * Math.sin(k * 2) +
          0.2 / (k || 0.0001) +
          (y / 9) * k * (2 + Math.sin(e * 9 - distance * 6 + time)) +
          59 * Math.sin(angle) +
          200 +
          distance ** 3 * Math.cos(time * 3 - distance * distance)

        const alpha = Math.min(0.9, 0.18 + distance * 0.045)
        context.globalAlpha = alpha
        context.fillRect((x - 200) * scale + rect.width / 2, (pointY - 200) * scale + rect.height / 2, mode === 'preview' ? 0.7 : 0.9, mode === 'preview' ? 0.7 : 0.9)
      }

      context.globalAlpha = 1
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
  }, [mode])

  return <canvas ref={canvasRef} className="artwork-canvas" aria-label={experiment.title} />
}
