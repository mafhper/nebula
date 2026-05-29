varying vec2 vUv;
varying float vWave;

uniform float uTime;
uniform float uIntensity;
uniform float uDistortion;

void main() {
  vUv = uv;

  vec3 transformed = position;
  float ribbon = sin((position.x * 1.7) + (uTime * 1.4));
  float secondary = sin((position.x * 3.8) - (uTime * 0.8)) * 0.35;
  vWave = (ribbon + secondary) * 0.5 + 0.5;

  transformed.z += (ribbon + secondary) * 0.22 * uIntensity * uDistortion;
  transformed.y += sin((position.x * 1.1) + uTime) * 0.18 * uIntensity * uDistortion;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}
