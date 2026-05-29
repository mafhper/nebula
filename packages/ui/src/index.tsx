import type { PropsWithChildren } from 'react';

export interface EffectShellProps extends PropsWithChildren {
  title: string;
  eyebrow: string;
  description: string;
  snippet: string;
}

export function EffectShell({ title, eyebrow, description, snippet, children }: EffectShellProps) {
  return (
    <section className="effect-shell" aria-label={title}>
      {children}
      <div className="effect-overlay">
        <p className="effect-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="effect-description">{description}</p>
        <pre aria-label="React usage snippet">{snippet}</pre>
      </div>
    </section>
  );
}
