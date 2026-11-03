import React from 'react';
import { Sparkles, Award, Shield, Globe } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-[#C6A76B] font-bold">
          Sartorial Heritage & Digital Innovation
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-neutral-900 leading-tight">
          The Story of VOGUEX Atelier
        </h1>
        <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
          Founded in Milan with salons in Paris, New York, and Tokyo, VOGUEX represents the synthesis of traditional master craftsmanship and real-time 3D spatial commerce.
        </p>
      </div>

      <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border border-neutral-200">
        <img
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&q=85"
          alt="Atelier Tailors"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-8 text-white">
          <p className="font-serif text-lg italic max-w-lg">
            "We do not merely sew fabric; we sculpt silhouettes that command respect and endure through eras."
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        <div className="p-8 rounded-3xl bg-white border border-neutral-200 space-y-3">
          <Award className="w-8 h-8 text-[#C6A76B]" />
          <h3 className="font-serif text-lg font-bold text-neutral-900">Mulberry & Cashmere</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Every fiber is sourced from certified organic cooperatives in Como and Inner Mongolia. Chemical-free washing preserves natural tensile elasticity.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-neutral-200 space-y-3">
          <Sparkles className="w-8 h-8 text-[#C6A76B]" />
          <h3 className="font-serif text-lg font-bold text-neutral-900">Real-Time 3D Fitting</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Pioneering browser-based WebGL simulations allowing patrons to scrutinize light fall, shoulder padding, and lapel curvature in three dimensions.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-neutral-200 space-y-3">
          <Globe className="w-8 h-8 text-[#C6A76B]" />
          <h3 className="font-serif text-lg font-bold text-neutral-900">White-Glove Delivery</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Direct dedicated express logistics with temperature-controlled air transit to safeguard delicate silks and structured wools during handover.
          </p>
        </div>
      </div>
    </div>
  );
};

