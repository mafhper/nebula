precision highp float;

varying vec2 vUv;
varying vec3 vNormal;
varying float vHeight;

uniform float uTime;
uniform float uAmplitude;
uniform float uFrequency;
uniform float uComplexity;

float wave(vec2 p, float t) {
  float h = 0.0;
  for (int i = 0; i < 6; i++) {
    float fi = float(i);
    if (fi >= uComplexity) break;
    float f = uFrequency * (1.0 + fi * 0.7);
    float a = uAmplitude / (1.0 + fi * 0.5);
    float phase = t * (0.8 + fi * 0.3);
    h += a * sin(p.x * f + p.y * f * 0.6 + phase);
    h += a * 0.6 * cos(p.y * f * 0.8 - p.x * f * 0.4 + phase * 1.3);
  }
  return h;
}

void main() {
  vUv = uv;
  float t = uTime * 0.5;
  vec2 p = position.xy * 1.5;

  float h = wave(p, t);

  float eps = 0.01;
  float hx = wave(p + vec2(eps, 0.0), t);
  float hy = wave(p + vec2(0.0, eps), t);

  vec3 dx = vec3(eps, hx - h, 0.0);
  vec3 dy = vec3(0.0, hy - h, eps);
  vec3 n = normalize(cross(dx, dy));

  vHeight = h;
  vNormal = n;

  vec3 newPos = position + vec3(0.0, 0.0, h);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
}
