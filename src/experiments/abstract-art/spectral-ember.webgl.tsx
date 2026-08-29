import { useEffect, useRef } from 'react'
import type { Experiment } from '../../data/library'

interface SpectralEmberProps {
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

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 345.45));
  p += dot(p, p + 34.345);
  return fract(p.x * p.y);
}

vec3 spectral(float t) {
  vec3 a = vec3(0.48, 0.46, 0.55);
  vec3 b = vec3(0.52, 0.44, 0.45);
  vec3 c = vec3(1.0);
  vec3 d = vec3(0.00, 0.18, 0.42);
  return a + b * cos(6.28318 * (c * t + d));
}

void main() {
  vec2 uv = vUv * 2.0 - 1.0;
  uv.x *= uResolution.x / max(uResolution.y, 1.0);
  uv -= uPointer * vec2(0.055, 0.035);

  float t = uTime * 0.7;
  float h = clamp((uv.y + 0.72) / 1.42, 0.0, 1.0);
  float sway = sin(uv.y * 4.4 - t * 1.5) * 0.055 * h;
  sway += sin(uv.y * 9.0 + t * 0.8) * 0.018;
  float x = uv.x - sway;

  float width = mix(0.46, 0.035, pow(h, 0.92));
  width *= 0.92 + sin(h * 13.0 - t * 1.1) * 0.07;
  width += (1.0 - h) * sin(t * 1.8) * 0.018;

  float side = abs(x) - width;
  float capBottom = -uv.y - 0.70;
  float capTop = uv.y - 0.71;
  float flame = max(side, max(capBottom, capTop));

  float edge = abs(flame);
  float glow = 0.012 / max(edge, 0.0028);
  float glow2 = 0.004 / max(abs(flame - 0.055), 0.0035);
  float innerBand = 0.004 / max(abs(flame + 0.05), 0.0035);

  float coreShape = exp(-abs(x) * 9.5) * exp(-pow((uv.y + 0.16) * 1.8, 2.0));
  coreShape *= smoothstep(0.72, -0.56, uv.y);
  float pulse = 0.82 + sin(t * 2.4) * 0.14 + sin(t * 4.8 + uv.y * 4.0) * 0.04;

  vec3 edgeColor = spectral(h * 0.7 + t * 0.055);
  vec3 cyan = vec3(0.10, 0.86, 1.0);
  vec3 pink = vec3(1.0, 0.18, 0.65);
  vec3 amber = vec3(1.0, 0.58, 0.22);

  vec3 color = edgeColor * glow * 0.68;
  color += cyan * innerBand * 0.45;
  color += pink * glow2 * 0.42;
  color += amber * coreShape * 0.62 * pulse;
  color += vec3(1.0, 0.96, 1.0) * pow(coreShape, 2.3) * 1.15;

  vec2 sparkGrid = floor((uv + vec2(t * 0.025, -t * 0.08)) * 42.0);
  float sparkSeed = hash21(sparkGrid);
  vec2 sparkUv = fract((uv + vec2(t * 0.025, -t * 0.08)) * 42.0) - 0.5;
  float spark = smoothstep(0.08, 0.0, length(sparkUv));
  spark *= step(0.965, sparkSeed);
  spark *= smoothstep(1.0, 0.1, length(uv * vec2(0.8, 1.0)));
  color += spectral(sparkSeed + t * 0.04) * spark * 1.4;

  float halo = exp(-length(uv * vec2(0.9, 1.15)) * 4.5) * 0.055;
  color += vec3(0.34, 0.05, 0.42) * halo;
  color = 1.0 - exp(-color * 1.5);

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

export function SpectralEmberWebGL({ experiment, compact = false }: SpectralEmberProps) {
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
