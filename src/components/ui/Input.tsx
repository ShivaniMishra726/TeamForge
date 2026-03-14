import type { InputHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  iconRight?: ReactNode;
}

export function Input({ label, error, icon, iconRight, className, id, ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-white/80">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-3 text-white/40 pointer-events-none">{icon}</span>
        )}
        <input
          id={inputId}
          {...props}
          className={clsx(
            'input-field focus-ring',
            icon && 'pl-10',
            iconRight && 'pr-10',
            error && 'border-red-500/60 focus:border-red-500',
            className,
          )}
        />
        {iconRight && (
          <span className="absolute right-3 text-white/40">{iconRight}</span>
        )}
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
