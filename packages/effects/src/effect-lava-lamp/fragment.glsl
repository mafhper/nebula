precision highp float;

varying vec2 vUv;

uniform float uTime;
uniform float uIntensity;
uniform float uBlobCount;
uniform float uScale;
uniform float uGlow;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec2 uResolution;

float blob(vec2 p, vec2 center, float radius) {
  return radius / length(p - center);
}

vec3 hsv2rgb(vec3 c) {
  vec4 k = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + k.xyz) * 6.0 - k.www);
  return c.z * mix(k.xxx, clamp(p - k.xxx, 0.0, 1.0), c.y);
}

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / uResolution.y;
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0) * uScale;

  float t = uTime;
  int count = int(uBlobCount);

  float sum = 0.0;
  vec2 blobPositions[8];

  blobPositions[0] = vec2(sin(t * 0.7) * 0.35, cos(t * 0.5) * 0.35 + 0.08);
  blobPositions[1] = vec2(cos(t * 0.6 + 2.1) * 0.38, sin(t * 0.45 + 1.3) * 0.3 - 0.05);
  blobPositions[2] = vec2(sin(t * 0.55 + 4.2) * 0.32, cos(t * 0.65 + 3.7) * 0.28);
  blobPositions[3] = vec2(cos(t * 0.48 + 1.0) * 0.36, sin(t * 0.72 + 5.1) * 0.32);
  blobPositions[4] = vec2(sin(t * 0.62 + 3.5) * 0.3, cos(t * 0.58 + 2.4) * 0.34 - 0.06);
  blobPositions[5] = vec2(cos(t * 0.52 + 5.8) * 0.34, sin(t * 0.68 + 0.9) * 0.26);
  blobPositions[6] = vec2(sin(t * 0.75 + 1.7) * 0.28, cos(t * 0.42 + 4.5) * 0.3 + 0.04);
  blobPositions[7] = vec2(cos(t * 0.58 + 6.3) * 0.33, sin(t * 0.55 + 3.2) * 0.29 - 0.03);

  float blobRadii[8];

  blobRadii[0] = 0.18;
  blobRadii[1] = 0.14;
  blobRadii[2] = 0.16;
  blobRadii[3] = 0.12;
  blobRadii[4] = 0.15;
  blobRadii[5] = 0.13;
  blobRadii[6] = 0.11;
  blobRadii[7] = 0.14;

  for (int i = 0; i < 8; i++) {
    if (i >= count) break;
    float wobble = 0.08 + 0.04 * sin(t * 0.9 + float(i) * 1.7);
    sum += blob(p, blobPositions[i], blobRadii[i] + wobble);
  }

  float threshold = 2.8;

  float field = smoothstep(threshold * 0.6, threshold, sum);

  float innerBright = smoothstep(threshold * 1.4, threshold * 2.2, sum);

  float edgeDist = smoothstep(threshold * 0.9, threshold, sum);

  vec3 outerColor = mix(uColor1, uColor2, 0.5);
  vec3 coreColor = uColor3;
  vec3 color = mix(outerColor, coreColor, innerBright * uIntensity);

  color += uColor3 * (innerBright * 0.4 + edgeDist * uGlow * 0.2);

  float edgeGlow = smoothstep(threshold * 0.5, threshold * 0.85, sum) * (1.0 - smoothstep(threshold, threshold * 1.15, sum));
  color += mix(uColor1, uColor2, 0.6) * edgeGlow * uGlow * 0.5;

  float backgroundNoise = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
  vec3 bgColor = vec3(0.016, 0.024, 0.052) + backgroundNoise * 0.008;

  color = mix(bgColor, color, field);

  color = pow(color, vec3(0.92));

  float alpha = smoothstep(threshold * 0.4, threshold, sum) * uIntensity;
  alpha = clamp(alpha, 0.0, 1.0);

  float bgAlpha = 0.15 + backgroundNoise * 0.02;

  gl_FragColor = vec4(color, max(alpha, bgAlpha));
}