import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Shield, Lock, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { GlassCard } from '../../components/ui/GlassCard';
import { useApp } from '../../context/AppContext';

export default function SignIn() {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    setUser({ name: 'Alex Johnson', role: 'student', email: email || 'alex@university.edu' });
    setIsAuthenticated(true);
    setLoading(false);
    navigate('/dashboard');
  };

  const handleSSO = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    setUser({ name: 'Alex Johnson', role: 'student', email: 'alex@university.edu' });
    setIsAuthenticated(true);
    setLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-md mb-4 shadow-glow">
            <span className="text-white font-bold text-xl">TF</span>
          </div>
          <h1 className="text-3xl font-bold gradient-text">TeamForge</h1>
          <p className="text-white/50 mt-1 text-sm">Collaborative project management for academia</p>
        </div>

        <GlassCard>
          <h2 className="text-xl font-semibold text-white mb-6">Welcome back</h2>
          <form onSubmit={handleSignIn} className="space-y-4">
            <Input
              label="Institutional Email"
              type="email"
              placeholder="you@university.edu"
              value={email}
              onChange={e => setEmail(e.target.value)}
              icon={<Shield size={15} />}
              required
            />
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              icon={<Lock size={15} />}
              iconRight={
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  className="text-white/40 hover:text-white/70 transition-colors focus-ring rounded"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              }
            />
            <Button type="submit" className="w-full" disabled={loading} icon={<ArrowRight size={16} />}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 border-t border-white/10" />
            <span className="text-xs text-white/30">or</span>
            <div className="flex-1 border-t border-white/10" />
          </div>

          <div className="mt-4 space-y-2">
            <Button variant="secondary" className="w-full" icon={<Shield size={16} />} onClick={handleSSO} disabled={loading}>
              Continue with SSO
            </Button>
            <p className="text-center text-xs text-white/40">
              Institutional SSO — Secure single sign-on via your university
            </p>
          </div>

          <p className="mt-6 text-center text-sm text-white/50">
            Don't have an account?{' '}
            <button onClick={() => navigate('/auth/signup')} className="text-primary-400 hover:text-primary-300 transition-colors font-medium focus-ring rounded">
              Sign Up
            </button>
          </p>
        </GlassCard>

        {/* Privacy notices */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 justify-center">
            <Lock size={12} className="text-white/30" />
            <p className="text-xs text-white/40 text-center">
              Your data is protected and only accessible to your institution
            </p>
          </div>
          <p className="text-xs text-white/30 text-center">
            Sessions expire after 8 hours for security
          </p>
        </div>
      </div>
    </div>
  );
}
