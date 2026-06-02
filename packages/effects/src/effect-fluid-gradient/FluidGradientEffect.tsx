import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { AdditiveBlending, Color, DoubleSide, ShaderMaterial } from 'three';

import fragmentShader from './fragment.glsl';
import type { FluidGradientEffectProps, FluidGradientUniforms } from './types';
import vertexShader from './vertex.glsl';

export function FluidGradientEffect({
  color1 = '#22d3ee',
  color2 = '#8b5cf6',
  color3 = '#f0abfc',
  speed = 0.24,
  intensity = 1.08,
  scale = 1.12,
  distortion = 0.58,
  contrast = 1.1,
}: FluidGradientEffectProps) {
  const materialRef = useRef<ShaderMaterial>(null);
  const uniforms = useMemo<FluidGradientUniforms>(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new Color(color1) },
      uColor2: { value: new Color(color2) },
      uColor3: { value: new Color(color3) },
      uSpeed: { value: speed },
      uIntensity: { value: intensity },
      uScale: { value: scale },
      uDistortion: { value: distortion },
      uContrast: { value: contrast },
    }),
    [color1, color2, color3, contrast, distortion, intensity, scale, speed],
  );

  useFrame((_state, delta) => {
    const material = materialRef.current;

    if (!material) {
      return;
    }

    const currentUniforms = material.uniforms as FluidGradientUniforms;
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
