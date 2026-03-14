import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-2xl' };

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        className={clsx(
          'relative glass-heavy rounded-md w-full animate-slide-up shadow-glass-lg',
          sizeClasses[size],
        )}
      >
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 id="modal-title" className="text-lg font-semibold text-white">{title}</h2>
            <button onClick={onClose} className="text-white/40 hover:text-white/80 transition-colors focus-ring rounded-sm p-1">
              <X size={18} />
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
