import { useState } from 'react';
import { Bell, CheckCircle, Clock, AlertTriangle, CircleDot, ChevronDown } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { Badge } from '../../components/ui/Badge';
import clsx from 'clsx';

type MilestoneStatus = 'done' | 'on-track' | 'at-risk' | 'in-progress' | 'not-started' | 'deadline';

interface Milestone {
  name: string;
  startWeek: number;
  endWeek: number;
  status: MilestoneStatus;
  health: 'green' | 'amber' | 'red' | 'gray' | 'blue';
  dueDate: string;
  reminder?: boolean;
}

const milestones: Milestone[] = [
  { name: 'Requirements & Spec', startWeek: 1, endWeek: 3, status: 'done', health: 'green', dueDate: 'Nov 15' },
  { name: 'Design Mockups', startWeek: 3, endWeek: 5, status: 'on-track', health: 'green', dueDate: 'Nov 29' },
  { name: 'Backend API', startWeek: 4, endWeek: 8, status: 'at-risk', health: 'amber', dueDate: 'Dec 13', reminder: true },
  { name: 'Frontend UI', startWeek: 5, endWeek: 9, status: 'in-progress', health: 'blue', dueDate: 'Dec 20', reminder: true },
  { name: 'Integration & Testing', startWeek: 8, endWeek: 11, status: 'not-started', health: 'gray', dueDate: 'Jan 10' },
  { name: 'Final Submission', startWeek: 11, endWeek: 12, status: 'deadline', health: 'red', dueDate: 'Jan 17', reminder: true },
];

const TOTAL_WEEKS = 12;

const statusConfig: Record<MilestoneStatus, { badge: React.ReactNode; label: string }> = {
  'done': { badge: <Badge variant="success">Done</Badge>, label: 'Done' },
  'on-track': { badge: <Badge variant="success">On Track</Badge>, label: 'On Track' },
  'at-risk': { badge: <Badge variant="warning">At Risk</Badge>, label: 'At Risk' },
  'in-progress': { badge: <Badge variant="info">In Progress</Badge>, label: 'In Progress' },
  'not-started': { badge: <Badge variant="neutral">Not Started</Badge>, label: 'Not Started' },
  'deadline': { badge: <Badge variant="error">Deadline</Badge>, label: 'Deadline' },
};

const healthColor: Record<string, string> = {
  green: 'bg-emerald-500',
  amber: 'bg-amber-500',
  red: 'bg-red-500',
  gray: 'bg-white/20',
  blue: 'bg-primary-500',
};

const barColor: Record<string, string> = {
  green: 'bg-emerald-500/60 border border-emerald-500/80',
  amber: 'bg-amber-500/60 border border-amber-500/80',
  red: 'bg-red-500/60 border border-red-500/80',
  gray: 'bg-white/10 border border-white/20',
  blue: 'bg-primary-500/60 border border-primary-500/80',
};

const projects = ['AI Study Assistant', 'Campus Event Platform', 'Data Viz Dashboard'];

function StatusIcon({ status }: { status: MilestoneStatus }) {
  if (status === 'done') return <CheckCircle size={14} className="text-emerald-400" />;
  if (status === 'at-risk' || status === 'deadline') return <AlertTriangle size={14} className="text-amber-400" />;
  if (status === 'in-progress') return <Clock size={14} className="text-primary-400" />;
  return <CircleDot size={14} className="text-white/30" />;
}

export default function MilestoneTimeline() {
  const [project, setProject] = useState(projects[0]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-white">Milestone Timeline</h2>
          <p className="text-white/50 text-sm mt-0.5">Track project milestones and deadlines</p>
        </div>
        <div className="relative">
          <select
            value={project}
            onChange={e => setProject(e.target.value)}
            className="input-field pr-10 appearance-none cursor-pointer w-56"
          >
            {projects.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs text-white/50">
        {Object.entries(healthColor).map(([key, cls]) => (
          <span key={key} className="flex items-center gap-1.5">
            <span className={clsx('w-3 h-3 rounded-sm inline-block', cls)} />
            <span className="capitalize">{key === 'gray' ? 'Not started' : key === 'blue' ? 'In progress' : key}</span>
          </span>
        ))}
      </div>

      {/* Timeline */}
      <GlassCard padding="p-6">
        {/* Week headers */}
        <div className="flex mb-4">
          <div className="w-44 shrink-0" />
          <div className="flex-1 flex">
            {Array.from({ length: TOTAL_WEEKS }, (_, i) => (
              <div key={i} className="flex-1 text-center text-xs text-white/30">W{i + 1}</div>
            ))}
          </div>
          <div className="w-28 shrink-0" />
        </div>

        {/* Milestone rows */}
        <div className="space-y-3">
          {milestones.map((m, i) => {
            const startPct = ((m.startWeek - 1) / TOTAL_WEEKS) * 100;
            const widthPct = ((m.endWeek - m.startWeek + 1) / TOTAL_WEEKS) * 100;
            return (
              <div key={i} className="flex items-center gap-3">
                {/* Name + icon */}
                <div className="w-44 shrink-0 flex items-center gap-2">
                  <StatusIcon status={m.status} />
                  <span className="text-sm text-white/80 truncate" title={m.name}>{m.name}</span>
                </div>

                {/* Gantt bar area */}
                <div className="flex-1 relative h-7">
                  <div
                    className={clsx('absolute h-full rounded-sm flex items-center px-2', barColor[m.health])}
                    style={{ left: `${startPct}%`, width: `${widthPct}%` }}
                  >
                    <span className="text-xs text-white/80 truncate">{m.name.split(' ')[0]}</span>
                  </div>
                </div>

                {/* Right: date, status, reminder */}
                <div className="w-28 shrink-0 flex items-center justify-end gap-1.5">
                  {m.reminder && (
                    <Bell size={13} className="text-amber-400 shrink-0" aria-label="Reminder set" />
                  )}
                  <span className="text-xs text-white/40 shrink-0">{m.dueDate}</span>
                  {statusConfig[m.status].badge}
                </div>
              </div>
            );
          })}
        </div>

        {/* Today marker */}
        <div className="flex mt-4 pt-4 border-t border-white/8">
          <div className="w-44 shrink-0 text-xs text-white/30">Progress →</div>
          <div className="flex-1 relative h-1 bg-white/5 rounded-full">
            <div className="absolute h-full w-3/5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full" />
            <div className="absolute left-[60%] -top-1.5 w-3 h-3 bg-white rounded-full border-2 border-primary-500" title="Today" />
          </div>
        </div>
      </GlassCard>

      {/* Milestone detail cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {milestones.filter(m => m.status !== 'done').map((m, i) => (
          <GlassCard key={i} padding="p-4" className={clsx(m.reminder && 'border-amber-500/20')}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <div className={clsx('w-2 h-2 rounded-full shrink-0', healthColor[m.health])} />
                <p className="text-sm font-medium text-white">{m.name}</p>
              </div>
              {m.reminder && <Bell size={13} className="text-amber-400 shrink-0" />}
            </div>
            <p className="text-xs text-white/50 mb-2">Due: {m.dueDate}</p>
            {statusConfig[m.status].badge}
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
