import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useCallback, useRef, useState } from 'react';

export function PerformanceMetrics() {
  const [fps, setFps] = useState(0);
  const framesRef = useRef(0);
  const lastTimeRef = useRef(0);

  useFrame(() => {
    framesRef.current += 1;
    const now = performance.now();

    if (lastTimeRef.current === 0) {
      lastTimeRef.current = now;
      return;
    }

    const elapsed = now - lastTimeRef.current;

    if (elapsed >= 1000) {
      setFps(Math.round((framesRef.current * 1000) / elapsed));
      framesRef.current = 0;
      lastTimeRef.current = now;
    }
  });

  return (
    <Html position={[0, 0, 0]} zIndexRange={[100, 0]} wrapperClass="performance-metrics">
      <span>{fps} FPS</span>
    </Html>
  );
}

export function usePerformanceToggle(): [boolean, () => void] {
  const [visible, setVisible] = useState(false);
  const toggle = useCallback(() => setVisible((v) => !v), []);
  return [visible, toggle];
}
