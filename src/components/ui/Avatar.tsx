
import clsx from 'clsx';

type Size = 'sm' | 'md' | 'lg';

interface AvatarProps {
  name: string;
  src?: string;
  size?: Size;
  online?: boolean;
  className?: string;
}

const sizeClasses: Record<Size, string> = {
  sm: 'w-7 h-7 text-xs',
  md: 'w-9 h-9 text-sm',
  lg: 'w-12 h-12 text-base',
};

const dotSizeClasses: Record<Size, string> = {
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3',
};

function getInitials(name: string) {
  return name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function getColor(name: string) {
  const colors = [
    'from-primary-400 to-primary-600',
    'from-secondary-500 to-primary-500',
    'from-accent-500 to-primary-400',
    'from-emerald-400 to-teal-600',
    'from-amber-400 to-orange-500',
    'from-pink-400 to-purple-600',
  ];
  const idx = name.charCodeAt(0) % colors.length;
  return colors[idx];
}

export function Avatar({ name, src, size = 'md', online, className }: AvatarProps) {
  return (
    <div className={clsx('relative shrink-0', className)}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={clsx('rounded-full object-cover', sizeClasses[size])}
        />
      ) : (
        <div
          className={clsx(
            'rounded-full bg-gradient-to-br flex items-center justify-center font-semibold text-white select-none',
            sizeClasses[size],
            getColor(name),
          )}
          aria-label={name}
        >
          {getInitials(name)}
        </div>
      )}
      {online !== undefined && (
        <span
          className={clsx(
            'absolute bottom-0 right-0 rounded-full border-2 border-background',
            dotSizeClasses[size],
            online ? 'bg-emerald-400' : 'bg-white/30',
          )}
        />
      )}
    </div>
  );
}
