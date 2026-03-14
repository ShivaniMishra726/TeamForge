import { useEffect } from 'react';
import clsx from 'clsx';
import { CheckCircle, AlertTriangle, XCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'warning' | 'error' | 'info';

interface ToastProps {
  type?: ToastType;
  message: string;
  onClose?: () => void;
}

const configs: Record<ToastType, { icon: React.ReactNode; classes: string }> = {
  success: { icon: <CheckCircle size={16} />, classes: 'border-emerald-500/40 text-emerald-400' },
  warning: { icon: <AlertTriangle size={16} />, classes: 'border-amber-500/40 text-amber-400' },
  error: { icon: <XCircle size={16} />, classes: 'border-red-500/40 text-red-400' },
  info: { icon: <Info size={16} />, classes: 'border-primary-500/40 text-primary-400' },
};

export function Toast({ type = 'info', message, onClose }: ToastProps) {
  const { icon, classes } = configs[type];

  useEffect(() => {
    const t = setTimeout(() => onClose?.(), 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className={clsx(
        'flex items-center gap-3 px-4 py-3 glass rounded-sm border shadow-glass-lg animate-slide-in-right',
        classes,
      )}
      role="alert"
    >
      <span className="shrink-0">{icon}</span>
      <p className="text-sm text-white/90 flex-1">{message}</p>
      {onClose && (
        <button onClick={onClose} className="text-white/40 hover:text-white/70 transition-colors ml-2 focus-ring rounded">
          <X size={14} />
        </button>
      )}
    </div>
  );
}
