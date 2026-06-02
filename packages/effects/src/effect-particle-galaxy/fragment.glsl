precision highp float;

varying float vAlpha;

uniform float uIntensity;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uSize;

void main() {
  vec2 uv = gl_PointCoord * 2.0 - 1.0;
  float dist = dot(uv, uv);
  float core = smoothstep(1.0, 0.0, dist);
  float glow = exp(-dist * 3.0) * 0.5;
  float alpha = (core + glow) * vAlpha * uIntensity;

  if (alpha < 0.01) {
    discard;
  }

  vec3 color = mix(uColor1, uColor2, vAlpha * 0.5 + 0.5);
  gl_FragColor = vec4(color * (0.8 + vAlpha * 0.6), clamp(alpha, 0.0, 1.0));
}
