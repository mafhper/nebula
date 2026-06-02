precision highp float;

varying vec2 vUv;
varying vec3 vNormal;
varying float vHeight;

uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uIntensity;

void main() {
  float t = smoothstep(-1.0, 1.0, vHeight);
  vec3 color = mix(uColor1, uColor2, t);
  color = mix(color, uColor3, pow(t, 3.0) * 0.5);

  vec3 light = normalize(vec3(0.5, 1.0, 0.3));
  float diff = max(0.0, dot(vNormal, light));
  color *= 0.5 + diff * 0.5;

  float rim = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
  color += uColor3 * pow(rim, 3.0) * 0.2;

  color *= uIntensity;

  gl_FragColor = vec4(color, 1.0);
}
