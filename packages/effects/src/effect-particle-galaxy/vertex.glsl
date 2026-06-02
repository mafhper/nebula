attribute float aSeed;
attribute float aAngle;
attribute float aRadius;

varying float vAlpha;

uniform float uTime;
uniform float uSpeed;
uniform float uArms;
uniform float uSpread;

void main() {
  float armIndex = floor(aSeed * uArms);
  float armAngle = aAngle + armIndex * (6.2832 / uArms) + uTime * uSpeed * (0.5 + aSeed * 0.5);
  float armOffset = sin(aRadius * 8.0 + uTime * uSpeed * 2.0) * 0.12;
  float spreadFactor = uSpread * (0.3 + aRadius * 0.7);

  float x = cos(armAngle) * aRadius * spreadFactor + cos(armAngle + 1.57) * armOffset;
  float y = sin(armAngle) * aRadius * spreadFactor + sin(armAngle + 1.57) * armOffset;
  float z = (aSeed - 0.5) * 0.5 * (1.0 - aRadius * 0.6);

  vec3 transformed = vec3(x, y, z);
  vAlpha = 1.0 - aRadius * 0.6;

  vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = (1.5 + aRadius * 3.0) / max(0.3, -mvPosition.z * 0.12);
}
