import React from 'react';
import { Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#111111] text-[#C6A76B] text-[11px] sm:text-xs tracking-widest uppercase font-medium py-2 px-4 border-b border-[#C6A76B]/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center gap-2 text-neutral-400">
          <span>MILAN</span> • <span>PARIS</span> • <span>NEW YORK</span> • <span>TOKYO</span>
        </div>
        <div className="flex items-center justify-center gap-2 mx-auto md:mx-0">
          <Sparkles className="w-3.5 h-3.5 text-[#C6A76B]" />
          <span>COMPLIMENTARY WORLDWIDE WHITE-GLOVE SHIPPING ON ORDERS OVER $200 • USE CODE <strong>GOLD20</strong></span>
        </div>
        <div className="hidden lg:flex items-center gap-4 text-neutral-400">
          <span>CURRENCY: USD ($)</span>
          <a href="/concierge" className="hover:text-[#C6A76B] transition-colors">VIP CONCIERGE</a>
        </div>
      </div>
    </div>
  );
};

