precision highp float;

varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform float uIntensity;
uniform float uArms;
uniform float uTwist;
uniform float uZoom;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(73.1, 311.7))) * 43758.545);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = mat2(1.6, 1.2, -1.2, 1.6) * p;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = (vUv * 2.0 - 1.0) * uZoom;
  float r = length(uv);
  float a = atan(uv.y, uv.x);

  float spiral = a + r * uTwist * 3.1416 * 2.0 + uTime * 0.5;
  float arm = sin(spiral * uArms) * 0.5 + 0.5;

  float tunnel = 1.0 / (r + 0.15);
  float n = fbm(vec2(r * 2.0 + a * 0.5, uTime * 0.08));
  float pattern = arm * tunnel * (0.7 + n * 0.3);

  float pulse = sin(r * 8.0 - uTime * 1.2) * 0.5 + 0.5;
  float glow = 1.0 - smoothstep(0.0, 1.2, r);

  vec3 color = mix(uColor1, uColor2, smoothstep(0.0, 1.0, pattern * 0.5 + 0.5));
  color = mix(color, uColor3, smoothstep(0.3, 0.9, pattern));
  color += uColor3 * pow(glow, 2.0) * 0.5;
  color *= (0.6 + pattern * 0.6 + pulse * 0.15) * uIntensity;
  color *= 1.0 + pow(glow, 3.0) * 0.4;
  color = pow(color, vec3(0.92));

  float alpha = clamp(0.4 + pattern * 0.4 + glow * 0.3, 0.0, 1.0);

  gl_FragColor = vec4(color, alpha);
}
