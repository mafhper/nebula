import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { AdditiveBlending, Color, DoubleSide, ShaderMaterial } from 'three';

import fragmentShader from './fragment.glsl';
import type { VortexEffectProps, VortexUniforms } from './types';
import vertexShader from './vertex.glsl';

export function VortexEffect({
  color1 = '#0ea5e9',
  color2 = '#1e3a5f',
  color3 = '#7dd3fc',
  speed = 0.28,
  intensity = 1.12,
  arms = 3,
  twist = 0.72,
  zoom = 1,
}: VortexEffectProps) {
  const materialRef = useRef<ShaderMaterial>(null);
  const uniforms = useMemo<VortexUniforms>(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new Color(color1) },
      uColor2: { value: new Color(color2) },
      uColor3: { value: new Color(color3) },
      uSpeed: { value: speed },
      uIntensity: { value: intensity },
      uArms: { value: arms },
      uTwist: { value: twist },
      uZoom: { value: zoom },
    }),
    [arms, color1, color2, color3, intensity, speed, twist, zoom],
  );

  useFrame((_state, delta) => {
    const material = materialRef.current;
    if (!material) return;

    const currentUniforms = material.uniforms as VortexUniforms;
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
