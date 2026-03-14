
import clsx from 'clsx';

type Variant = 'success' | 'warning' | 'error' | 'info' | 'neutral';

interface BadgeProps {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
}

const variantClass: Record<Variant, string> = {
  success: 'badge-green',
  warning: 'badge-amber',
  error: 'badge-red',
  info: 'badge-blue',
  neutral: 'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white/70 border border-white/15',
};

const dotColor: Record<Variant, string> = {
  success: 'bg-emerald-400',
  warning: 'bg-amber-400',
  error: 'bg-red-400',
  info: 'bg-primary-400',
  neutral: 'bg-white/50',
};

export function Badge({ variant = 'neutral', children, className }: BadgeProps) {
  return (
    <span className={clsx(variantClass[variant], className)}>
      <span className={clsx('w-1.5 h-1.5 rounded-full shrink-0', dotColor[variant])} />
      {children}
    </span>
  );
}
