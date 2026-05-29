attribute float aSeed;

varying float vDepthFade;
varying float vTwinkle;

uniform float uTime;
uniform float uDepth;
uniform float uSpread;
uniform float uPointSize;

void main() {
  vec3 transformed = position;
  float travel = mod(transformed.z + uTime * uDepth * 0.34 + aSeed * uDepth, uDepth);
  transformed.z = -travel;

  float perspective = 1.0 - (travel / uDepth);
  transformed.xy *= uSpread * (0.36 + perspective * 0.64);

  vDepthFade = smoothstep(0.0, 1.0, perspective);
  vTwinkle = sin((aSeed * 37.0) + (uTime * 4.0)) * 0.5 + 0.5;

  vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = uPointSize * (0.12 + perspective * 0.68) / max(0.45, -mvPosition.z * 0.16);
}
