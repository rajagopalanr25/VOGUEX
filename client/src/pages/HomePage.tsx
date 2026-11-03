import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, Compass, ChevronRight, Star, Quote } from 'lucide-react';
import { Hero3DMannequin } from '../components/3d/Hero3DMannequin';
import { ProductCard } from '../components/products/ProductCard';
import { fetchHomeCollections } from '../services/api';
import { Product } from '../types';

export const HomePage: React.FC = () => {
  const [collections, setCollections] = useState<{
    newArrivals: Product[];
    bestSellers: Product[];
    trending: Product[];
    limitedEdition: Product[];
  }>({
    newArrivals: [],
    bestSellers: [],
    trending: [],
    limitedEdition: []
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchHomeCollections();
        setCollections(data);
      } catch (err) {
        console.error('Error fetching home collections:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* HERO SECTION WITH 3D ATELIER MANNEQUIN */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F6F2] via-[#f2f0ea] to-[#F7F6F2] pt-6 pb-16 lg:pb-24">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#C6A76B]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Editorial Copy */}
            <div className="lg:col-span-5 space-y-6 text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2 bg-[#111111] text-[#C6A76B] px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-widest font-semibold border border-[#C6A76B]/30 shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Haute Couture Autumn / Winter 2026</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#111111] tracking-tight leading-[1.1]">
                THE ARCHITECTURE <br />
                <span className="italic font-normal font-serif text-neutral-700">OF MODERN</span> <br />
                <span className="gold-text-gradient">ELEGANCE.</span>
              </h1>

              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
                Crafted in Milan and Como from organic mulberry silk, double-faced Mongolian cashmere, and Japanese shuttle-woven selvedge denim. Explore through interactive 3D simulations.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/shop"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#111111] hover:bg-[#C6A76B] hover:text-black text-white px-8 py-4 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all shadow-xl hover:shadow-[#C6A76B]/20 group"
                >
                  <span>Explore All Pieces</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="#atelier-3d"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-neutral-300 hover:border-black text-neutral-800 px-7 py-4 rounded-xl text-xs uppercase tracking-widest font-semibold transition-colors"
                >
                  <span>3D Virtual Atelier</span>
                </a>
              </div>

              {/* Brand stats */}
              <div className="pt-8 border-t border-neutral-200/80 grid grid-cols-3 gap-6 text-center lg:text-left">
                <div>
                  <p className="font-serif text-2xl font-bold text-black">100%</p>
                  <p className="text-[10px] uppercase tracking-wider text-neutral-400 mt-0.5">Bespoke Mulberry Silk</p>
                </div>
                <div>
                  <p className="font-serif text-2xl font-bold text-black">360°</p>
                  <p className="text-[10px] uppercase tracking-wider text-neutral-400 mt-0.5">Interactive 3D Preview</p>
                </div>
                <div>
                  <p className="font-serif text-2xl font-bold text-black">48h</p>
                  <p className="text-[10px] uppercase tracking-wider text-neutral-400 mt-0.5">White-Glove Courier</p>
                </div>
              </div>
            </div>

            {/* Right 3D Mannequin Interactive Canvas */}
            <div className="lg:col-span-7 relative">
              <Hero3DMannequin onExploreProduct={(name) => navigate('/shop')} />
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY EXPLORATION TILES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-widest text-[#C6A76B] font-semibold">The Departments</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 mt-2">
            Curated Collections
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Men */}
          <Link
            to="/shop?category=Men"
            className="group relative h-[420px] rounded-3xl overflow-hidden shadow-lg border border-neutral-200"
          >
            <img
              src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=1000&q=85"
              alt="Men's Collection"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-white">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C6A76B] font-semibold">Bespoke Tailoring</span>
                <h3 className="font-serif text-2xl font-bold">Men’s Atelier</h3>
                <p className="text-xs text-neutral-300 mt-1">Structured blazers, selvedge denim & timepieces</p>
              </div>
              <span className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-[#C6A76B] group-hover:text-black transition-colors">
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>

          {/* Women */}
          <Link
            to="/shop?category=Women"
            className="group relative h-[420px] rounded-3xl overflow-hidden shadow-lg border border-neutral-200"
          >
            <img
              src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1000&q=85"
              alt="Women's Collection"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-white">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C6A76B] font-semibold">High Fashion</span>
                <h3 className="font-serif text-2xl font-bold">Women’s Privé</h3>
                <p className="text-xs text-neutral-300 mt-1">Silk evening gowns, peacoats & calfskin bags</p>
              </div>
              <span className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-[#C6A76B] group-hover:text-black transition-colors">
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>

          {/* Kids / Junior */}
          <Link
            to="/shop?category=Kids"
            className="group relative h-[420px] rounded-3xl overflow-hidden shadow-lg border border-neutral-200"
          >
            <img
              src="https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=1000&q=85"
              alt="Junior Editions"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-white">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C6A76B] font-semibold">Refined Youth</span>
                <h3 className="font-serif text-2xl font-bold">Junior Editions</h3>
                <p className="text-xs text-neutral-300 mt-1">Extra-fine Merino knits & organic dresses</p>
              </div>
              <span className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-[#C6A76B] group-hover:text-black transition-colors">
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* NEW ARRIVALS CAROUSEL / GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#C6A76B] font-semibold">Atelier Releases</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 mt-1">
              New Seasonal Arrivals
            </h2>
          </div>
          <Link
            to="/shop?category=New%20Arrivals"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-neutral-900 hover:text-[#C6A76B] transition-colors"
          >
            <span>View All New Pieces</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {collections.newArrivals.slice(0, 4).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* 3D INTERACTIVE ATELIER FEATURE SHOWCASE BANNER */}
      <section id="atelier-3d" className="relative bg-[#111111] text-white py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C6A76B]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-neutral-900 border border-[#C6A76B]/40 px-3.5 py-1.5 rounded-full text-xs text-[#C6A76B]">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="uppercase tracking-widest font-semibold text-[10px]">Virtual Digital Flagship</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
                Inspect Every Seam in <br />
                <span className="gold-text-gradient">Real-Time 3D Space.</span>
              </h2>

              <p className="text-neutral-400 text-sm leading-relaxed">
                Experience garments before acquisition. Rotate 360 degrees, switch light conditions from daylight to evening studio, zoom to inspect fabric weaves, and toggle bespoke shades.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800">
                  <h4 className="text-sm font-semibold text-white">360° Free Rotation</h4>
                  <p className="text-xs text-neutral-400 mt-1">Zero latency WebGL orbit controls with realistic lighting.</p>
                </div>
                <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800">
                  <h4 className="text-sm font-semibold text-white">Dynamic Fabric Shaders</h4>
                  <p className="text-xs text-neutral-400 mt-1">Realistic sheen on silk, cashmere, and calfskin leather.</p>
                </div>
              </div>

              <Link
                to="/product/prod_3"
                className="inline-flex items-center gap-3 bg-[#C6A76B] hover:bg-[#b39459] text-black px-7 py-3.5 rounded-xl text-xs uppercase tracking-widest font-semibold transition-colors"
              >
                <span>Launch 3D Sneaker Lab</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="relative aspect-square max-w-md mx-auto rounded-3xl overflow-hidden border border-[#C6A76B]/30 shadow-2xl bg-neutral-950 p-6 flex flex-col justify-between">
              <div className="flex justify-between items-center text-xs text-neutral-400">
                <span className="uppercase tracking-widest text-[#C6A76B]">VOGUEX 3D ENGINE</span>
                <span>60 FPS SMOOTH</span>
              </div>

              <div className="my-auto text-center space-y-4">
                <div className="w-32 h-32 mx-auto rounded-full border-2 border-dashed border-[#C6A76B] flex items-center justify-center animate-spin" style={{ animationDuration: '20s' }}>
                  <Compass className="w-14 h-14 text-[#C6A76B]" />
                </div>
                <p className="text-sm font-medium text-white">
                  Interactive 3D Available On Highlighted Pieces
                </p>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                  Powered by Three.js & React Three Fiber for instantaneous desktop and mobile rendering.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 text-xs text-neutral-300 border-t border-neutral-800 pt-3">
                <span>PBR Materials</span> • <span>Studio Shadows</span> • <span>Color Switch</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BEST SELLERS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs uppercase tracking-widest text-[#C6A76B] font-semibold">Perennial Icons</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 mt-1">
            Most Coveted Creations
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {collections.bestSellers.slice(0, 4).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* EDITORIAL PRESS & TESTIMONIALS */}
      <section className="bg-neutral-100 py-20 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Quote className="w-8 h-8 text-[#C6A76B] mx-auto mb-2 opacity-80" />
            <h2 className="font-serif text-3xl font-bold text-black">Critically Acclaimed Haute Couture</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-neutral-200/80 shadow-sm space-y-4">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-neutral-700 italic leading-relaxed">
                "VOGUEX delivers the architectural precision of savile row alongside the daring drape of Milanese silk. The 3D model accuracy is revolutionary."
              </p>
              <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span className="font-bold text-black">VOGUE INTERNATIONAL</span>
                <span className="text-[#C6A76B] font-semibold">PARIS EDITION</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-neutral-200/80 shadow-sm space-y-4">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-neutral-700 italic leading-relaxed">
                "The cashmere peacoats and titanium skeleton watch define modern quiet luxury. The unboxing experience in matte black and champagne gold is unmatched."
              </p>
              <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span className="font-bold text-black">GQ STYLE REPORT</span>
                <span className="text-[#C6A76B] font-semibold">MILAN ATELIER</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-neutral-200/80 shadow-sm space-y-4">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-neutral-700 italic leading-relaxed">
                "Rarely does a digital fashion house blend organic Italian mulberry textiles with real-time WebGL interactive fitting. Truly the future of luxury commerce."
              </p>
              <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span className="font-bold text-black">HARPER'S BAZAAR</span>
                <span className="text-[#C6A76B] font-semibold">NEW YORK</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INSTAGRAM / COMMUNITY EDITORIAL LOOKBOOK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <p className="text-xs uppercase tracking-widest text-[#C6A76B] font-semibold">@VOGUEX.ATELIER</p>
          <h2 className="font-serif text-3xl font-bold text-neutral-900 mt-1">Global Client Lookbook</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80"
              alt="Client Look"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold uppercase tracking-wider">
              Vienna Gala
            </div>
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80"
              alt="Client Look"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold uppercase tracking-wider">
              Milan Fashion Week
            </div>
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1544441893-675973e31985?w=600&q=80"
              alt="Client Look"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold uppercase tracking-wider">
              Paris Salon
            </div>
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&q=80"
              alt="Client Look"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold uppercase tracking-wider">
              Tokyo Ginza
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

