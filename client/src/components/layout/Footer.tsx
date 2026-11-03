import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield, Truck, RefreshCw, Award } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const showToast = useUIStore((state) => state.showToast);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Welcome to the VOGUEX Private Circle. Exclusive invitations dispatched.', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-[#111111] text-white pt-16 pb-12 border-t border-[#C6A76B]/20">
      {/* Guarantees Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-neutral-800">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-neutral-900 border border-[#C6A76B]/30 text-[#C6A76B]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">White-Glove Courier</h4>
              <p className="text-[11px] text-neutral-400 mt-0.5">Complimentary express shipping on $200+</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-neutral-900 border border-[#C6A76B]/30 text-[#C6A76B]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Bespoke Authenticity</h4>
              <p className="text-[11px] text-neutral-400 mt-0.5">Individually certified atelier items</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-neutral-900 border border-[#C6A76B]/30 text-[#C6A76B]">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Effortless Returns</h4>
              <p className="text-[11px] text-neutral-400 mt-0.5">30-day global complimentary returns</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-neutral-900 border border-[#C6A76B]/30 text-[#C6A76B]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Italian & Japanese Weaves</h4>
              <p className="text-[11px] text-neutral-400 mt-0.5">100% natural organic master textiles</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-2 space-y-5">
            <div>
              <span className="font-serif tracking-[0.3em] text-2xl font-extrabold text-white">
                VOGUEX
              </span>
              <span className="block text-[9px] tracking-[0.45em] text-[#C6A76B] uppercase font-semibold">
                THE GLOBAL ATELIER
              </span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              Bridging classical European tailoring, Japanese textile artistry, and 3D digital innovation. Designed for the modern discerning individual.
            </p>

            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#C6A76B] mb-2">
                Join the Private Circle (10% Off First Acquisition)
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-sm text-[#C6A76B]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Invitation dispatched to your inbox.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your private email..."
                    className="flex-1 bg-neutral-900 border border-neutral-700 px-4 py-3 rounded-l-lg text-sm text-white focus:outline-none focus:border-[#C6A76B]"
                  />
                  <button
                    type="submit"
                    className="bg-[#C6A76B] text-black px-5 py-3 rounded-r-lg hover:bg-[#b39459] transition-colors flex items-center justify-center"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#C6A76B] mb-4">Collections</h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li><Link to="/shop?category=Men" className="hover:text-white transition-colors">Men's Atelier</Link></li>
              <li><Link to="/shop?category=Women" className="hover:text-white transition-colors">Women's Privé</Link></li>
              <li><Link to="/shop?category=Kids" className="hover:text-white transition-colors">Junior Editions</Link></li>
              <li><Link to="/shop?category=New%20Arrivals" className="hover:text-white transition-colors">New Releases</Link></li>
              <li><Link to="/shop?category=Best%20Sellers" className="hover:text-white transition-colors">Perennial Icons</Link></li>
              <li><Link to="/#atelier-3d" className="hover:text-white transition-colors">3D Interactive Models</Link></li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#C6A76B] mb-4">Client Concierge</h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li><Link to="/track" className="hover:text-white transition-colors">Live Order Tracking</Link></li>
              <li><Link to="/profile" className="hover:text-white transition-colors">Client Profile</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Care & Sizing Guide</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">VIP Private Styling</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Sartorial Heritage</Link></li>
            </ul>
          </div>

          {/* Flagship Ateliers */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#C6A76B] mb-4">Global Boutiques</h4>
            <div className="space-y-3 text-xs text-neutral-400">
              <div>
                <p className="text-white font-medium">Milan Flagship</p>
                <p>Via Monte Napoleone 8, 20121</p>
              </div>
              <div>
                <p className="text-white font-medium">Paris Salon</p>
                <p>Place Vendôme 14, 75001</p>
              </div>
              <div>
                <p className="text-white font-medium">New York Atelier</p>
                <p>742 Fifth Avenue, NY 10019</p>
              </div>
              <div>
                <p className="text-white font-medium">Tokyo Ginza</p>
                <p>6-10-1 Ginza, Chuo-ku 104-0061</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Payment Options */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
        <p>© 2026 VOGUEX Atelier International Inc. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link to="/privacy" className="hover:text-neutral-400">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-neutral-400">Terms of Service</Link>
          <Link to="/shipping" className="hover:text-neutral-400">Shipping Policy</Link>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-300">Razorpay</span>
          <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-300">Stripe</span>
          <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-300">Apple Pay</span>
          <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-300">UPI / COD</span>
        </div>
      </div>
    </footer>
  );
};

