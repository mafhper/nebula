precision highp float;

varying float vDepthFade;
varying float vTwinkle;

uniform float uIntensity;
uniform vec3 uColor1;
uniform vec3 uColor2;

void main() {
  vec2 uv = gl_PointCoord * 2.0 - 1.0;
  float dist = dot(uv, uv);
  float core = smoothstep(1.0, 0.0, dist);
  float halo = smoothstep(1.0, 0.05, dist) * 0.28;
  float alpha = (core + halo) * vDepthFade * uIntensity;

  if (alpha < 0.01) {
    discard;
  }

  vec3 color = mix(uColor1, uColor2, vTwinkle) * (0.6 + vDepthFade * 0.9);
  gl_FragColor = vec4(color, clamp(alpha, 0.0, 1.0));
}
