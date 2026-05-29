import { Canvas } from '@react-three/fiber';
import { Suspense, type ReactNode } from 'react';

interface VisualCanvasProps {
  children: ReactNode;
  className?: string;
  label: string;
}

export function VisualCanvas({ children, className = '', label }: VisualCanvasProps) {
  return (
    <div className={`visual-canvas-frame ${className}`} aria-label={label}>
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
    </div>
  );
}
