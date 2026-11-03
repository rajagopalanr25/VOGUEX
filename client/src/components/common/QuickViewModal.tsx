import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Heart, ShoppingBag, Star, Check } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, showToast, setSizeGuideOpen } = useUIStore();
  const addToCart = useCartStore((state) => state.addToCart);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const inWishlist = isInWishlist(quickViewProduct._id);
  const activeColor = selectedColor || quickViewProduct.colors[0]?.name || 'Standard';
  const activeSize = selectedSize || quickViewProduct.sizes[0]?.size || 'M';

  const handleAddToCart = () => {
    addToCart(quickViewProduct, activeSize, activeColor, quantity);
    showToast(`Added ${quickViewProduct.name} (${activeSize}, ${activeColor}) to cart.`, 'success');
    setQuickViewProduct(null);
  };

  const handleToggleWishlist = () => {
    const added = toggleWishlist(quickViewProduct);
    showToast(added ? 'Added to private wishlist' : 'Removed from wishlist', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden z-10 p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 p-2 rounded-full text-neutral-400 hover:text-black hover:bg-neutral-100 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200">
              <img
                src={quickViewProduct.images[selectedImage] || quickViewProduct.images[0]}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>
            {quickViewProduct.images.length > 1 && (
              <div className="flex gap-2">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-16 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? 'border-[#C6A76B] scale-105' : 'border-neutral-200 opacity-60'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-5">
            <div>
              <p className="text-xs uppercase tracking-widest font-semibold text-[#C6A76B]">
                {quickViewProduct.brand}
              </p>
              <h2 className="font-serif text-2xl font-bold text-neutral-900 mt-1">
                {quickViewProduct.name}
              </h2>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-xs font-bold text-neutral-800 ml-1">{quickViewProduct.rating}</span>
                </div>
                <span className="text-neutral-300">•</span>
                <span className="text-xs text-neutral-500">{quickViewProduct.numReviews} Verified Reviews</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-black">${quickViewProduct.price}</span>
              {quickViewProduct.originalPrice > quickViewProduct.price && (
                <>
                  <span className="text-base text-neutral-400 line-through">
                    ${quickViewProduct.originalPrice}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    {quickViewProduct.discount}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3">
              {quickViewProduct.description}
            </p>

            {/* Color Swatches */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-900">
                  Color: <span className="text-neutral-500 font-normal">{activeColor}</span>
                </span>
              </div>
              <div className="flex gap-3">
                {quickViewProduct.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                      activeColor === c.name ? 'border-[#C6A76B] scale-110' : 'border-neutral-300'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {activeColor === c.name && (
                      <Check className={`w-3.5 h-3.5 ${c.hex === '#ECE8DF' ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-900">
                  Select Size
                </span>
                <button
                  type="button"
                  onClick={() => setSizeGuideOpen(true)}
                  className="text-xs text-[#C6A76B] hover:underline"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {quickViewProduct.sizes.map((s) => (
                  <button
                    key={s.size}
                    onClick={() => setSelectedSize(s.size)}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-all ${
                      activeSize === s.size
                        ? 'border-[#111111] bg-[#111111] text-white shadow'
                        : 'border-neutral-200 text-neutral-700 hover:border-neutral-400'
                    }`}
                  >
                    {s.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-[#111111] hover:bg-[#C6A76B] hover:text-black text-white py-3.5 px-6 rounded-xl text-xs uppercase tracking-widest font-semibold transition-colors shadow-lg"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Atelier Bag
              </button>

              <button
                onClick={handleToggleWishlist}
                className={`p-3.5 rounded-xl border transition-colors ${
                  inWishlist
                    ? 'border-red-500 bg-red-50 text-red-500'
                    : 'border-neutral-200 text-neutral-600 hover:text-black hover:border-black'
                }`}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Full Details link */}
            <button
              onClick={() => {
                setQuickViewProduct(null);
                navigate(`/product/${quickViewProduct._id}`);
              }}
              className="w-full text-center text-xs uppercase tracking-wider text-neutral-500 hover:text-black underline pt-1"
            >
              Open Full 3D Interactive Exhibition
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

