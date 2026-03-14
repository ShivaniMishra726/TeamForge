# TeamForge

A collaborative academic project management platform built with React, TypeScript, and TailwindCSS.

## Features

- **Partner Marketplace** – Find teammates by skills, availability, and reliability score
- **Team Builder** – Skill coverage matrix and radar chart for gap analysis
- **Workload Tracker** – Kanban board with contribution analytics
- **Milestone Timeline** – Gantt-style project timeline
- **Communication Hub** – Threaded discussions, decision log, and meeting notes
- **Automated Reports** – PDF/CSV export with tamper-evident audit trails
- **Imbalance Alerts** – Progressive 3-stage alert system (private nudge → team alert → professor escalation)
- **Professor Dashboard** – Monitor all course teams, flag imbalances, post announcements

## Tech Stack

- **React 19** + **TypeScript** via Vite
- **TailwindCSS v3** with custom glass morphism design system
- **React Router v7** for client-side routing
- **Recharts** for bar, radar, and pie charts
- **Lucide React** for icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and click **Sign In** to enter with the demo account.

## Demo Login

Click **Sign In** on the sign-in page to log in as `Alex Johnson` (student role). No credentials required for the prototype.

## Project Structure

```
src/
  components/
    ui/          # Button, Badge, GlassCard, Input, Avatar, ProgressBar, Toast, Modal
    layout/      # Sidebar, TopNav, MobileNav, AppLayout
  pages/
    auth/        # SignIn, SignUp, RoleSelection
    student/     # Dashboard, PartnerMarketplace, TeamBuilder, WorkloadTracker, MilestoneTimeline, CommunicationHub, ReportView
    professor/   # ProfessorDashboard
    alerts/      # ImbalanceAlerts
  context/
    AppContext.tsx
```

