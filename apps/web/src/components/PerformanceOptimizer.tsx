import { useThree } from '@react-three/fiber';
import { type ReactNode, useEffect, useRef } from 'react';

export function PerformanceOptimizer({ children }: { children: ReactNode }) {
  const { set } = useThree();
  const prevRef = useRef<'always' | 'never'>('always');

  useEffect(() => {
    const handleVisibility = () => {
      const next = document.hidden ? 'never' : 'always';
      if (next !== prevRef.current) {
        prevRef.current = next;
        set({ frameloop: next });
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [set]);

  return <>{children}</>;
}
