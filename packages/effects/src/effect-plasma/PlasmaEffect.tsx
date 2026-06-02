import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { AdditiveBlending, Color, DoubleSide, ShaderMaterial } from 'three';

import fragmentShader from './fragment.glsl';
import type { PlasmaEffectProps, PlasmaUniforms } from './types';
import vertexShader from './vertex.glsl';

export function PlasmaEffect({
  color1 = '#7c3aed',
  color2 = '#0ea5e9',
  color3 = '#f0abfc',
  speed = 0.22,
  intensity = 1.08,
  scale = 1,
  complexity = 4,
  saturation = 1.2,
}: PlasmaEffectProps) {
  const materialRef = useRef<ShaderMaterial>(null);
  const uniforms = useMemo<PlasmaUniforms>(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new Color(color1) },
      uColor2: { value: new Color(color2) },
      uColor3: { value: new Color(color3) },
      uSpeed: { value: speed },
      uIntensity: { value: intensity },
      uScale: { value: scale },
      uComplexity: { value: complexity },
      uSaturation: { value: saturation },
    }),
    [color1, color2, color3, complexity, intensity, saturation, scale, speed],
  );

  useFrame((_state, delta) => {
    const material = materialRef.current;
    if (!material) return;

    const currentUniforms = material.uniforms as PlasmaUniforms;
    currentUniforms.uTime.value += delta * currentUniforms.uSpeed.value;
  });

  return (
    <mesh scale={[1.8, 1.25, 1]}>
      <planeGeometry args={[10.8, 7.2, 2, 2]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={DoubleSide}
        depthWrite={false}
        transparent
        blending={AdditiveBlending}
      />
    </mesh>
  );
}
