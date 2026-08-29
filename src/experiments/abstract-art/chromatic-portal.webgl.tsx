import { useEffect, useRef } from 'react'
import type { Experiment } from '../../data/library'

interface ChromaticPortalProps {
  experiment: Experiment
  compact?: boolean
}

const vertexSource = `#version 300 es
in vec2 aPosition;
out vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`

const fragmentSource = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uPointer;

vec3 palette(float t) {
  vec3 a = vec3(0.52, 0.45, 0.58);
  vec3 b = vec3(0.48, 0.42, 0.40);
  vec3 c = vec3(1.0, 1.0, 1.0);
  vec3 d = vec3(0.02, 0.19, 0.48);
  return a + b * cos(6.28318 * (c * t + d));
}

void main() {
  vec2 uv = vUv * 2.0 - 1.0;
  uv.x *= uResolution.x / max(uResolution.y, 1.0);
  uv -= uPointer * 0.08;

  float t = uTime * 0.55;
  float a = atan(uv.y, uv.x);
  float r = length(uv);
  float wobble = sin(a * 3.0 + t * 1.4) * 0.055;
  wobble += sin(a * 5.0 - t * 0.95) * 0.032;
  wobble += sin(a * 8.0 + t * 0.52) * 0.014;
  float breathing = sin(t * 1.8) * 0.025;
  float ring = r - (0.48 + wobble + breathing);

  float glow = 0.010 / max(abs(ring), 0.0025);
  float innerGlow = 0.004 / max(abs(ring + 0.035), 0.003);
  float outerGlow = 0.003 / max(abs(ring - 0.055), 0.003);
  float sparkle = pow(max(0.0, sin(a * 17.0 - t * 3.0) * 0.5 + 0.5), 18.0);
  sparkle *= smoothstep(0.09, 0.0, abs(ring));

  vec3 color = palette(a / 6.28318 + t * 0.08 + r * 0.18);
  vec3 cyan = vec3(0.12, 0.82, 1.0);
  vec3 magenta = vec3(1.0, 0.18, 0.78);
  vec3 finalColor = color * glow * 0.75;
  finalColor += cyan * innerGlow * 0.55;
  finalColor += magenta * outerGlow * 0.45;
  finalColor += vec3(1.0) * sparkle * 0.8;

  float voidShade = smoothstep(0.48, 0.12, r) * 0.012;
  finalColor += vec3(0.12, 0.03, 0.18) * voidShade;
  finalColor = 1.0 - exp(-finalColor * 1.45);

  outColor = vec4(finalColor, 1.0);
}`

function compileShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) throw new Error('Unable to create WebGL shader')
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) || 'Shader compilation failed'
    gl.deleteShader(shader)
    throw new Error(message)
  }
  return shader
}

function createProgram(gl: WebGL2RenderingContext) {
  const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexSource)
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource)
  const program = gl.createProgram()
  if (!program) throw new Error('Unable to create WebGL program')

  gl.attachShader(program, vertex)
  gl.attachShader(program, fragment)
  gl.linkProgram(program)
  gl.deleteShader(vertex)
  gl.deleteShader(fragment)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program) || 'Program link failed'
    gl.deleteProgram(program)
    throw new Error(message)
  }

  return program
}

export function ChromaticPortalWebGL({ experiment, compact = false }: ChromaticPortalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl2', { antialias: false, alpha: false })
    if (!gl) return

    const program = createProgram(gl)
    const buffer = gl.createBuffer()
    if (!buffer) throw new Error('Unable to create WebGL buffer')

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    )

    const positionLocation = gl.getAttribLocation(program, 'aPosition')
    const resolutionLocation = gl.getUniformLocation(program, 'uResolution')
    const timeLocation = gl.getUniformLocation(program, 'uTime')
    const pointerLocation = gl.getUniformLocation(program, 'uPointer')

    gl.useProgram(program)
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    const pointer = { x: 0, y: 0 }
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let animationFrame = 0
    let mounted = true
    const startedAt = performance.now()

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = ((event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 2
      pointer.y = -((event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * 2
    }

    if (!compact) canvas.addEventListener('pointermove', onPointerMove)

    const draw = (now: number) => {
      if (!mounted) return

      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, compact ? 1.25 : 2)
      const width = Math.max(1, Math.floor(rect.width * dpr))
      const height = Math.max(1, Math.floor(rect.height * dpr))

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }

      gl.viewport(0, 0, width, height)
      gl.useProgram(program)
      gl.uniform2f(resolutionLocation, width, height)
      gl.uniform1f(timeLocation, (now - startedAt) / 1000)
      gl.uniform2f(pointerLocation, pointer.x, pointer.y)
      gl.drawArrays(gl.TRIANGLES, 0, 3)

      if (!reducedMotion) animationFrame = requestAnimationFrame(draw)
    }

    draw(performance.now())

    return () => {
      mounted = false
      cancelAnimationFrame(animationFrame)
      canvas.removeEventListener('pointermove', onPointerMove)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
    }
  }, [compact])

  return (
    <div className="artwork-canvas-wrap" aria-label={experiment.title}>
      <canvas ref={canvasRef} className="artwork-canvas" />
    </div>
  )
}
