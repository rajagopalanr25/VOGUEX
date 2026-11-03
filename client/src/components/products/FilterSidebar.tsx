import React from 'react';
import { Filter, RotateCcw, ChevronDown } from 'lucide-react';
import { FilterState } from '../../types';

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (updated: Partial<FilterState>) => void;
  onReset: () => void;
  totalResults: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChange,
  onReset,
  totalResults
}) => {
  const categories = ['All', 'Men', 'Women', 'Kids', 'New Arrivals', 'Best Sellers', 'Trending'];
  const subcategories = ['All', 'Jackets', 'Dresses', 'Sneakers', 'Hoodies', 'Trousers', 'Jeans', 'Accessories'];
  const genders = ['All', 'Men', 'Women', 'Kids'];

  const sortOptions = [
    { label: 'Curated Recommendations', value: 'recommended' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Highest Rated', value: 'rating' },
    { label: 'Greatest Atelier Privilege', value: 'discount' }
  ];

  return (
    <div className="w-full lg:w-64 space-y-6 bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#C6A76B]" />
          <h3 className="text-xs uppercase tracking-widest font-bold text-black">Sartorial Filters</h3>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-black transition-colors"
          title="Reset All Filters"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-[11px] uppercase tracking-wider font-semibold text-neutral-800 mb-2">
          Sort Order
        </label>
        <select
          value={filters.sort}
          onChange={(e) => onChange({ sort: e.target.value })}
          className="w-full bg-neutral-50 border border-neutral-200 text-xs rounded-xl px-3 py-2.5 text-neutral-800 focus:outline-none focus:border-[#C6A76B]"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Department / Category */}
      <div>
        <label className="block text-[11px] uppercase tracking-wider font-semibold text-neutral-800 mb-2">
          Collection
        </label>
        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onChange({ category: cat })}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${
                filters.category === cat
                  ? 'bg-[#111111] text-[#C6A76B] font-semibold'
                  : 'text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Subcategory */}
      <div>
        <label className="block text-[11px] uppercase tracking-wider font-semibold text-neutral-800 mb-2">
          Garment Classification
        </label>
        <div className="space-y-1">
          {subcategories.map((sub) => (
            <button
              key={sub}
              onClick={() => onChange({ subcategory: sub === 'All' ? '' : sub })}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${
                (sub === 'All' && !filters.subcategory) || filters.subcategory === sub
                  ? 'bg-neutral-100 text-black font-semibold'
                  : 'text-neutral-500 hover:bg-neutral-50'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-[11px] uppercase tracking-wider font-semibold text-neutral-800">
            Price Ceiling
          </label>
          <span className="text-xs font-bold text-[#997b41]">${filters.maxPrice}</span>
        </div>
        <input
          type="range"
          min={50}
          max={1500}
          step={25}
          value={filters.maxPrice}
          onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
          className="w-full accent-[#C6A76B] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
          <span>$50</span>
          <span>$750</span>
          <span>$1500+</span>
        </div>
      </div>

      {/* Results badge */}
      <div className="pt-2 border-t border-neutral-100 text-center">
        <span className="text-xs text-neutral-400">
          Showing <strong className="text-neutral-800">{totalResults}</strong> atelier creations
        </span>
      </div>
    </div>
  );
};

