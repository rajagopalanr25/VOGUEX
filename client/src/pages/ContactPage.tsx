import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useUIStore } from '../store/useUIStore';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const showToast = useUIStore((state) => state.showToast);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    showToast('Your concierge inquiry has been assigned to a Senior Private Stylist.', 'success');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-[#C6A76B] font-bold">
          VIP Concierge & Appointments
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">
          Connect With The Atelier
        </h1>
        <p className="text-xs text-neutral-500">
          Schedule a private digital styling appointment or request bespoke tailoring advice.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-6">
          <h3 className="font-serif text-xl font-bold text-neutral-900">Global Salons</h3>

          <div className="space-y-4 text-xs text-neutral-600">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#C6A76B] mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-black">Milan Headquarters</p>
                <p>Via Monte Napoleone 8, 20121 Milano, Italy</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#C6A76B] mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-black">New York Salon</p>
                <p>742 Fifth Avenue, Suite 14B, NY 10019</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#C6A76B] mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-black">Direct Concierge Wire</p>
                <p>+1 (800) 864-8399 / +39 02 8921 440</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#C6A76B] mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-black">Digital Inquiries</p>
                <p>concierge@voguex.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-5">
          <h3 className="font-serif text-xl font-bold text-neutral-900">Direct Inscription</h3>

          {sent ? (
            <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <p className="font-serif font-bold text-base">Inquiry Successfully Routed</p>
              <p className="text-xs">Your dedicated concierge representative will respond within 4 business hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Lord / Lady Vance"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@domain.com"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">Inquiry / Custom Commission</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Detail your request regarding sizing, private salon viewings, or bespoke fabrics..."
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#111111] hover:bg-[#C6A76B] hover:text-black text-white py-3.5 rounded-xl uppercase tracking-widest font-semibold transition-all shadow-md"
              >
                <span>Dispatch to Private Concierge</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
