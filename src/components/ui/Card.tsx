import type { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-cbr-md border border-page-border bg-white p-4 shadow-cbr-sm',
        className,
      )}
    >
      {children}
    </div>
  );
}
