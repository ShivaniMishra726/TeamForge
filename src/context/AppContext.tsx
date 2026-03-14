import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type UserRole = 'student' | 'professor' | 'ta';

export interface User {
  name: string;
  role: UserRole;
  email: string;
}

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  timestamp: Date;
}

interface AppContextValue {
  user: User | null;
  setUser: (user: User | null) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (v: boolean) => void;
  notifications: Notification[];
  setNotifications: (n: Notification[]) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const defaultNotifications: Notification[] = [
  { id: '1', message: 'Team imbalance detected in CS401 Project', type: 'warning', read: false, timestamp: new Date() },
  { id: '2', message: 'New partner request from Alex Kim', type: 'info', read: false, timestamp: new Date() },
  { id: '3', message: 'Milestone deadline in 3 days', type: 'warning', read: true, timestamp: new Date() },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(defaultNotifications);

  return (
    <AppContext.Provider value={{
      user, setUser,
      currentPage, setCurrentPage,
      isAuthenticated, setIsAuthenticated,
      notifications, setNotifications,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
