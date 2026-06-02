precision highp float;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vViewDir;

uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uIntensity;
uniform float uGlow;
uniform float uTime;

void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(vViewDir);

  float fresnel = 1.0 - max(0.0, dot(normal, viewDir));
  fresnel = pow(fresnel, 3.0);

  float pulse = sin(uTime * 0.8) * 0.5 + 0.5;

  vec3 light = normalize(vec3(1.0, 1.5, 0.5));
  float diff = max(0.0, dot(normal, light));
  float rim = fresnel * uGlow;

  vec3 base = mix(uColor1, uColor2, diff * 0.5 + 0.5);
  base = mix(base, uColor3, rim * 0.6);
  base += uColor3 * fresnel * uGlow * 0.5;

  vec3 highlight = uColor3 * pow(diff, 8.0) * 0.6;
  base += highlight;

  float edgePulse = fresnel * (0.4 + pulse * 0.3) * uGlow;
  base += uColor3 * edgePulse;

  base *= (0.6 + diff * 0.4) * uIntensity;
  base = pow(base, vec3(0.92));

  float alpha = clamp(0.6 + diff * 0.3 + fresnel * 0.3, 0.0, 1.0);

  gl_FragColor = vec4(base, alpha);
}
