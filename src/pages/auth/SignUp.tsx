import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User, Building } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { GlassCard } from '../../components/ui/GlassCard';
import { useApp } from '../../context/AppContext';

const universities = [
  'MIT', 'Stanford University', 'Harvard University', 'UC Berkeley',
  'Carnegie Mellon University', 'Georgia Tech', 'University of Michigan',
  'Caltech', 'Cornell University', 'Princeton University', 'Other',
];

export default function SignUp() {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useApp();
  const [form, setForm] = useState({
    email: '', name: '', password: '', confirmPassword: '', university: '',
  });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [k]: e.target.value }));
    if (k === 'email') setEmailError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email.endsWith('.edu')) {
      setEmailError('Must use institutional email (.edu)');
      return;
    }
    if (form.password !== form.confirmPassword) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    setUser({ name: form.name || 'New User', role: 'student', email: form.email });
    setIsAuthenticated(true);
    setLoading(false);
    navigate('/auth/role');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-md mb-4 shadow-glow">
            <span className="text-white font-bold text-xl">TF</span>
          </div>
          <h1 className="text-3xl font-bold gradient-text">TeamForge</h1>
          <p className="text-white/50 mt-1 text-sm">Create your academic account</p>
        </div>

        <GlassCard>
          <h2 className="text-xl font-semibold text-white mb-6">Create Account</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Institutional Email"
              type="email"
              placeholder="you@university.edu"
              value={form.email}
              onChange={set('email')}
              icon={<Mail size={15} />}
              error={emailError}
              required
            />
            <p className="text-xs text-white/40 -mt-2 pl-1">Must use institutional email (.edu)</p>

            <Input
              label="Full Name"
              type="text"
              placeholder="Your full name"
              value={form.name}
              onChange={set('name')}
              icon={<User size={15} />}
              required
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-white/80">University / Institution</label>
              <div className="relative">
                <Building size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                <select
                  value={form.university}
                  onChange={set('university')}
                  required
                  className="input-field pl-10 appearance-none focus-ring cursor-pointer"
                >
                  <option value="" disabled>Select your institution</option>
                  {universities.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
            </div>

            <Input
              label="Password"
              type={showPw ? 'text' : 'password'}
              placeholder="Create a strong password"
              value={form.password}
              onChange={set('password')}
              icon={<Lock size={15} />}
              iconRight={
                <button type="button" onClick={() => setShowPw(s => !s)} className="focus-ring rounded" aria-label="Toggle password">
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              }
              required
            />

            <Input
              label="Confirm Password"
              type={showPw ? 'text' : 'password'}
              placeholder="Confirm your password"
              value={form.confirmPassword}
              onChange={set('confirmPassword')}
              icon={<Lock size={15} />}
              error={form.confirmPassword && form.password !== form.confirmPassword ? 'Passwords do not match' : ''}
              required
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 border-t border-white/10" />
            <span className="text-xs text-white/30">or</span>
            <div className="flex-1 border-t border-white/10" />
          </div>

          <Button variant="secondary" className="w-full mt-4" icon={<Lock size={16} />}>
            Sign Up with SSO
          </Button>

          <p className="mt-6 text-center text-sm text-white/50">
            Already have an account?{' '}
            <button onClick={() => navigate('/auth/signin')} className="text-primary-400 hover:text-primary-300 transition-colors font-medium focus-ring rounded">
              Sign In
            </button>
          </p>
        </GlassCard>

        <div className="mt-4 flex items-center gap-2 justify-center">
          <Lock size={12} className="text-white/30" />
          <p className="text-xs text-white/40 text-center">Your data is protected and only accessible to your institution</p>
        </div>
      </div>
    </div>
  );
}
