import type { ReactNode } from 'react';

interface ControlPanelProps {
  children: ReactNode;
  label: string;
}

export function ControlPanel({ children, label }: ControlPanelProps) {
  return (
    <div className="control-panel" aria-label={label}>
      {children}
    </div>
  );
}
