import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useUIStore } from '../store/useUIStore';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const showToast = useUIStore((state) => state.showToast);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    try {
      await login({ email, password });
      showToast('Welcome back to VOGUEX Atelier.', 'success');
      navigate('/');
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Authentication failed. Please verify credentials.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const autofillAdmin = () => {
    setEmail('admin@voguex.com');
    setPassword('admin123');
    showToast('Admin Director credentials loaded.', 'info');
  };

  const autofillCustomer = () => {
    setEmail('customer@voguex.com');
    setPassword('admin123');
    showToast('VIP Client credentials loaded.', 'info');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24">
      <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#C6A76B] font-bold">
            Private Client Access
          </span>
          <h1 className="font-serif text-3xl font-bold text-neutral-900">Sign In to Atelier</h1>
          <p className="text-xs text-neutral-500">Access exclusive commissions, saved sizes & order telemetry.</p>
        </div>

        {/* Quick Demo Autofill Helpers */}
        <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200 text-xs space-y-2">
          <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-400 block text-center">
            One-Click Demo Credentials
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={autofillAdmin}
              className="py-1.5 px-2 rounded-lg bg-neutral-900 text-[#C6A76B] text-[11px] font-semibold hover:bg-black transition-colors"
            >
              👑 Demo Admin
            </button>
            <button
              type="button"
              onClick={autofillCustomer}
              className="py-1.5 px-2 rounded-lg bg-neutral-200 text-neutral-800 text-[11px] font-semibold hover:bg-neutral-300 transition-colors"
            >
              ✨ Demo VIP Client
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@voguex.com"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#C6A76B]"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-700">Password</label>
              <Link to="/forgot-password" className="text-[11px] text-[#C6A76B] hover:underline font-semibold">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#C6A76B]"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#111111] hover:bg-[#C6A76B] hover:text-black text-white py-3.5 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all shadow-lg"
          >
            {loading ? 'Authenticating...' : 'Sign In to Atelier'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-neutral-100 text-xs text-neutral-500">
          <span>Not yet a member of the circle? </span>
          <Link to="/register" className="font-bold text-[#997b41] hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};
