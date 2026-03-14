import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { MobileNav } from './MobileNav';
import type { UserRole } from '../../context/AppContext';

interface AppLayoutProps {
  userRole?: UserRole;
  userName?: string;
}

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/partners': 'Find Partners',
  '/team': 'Team Builder',
  '/tasks': 'Workload Tracker',
  '/timeline': 'Milestone Timeline',
  '/messages': 'Communication Hub',
  '/report': 'Project Report',
  '/professor': 'Professor Dashboard',
  '/alerts': 'Imbalance Alerts',
  '/settings': 'Settings',
};

export function AppLayout({ userRole = 'student', userName = 'Alex Johnson' }: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const title = pageTitles[pathname] || 'TeamForge';

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        userRole={userRole}
        userName={userName}
        isCollapsed={collapsed}
        onToggleCollapse={() => setCollapsed(c => !c)}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopNav pageTitle={title} />
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
          <div className="p-4 lg:p-6">
            <Outlet />
          </div>
        </main>
        <MobileNav />
      </div>
    </div>
  );
}
