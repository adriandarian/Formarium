#version 300 es
precision highp float;

uniform vec2 resolution;
uniform float time;
out vec4 color;

void main() {
  vec2 screen = (gl_FragCoord.xy - 0.5 * resolution) / resolution.y;
  vec2 origin = screen * 1.3 + vec2(2.8, -0.4);
  vec3 axis = normalize(vec3(2, 40, -7));
  float angle = sin(time * 0.5) * 0.1 - 3.0;
  float c = cos(angle), s = sin(angle);
  float weight = 0.55 + cos(time) * 0.005;
  float depth = 0.0;
  float light = 0.0;

  for (int step = 1; step < 99; ++step) {
    vec3 ray = vec3(origin, depth - 6.0);
    // Right multiplication by the axis-angle matrix in the original shader.
    vec3 p = c * ray + s * cross(ray, axis) + (1.0 - c) * dot(axis, ray) * axis;
    float scale = 3.0;
    for (int fold = 0; fold < 16; ++fold) {
      float inversion = 7.5 / max(abs(dot(p, p * weight + 0.3)), 1e-12);
      scale *= inversion;
      p = vec3(0, 4, -1) - abs(abs(p) * inversion - vec3(3, 4, 3));
    }
    depth += p.y / scale - 0.0015;
    light += (log2(scale) - depth * 0.5) / 800.0;
  }
  color = vec4(vec3(light), 1.0);
}
