import { useEffect, useRef } from 'react'
import type { ExperimentRendererProps } from '../types'

export default function HenonDrift({ mode = 'stage' }: ExperimentRendererProps) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const compact = mode === 'preview'
    let frame = 0, raf = 0
    const draw = () => {
      const b = canvas.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, compact ? 1.1 : 1.7)
      canvas.width = Math.max(1, b.width * dpr); canvas.height = Math.max(1, b.height * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const w = b.width, h = b.height, s = Math.min(w, h) * .28
      ctx.fillStyle = '#030303'; ctx.fillRect(0, 0, w, h); ctx.globalCompositeOperation = 'lighter'
      const clouds = compact ? 16 : 34
      for (let cloud = 0; cloud < clouds; cloud += 1) {
        let x = .01 + cloud * .0007, y = .01, a = 1.4 + .012 * Math.sin(frame * .005 + cloud), bb = .3
        ctx.fillStyle = `hsla(${185 + cloud * 2},75%,75%,${.025 + cloud / clouds * .04})`
        for (let i = 0; i < (compact ? 1300 : 2600); i += 1) {
          const nx = 1 - a * x * x + y, ny = bb * x; x = nx; y = ny
          if (i < 40) continue
          const drift = Math.sin(frame * .003 + cloud) * .06
          ctx.fillRect(w / 2 + (x + drift) * s, h / 2 + y * s * 1.45, compact ? .65 : .85, compact ? .65 : .85)
        }
      }
      ctx.globalCompositeOperation = 'source-over'; frame += 1; raf = requestAnimationFrame(draw)
    }
    draw(); return () => cancelAnimationFrame(raf)
  }, [mode])
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} aria-label="Hénon Drift generative artwork" />
}
