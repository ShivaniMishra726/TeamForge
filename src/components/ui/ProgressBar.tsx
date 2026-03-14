
import clsx from 'clsx';

type Color = 'primary' | 'success' | 'warning' | 'danger';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: Color;
  showLabel?: boolean;
  className?: string;
  size?: 'sm' | 'md';
}

const colorClasses: Record<Color, string> = {
  primary: 'bg-primary-500',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
};

export function ProgressBar({ value, max = 100, color = 'primary', showLabel = false, className, size = 'sm' }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={clsx('flex items-center gap-2', className)}>
      <div className={clsx('flex-1 bg-white/10 rounded-full overflow-hidden', size === 'sm' ? 'h-1.5' : 'h-2.5')}>
        <div
          className={clsx('h-full rounded-full transition-all duration-500', colorClasses[color])}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
      {showLabel && <span className="text-xs text-white/60 w-8 text-right">{Math.round(pct)}%</span>}
    </div>
  );
}
