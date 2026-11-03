import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useUIStore } from '../store/useUIStore';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const showToast = useUIStore((state) => state.showToast);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    showToast('Secure recovery link dispatched to your inbox.', 'success');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24">
      <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-xl space-y-6 text-center">
        <span className="text-xs uppercase tracking-widest text-[#C6A76B] font-bold">
          Account Security
        </span>
        <h1 className="font-serif text-3xl font-bold text-neutral-900">Reset Password</h1>
        <p className="text-xs text-neutral-500 max-w-sm mx-auto">
          Enter your registered email address to receive an exclusive cryptographic reset token.
        </p>

        {sent ? (
          <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-800 space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <p className="font-bold text-sm">Dispatched Successfully</p>
            <p>If an atelier account exists for <strong>{email}</strong>, instructions have been sent.</p>
            <Link to="/login" className="inline-block mt-3 font-bold text-black underline">
              Return to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@voguex.com"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#C6A76B]"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#111111] hover:bg-[#C6A76B] hover:text-black text-white py-3.5 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all shadow-lg"
            >
              <span>Dispatch Recovery Instructions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="pt-2 border-t border-neutral-100 text-xs text-neutral-500">
          <Link to="/login" className="font-bold text-[#997b41] hover:underline">
            ← Return to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
