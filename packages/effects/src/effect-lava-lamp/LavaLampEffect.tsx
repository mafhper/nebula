import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { AdditiveBlending, Color, DoubleSide, ShaderMaterial } from 'three';

import fragmentShader from './fragment.glsl';
import type { LavaLampEffectProps, LavaLampUniforms } from './types';
import vertexShader from './vertex.glsl';

export function LavaLampEffect({
  color1 = '#ef4444',
  color2 = '#f97316',
  color3 = '#fde68a',
  speed = 0.18,
  intensity = 1.1,
  blobCount = 5,
  scale = 1.0,
  glow = 0.6,
}: LavaLampEffectProps) {
  const materialRef = useRef<ShaderMaterial>(null);
  const { size } = useThree();

  const uniforms = useMemo<LavaLampUniforms>(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new Color(color1) },
      uColor2: { value: new Color(color2) },
      uColor3: { value: new Color(color3) },
      uSpeed: { value: speed },
      uIntensity: { value: intensity },
      uBlobCount: { value: blobCount },
      uScale: { value: scale },
      uGlow: { value: glow },
      uResolution: { value: [size.width, size.height] as [number, number] },
    }),
    [blobCount, color1, color2, color3, glow, intensity, scale, size.height, size.width, speed],
  );

  useFrame((_state, delta) => {
    const material = materialRef.current;
    if (!material) return;

    const currentUniforms = material.uniforms as LavaLampUniforms;
    currentUniforms.uTime.value += delta * currentUniforms.uSpeed.value;
    currentUniforms.uResolution.value = [size.width, size.height];
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
