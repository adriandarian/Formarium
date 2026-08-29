import { useEffect, useRef } from 'react'
import type { Experiment } from '../../data/library'

interface PrismaticVeilProps {
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

vec3 spectral(float t) {
  return 0.54 + 0.46 * cos(6.28318 * (vec3(0.00, 0.33, 0.67) + t));
}

void main() {
  vec2 uv = vUv * 2.0 - 1.0;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  uv.x *= aspect;

  float t = uTime * 0.55;
  uv.x += uPointer.x * 0.035;
  uv.y -= uPointer.y * 0.018;

  vec3 color = vec3(0.002, 0.002, 0.009);
  float veilEnergy = 0.0;

  for (int i = 0; i < 7; i++) {
    float fi = float(i);
    float offset = (fi - 3.0) * 0.225;
    float curve = offset;
    curve += 0.17 * sin(uv.y * (2.1 + fi * 0.16) + t * (0.55 + fi * 0.035) + fi * 0.91);
    curve += 0.052 * sin(uv.y * (7.2 - fi * 0.18) - t * 0.34 + fi * 1.77);
    curve += 0.018 * sin(uv.y * 17.0 + t * 0.22 + fi * 2.31);

    float dist = abs(uv.x - curve);
    float width = 0.075 + 0.018 * sin(uv.y * 3.4 + t + fi);
    float core = 1.0 - smoothstep(width * 0.18, width, dist);
    float glow = exp(-dist * (10.5 + fi * 0.65));
    float weave = 0.63 + 0.37 * sin(uv.y * 13.0 + uv.x * (4.0 + fi) - t * (0.7 + fi * 0.06) + fi);
    weave = 0.35 + 0.65 * weave * weave;

    vec3 layerColor = spectral(fi * 0.115 + uv.y * 0.055 + t * 0.028);
    color += layerColor * (core * 0.17 + glow * 0.075) * weave;
    veilEnergy += core * 0.15 + glow * 0.05;
  }

  float interference = 0.5 + 0.5 * sin(uv.y * 34.0 + sin(uv.x * 7.0 - t) * 3.2 + t * 1.2);
  interference = pow(interference, 7.0);
  float interferenceMask = smoothstep(0.05, 0.55, veilEnergy);
  color += spectral(uv.y * 0.08 + t * 0.035) * interference * interferenceMask * 0.065;

  vec2 pointer = uPointer;
  pointer.x *= aspect;
  float pointerDistance = length(uv - pointer);
  float refractionHalo = exp(-pointerDistance * 3.4) * (0.5 + 0.5 * sin(pointerDistance * 28.0 - t * 2.1));
  color += spectral(pointerDistance * 0.12 + t * 0.04) * refractionHalo * 0.04;

  float haze = exp(-abs(uv.y) * 1.15) * 0.018;
  color += vec3(0.06, 0.04, 0.12) * haze;
  color = 1.0 - exp(-color * 1.35);

  outColor = vec4(color, 1.0);
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

export function PrismaticVeilWebGL({ experiment, compact = false }: PrismaticVeilProps) {
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
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)

    const positionLocation = gl.getAttribLocation(program, 'aPosition')
    const resolutionLocation = gl.getUniformLocation(program, 'uResolution')
    const timeLocation = gl.getUniformLocation(program, 'uTime')
    const pointerLocation = gl.getUniformLocation(program, 'uPointer')

    gl.useProgram(program)
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    const pointer = { x: 0, y: 0 }
    const targetPointer = { x: 0, y: 0 }
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let animationFrame = 0
    let mounted = true
    const startedAt = performance.now()

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      targetPointer.x = ((event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 2
      targetPointer.y = -((event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * 2
    }

    const onPointerLeave = () => {
      targetPointer.x = 0
      targetPointer.y = 0
    }

    if (!compact) {
      canvas.addEventListener('pointermove', onPointerMove)
      canvas.addEventListener('pointerleave', onPointerLeave)
    }

    const draw = (now: number) => {
      if (!mounted) return

      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, compact ? 1.15 : 1.8)
      const width = Math.max(1, Math.floor(rect.width * dpr))
      const height = Math.max(1, Math.floor(rect.height * dpr))

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }

      pointer.x += (targetPointer.x - pointer.x) * 0.055
      pointer.y += (targetPointer.y - pointer.y) * 0.055

      gl.viewport(0, 0, width, height)
      gl.useProgram(program)
      gl.uniform2f(resolutionLocation, width, height)
      gl.uniform1f(timeLocation, reducedMotion ? 2.2 : (now - startedAt) / 1000)
      gl.uniform2f(pointerLocation, pointer.x, pointer.y)
      gl.drawArrays(gl.TRIANGLES, 0, 3)

      if (!reducedMotion) animationFrame = requestAnimationFrame(draw)
    }

    draw(performance.now())

    return () => {
      mounted = false
      cancelAnimationFrame(animationFrame)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerleave', onPointerLeave)
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
