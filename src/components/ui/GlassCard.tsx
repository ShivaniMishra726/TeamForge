import type { ReactNode } from 'react';
import clsx from 'clsx';

type Variant = 'default' | 'heavy' | 'dark';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  padding?: string;
}

const variantClass: Record<Variant, string> = {
  default: 'glass',
  heavy: 'glass-heavy',
  dark: 'glass-dark',
};

export function GlassCard({ children, className, variant = 'default', padding = 'p-6' }: GlassCardProps) {
  return (
    <div className={clsx('rounded-md', variantClass[variant], padding, className)}>
      {children}
    </div>
  );
}
