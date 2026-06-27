import type { ReactNode } from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
}

export function Card({ title, subtitle, children }: CardProps) {
  return (
    <section className="card">
      {title ? <h1 className="card__title">{title}</h1> : null}
      {subtitle ? <p className="card__subtitle">{subtitle}</p> : null}
      {children}
    </section>
  );
}
