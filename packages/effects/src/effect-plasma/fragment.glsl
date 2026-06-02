precision highp float;

varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform float uIntensity;
uniform float uScale;
uniform float uComplexity;
uniform float uSaturation;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(57.3, 211.7))) * 37191.7);
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
  for (int i = 0; i < 6; i++) {
    if (float(i) >= uComplexity) break;
    v += a * noise(p);
    p = mat2(1.6, 1.2, -1.2, 1.6) * p;
    a *= 0.5;
  }
  return v;
}

vec3 hsv2rgb(vec3 c) {
  vec4 k = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + k.xyz) * 6.0 - k.www);
  return c.z * mix(k.xxx, clamp(p - k.xxx, 0.0, 1.0), c.y);
}

void main() {
  vec2 uv = (vUv * 2.0 - 1.0) * uScale;
  float t = uTime * 1.2;

  float pl = sin(uv.x * 4.0 + t) + cos(uv.y * 4.0 + t * 1.3);
  pl += sin((uv.x * 2.0 + uv.y * 3.0) * 2.0 + t * 0.7);
  pl += cos((uv.x * 3.0 - uv.y * 2.0) * 2.0 + t * 1.1);

  float n = fbm(uv * 0.8 + t * 0.06);
  pl = pl * 0.4 + n * 0.6;

  float p = pl * 0.5 + 0.5;
  float hue = p * 0.7 + t * 0.02 + n * 0.15;
  float sat = 0.5 + p * 0.5 * uSaturation;
  float val = 0.4 + p * 0.6 * uIntensity;

  vec3 plasmaColor = hsv2rgb(vec3(hue, min(sat, 1.0), min(val, 1.0)));

  vec3 color = mix(uColor1, uColor2, smoothstep(0.0, 1.0, p));
  color = mix(color, uColor3, smoothstep(0.5, 1.0, p));
  color = mix(color, plasmaColor, 0.3);

  float glow = 1.0 - length(uv) * 0.4;
  color += uColor3 * max(0.0, glow) * 0.2;
  color = pow(color, vec3(0.88));

  float alpha = clamp(0.5 + p * 0.4 + glow * 0.15, 0.0, 1.0);

  gl_FragColor = vec4(color, alpha);
}
