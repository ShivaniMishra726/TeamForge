import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

import { Flag, Eye, MessageSquare, BellOff, AlertTriangle, ChevronDown, Megaphone, Send } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import { ProgressBar } from '../../components/ui/ProgressBar';
import clsx from 'clsx';

const courses = ['CS401 - Software Engineering', 'CS310 - Data Structures', 'DS501 - Machine Learning'];

const teams = [
  { id: 1, name: 'Team Alpha', members: 5, avgContrib: 88, status: 'healthy', flagged: false },
  { id: 2, name: 'Team Beta', members: 4, avgContrib: 42, status: 'flagged', flagged: true },
  { id: 3, name: 'Team Gamma', members: 5, avgContrib: 75, status: 'healthy', flagged: false },
  { id: 4, name: 'Team Delta', members: 4, avgContrib: 30, status: 'flagged', flagged: true },
  { id: 5, name: 'Team Epsilon', members: 5, avgContrib: 91, status: 'excellent', flagged: false },
  { id: 6, name: 'Team Zeta', members: 3, avgContrib: 65, status: 'healthy', flagged: false },
  { id: 7, name: 'Team Eta', members: 5, avgContrib: 78, status: 'healthy', flagged: false },
  { id: 8, name: 'Team Theta', members: 4, avgContrib: 55, status: 'at-risk', flagged: false },
  { id: 9, name: 'Team Iota', members: 5, avgContrib: 83, status: 'healthy', flagged: false },
  { id: 10, name: 'Team Kappa', members: 4, avgContrib: 71, status: 'healthy', flagged: false },
  { id: 11, name: 'Team Lambda', members: 5, avgContrib: 62, status: 'at-risk', flagged: false },
  { id: 12, name: 'Team Mu', members: 4, avgContrib: 89, status: 'excellent', flagged: false },
];

const flaggedAlerts = [
  {
    team: 'Team Beta',
    member: 'Jake Park',
    issue: 'Contribution 65% below team average for 3 weeks',
    severity: 'error' as const,
  },
  {
    team: 'Team Delta',
    member: 'Riley Kim',
    issue: 'No commits or task completions in 2 weeks',
    severity: 'error' as const,
  },
];

const reportHistory = [
  { team: 'Team Alpha', date: 'Dec 9, 2024', type: 'Weekly' },
  { team: 'Team Beta', date: 'Dec 8, 2024', type: 'Flagged' },
  { team: 'Team Gamma', date: 'Dec 7, 2024', type: 'Weekly' },
  { team: 'Team Delta', date: 'Dec 7, 2024', type: 'Flagged' },
];

const analyticsData = [
  { name: 'Alpha', score: 88 },
  { name: 'Beta', score: 42 },
  { name: 'Gamma', score: 75 },
  { name: 'Delta', score: 30 },
  { name: 'Epsilon', score: 91 },
  { name: 'Zeta', score: 65 },
];

const statusConfig: Record<string, { badge: React.ReactNode; border: string }> = {
  healthy: { badge: <Badge variant="success">Healthy</Badge>, border: '' },
  excellent: { badge: <Badge variant="success">Excellent</Badge>, border: '' },
  flagged: { badge: <Badge variant="error">Flagged</Badge>, border: 'border border-red-500/40' },
  'at-risk': { badge: <Badge variant="warning">At Risk</Badge>, border: 'border border-amber-500/40' },
};

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value?: number; name?: string; color?: string; dataKey?: string }>; label?: string }) => {
  if (active && payload?.length) {
    return (
      <div className="glass rounded-sm px-3 py-2">
        <p className="text-xs text-white/60">{label}</p>
        <p className="text-sm font-semibold text-primary-400">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function ProfessorDashboard() {
  const [course, setCourse] = useState(courses[0]);
  const [announcement, setAnnouncement] = useState('');

  const totalTeams = teams.length;
  const flaggedCount = teams.filter(t => t.flagged).length;
  const avgScore = Math.round(teams.reduce((s, t) => s + t.avgContrib, 0) / teams.length);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-white">Professor Dashboard</h2>
          <p className="text-white/50 text-sm mt-0.5">Monitor team performance across your courses</p>
        </div>
        <div className="relative">
          <select
            value={course}
            onChange={e => setCourse(e.target.value)}
            className="input-field pr-10 appearance-none cursor-pointer w-64"
          >
            {courses.map(c => <option key={c}>{c}</option>)}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Teams', value: totalTeams, color: 'text-primary-400' },
          { label: 'Flagged', value: flaggedCount, color: 'text-red-400' },
          { label: 'Reports Generated', value: 8, color: 'text-emerald-400' },
          { label: 'Avg Team Score', value: `${avgScore}/100`, color: 'text-amber-400' },
        ].map(s => (
          <GlassCard key={s.label} className="text-center">
            <p className={clsx('text-3xl font-bold', s.color)}>{s.value}</p>
            <p className="text-xs text-white/50 mt-1">{s.label}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Teams grid */}
        <div className="space-y-4">
          <h3 className="font-semibold text-white">Course Teams</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {teams.map(team => {
              const cfg = statusConfig[team.status];
              return (
                <div key={team.id} className={clsx('glass rounded-sm p-4 space-y-2', cfg.border)}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        {team.flagged && <Flag size={13} className="text-red-400 shrink-0" />}
                        <p className="text-sm font-semibold text-white">{team.name}</p>
                      </div>
                      <p className="text-xs text-white/40">{team.members} members</p>
                    </div>
                    {cfg.badge}
                  </div>
                  <ProgressBar
                    value={team.avgContrib}
                    showLabel
                    color={team.avgContrib >= 75 ? 'success' : team.avgContrib >= 50 ? 'primary' : 'danger'}
                  />
                  <Button variant="ghost" size="sm" className="w-full text-xs" icon={<Eye size={12} />}>
                    View Report
                  </Button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Alerts + Reports + Chart */}
        <div className="space-y-4">
          {/* Flagged teams alerts */}
          <GlassCard padding="p-5">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={16} className="text-red-400" />
              <h3 className="font-semibold text-white">Flagged Teams</h3>
              <Badge variant="error" className="ml-auto">{flaggedAlerts.length} alerts</Badge>
            </div>
            <div className="space-y-3">
              {flaggedAlerts.map((alert, i) => (
                <div key={i} className="glass-dark rounded-sm p-4 border-l-2 border-red-500 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar name={alert.member} size="sm" />
                      <div>
                        <p className="text-sm font-medium text-white">{alert.member}</p>
                        <p className="text-xs text-white/50">{alert.team}</p>
                      </div>
                    </div>
                    <Badge variant={alert.severity}>Flagged</Badge>
                  </div>
                  <p className="text-xs text-white/70">{alert.issue}</p>
                  <div className="flex gap-2 flex-wrap">
                    <Button variant="primary" size="sm" icon={<Eye size={12} />}>View Report</Button>
                    <Button variant="ghost" size="sm" icon={<MessageSquare size={12} />}>Comment</Button>
                    <Button variant="secondary" size="sm">Override</Button>
                    <Button variant="ghost" size="sm" icon={<BellOff size={12} />}>Mute</Button>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Report history */}
          <GlassCard padding="p-5">
            <h3 className="font-semibold text-white mb-4">Report History</h3>
            <div className="space-y-2">
              {reportHistory.map((r, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                  <div className="w-2 h-2 rounded-full bg-primary-400 shrink-0" />
                  <span className="text-sm text-white/80 flex-1">{r.team}</span>
                  <Badge variant={r.type === 'Flagged' ? 'error' : 'info'}>{r.type}</Badge>
                  <span className="text-xs text-white/40">{r.date}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Analytics chart */}
          <GlassCard padding="p-5">
            <h3 className="font-semibold text-white mb-4">Team Score Overview</h3>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={analyticsData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                  {analyticsData.map((d, i) => (
                    <Cell key={i} fill={d.score < 50 ? '#ef4444' : d.score < 70 ? '#f59e0b' : '#10b981'} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>
        </div>
      </div>

      {/* Professor Announcement */}
      <GlassCard padding="p-5">
        <div className="flex items-center gap-2 mb-4">
          <Megaphone size={16} className="text-amber-400" />
          <h3 className="font-semibold text-white">Post Announcement to All Teams</h3>
        </div>
        <div className="flex gap-3">
          <textarea
            placeholder="Write an announcement for all teams in this course..."
            value={announcement}
            onChange={e => setAnnouncement(e.target.value)}
            rows={3}
            className="flex-1 input-field py-3 resize-none"
          />
          <Button
            icon={<Send size={16} />}
            className="self-end"
            disabled={!announcement.trim()}
            onClick={() => setAnnouncement('')}
          >
            Post
          </Button>
        </div>
      </GlassCard>
    </div>
  );
}
