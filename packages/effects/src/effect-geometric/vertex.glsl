precision highp float;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vViewDir;

uniform float uTime;

void main() {
  vec3 pos = position;
  float pulse = sin(pos.x * 2.0 + pos.y * 1.5 + pos.z * 2.5 + uTime * 1.2) * 0.04;
  pos *= 1.0 + pulse;

  vec3 newNormal = normal;
  vNormal = normalize(normalMatrix * newNormal);
  vec4 worldPos = modelMatrix * vec4(pos, 1.0);
  vPosition = worldPos.xyz;
  vViewDir = normalize(cameraPosition - worldPos.xyz);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
