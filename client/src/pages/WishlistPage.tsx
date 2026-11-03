import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight, Share2, Sparkles } from 'lucide-react';
import { useWishlistStore } from '../store/useWishlistStore';
import { useCartStore } from '../store/useCartStore';
import { useUIStore } from '../store/useUIStore';

export const WishlistPage: React.FC = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addToCart);
  const showToast = useUIStore((state) => state.showToast);

  const handleMoveToCart = (product: any) => {
    const size = product.sizes[0]?.size || 'M';
    const color = product.colors[0]?.name || 'Standard';
    addToCart(product, size, color, 1);
    removeFromWishlist(product._id);
    showToast(`Moved ${product.name} to your atelier bag.`, 'success');
  };

  const handleShareWishlist = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Private Wishlist link copied to clipboard.', 'success');
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-5 text-neutral-400">
          <Heart className="w-10 h-10" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-neutral-900">Your Private Wishlist is Empty</h2>
        <p className="text-sm text-neutral-500 mt-2 max-w-sm mx-auto">
          Save coveted evening gowns, bespoke blazers, and luxury accessories to review at your leisure.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 bg-[#111111] hover:bg-[#C6A76B] hover:text-black text-white px-8 py-3.5 rounded-xl text-xs uppercase tracking-widest font-semibold transition-colors"
        >
          <span>Explore Archives</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end pb-8 border-b border-neutral-200 gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#C6A76B] font-semibold">
            Personal Curations
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 mt-1">
            Private Wishlist ({items.length})
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShareWishlist}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-neutral-300 hover:border-black text-xs uppercase tracking-wider font-semibold text-neutral-700 transition-colors"
          >
            <Share2 className="w-4 h-4 text-[#C6A76B]" />
            <span>Share Wishlist</span>
          </button>
          <button
            onClick={clearWishlist}
            className="text-xs uppercase tracking-wider text-neutral-400 hover:text-red-500 transition-colors px-2"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
        {items.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-sm flex flex-col justify-between"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </Link>
              <button
                onClick={() => removeFromWishlist(product._id)}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-red-500 hover:bg-white shadow-sm"
                title="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#C6A76B] font-bold">
                  {product.brand}
                </p>
                <Link to={`/product/${product._id}`}>
                  <h3 className="font-serif text-sm font-bold text-neutral-900 truncate">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-sm font-bold text-black mt-1">${product.price}</p>
              </div>

              <button
                onClick={() => handleMoveToCart(product)}
                className="w-full flex items-center justify-center gap-2 bg-[#111111] hover:bg-[#C6A76B] hover:text-black text-white py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Move to Bag</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
