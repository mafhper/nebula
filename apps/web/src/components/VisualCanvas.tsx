import { Canvas } from '@react-three/fiber';
import { type ReactNode, Suspense } from 'react';

import { CanvasErrorBoundary } from './CanvasErrorBoundary';

interface VisualCanvasProps {
  children: ReactNode;
  className?: string;
  fading?: boolean;
  label: string;
}

export function VisualCanvas({
  children,
  className = '',
  fading = false,
  label,
}: VisualCanvasProps) {
  return (
    <div
      className={`visual-canvas-frame ${className}${fading ? ' is-fading' : ''}`}
      aria-label={label}
    >
      <CanvasErrorBoundary label={label}>
        <Canvas
          className="nebula-canvas"
          camera={{ position: [0, 0, 6], fov: 45 }}
          dpr={[1, 2]}
          gl={{
            antialias: false,
            powerPreference: 'high-performance',
            preserveDrawingBuffer: import.meta.env.DEV,
          }}
        >
          <Suspense fallback={null}>
            <color attach="background" args={['#04060d']} />
            {children}
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}
