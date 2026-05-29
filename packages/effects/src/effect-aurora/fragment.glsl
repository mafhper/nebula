precision highp float;

varying vec2 vUv;
varying float vWave;

uniform float uTime;
uniform float uIntensity;
uniform float uBandScale;
uniform float uDistortion;
uniform float uContrast;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;

  for (int i = 0; i < 4; i++) {
    value += amplitude * noise(p);
    p *= 2.03;
    amplitude *= 0.5;
  }

  return value;
}

void main() {
  vec2 uv = vUv;
  vec2 warpedUv = uv;
  warpedUv.x += sin((uv.y * 7.0 * uBandScale) + uTime) * 0.08 * uDistortion;
  warpedUv.y += sin((uv.x * 4.0) - (uTime * 0.7)) * 0.04 * uDistortion;

  float verticalFade = smoothstep(0.0, 0.18, uv.y) * (1.0 - smoothstep(0.88, 1.0, uv.y));
  float bands = fbm(vec2((warpedUv.x * 2.2 * uBandScale) + (uTime * 0.35), warpedUv.y * 6.8));
  float strand = sin((warpedUv.x * 18.0 * uBandScale) + (uTime * 1.8)) * 0.5 + 0.5;
  float curtain = smoothstep(0.18, 0.78, bands + (vWave * 0.44) + (strand * 0.12));
  float glow = (0.2 + pow(verticalFade * curtain, 1.08)) * uIntensity;

  vec3 base = mix(uColor1, uColor2, smoothstep(0.08, 0.94, uv.y + vWave * 0.18));
  base = mix(base, uColor3, pow(strand * verticalFade, 2.4) * 0.32);

  vec3 highlight = uColor3 * pow(glow, 1.85) * 1.05;
  vec3 color = (base * glow * (1.45 + uContrast * 0.42)) + highlight;
  color = pow(color, vec3(max(0.72, 1.35 - (uContrast * 0.22))));
  color = color / (1.0 + color);

  gl_FragColor = vec4(color, max(glow, 0.02));
}
