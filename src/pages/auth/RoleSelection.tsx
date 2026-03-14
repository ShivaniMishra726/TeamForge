import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Building, UserCheck, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useApp } from '../../context/AppContext';
import type { UserRole } from '../../context/AppContext';
import clsx from 'clsx';

const roles: { id: UserRole; label: string; description: string; icon: React.ReactNode; color: string }[] = [
  {
    id: 'student',
    label: 'Student',
    description: 'Collaborate on projects, track contributions, find teammates and manage workloads.',
    icon: <GraduationCap size={32} />,
    color: 'from-primary-500/20 to-primary-600/10 border-primary-500/30',
  },
  {
    id: 'professor',
    label: 'Professor',
    description: 'Monitor team progress, view analytics, generate reports and manage course teams.',
    icon: <Building size={32} />,
    color: 'from-secondary-500/20 to-primary-500/10 border-secondary-500/30',
  },
  {
    id: 'ta',
    label: 'Teaching Assistant',
    description: 'Assist with team formation, review contributions and support students.',
    icon: <UserCheck size={32} />,
    color: 'from-accent-500/20 to-primary-500/10 border-accent-500/30',
  },
];

export default function RoleSelection() {
  const navigate = useNavigate();
  const { user, setUser } = useApp();
  const [selected, setSelected] = useState<UserRole | null>(null);

  const handleContinue = () => {
    if (!selected || !user) return;
    setUser({ ...user, role: selected });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold gradient-text mb-2">Select Your Role</h1>
          <p className="text-white/50">Choose the role that best describes your position in the course.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {roles.map((role) => {
            const isSelected = selected === role.id;
            return (
              <button
                key={role.id}
                onClick={() => setSelected(role.id)}
                className={clsx(
                  'group relative text-left rounded-md p-6 border transition-all duration-200 cursor-pointer focus-ring',
                  'bg-gradient-to-b',
                  role.color,
                  isSelected
                    ? 'border-primary-500 shadow-glow ring-1 ring-primary-500/50'
                    : 'glass hover:border-white/25',
                )}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                )}
                <div className={clsx('mb-4 transition-colors', isSelected ? 'text-primary-400' : 'text-white/60 group-hover:text-white/80')}>
                  {role.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{role.label}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{role.description}</p>
                <div className="mt-4">
                  <span className={clsx(
                    'text-xs font-medium px-3 py-1 rounded-full border',
                    isSelected ? 'bg-primary-500/20 text-primary-400 border-primary-500/40' : 'bg-white/5 text-white/40 border-white/10',
                  )}>
                    {isSelected ? 'Selected' : 'Select Role'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleContinue}
            disabled={!selected}
            size="lg"
            icon={<ArrowRight size={18} />}
            className="min-w-40"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
