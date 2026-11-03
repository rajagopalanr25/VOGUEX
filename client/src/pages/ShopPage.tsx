import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/products/ProductCard';
import { FilterSidebar } from '../components/products/FilterSidebar';
import { fetchProducts } from '../services/api';
import { Product, FilterState } from '../types';
import { SlidersHorizontal, Loader2, Sparkles } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory,
    gender: 'All',
    subcategory: '',
    search: initialSearch,
    minPrice: 0,
    maxPrice: 1500,
    sort: 'recommended'
  });

  // Sync from URL changes
  useEffect(() => {
    const cat = searchParams.get('category') || 'All';
    const s = searchParams.get('search') || '';
    setFilters((prev) => ({
      ...prev,
      category: cat,
      search: s
    }));
  }, [searchParams]);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts({
          category: filters.category,
          gender: filters.gender,
          subcategory: filters.subcategory,
          search: filters.search,
          maxPrice: filters.maxPrice,
          sort: filters.sort,
          page,
          limit: 12
        });
        setProducts(data.products);
        setTotal(data.total);
        setPages(data.pages);
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [filters, page]);

  const handleFilterChange = (updated: Partial<FilterState>) => {
    setFilters((prev) => {
      const next = { ...prev, ...updated };
      if (updated.category) {
        setSearchParams({ category: updated.category });
      }
      return next;
    });
    setPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      category: 'All',
      gender: 'All',
      subcategory: '',
      search: '',
      minPrice: 0,
      maxPrice: 1500,
      sort: 'recommended'
    });
    setSearchParams({});
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Title & Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end pb-8 border-b border-neutral-200 gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#C6A76B] font-semibold">
            The Complete Atelier Archive
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 mt-1 capitalize">
            {filters.category === 'All' ? 'Haute Couture Collections' : filters.category}
          </h1>
          {filters.search && (
            <p className="text-xs text-neutral-500 mt-1">
              Refining for keywords: "<span className="font-semibold text-black">{filters.search}</span>"
            </p>
          )}
        </div>

        {/* Mobile Filter Toggle Button */}
        <button
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="lg:hidden inline-flex items-center gap-2 bg-[#111111] text-white px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#C6A76B]" />
          <span>Filter & Sort ({total})</span>
        </button>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-8 pt-8">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block shrink-0">
          <FilterSidebar
            filters={filters}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
            totalResults={total}
          />
        </div>

        {/* Mobile Filter Drawer */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div className="fixed inset-0 bg-black/60" onClick={() => setMobileFilterOpen(false)} />
            <div className="relative ml-auto w-full max-w-xs bg-white p-6 shadow-2xl overflow-y-auto animate-in slide-in-from-right">
              <FilterSidebar
                filters={filters}
                onChange={(up) => {
                  handleFilterChange(up);
                  setMobileFilterOpen(false);
                }}
                onReset={() => {
                  handleResetFilters();
                  setMobileFilterOpen(false);
                }}
                totalResults={total}
              />
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-28 text-neutral-400">
              <Loader2 className="w-8 h-8 animate-spin text-[#C6A76B] mb-3" />
              <p className="text-xs uppercase tracking-widest font-medium">Summoning Bespoke Creations...</p>
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {pages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12 pt-8 border-t border-neutral-200">
                  {[...Array(pages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`w-9 h-9 rounded-xl text-xs font-semibold transition-colors ${
                        page === i + 1
                          ? 'bg-[#111111] text-[#C6A76B]'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-24 bg-neutral-50 rounded-3xl border border-neutral-200">
              <Sparkles className="w-8 h-8 text-[#C6A76B] mx-auto mb-3" />
              <h3 className="font-serif text-xl font-bold text-neutral-900">No creations found in this view</h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-2">
                Try loosening your filters, adjusting the price ceiling, or clearing the search query.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-5 bg-[#111111] text-[#C6A76B] px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest font-semibold hover:bg-black transition-colors"
              >
                Clear All Filter Conditions
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

