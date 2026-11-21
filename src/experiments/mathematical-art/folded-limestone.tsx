import { useEffect, useRef } from 'react'
import type { ExperimentRendererProps } from '../types'
import fragmentSource from './folded-limestone.frag?raw'
import poster from './folded-limestone.png'

const vertexSource = `#version 300 es
void main() {
  vec2 corner = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  gl_Position = vec4(corner * 2.0 - 1.0, 0, 1);
}`

export default function FoldedLimestone({ experiment, mode }: ExperimentRendererProps) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    const gl = canvas?.getContext('webgl2', { antialias: false, alpha: false })
    if (!canvas || !gl) return
    const program = gl.createProgram()
    if (!program) return
    for (const [type, source] of [[gl.VERTEX_SHADER, vertexSource], [gl.FRAGMENT_SHADER, fragmentSource]] as const) {
      const shader = gl.createShader(type)
      if (!shader) continue
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      gl.attachShader(program, shader)
      gl.deleteShader(shader)
    }
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program)
      return
    }
    gl.useProgram(program)
    const resolution = gl.getUniformLocation(program, 'resolution')
    const time = gl.getUniformLocation(program, 'time')
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const start = performance.now()
    let frame = 0
    const draw = (now: number) => {
      gl.uniform1f(time, motion.matches ? 0 : (now - start) / 1000)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      canvas.style.visibility = 'visible'
      if (!motion.matches) frame = requestAnimationFrame(draw)
    }
    const resize = () => {
      cancelAnimationFrame(frame)
      const { width, height } = canvas.getBoundingClientRect()
      const ratio = Math.min(1, Math.sqrt(240000 / Math.max(1, width * height)))
      canvas.width = Math.max(1, Math.round(width * ratio))
      canvas.height = Math.max(1, Math.round(height * ratio))
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(resolution, canvas.width, canvas.height)
      draw(performance.now())
    }
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    motion.addEventListener('change', resize)
    return () => {
      observer.disconnect()
      motion.removeEventListener('change', resize)
      cancelAnimationFrame(frame)
      gl.deleteProgram(program)
    }
  }, [mode])

  return (
    <div role="img" aria-label={experiment.title} className="artwork-canvas-wrap"
      style={{ backgroundImage: `url(${poster})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {mode !== 'preview' && <canvas ref={ref} className="artwork-canvas" style={{ visibility: 'hidden' }} />}
    </div>
  )
}
