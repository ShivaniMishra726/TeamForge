import { useState } from 'react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip,
} from 'recharts';
import { UserPlus, GripVertical, AlertTriangle, Info, X } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import clsx from 'clsx';

const radarData = [
  { skill: 'Frontend', value: 85 },
  { skill: 'Backend', value: 30 },
  { skill: 'Design', value: 75 },
  { skill: 'DevOps', value: 50 },
  { skill: 'Data', value: 60 },
  { skill: 'Testing', value: 45 },
];

const teamMembers = [
  { name: 'Alex Johnson', role: 'Frontend Dev', skills: ['React', 'TypeScript', 'CSS'], you: true },
  { name: 'Mia Chen', role: 'Data Scientist', skills: ['Python', 'ML', 'Data Analysis'] },
  { name: 'Sam Lee', role: 'UI Designer', skills: ['Figma', 'Design', 'React'] },
  { name: 'Casey Torres', role: 'DevOps', skills: ['Docker', 'CI/CD', 'Linux'] },
];

const skillMatrix = [
  { skill: 'React', members: [true, false, true, false] },
  { skill: 'Python', members: [false, true, false, false] },
  { skill: 'Design', members: [true, false, true, false] },
  { skill: 'DevOps', members: [false, false, false, true] },
  { skill: 'Data', members: [false, true, false, false] },
  { skill: 'Backend', members: [false, false, false, false] },
  { skill: 'Testing', members: [true, false, false, false] },
];

const recommendations = [
  { type: 'error' as const, message: 'Your team is missing a Backend Developer' },
  { type: 'warning' as const, message: 'Consider adding Data Analysis expertise' },
  { type: 'info' as const, message: 'Testing coverage could be improved' },
];

const suggestedRoles = ['Backend Developer', 'Full Stack Engineer', 'Data Engineer', 'QA Engineer'];

function CoverageCell({ covered }: { covered: boolean }) {
  return (
    <div className={clsx(
      'w-7 h-7 rounded-sm flex items-center justify-center text-xs font-medium transition-colors',
      covered ? 'bg-emerald-500/30 text-emerald-400 border border-emerald-500/40' : 'bg-white/5 text-white/20 border border-white/10',
    )}>
      {covered ? '✓' : '—'}
    </div>
  );
}

export default function TeamBuilder() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  const fitScore = 87;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Team Builder</h2>
          <p className="text-white/50 text-sm mt-0.5">Manage your team composition and skill coverage</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass rounded-sm px-4 py-2 text-center">
            <p className="text-xs text-white/50">Team Fit Score</p>
            <p className="text-xl font-bold text-primary-400">{fitScore}<span className="text-sm text-white/40">/100</span></p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Team members */}
        <div className="space-y-4">
          <GlassCard padding="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white">Team Members <span className="text-white/40 text-sm">({teamMembers.length})</span></h3>
              <Button variant="primary" size="sm" icon={<UserPlus size={14} />} onClick={() => setShowAddModal(true)}>
                Add Member
              </Button>
            </div>
            <div className="space-y-2">
              {teamMembers.map((member) => (
                <div key={member.name} className="glass-dark rounded-sm p-3 flex items-center gap-3">
                  <GripVertical size={14} className="text-white/20 cursor-grab shrink-0" />
                  <Avatar name={member.name} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-white truncate">{member.name}</p>
                      {member.you && <Badge variant="info">You</Badge>}
                    </div>
                    <p className="text-xs text-white/50">{member.role}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {member.skills.map(s => <span key={s} className="tag text-xs">{s}</span>)}
                    </div>
                  </div>
                  <button className="text-white/20 hover:text-red-400 transition-colors focus-ring rounded p-1">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Skill Coverage Grid */}
          <GlassCard padding="p-5">
            <h3 className="font-semibold text-white mb-4">Skill Coverage Matrix</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr>
                    <th className="text-left text-white/40 font-medium py-1 pr-3 w-20">Skill</th>
                    {teamMembers.map(m => (
                      <th key={m.name} className="text-center text-white/40 font-medium py-1 px-1 w-9">
                        {m.name.split(' ')[0].slice(0, 3)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="space-y-1">
                  {skillMatrix.map(row => (
                    <tr key={row.skill}>
                      <td className="text-white/60 pr-3 py-1">{row.skill}</td>
                      {row.members.map((covered, i) => (
                        <td key={i} className="px-1 py-1 text-center">
                          <CoverageCell covered={covered} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex gap-4 mt-3 text-xs text-white/40">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-emerald-500/30 border border-emerald-500/40 inline-block" /> Covered</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-white/5 border border-white/10 inline-block" /> Missing</span>
            </div>
          </GlassCard>
        </div>

        {/* Right: Radar + Recommendations */}
        <div className="space-y-4">
          <GlassCard padding="p-5">
            <h3 className="font-semibold text-white mb-4">Skills Radar</h3>
            <ResponsiveContainer width="100%" height={240}>
              <RadarChart data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11 }} />
                <Radar
                  dataKey="value"
                  stroke="#5B6CFF"
                  fill="#5B6CFF"
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
                <Tooltip
                  formatter={(v) => [`${v}%`, 'Proficiency']}
                  contentStyle={{ background: 'rgba(11,16,32,0.9)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', fontSize: 12 }}
                  labelStyle={{ color: 'rgba(255,255,255,0.6)' }}
                  itemStyle={{ color: '#5B6CFF' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </GlassCard>

          <GlassCard padding="p-5">
            <h3 className="font-semibold text-white mb-4">Gap Recommendations</h3>
            <div className="space-y-3">
              {recommendations.map((r, i) => (
                <div key={i} className={clsx(
                  'flex items-start gap-3 p-3 rounded-sm border',
                  r.type === 'error' ? 'bg-red-500/10 border-red-500/30' : r.type === 'warning' ? 'bg-amber-500/10 border-amber-500/30' : 'bg-primary-500/10 border-primary-500/30',
                )}>
                  {r.type === 'error' ? <AlertTriangle size={15} className="text-red-400 shrink-0 mt-0.5" /> : <Info size={15} className={clsx('shrink-0 mt-0.5', r.type === 'warning' ? 'text-amber-400' : 'text-primary-400')} />}
                  <p className="text-sm text-white/80">{r.message}</p>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Suggested Roles to Add</p>
              <div className="flex flex-wrap gap-2">
                {suggestedRoles.map(role => (
                  <button key={role} className="tag hover:bg-primary-500/20 hover:text-primary-300 hover:border-primary-500/40 transition-colors text-xs focus-ring rounded-full">
                    + {role}
                  </button>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Add Member Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add Team Member">
        <div className="space-y-4">
          <p className="text-sm text-white/60">Search for a partner or invite by email.</p>
          <Input
            label="Search or Invite"
            placeholder="Name or university email..."
            value={inviteEmail}
            onChange={e => setInviteEmail(e.target.value)}
            icon={<UserPlus size={15} />}
          />
          <div className="flex gap-2 pt-2">
            <Button variant="primary" className="flex-1">Send Invite</Button>
            <Button variant="ghost" onClick={() => setShowAddModal(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
