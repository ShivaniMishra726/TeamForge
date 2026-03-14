import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

type Variant = 'primary' | 'secondary' | 'ghost' | 'destructive';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  children?: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-primary-500 hover:bg-primary-600 text-white border border-primary-500/0 shadow-glow hover:shadow-none',
  secondary: 'glass border border-primary-500/40 text-primary-400 hover:border-primary-500/70 hover:text-primary-300',
  ghost: 'bg-transparent border border-transparent text-white/70 hover:text-white hover:bg-white/8',
  destructive: 'bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30 hover:border-red-500/60',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-2.5',
};

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={clsx(
        'inline-flex items-center justify-center font-medium rounded-sm transition-all duration-200',
        'focus-ring',
        variantClasses[variant],
        sizeClasses[size],
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className,
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
