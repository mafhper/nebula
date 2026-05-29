precision highp float;

varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform float uIntensity;
uniform float uScale;
uniform float uDistortion;
uniform float uContrast;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(41.7, 289.3))) * 45621.977);
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
  float value = 0.0;
  float amplitude = 0.52;

  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p = mat2(1.61, 1.18, -1.18, 1.61) * p;
    amplitude *= 0.52;
  }

  return value;
}

void main() {
  vec2 uv = vUv * 2.0 - 1.0;
  vec2 flow = uv * (1.15 + uScale);
  float time = uTime * 0.62;

  float radial = length(uv);
  float angle = atan(uv.y, uv.x);
  flow += vec2(cos(angle + time), sin(angle - time)) * 0.24 * uDistortion;
  flow.x += sin((uv.y * 3.2) + time * 1.8) * 0.2 * uDistortion;
  flow.y += cos((uv.x * 2.8) - time * 1.4) * 0.18 * uDistortion;

  float field = fbm(flow + vec2(time * 0.24, -time * 0.16));
  float bloom = smoothstep(0.12, 0.98, 1.0 - radial);
  float liquid = smoothstep(0.14, 0.92, field + bloom * 0.42);

  vec3 base = mix(uColor1, uColor2, smoothstep(-0.72, 0.82, uv.x + field * 0.48));
  base = mix(base, uColor3, smoothstep(0.24, 0.92, liquid + sin(angle * 2.0 + time) * 0.18));

  float glow = (0.26 + liquid * 0.88 + bloom * 0.3) * uIntensity;
  vec3 color = base * glow * (1.08 + uContrast * 0.38);
  color += uColor3 * pow(max(0.0, 1.0 - radial), 2.4) * 0.34 * uIntensity;
  color = pow(color, vec3(max(0.68, 1.28 - uContrast * 0.18)));

  gl_FragColor = vec4(color, clamp(glow, 0.05, 1.0));
}
