import { useState } from 'react';
import { Search, Filter, Star, MapPin, Check } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import clsx from 'clsx';

const skills = ['React', 'Python', 'ML', 'Design', 'Backend', 'Data Analysis'];
const courses = ['CS401', 'CS310', 'DS501', 'SE420'];
const availabilities = ['Full-time', 'Part-time', 'Weekends'];
const semesters = ['Spring 2025', 'Fall 2025', 'Spring 2026'];
const timezones = ['EST', 'PST', 'CST', 'GMT', 'CET'];

const partners = [
  {
    id: 1, name: 'Sam Lee', university: 'MIT', reliability: 4.8, verified: true, online: true,
    skills: [{ name: 'React', level: 9 }, { name: 'TypeScript', level: 8 }, { name: 'Design', level: 6 }],
    availability: 'Full-time', pastProjects: ['E-Commerce App', 'Dashboard UI'],
    days: [1, 1, 1, 0, 1, 0, 0],
  },
  {
    id: 2, name: 'Mia Chen', university: 'Stanford', reliability: 4.9, verified: true, online: true,
    skills: [{ name: 'Python', level: 10 }, { name: 'ML', level: 9 }, { name: 'Data Analysis', level: 8 }],
    availability: 'Part-time', pastProjects: ['ML Pipeline', 'Sentiment Analyzer'],
    days: [0, 1, 1, 1, 0, 0, 0],
  },
  {
    id: 3, name: 'Jake Park', university: 'Carnegie Mellon', reliability: 4.5, verified: false, online: false,
    skills: [{ name: 'Backend', level: 9 }, { name: 'Python', level: 7 }, { name: 'DevOps', level: 6 }],
    availability: 'Full-time', pastProjects: ['REST API', 'Microservices'],
    days: [1, 0, 1, 1, 1, 0, 0],
  },
  {
    id: 4, name: 'Riley Kim', university: 'UC Berkeley', reliability: 4.7, verified: true, online: true,
    skills: [{ name: 'Design', level: 10 }, { name: 'React', level: 7 }, { name: 'Figma', level: 9 }],
    availability: 'Weekends', pastProjects: ['Brand Identity', 'Mobile App UI'],
    days: [0, 0, 0, 0, 1, 1, 0],
  },
  {
    id: 5, name: 'Casey Torres', university: 'Georgia Tech', reliability: 4.6, verified: true, online: false,
    skills: [{ name: 'Data Analysis', level: 9 }, { name: 'ML', level: 7 }, { name: 'Python', level: 8 }],
    availability: 'Part-time', pastProjects: ['Data Pipeline', 'Analytics Dashboard'],
    days: [1, 1, 0, 1, 0, 0, 0],
  },
  {
    id: 6, name: 'Jordan Wu', university: 'Cornell', reliability: 4.3, verified: false, online: true,
    skills: [{ name: 'Backend', level: 8 }, { name: 'React', level: 6 }, { name: 'TypeScript', level: 7 }],
    availability: 'Full-time', pastProjects: ['Chat Application', 'Auth System'],
    days: [1, 1, 1, 0, 0, 1, 0],
  },
];

const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

function StarRating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(s => (
        <Star key={s} size={11} className={s <= Math.round(value) ? 'text-amber-400 fill-amber-400' : 'text-white/20'} />
      ))}
      <span className="text-xs text-white/60 ml-1">{value}</span>
    </div>
  );
}

function SkillBar({ name, level }: { name: string; level: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-white/60 w-20 truncate">{name}</span>
      <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full" style={{ width: `${level * 10}%` }} />
      </div>
      <span className="text-xs text-white/40 w-4 text-right">{level}</span>
    </div>
  );
}

export default function PartnerMarketplace() {
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [sentInterest, setSentInterest] = useState<number[]>([]);

  const toggleSkill = (s: string) => {
    setSelectedSkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const filtered = partners.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.university.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedSkills.length > 0 && !selectedSkills.some(s => p.skills.some(ps => ps.name === s))) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="search"
            placeholder="Search by name, university, or skill..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-field pl-9"
          />
        </div>
        <Button variant="secondary" icon={<Filter size={15} />} onClick={() => setShowFilters(f => !f)}>
          Filters {selectedSkills.length > 0 && `(${selectedSkills.length})`}
        </Button>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <GlassCard padding="p-5" className="animate-slide-up">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div>
              <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {skills.map(s => (
                  <button
                    key={s}
                    onClick={() => toggleSkill(s)}
                    className={clsx(
                      'px-2.5 py-1 rounded-full text-xs font-medium border transition-all focus-ring',
                      selectedSkills.includes(s)
                        ? 'bg-primary-500/20 text-primary-400 border-primary-500/40'
                        : 'bg-white/5 text-white/50 border-white/10 hover:border-white/25',
                    )}
                  >
                    {selectedSkills.includes(s) && <Check size={10} className="inline mr-1" />}
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Course</p>
              <select className="input-field text-sm">
                <option value="">All courses</option>
                {courses.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Availability</p>
              <div className="space-y-1.5">
                {availabilities.map(a => (
                  <label key={a} className="flex items-center gap-2 text-sm text-white/70 cursor-pointer hover:text-white transition-colors">
                    <input type="checkbox" className="rounded" /> {a}
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Semester</p>
                <select className="input-field text-sm">
                  {semesters.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Timezone</p>
                <select className="input-field text-sm">
                  <option value="">Any timezone</option>
                  {timezones.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
          </div>
        </GlassCard>
      )}

      <p className="text-sm text-white/50">{filtered.length} partners found</p>
      <p className="text-xs text-white/30 lg:hidden">← Swipe to see more →</p>

      {/* Partner cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(partner => {
          const interested = sentInterest.includes(partner.id);
          return (
            <GlassCard key={partner.id} padding="p-5" className="flex flex-col gap-3 hover:border-white/25 transition-all duration-200">
              {/* Header */}
              <div className="flex items-start gap-3">
                <Avatar name={partner.name} size="md" online={partner.online} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="font-semibold text-white text-sm truncate">{partner.name}</p>
                    {partner.verified && (
                      <span className="badge-blue text-xs px-1.5 py-0 flex items-center gap-0.5">
                        <Check size={9} />Verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin size={10} className="text-white/30" />
                    <p className="text-xs text-white/50 truncate">{partner.university}</p>
                  </div>
                  <div className="mt-1"><StarRating value={partner.reliability} /></div>
                </div>
              </div>

              {/* Availability badge */}
              <Badge variant={partner.availability === 'Full-time' ? 'success' : partner.availability === 'Part-time' ? 'info' : 'neutral'}>
                {partner.availability}
              </Badge>

              {/* Skills */}
              <div className="space-y-1.5">
                {partner.skills.map(s => <SkillBar key={s.name} name={s.name} level={s.level} />)}
              </div>

              {/* Availability heatmap */}
              <div>
                <p className="text-xs text-white/40 mb-1">Weekly availability</p>
                <div className="flex gap-1">
                  {partner.days.map((active, i) => (
                    <div key={i} className="flex flex-col items-center gap-0.5">
                      <div className={clsx('w-6 h-4 rounded-sm text-xs', active ? 'bg-primary-500/40 border border-primary-500/50' : 'bg-white/5 border border-white/10')} />
                      <span className="text-xs text-white/30">{dayLabels[i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Past projects */}
              <div className="flex flex-wrap gap-1">
                {partner.pastProjects.map(p => <span key={p} className="tag text-xs">{p}</span>)}
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-auto pt-2 border-t border-white/8">
                <Button
                  variant={interested ? 'ghost' : 'primary'}
                  size="sm"
                  className="flex-1"
                  onClick={() => setSentInterest(prev => interested ? prev.filter(id => id !== partner.id) : [...prev, partner.id])}
                >
                  {interested ? '✓ Interest Sent' : 'Send Interest'}
                </Button>
                <Button variant="ghost" size="sm">View Profile</Button>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
