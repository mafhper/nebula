import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import {
  type BufferGeometry,
  Color,
  IcosahedronGeometry,
  type Mesh,
  OctahedronGeometry,
  ShaderMaterial,
  TorusGeometry,
  TorusKnotGeometry,
} from 'three';

import fragmentShader from './fragment.glsl';
import type { GeometricEffectProps, GeometricShape, GeometricUniforms } from './types';
import vertexShader from './vertex.glsl';

const geometryCache = new Map<string, BufferGeometry>();

function getGeometry(shape: GeometricShape): BufferGeometry {
  const key = `geo/${shape}`;
  if (geometryCache.has(key)) {
    return geometryCache.get(key)!;
  }
  let geo: BufferGeometry;
  switch (shape) {
    case 'icosahedron':
      geo = new IcosahedronGeometry(1, 1);
      break;
    case 'torus':
      geo = new TorusGeometry(0.7, 0.3, 24, 48);
      break;
    case 'octahedron':
      geo = new OctahedronGeometry(1, 0);
      break;
    default:
      geo = new TorusKnotGeometry(0.7, 0.25, 64, 12);
  }
  geometryCache.set(key, geo);
  return geo;
}

export function GeometricEffect({
  color1 = '#6366f1',
  color2 = '#ec4899',
  color3 = '#c4b5fd',
  speed = 0.28,
  intensity = 1.1,
  scale: s = 1.2,
  rotation = 0.6,
  glow = 0.7,
  shape = 'torusknot',
}: GeometricEffectProps) {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const geometry = useMemo(() => getGeometry(shape), [shape]);

  const uniforms = useMemo<GeometricUniforms>(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new Color(color1) },
      uColor2: { value: new Color(color2) },
      uColor3: { value: new Color(color3) },
      uSpeed: { value: speed },
      uIntensity: { value: intensity },
      uGlow: { value: glow },
    }),
    [color1, color2, color3, glow, intensity, speed],
  );

  useFrame((_state, delta) => {
    const material = materialRef.current;
    const mesh = meshRef.current;
    if (!material || !mesh) return;

    const currentUniforms = material.uniforms as GeometricUniforms;
    currentUniforms.uTime.value += delta * currentUniforms.uSpeed.value;
    mesh.rotation.x += delta * 0.3 * rotation;
    mesh.rotation.y += delta * 0.5 * rotation;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} scale={s}>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}
