import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { AdditiveBlending, Color, DoubleSide, ShaderMaterial } from 'three';

import fragmentShader from './fragment.glsl';
import type { AuroraEffectProps, AuroraUniforms } from './types';
import vertexShader from './vertex.glsl';

export function AuroraEffect({
  color1 = '#14b8a6',
  color2 = '#7c3aed',
  color3 = '#d1fae5',
  speed = 0.32,
  intensity = 1.08,
  bandScale = 1.15,
  distortion = 0.72,
  contrast = 1.12,
}: AuroraEffectProps) {
  const materialRef = useRef<ShaderMaterial>(null);
  const uniforms = useMemo<AuroraUniforms>(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new Color(color1) },
      uColor2: { value: new Color(color2) },
      uColor3: { value: new Color(color3) },
      uSpeed: { value: speed },
      uIntensity: { value: intensity },
      uBandScale: { value: bandScale },
      uDistortion: { value: distortion },
      uContrast: { value: contrast },
    }),
    [bandScale, color1, color2, color3, contrast, distortion, intensity, speed],
  );

  useFrame((_state, delta) => {
    const material = materialRef.current;

    if (!material) {
      return;
    }

    const currentUniforms = material.uniforms as AuroraUniforms;
    currentUniforms.uTime.value += delta * currentUniforms.uSpeed.value;
  });

  return (
    <mesh scale={[1.7, 1.18, 1]}>
      <planeGeometry args={[10.5, 7, 128, 80]} />
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
