import React, { useState } from 'react';
import { X, Ruler, Sparkles } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';

export const SizeGuideModal: React.FC = () => {
  const { sizeGuideOpen, setSizeGuideOpen } = useUIStore();
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const [height, setHeight] = useState('175');
  const [weight, setWeight] = useState('70');
  const [calculatedSize, setCalculatedSize] = useState<string | null>(null);

  if (!sizeGuideOpen) return null;

  const calculateRecommendedSize = () => {
    const h = Number(height);
    const w = Number(weight);
    if (!h || !w) return;

    if (w < 60) setCalculatedSize('Small (S) / 38R');
    else if (w <= 75) setCalculatedSize('Medium (M) / 40R');
    else if (w <= 88) setCalculatedSize('Large (L) / 42R');
    else setCalculatedSize('Extra Large (XL) / 44R');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md" onClick={() => setSizeGuideOpen(false)} />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden z-10 p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#C6A76B]" />
            <h3 className="font-serif text-xl font-bold text-neutral-900">VOGUEX Sizing & Fit Architecture</h3>
          </div>
          <button
            onClick={() => setSizeGuideOpen(false)}
            className="p-1 rounded-full text-neutral-400 hover:text-black"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Unit Selector */}
        <div className="flex justify-between items-center my-4">
          <p className="text-xs text-neutral-500">Measurements reflect body dimensions in standard luxury tailoring.</p>
          <div className="flex items-center bg-neutral-100 p-0.5 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setUnit('in')}
              className={`px-3 py-1 rounded-md transition-colors ${
                unit === 'in' ? 'bg-white text-black shadow-sm' : 'text-neutral-500'
              }`}
            >
              Inches
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 rounded-md transition-colors ${
                unit === 'cm' ? 'bg-white text-black shadow-sm' : 'text-neutral-500'
              }`}
            >
              CM
            </button>
          </div>
        </div>

        {/* Size Table */}
        <div className="overflow-x-auto border border-neutral-200 rounded-xl mb-6">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#111111] text-[#C6A76B] uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-2.5 px-3">Size</th>
                <th className="py-2.5 px-3">Chest ({unit})</th>
                <th className="py-2.5 px-3">Waist ({unit})</th>
                <th className="py-2.5 px-3">Hips ({unit})</th>
                <th className="py-2.5 px-3">Shoulders ({unit})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700">
              <tr>
                <td className="py-2.5 px-3 font-semibold text-black">XS / 36</td>
                <td className="py-2.5 px-3">{unit === 'in' ? '34 - 36' : '86 - 91'}</td>
                <td className="py-2.5 px-3">{unit === 'in' ? '28 - 30' : '71 - 76'}</td>
                <td className="py-2.5 px-3">{unit === 'in' ? '35 - 37' : '89 - 94'}</td>
                <td className="py-2.5 px-3">{unit === 'in' ? '16.5' : '42'}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-black">S / 38</td>
                <td className="py-2.5 px-3">{unit === 'in' ? '36 - 38' : '91 - 96'}</td>
                <td className="py-2.5 px-3">{unit === 'in' ? '30 - 32' : '76 - 81'}</td>
                <td className="py-2.5 px-3">{unit === 'in' ? '37 - 39' : '94 - 99'}</td>
                <td className="py-2.5 px-3">{unit === 'in' ? '17.2' : '44'}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-black">M / 40</td>
                <td className="py-2.5 px-3">{unit === 'in' ? '38 - 40' : '96 - 101'}</td>
                <td className="py-2.5 px-3">{unit === 'in' ? '32 - 34' : '81 - 86'}</td>
                <td className="py-2.5 px-3">{unit === 'in' ? '39 - 41' : '99 - 104'}</td>
                <td className="py-2.5 px-3">{unit === 'in' ? '18.0' : '46'}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-black">L / 42</td>
                <td className="py-2.5 px-3">{unit === 'in' ? '41 - 43' : '104 - 109'}</td>
                <td className="py-2.5 px-3">{unit === 'in' ? '35 - 37' : '89 - 94'}</td>
                <td className="py-2.5 px-3">{unit === 'in' ? '42 - 44' : '107 - 112'}</td>
                <td className="py-2.5 px-3">{unit === 'in' ? '18.8' : '48'}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-black">XL / 44</td>
                <td className="py-2.5 px-3">{unit === 'in' ? '44 - 46' : '112 - 117'}</td>
                <td className="py-2.5 px-3">{unit === 'in' ? '38 - 40' : '96 - 101'}</td>
                <td className="py-2.5 px-3">{unit === 'in' ? '45 - 47' : '114 - 119'}</td>
                <td className="py-2.5 px-3">{unit === 'in' ? '19.5' : '50'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* AI Tailoring Estimator */}
        <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#C6A76B]" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-black">
              Interactive Fit Recommendation
            </h4>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-medium text-neutral-500 mb-1">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-neutral-500 mb-1">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-2 text-xs"
              />
            </div>
          </div>
          <button
            onClick={calculateRecommendedSize}
            className="w-full mt-3 bg-[#111111] hover:bg-[#C6A76B] hover:text-black text-white text-xs font-semibold uppercase tracking-wider py-2 rounded-lg transition-colors"
          >
            Calculate Recommended Atelier Size
          </button>

          {calculatedSize && (
            <div className="mt-3 p-3 bg-white rounded-lg border border-[#C6A76B]/40 text-center animate-in fade-in">
              <p className="text-xs text-neutral-500">Your tailored ideal fit:</p>
              <p className="text-sm font-bold text-[#C6A76B] mt-0.5">{calculatedSize}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

