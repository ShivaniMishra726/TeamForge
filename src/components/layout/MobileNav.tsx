
import { useNavigate, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { LayoutDashboard, Users, CheckSquare, MessageSquare, User } from 'lucide-react';

const mobileNav = [
  { label: 'Home', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
  { label: 'Partners', path: '/partners', icon: <Users size={20} /> },
  { label: 'Tasks', path: '/tasks', icon: <CheckSquare size={20} /> },
  { label: 'Messages', path: '/messages', icon: <MessageSquare size={20} /> },
  { label: 'Profile', path: '/settings', icon: <User size={20} /> },
];

export function MobileNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass-dark border-t border-white/10"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around py-2 px-2">
        {mobileNav.map((item) => {
          const active = pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={clsx(
                'flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-sm transition-all duration-200 min-w-0 focus-ring',
                active ? 'text-primary-400' : 'text-white/40 hover:text-white/70',
              )}
            >
              {item.icon}
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
