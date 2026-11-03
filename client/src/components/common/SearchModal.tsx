import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, TrendingUp, ArrowRight } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import { searchAutocompleteApi } from '../../services/api';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch } = useUIStore();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const trendingTags = [
    'Silk Blazer',
    'Cashmere Trench',
    'Kinetic Sneaker',
    'Evening Gown',
    'Titanium Watch',
    'Mini Leather Bag'
  ];

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const results = await searchAutocompleteApi(query);
        setSuggestions(results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isSearchOpen) return null;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      closeSearch();
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSelectSuggestion = (id: string) => {
    closeSearch();
    navigate(`/product/${id}`);
  };

  const handleSelectTag = (tag: string) => {
    closeSearch();
    navigate(`/shop?search=${encodeURIComponent(tag)}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={closeSearch}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Search Header */}
        <form onSubmit={handleSearchSubmit} className="flex items-center px-6 py-4 border-b border-neutral-100">
          <Search className="w-5 h-5 text-[#C6A76B] mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by garment, fabric, category, or style..."
            autoFocus
            className="flex-1 text-base text-neutral-900 placeholder-neutral-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-xs text-neutral-400 hover:text-neutral-600 mr-3"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={closeSearch}
            className="p-1 rounded-full text-neutral-400 hover:text-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </form>

        {/* Modal Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* Trending Searches */}
          {!query && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                <TrendingUp className="w-4 h-4 text-[#C6A76B]" />
                <span>Trending Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleSelectTag(tag)}
                    className="px-3.5 py-1.5 rounded-full bg-neutral-100 hover:bg-[#C6A76B]/20 hover:text-[#997b41] text-xs font-medium text-neutral-700 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Autocomplete Results */}
          {suggestions.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                Discovered in Catalogue ({suggestions.length})
              </p>
              <div className="space-y-2">
                {suggestions.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => handleSelectSuggestion(item._id)}
                    className="flex items-center gap-4 p-2.5 rounded-xl hover:bg-neutral-50 cursor-pointer transition-colors group"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-16 object-cover rounded-lg border border-neutral-200"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold text-[#C6A76B] uppercase tracking-wider">{item.brand}</p>
                      <h4 className="text-sm font-medium text-neutral-900 group-hover:text-black truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-neutral-500 mt-0.5">${item.price}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-[#C6A76B] group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {query && suggestions.length === 0 && !loading && (
            <div className="text-center py-8">
              <p className="text-sm text-neutral-500">No bespoke pieces matching "{query}"</p>
              <button
                onClick={() => {
                  closeSearch();
                  navigate('/shop');
                }}
                className="mt-3 text-xs uppercase tracking-wider text-[#C6A76B] font-semibold underline"
              >
                Browse All Collections
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

