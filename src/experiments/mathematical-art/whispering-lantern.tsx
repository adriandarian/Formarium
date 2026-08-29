import { useEffect, useRef } from 'react'
import type { ExperimentRendererProps } from '../types'

export default function WhisperingLantern({ experiment, mode = 'stage' }: ExperimentRendererProps) {
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

      const time = reducedMotion ? 0 : frame * 0.012
      const scale = Math.min(rect.width, rect.height) / 400
      const count = mode === 'preview' ? 4500 : 20000
      context.fillStyle = '#f2f0e8'

      for (let i = count; i > 0; i -= 1) {
        const y = i / 99
        const k = (8 + Math.sin(i / 19 + time)) * Math.cos(i / 49)
        const e = y / 8 - 12
        const d = Math.sqrt(k * k + e * e)
        const safeD = d || 0.0001
        const x = 4 * k / safeD - e * Math.sin(k) +
          k / (safeD * safeD) * (12 + safeD * 6 * Math.sin(safeD * safeD - time + Math.cos(time / 3) + 0.3 * Math.sin(e))) + 200
        const pointY = 12 * Math.sin(safeD * 2.6 - time) + safeD * 66 + 40
        const alpha = Math.min(0.92, 0.15 + safeD * 0.035)
        context.globalAlpha = alpha
        const size = mode === 'preview' ? 0.65 : 0.85
        context.fillRect((x - 200) * scale + rect.width / 2, (pointY - 200) * scale + rect.height / 2, size, size)
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
