import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, ShaderMaterial } from 'three';

import fragmentShader from './fragment.glsl';
import type { ParticleGalaxyEffectProps, ParticleGalaxyUniforms } from './types';
import vertexShader from './vertex.glsl';

function createGalaxy(particleCount: number) {
  const positions = new Float32Array(particleCount * 3);
  const seeds = new Float32Array(particleCount);
  const angles = new Float32Array(particleCount);
  const radii = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    const seed = Math.sin(i * 127.1 + 311.7) * 0.5 + 0.5;
    const fracSeed = seed - Math.floor(seed);
    const angle = (Math.sin(i * 73.1 + 197.3) * 0.5 + 0.5) * Math.PI * 2;
    const radius = Math.sin(i * 41.3 + 269.5) * 0.5 + 0.5;

    const base = i * 3;
    positions[base] = 0;
    positions[base + 1] = 0;
    positions[base + 2] = 0;
    seeds[i] = fracSeed;
    angles[i] = angle;
    radii[i] = Math.sqrt(radius);
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(positions, 3));
  geometry.setAttribute('aSeed', new BufferAttribute(seeds, 1));
  geometry.setAttribute('aAngle', new BufferAttribute(angles, 1));
  geometry.setAttribute('aRadius', new BufferAttribute(radii, 1));

  return geometry;
}

export function ParticleGalaxyEffect({
  color1 = '#c4b5fd',
  color2 = '#67e8f9',
  speed = 0.3,
  intensity = 0.85,
  arms = 3,
  size = 2.5,
  spread = 1,
}: ParticleGalaxyEffectProps) {
  const materialRef = useRef<ShaderMaterial>(null);
  const particleCount = 6000;
  const geometry = useMemo(() => createGalaxy(particleCount), []);

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  const uniforms = useMemo<ParticleGalaxyUniforms>(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new Color(color1) },
      uColor2: { value: new Color(color2) },
      uSpeed: { value: speed },
      uIntensity: { value: intensity },
      uArms: { value: arms },
      uSize: { value: size },
      uSpread: { value: spread },
    }),
    [color1, color2, intensity, speed, size, spread, arms],
  );

  useFrame((_state, delta) => {
    const material = materialRef.current;

    if (!material) {
      return;
    }

    const currentUniforms = material.uniforms as ParticleGalaxyUniforms;
    currentUniforms.uTime.value += delta;
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthWrite={false}
        transparent
        blending={AdditiveBlending}
      />
    </points>
  );
}
