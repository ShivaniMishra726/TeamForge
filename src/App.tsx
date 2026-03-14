import type { ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';

// Auth pages
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import RoleSelection from './pages/auth/RoleSelection';

// Layout
import { AppLayout } from './components/layout/AppLayout';

// Student pages
import Dashboard from './pages/student/Dashboard';
import PartnerMarketplace from './pages/student/PartnerMarketplace';
import TeamBuilder from './pages/student/TeamBuilder';
import WorkloadTracker from './pages/student/WorkloadTracker';
import MilestoneTimeline from './pages/student/MilestoneTimeline';
import CommunicationHub from './pages/student/CommunicationHub';
import ReportView from './pages/student/ReportView';

// Professor pages
import ProfessorDashboard from './pages/professor/ProfessorDashboard';

// Alert pages
import ImbalanceAlerts from './pages/alerts/ImbalanceAlerts';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useApp();
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth/signin" replace />;
}

function AppRoutes() {
  const { user } = useApp();
  return (
    <Routes>
      {/* Auth */}
      <Route path="/auth/signin" element={<SignIn />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/auth/role" element={<RoleSelection />} />

      {/* App */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout userRole={user?.role} userName={user?.name} />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="partners" element={<PartnerMarketplace />} />
        <Route path="team" element={<TeamBuilder />} />
        <Route path="tasks" element={<WorkloadTracker />} />
        <Route path="timeline" element={<MilestoneTimeline />} />
        <Route path="messages" element={<CommunicationHub />} />
        <Route path="report" element={<ReportView />} />
        <Route path="professor" element={<ProfessorDashboard />} />
        <Route path="alerts" element={<ImbalanceAlerts />} />
        <Route path="settings" element={<Dashboard />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/auth/signin" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}
