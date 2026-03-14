
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, FileText, Lock, CheckCircle } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import { ProgressBar } from '../../components/ui/ProgressBar';

const members = [
  { name: 'Alex Johnson', role: 'Frontend Dev', contribution: 30 },
  { name: 'Mia Chen', role: 'Data Scientist', contribution: 25 },
  { name: 'Sam Lee', role: 'UI Designer', contribution: 20 },
  { name: 'Jake Park', role: 'Backend Dev', contribution: 15 },
  { name: 'Casey Torres', role: 'DevOps', contribution: 10 },
];

const weeklyContributions = [
  { week: 'W1', Alex: 5, Mia: 4, Sam: 3, Jake: 2, Casey: 4 },
  { week: 'W2', Alex: 6, Mia: 5, Sam: 4, Jake: 3, Casey: 5 },
  { week: 'W3', Alex: 4, Mia: 6, Sam: 3, Jake: 2, Casey: 3 },
  { week: 'W4', Alex: 7, Mia: 4, Sam: 5, Jake: 2, Casey: 4 },
];

const skillMatrix = [
  { skill: 'React', coverage: [true, false, true, false, false] },
  { skill: 'Python', coverage: [false, true, false, false, false] },
  { skill: 'Design', coverage: [true, false, true, false, false] },
  { skill: 'Backend', coverage: [false, false, false, true, false] },
  { skill: 'DevOps', coverage: [false, false, false, false, true] },
];

const milestones = [
  { name: 'Requirements', status: 'success' as const, date: 'Nov 15', complete: true },
  { name: 'Design Mockups', status: 'success' as const, date: 'Nov 29', complete: true },
  { name: 'Backend API', status: 'warning' as const, date: 'Dec 13', complete: false },
  { name: 'Frontend UI', status: 'info' as const, date: 'Dec 20', complete: false },
  { name: 'Testing', status: 'neutral' as const, date: 'Jan 10', complete: false },
  { name: 'Final Submission', status: 'error' as const, date: 'Jan 17', complete: false },
];

const blockers = [
  { text: 'Backend API delayed due to unexpected auth complexity.', status: 'warning' as const },
  { text: 'Waiting on professor feedback on design direction.', status: 'info' as const },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="glass rounded-sm px-3 py-2">
        <p className="text-xs text-white/60 mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.dataKey} className="text-xs" style={{ color: p.color }}>{p.dataKey}: {p.value}h</p>
        ))}
      </div>
    );
  }
  return null;
};

const COLORS = ['#5B6CFF', '#8A7CFF', '#00D4FF', '#F59E0B', '#10B981'];

export default function ReportView() {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      {/* Report Header */}
      <GlassCard>
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileText size={20} className="text-primary-400" />
              <h2 className="text-xl font-bold text-white">Project Report</h2>
            </div>
            <div className="space-y-1 text-sm text-white/60">
              <p><span className="text-white/40">Project:</span> <span className="text-white">AI Study Assistant</span></p>
              <p><span className="text-white/40">Team:</span> <span className="text-white">Team Alpha</span></p>
              <p><span className="text-white/40">Generated:</span> <span className="text-white">{new Date().toLocaleDateString('en-US', { dateStyle: 'long' })}</span></p>
              <p><span className="text-white/40">Instructor:</span> <span className="text-white">Prof. Martinez</span></p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button icon={<Download size={16} />} size="lg">Generate PDF</Button>
            <Button variant="ghost" icon={<FileText size={16} />}>Export CSV</Button>
          </div>
        </div>
        {/* Audit trail */}
        <div className="mt-4 flex items-center gap-2 px-3 py-2 glass-dark rounded-sm">
          <Lock size={13} className="text-emerald-400 shrink-0" />
          <p className="text-xs text-white/60">Contribution logs are <span className="text-emerald-400 font-medium">append-only and tamper-evident</span>. All data is cryptographically signed.</p>
        </div>
      </GlassCard>

      {/* Section 1: Team Composition */}
      <GlassCard>
        <h3 className="text-lg font-semibold text-white mb-4">1. Team Composition</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {members.map(m => (
            <div key={m.name} className="glass-dark rounded-sm p-3 flex items-center gap-3">
              <Avatar name={m.name} size="md" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">{m.name}</p>
                <p className="text-xs text-white/50">{m.role}</p>
                <p className="text-xs text-primary-400 mt-0.5">{m.contribution}% contribution</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Section 2: Skill Matrix */}
      <GlassCard>
        <h3 className="text-lg font-semibold text-white mb-4">2. Skill Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left text-white/40 font-medium py-2 pr-4">Skill</th>
                {members.map(m => (
                  <th key={m.name} className="text-center text-white/40 font-medium py-2 px-2 min-w-[60px]">
                    {m.name.split(' ')[0]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {skillMatrix.map(row => (
                <tr key={row.skill} className="border-t border-white/5">
                  <td className="py-2 pr-4 text-white/70">{row.skill}</td>
                  {row.coverage.map((has, i) => (
                    <td key={i} className="text-center py-2">
                      {has
                        ? <CheckCircle size={15} className="text-emerald-400 mx-auto" />
                        : <span className="text-white/15 text-xs">—</span>
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Section 3: Weekly Contributions */}
      <GlassCard>
        <h3 className="text-lg font-semibold text-white mb-4">3. Weekly Contributions</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={weeklyContributions} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
            <XAxis dataKey="week" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
            {members.map((m, i) => (
              <Bar key={m.name} dataKey={m.name.split(' ')[0]} stackId="a" fill={COLORS[i]} radius={i === members.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]} />
            ))}
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr>
                <th className="text-left text-white/40 py-2 pr-4">Member</th>
                <th className="text-left text-white/40 py-2 px-2">Role</th>
                <th className="text-right text-white/40 py-2 px-2">Total Hours</th>
                <th className="text-right text-white/40 py-2">Share</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m, i) => (
                <tr key={m.name} className="border-t border-white/5">
                  <td className="py-2 pr-4 text-white/80 font-medium">{m.name}</td>
                  <td className="py-2 px-2 text-white/50">{m.role}</td>
                  <td className="py-2 px-2 text-right font-mono text-white/70">{Math.round(m.contribution * 0.5 + 10)}h</td>
                  <td className="py-2 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <ProgressBar value={m.contribution} size="sm" className="w-16" color={i === 3 ? 'warning' : 'primary'} />
                      <span className="text-white/60 w-8">{m.contribution}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Section 4: Milestones */}
      <GlassCard>
        <h3 className="text-lg font-semibold text-white mb-4">4. Milestone Progress</h3>
        <div className="space-y-2">
          {milestones.map((m, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
              <CheckCircle size={15} className={m.complete ? 'text-emerald-400' : 'text-white/15'} />
              <span className="flex-1 text-sm text-white/80">{m.name}</span>
              <span className="text-xs text-white/40">{m.date}</span>
              <Badge variant={m.status}>{m.complete ? 'Done' : m.status === 'error' ? 'Deadline' : m.status === 'warning' ? 'At Risk' : m.status === 'info' ? 'In Progress' : 'Not Started'}</Badge>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Section 5: Blockers */}
      <GlassCard>
        <h3 className="text-lg font-semibold text-white mb-4">5. Blockers & Issues</h3>
        <div className="space-y-3">
          {blockers.map((b, i) => (
            <div key={i} className={`flex items-start gap-3 p-3 rounded-sm border ${b.status === 'warning' ? 'bg-amber-500/10 border-amber-500/30' : 'bg-primary-500/10 border-primary-500/30'}`}>
              <span className={`text-xs font-semibold uppercase tracking-wider ${b.status === 'warning' ? 'text-amber-400' : 'text-primary-400'}`}>
                {b.status === 'warning' ? 'Blocker' : 'Pending'}
              </span>
              <p className="text-sm text-white/80">{b.text}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
