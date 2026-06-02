import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { Color, DoubleSide, ShaderMaterial } from 'three';

import fragmentShader from './fragment.glsl';
import type { WavePlaneEffectProps, WavePlaneUniforms } from './types';
import vertexShader from './vertex.glsl';

export function WavePlaneEffect({
  color1 = '#0c4a6e',
  color2 = '#38bdf8',
  color3 = '#e0f2fe',
  speed = 0.34,
  amplitude = 0.28,
  frequency = 1.2,
  complexity = 3,
  intensity = 1,
}: WavePlaneEffectProps) {
  const materialRef = useRef<ShaderMaterial>(null);
  const uniforms = useMemo<WavePlaneUniforms>(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new Color(color1) },
      uColor2: { value: new Color(color2) },
      uColor3: { value: new Color(color3) },
      uSpeed: { value: speed },
      uAmplitude: { value: amplitude },
      uFrequency: { value: frequency },
      uComplexity: { value: complexity },
      uIntensity: { value: intensity },
    }),
    [amplitude, color1, color2, color3, complexity, frequency, intensity, speed],
  );

  useFrame((_state, delta) => {
    const material = materialRef.current;
    if (!material) return;

    const currentUniforms = material.uniforms as WavePlaneUniforms;
    currentUniforms.uTime.value += delta * currentUniforms.uSpeed.value;
  });

  return (
    <mesh rotation={[-0.15, 0, 0]} scale={[1.6, 1.6, 1]}>
      <planeGeometry args={[6, 6, 96, 96]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={DoubleSide}
      />
    </mesh>
  );
}
