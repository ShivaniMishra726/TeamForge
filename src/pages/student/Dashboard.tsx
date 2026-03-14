
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

import { TrendingUp, CheckSquare, Users, Clock, Plus, Search, FileText, AlertTriangle, Calendar } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

const contributionData = [
  { day: 'Mon', hours: 3 },
  { day: 'Tue', hours: 5 },
  { day: 'Wed', hours: 2 },
  { day: 'Thu', hours: 7 },
  { day: 'Fri', hours: 4 },
  { day: 'Sat', hours: 1 },
  { day: 'Sun', hours: 0 },
];

const projects = [
  {
    id: 1, name: 'AI Study Assistant', status: 'active', progress: 68, deadline: 'Dec 15',
    members: ['Alex Johnson', 'Sam Lee', 'Mia Chen', 'Jake Park'],
  },
  {
    id: 2, name: 'Campus Event Platform', status: 'review', progress: 42, deadline: 'Jan 8',
    members: ['Alex Johnson', 'Jordan Wu'],
  },
  {
    id: 3, name: 'Data Viz Dashboard', status: 'planning', progress: 15, deadline: 'Feb 1',
    members: ['Alex Johnson', 'Riley Kim', 'Casey Torres'],
  },
];

const milestones = [
  { name: 'Backend API v1', project: 'AI Study Assistant', date: 'Dec 10', status: 'warning' as const },
  { name: 'UI Mockups Review', project: 'Campus Event Platform', date: 'Dec 12', status: 'info' as const },
  { name: 'Final Submission', project: 'AI Study Assistant', date: 'Dec 15', status: 'error' as const },
];

const activity = [
  { time: '10:32 AM', text: 'Jake Park pushed 3 commits to feature/auth-module' },
  { time: '09:15 AM', text: 'Mia Chen completed task: Design login flow' },
  { time: 'Yesterday', text: 'Team meeting notes saved to Communication Hub' },
  { time: 'Yesterday', text: 'Milestone "Requirements Doc" marked complete' },
];

const statusBadge = (s: string) => {
  if (s === 'active') return <Badge variant="success">Active</Badge>;
  if (s === 'review') return <Badge variant="info">In Review</Badge>;
  return <Badge variant="neutral">Planning</Badge>;
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  color: string;
}
function StatCard({ icon, label, value, sub, color }: StatCardProps) {
  return (
    <GlassCard className="flex items-start gap-4">
      <div className={`p-2.5 rounded-sm ${color}`}>{icon}</div>
      <div>
        <p className="text-xs text-white/50 mb-0.5">{label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-xs text-white/50 mt-0.5">{sub}</p>
      </div>
    </GlassCard>
  );
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value?: number; name?: string; color?: string; dataKey?: string }>; label?: string }) => {
  if (active && payload?.length) {
    return (
      <div className="glass rounded-sm px-3 py-2">
        <p className="text-xs text-white/60">{label}</p>
        <p className="text-sm font-semibold text-primary-400">{payload[0].value}h</p>
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const { user } = useApp();
  const navigate = useNavigate();
  const name = user?.name?.split(' ')[0] || 'there';
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold text-white">Good morning, {name}! 👋</h2>
          <p className="text-white/50 text-sm mt-0.5">{today}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<TrendingUp size={18} className="text-primary-400" />} label="Active Projects" value="3" sub="+1 this month" color="bg-primary-500/20" />
        <StatCard icon={<CheckSquare size={18} className="text-emerald-400" />} label="Tasks This Week" value="12" sub="8 completed" color="bg-emerald-500/20" />
        <StatCard icon={<Users size={18} className="text-secondary-500" />} label="Team Fit Score" value="87/100" sub="Above average" color="bg-secondary-500/20" />
        <StatCard icon={<Clock size={18} className="text-accent-500" />} label="Hours Logged" value="24h" sub="This week" color="bg-accent-500/20" />
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-2">
        <Button variant="primary" size="sm" icon={<Plus size={14} />} onClick={() => navigate('/team')}>Create Project</Button>
        <Button variant="secondary" size="sm" icon={<Search size={14} />} onClick={() => navigate('/partners')}>Find Partners</Button>
        <Button variant="ghost" size="sm" icon={<CheckSquare size={14} />} onClick={() => navigate('/tasks')}>Log Task</Button>
        <Button variant="ghost" size="sm" icon={<FileText size={14} />} onClick={() => navigate('/report')}>Generate Report</Button>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left */}
        <div className="space-y-4">
          {/* Active projects */}
          <GlassCard padding="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white">Active Projects</h3>
              <Button variant="ghost" size="sm" onClick={() => navigate('/report')}>View All</Button>
            </div>
            <div className="space-y-3">
              {projects.map(p => (
                <div key={p.id} className="glass-dark rounded-sm p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-white text-sm">{p.name}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        {statusBadge(p.status)}
                        <span className="text-xs text-white/40 flex items-center gap-1">
                          <Calendar size={11} />
                          {p.deadline}
                        </span>
                      </div>
                    </div>
                    <div className="flex -space-x-1.5">
                      {p.members.slice(0, 3).map(m => <Avatar key={m} name={m} size="sm" />)}
                      {p.members.length > 3 && (
                        <div className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-xs text-white/60">
                          +{p.members.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                  <ProgressBar value={p.progress} showLabel color={p.progress > 60 ? 'success' : p.progress > 30 ? 'primary' : 'warning'} />
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Upcoming milestones */}
          <GlassCard padding="p-5">
            <h3 className="font-semibold text-white mb-4">Upcoming Milestones</h3>
            <div className="space-y-2">
              {milestones.map((m, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                  <div className="w-2 h-2 rounded-full bg-primary-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium truncate">{m.name}</p>
                    <p className="text-xs text-white/40 truncate">{m.project}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-white/60">{m.date}</p>
                    <Badge variant={m.status} className="mt-0.5">{m.status === 'warning' ? 'At Risk' : m.status === 'error' ? 'Deadline' : 'Upcoming'}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right */}
        <div className="space-y-4">
          {/* Contribution chart */}
          <GlassCard padding="p-5">
            <h3 className="font-semibold text-white mb-4">Weekly Contributions</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={contributionData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                <Bar dataKey="hours" fill="url(#barGrad)" radius={[4, 4, 0, 0]} />
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5B6CFF" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#5B6CFF" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>

          {/* Team alerts */}
          <GlassCard padding="p-5" className="border-amber-500/20">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={16} className="text-amber-400" />
              <h3 className="font-semibold text-white">Team Alerts</h3>
              <Badge variant="warning" className="ml-auto">1 active</Badge>
            </div>
            <div className="glass-dark rounded-sm p-4 border-l-2 border-amber-500">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-amber-400">Contribution Imbalance</p>
                  <p className="text-xs text-white/60 mt-1">
                    <strong className="text-white/80">AI Study Assistant</strong> — Jake Park's contribution is 40% below team average for 2 weeks.
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="mt-3 text-amber-400 hover:text-amber-300" onClick={() => navigate('/alerts')}>
                View Alert →
              </Button>
            </div>
          </GlassCard>

          {/* Activity log */}
          <GlassCard padding="p-5">
            <h3 className="font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-2.5">
              {activity.map((a, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-xs text-white/30 font-mono w-20 shrink-0 pt-0.5">{a.time}</span>
                  <p className="text-xs text-white/70 font-mono leading-relaxed">{a.text}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
