import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, ShaderMaterial } from 'three';
import fragmentShader from './fragment.glsl';
import type { StarfieldEffectProps, StarfieldUniforms } from './types';
import vertexShader from './vertex.glsl';

function randomSeed(index: number, offset: number) {
  return Math.sin(index * 127.1 + offset * 311.7) * 43758.5453123;
}

function fract(value: number) {
  return value - Math.floor(value);
}

function createGeometry(count: number, depth: number) {
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);

  for (let index = 0; index < count; index += 1) {
    const base = index * 3;
    const radius = Math.sqrt(fract(randomSeed(index, 1)));
    const angle = fract(randomSeed(index, 2)) * Math.PI * 2;

    positions[base] = Math.cos(angle) * radius;
    positions[base + 1] = Math.sin(angle) * radius;
    positions[base + 2] = -fract(randomSeed(index, 3)) * depth;
    seeds[index] = fract(randomSeed(index, 4));
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(positions, 3));
  geometry.setAttribute('aSeed', new BufferAttribute(seeds, 1));

  return geometry;
}

export function StarfieldEffect({
  color1 = '#bfdbfe',
  color2 = '#67e8f9',
  speed = 0.18,
  intensity = 0.92,
  density = 900,
  depth = 18,
  spread = 12,
  pointSize = 18,
}: StarfieldEffectProps) {
  const materialRef = useRef<ShaderMaterial>(null);
  const count = Math.max(100, Math.round(density));
  const geometry = useMemo(() => createGeometry(count, depth), [count, depth]);

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);
  const uniforms = useMemo<StarfieldUniforms>(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new Color(color1) },
      uColor2: { value: new Color(color2) },
      uSpeed: { value: speed },
      uIntensity: { value: intensity },
      uDepth: { value: depth },
      uSpread: { value: spread },
      uPointSize: { value: pointSize },
    }),
    [color1, color2, depth, intensity, pointSize, speed, spread],
  );

  useFrame((_state, delta) => {
    const material = materialRef.current;

    if (!material) {
      return;
    }

    const currentUniforms = material.uniforms as StarfieldUniforms;
    currentUniforms.uTime.value += delta * currentUniforms.uSpeed.value;
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
