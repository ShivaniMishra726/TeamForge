import { useState } from 'react';
import { Search, Bell, Clock, ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { useApp } from '../../context/AppContext';

interface TopNavProps {
  pageTitle: string;
}

export function TopNav({ pageTitle }: TopNavProps) {
  const { user, notifications, setIsAuthenticated } = useApp();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-16 glass-dark border-b border-white/8 flex items-center px-6 gap-4 sticky top-0 z-30">
      <h1 className="text-lg font-semibold text-white flex-shrink-0">{pageTitle}</h1>

      <div className="flex-1 max-w-sm hidden md:block">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2 glass rounded-sm text-sm text-white placeholder-white/30 border border-white/10 focus:border-primary-500/50 focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Session timeout */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 glass rounded-sm">
          <Clock size={13} className="text-emerald-400" />
          <span className="text-xs text-white/60">Session: <span className="text-emerald-400 font-medium">2h 30m</span></span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 glass rounded-sm text-white/60 hover:text-white transition-colors focus-ring" aria-label="Notifications">
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary-500 rounded-full text-xs text-white flex items-center justify-center font-bold">
              {unreadCount}
            </span>
          )}
        </button>

        {/* User dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(o => !o)}
            className="flex items-center gap-2 p-1.5 glass rounded-sm hover:bg-white/8 transition-colors focus-ring"
          >
            <Avatar name={user?.name || 'User'} size="sm" />
            <span className="hidden sm:block text-sm text-white/80 max-w-[100px] truncate">{user?.name || 'Demo User'}</span>
            <ChevronDown size={14} className="text-white/40" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 glass-heavy rounded-sm border border-white/15 shadow-glass-lg z-50 overflow-hidden">
              <button className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/8 transition-colors">
                <User size={14} /><span>Profile</span>
              </button>
              <button className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/8 transition-colors">
                <Settings size={14} /><span>Settings</span>
              </button>
              <div className="border-t border-white/10" />
              <button
                onClick={() => { setIsAuthenticated(false); setDropdownOpen(false); }}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
              >
                <LogOut size={14} /><span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
