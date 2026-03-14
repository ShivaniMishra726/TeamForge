
import { useNavigate, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import {
  LayoutDashboard, Users, UserPlus, CheckSquare, Calendar,
  MessageSquare, FileText, Settings, ChevronLeft, ChevronRight,
  BookOpen, Flag, Shield,
} from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import type { UserRole } from '../../context/AppContext';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const studentNav: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
  { label: 'Find Partners', path: '/partners', icon: <Users size={18} /> },
  { label: 'My Team', path: '/team', icon: <UserPlus size={18} /> },
  { label: 'Tasks', path: '/tasks', icon: <CheckSquare size={18} /> },
  { label: 'Timeline', path: '/timeline', icon: <Calendar size={18} /> },
  { label: 'Messages', path: '/messages', icon: <MessageSquare size={18} /> },
  { label: 'Reports', path: '/report', icon: <FileText size={18} /> },
];

const professorNav: NavItem[] = [
  { label: 'Course Overview', path: '/professor', icon: <BookOpen size={18} /> },
  { label: 'Flagged Teams', path: '/alerts', icon: <Flag size={18} /> },
];

interface SidebarProps {
  userRole?: UserRole;
  userName?: string;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({ userRole = 'student', userName = 'Alex Johnson', isCollapsed, onToggleCollapse }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const roleBadgeVariant = userRole === 'professor' ? 'info' : userRole === 'ta' ? 'warning' : 'success';
  const roleLabel = userRole === 'professor' ? 'Professor' : userRole === 'ta' ? 'TA' : 'Student';

  return (
    <aside
      className={clsx(
        'hidden lg:flex flex-col glass-dark border-r border-white/8 transition-all duration-300 h-screen sticky top-0',
        isCollapsed ? 'w-16' : 'w-60',
      )}
    >
      {/* Logo */}
      <div className={clsx('flex items-center h-16 px-4 border-b border-white/8', isCollapsed ? 'justify-center' : 'gap-2')}>
        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-sm flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-sm">TF</span>
        </div>
        {!isCollapsed && (
          <span className="gradient-text font-bold text-lg tracking-tight">TeamForge</span>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto" aria-label="Main navigation">
        {studentNav.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={clsx(
              'nav-item w-full',
              currentPath === item.path && 'active',
              isCollapsed && 'justify-center px-2',
            )}
            title={isCollapsed ? item.label : undefined}
          >
            <span className="shrink-0">{item.icon}</span>
            {!isCollapsed && <span>{item.label}</span>}
          </button>
        ))}

        {/* Professor section */}
        {(userRole === 'professor' || userRole === 'ta') && (
          <>
            <div className={clsx('my-3 border-t border-white/8', isCollapsed && 'mx-2')} />
            {!isCollapsed && (
              <p className="px-3 py-1 text-xs font-semibold text-white/30 uppercase tracking-widest">Instructor</p>
            )}
            {professorNav.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={clsx(
                  'nav-item w-full',
                  currentPath === item.path && 'active',
                  isCollapsed && 'justify-center px-2',
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <span className="shrink-0">{item.icon}</span>
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            ))}
          </>
        )}

        <div className={clsx('my-3 border-t border-white/8', isCollapsed && 'mx-2')} />

        <button
          onClick={() => navigate('/settings')}
          className={clsx('nav-item w-full', isCollapsed && 'justify-center px-2')}
          title={isCollapsed ? 'Settings' : undefined}
        >
          <Settings size={18} className="shrink-0" />
          {!isCollapsed && <span>Settings</span>}
        </button>
      </nav>

      {/* Session indicator */}
      {!isCollapsed && (
        <div className="mx-3 mb-3 px-3 py-2 glass rounded-sm flex items-center gap-2">
          <Shield size={12} className="text-emerald-400 shrink-0" />
          <span className="text-xs text-white/50">Session: <span className="text-emerald-400">2h 30m</span></span>
        </div>
      )}

      {/* User profile */}
      <div className={clsx('p-3 border-t border-white/8 flex items-center gap-3', isCollapsed && 'justify-center')}>
        <Avatar name={userName} size="sm" online />
        {!isCollapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{userName}</p>
            <Badge variant={roleBadgeVariant} className="mt-0.5">{roleLabel}</Badge>
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={onToggleCollapse}
        className="absolute -right-3 top-20 w-6 h-6 glass rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors focus-ring"
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}
