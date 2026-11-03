import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Star, Sparkles } from 'lucide-react';
import { Product } from '../../types';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useUIStore } from '../../store/useUIStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { setQuickViewProduct, showToast } = useUIStore();

  const inWishlist = isInWishlist(product._id);
  const mainImage = product.images[0];
  const hoverImage = product.images[1] || product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = product.sizes[0]?.size || 'M';
    const defaultColor = product.colors[0]?.name || 'Standard';
    addToCart(product, defaultSize, defaultColor, 1);
    showToast(`Added ${product.name} to bag.`, 'success');
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product);
    showToast(added ? 'Saved to private wishlist' : 'Removed from wishlist', 'info');
  };

  const handleOpenQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <div
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:border-[#C6A76B]/40 hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Badges */}
      <Link to={`/product/${product._id}`} className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
        <img
          src={isHovered ? hoverImage : mainImage}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.isNewArrival && (
            <span className="bg-[#111111] text-[#C6A76B] text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded shadow-sm border border-[#C6A76B]/30">
              New Season
            </span>
          )}
          {product.isBestSeller && !product.isNewArrival && (
            <span className="bg-white text-black text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded shadow-sm">
              Best Seller
            </span>
          )}
          {product.isLimitedEdition && (
            <span className="bg-[#C6A76B] text-black text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded shadow-sm">
              Limited Edition
            </span>
          )}
        </div>

        {/* 3D Model Available Pill */}
        {product.model3dType && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[9px] uppercase tracking-wider text-[#C6A76B] border border-[#C6A76B]/30">
            <Sparkles className="w-2.5 h-2.5" />
            <span>3D Model</span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 z-10 shadow-sm ${
            inWishlist
              ? 'bg-red-50 text-red-500 scale-105'
              : 'bg-white/80 backdrop-blur-sm text-neutral-700 hover:text-black hover:bg-white'
          }`}
          title="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2 z-10">
          <button
            onClick={handleOpenQuickView}
            className="flex-1 flex items-center justify-center gap-1.5 bg-white/90 backdrop-blur-md text-neutral-900 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold hover:bg-black hover:text-white transition-colors shadow-lg"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
          <button
            onClick={handleQuickAdd}
            className="p-2.5 bg-[#C6A76B] text-black rounded-xl hover:bg-[#b39459] transition-colors shadow-lg"
            title="Quick Add to Bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </Link>

      {/* Info Section */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Brand & Subcategory */}
          <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-neutral-400 font-semibold mb-1">
            <span>{product.brand}</span>
            <span>{product.subcategory || product.category}</span>
          </div>

          {/* Product Title */}
          <Link to={`/product/${product._id}`}>
            <h3 className="font-serif text-sm font-semibold text-neutral-900 group-hover:text-[#997b41] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Color preview dots */}
          <div className="flex items-center gap-1.5 mt-2">
            {product.colors.map((c, i) => (
              <span
                key={i}
                className="w-2.5 h-2.5 rounded-full border border-neutral-300"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            <span className="text-[10px] text-neutral-400 ml-1">
              {product.colors.length} {product.colors.length === 1 ? 'color' : 'colors'}
            </span>
          </div>
        </div>

        {/* Price & Rating */}
        <div className="flex items-baseline justify-between pt-3 mt-2 border-t border-neutral-100">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold text-black">${product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-neutral-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <div className="flex items-center text-amber-500 text-[11px] font-semibold">
            <Star className="w-3 h-3 fill-current mr-0.5" />
            <span>{product.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

