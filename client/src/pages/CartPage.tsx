import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Heart, ArrowRight, ShoppingBag, ShieldCheck, Tag, Sparkles, Check } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { useUIStore } from '../store/useUIStore';
import { validateCouponApi } from '../services/api';

export const CartPage: React.FC = () => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    couponCode,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    getSubtotal,
    getShipping,
    getTax,
    getTotal
  } = useCartStore();

  const { toggleWishlist } = useWishlistStore();
  const { showToast } = useUIStore();
  const navigate = useNavigate();

  const [inputCoupon, setInputCoupon] = useState('');
  const [validating, setValidating] = useState(false);

  const subtotal = getSubtotal();
  const shipping = getShipping();
  const tax = getTax();
  const total = getTotal();

  const freeShippingThreshold = 200;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;

    setValidating(true);
    try {
      const res = await validateCouponApi(inputCoupon.trim(), subtotal);
      applyCoupon(res.code, res.discount);
      showToast(`Privilege code '${res.code}' applied: $${res.discount} discount saved!`, 'success');
      setInputCoupon('');
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Invalid or ineligible promotional code', 'error');
    } finally {
      setValidating(false);
    }
  };

  const handleMoveToWishlist = (item: any) => {
    toggleWishlist(item.product);
    removeFromCart(item.product._id, item.size, item.color);
    showToast(`Moved ${item.product.name} to private wishlist.`, 'info');
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-5 text-[#C6A76B]">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-neutral-900">Your Atelier Bag is Empty</h2>
        <p className="text-sm text-neutral-500 mt-2 max-w-sm mx-auto">
          Explore our seasonal haute couture archives, tailored blazers, and luxury leather goods.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 bg-[#111111] hover:bg-[#C6A76B] hover:text-black text-white px-8 py-3.5 rounded-xl text-xs uppercase tracking-widest font-semibold transition-colors"
        >
          <span>Explore The Collections</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 mb-8">
        Atelier Shopping Bag ({items.length} {items.length === 1 ? 'Creation' : 'Creations'})
      </h1>

      {/* Free Shipping Progress Meter */}
      <div className="mb-8 p-4 rounded-2xl bg-neutral-100 border border-neutral-200">
        <div className="flex justify-between items-center text-xs mb-2">
          {remainingForFreeShipping > 0 ? (
            <span className="font-medium text-neutral-700">
              Add <strong className="text-black">${remainingForFreeShipping}</strong> more for complimentary worldwide white-glove shipping.
            </span>
          ) : (
            <span className="font-semibold text-emerald-700 flex items-center gap-1.5">
              <Check className="w-4 h-4" /> You have unlocked complimentary white-glove courier shipping!
            </span>
          )}
          <span className="font-bold text-neutral-900">{Math.round(freeShippingProgress)}%</span>
        </div>
        <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#C6A76B] to-[#b39459] transition-all duration-500"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-6">
          <div className="divide-y divide-neutral-200 border-y border-neutral-200">
            {items.map((item) => (
              <div
                key={`${item.product._id}_${item.size}_${item.color}`}
                className="py-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
              >
                {/* Product Info */}
                <div className="flex gap-4">
                  <Link to={`/product/${item.product._id}`}>
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-24 h-32 object-cover rounded-xl border border-neutral-200 shrink-0"
                    />
                  </Link>

                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest text-[#C6A76B] font-bold">
                      {item.product.brand}
                    </p>
                    <Link to={`/product/${item.product._id}`}>
                      <h3 className="font-serif text-base font-bold text-neutral-900 hover:text-[#997b41] transition-colors">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-neutral-500">
                      Size: <span className="font-semibold text-neutral-800">{item.size}</span> • Shade:{' '}
                      <span className="font-semibold text-neutral-800">{item.color}</span>
                    </p>
                    <p className="text-sm font-bold text-black pt-1">${item.product.price}</p>
                  </div>
                </div>

                {/* Actions & Quantity */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4">
                  {/* Quantity Counter */}
                  <div className="flex items-center border border-neutral-300 rounded-xl overflow-hidden bg-white">
                    <button
                      onClick={() => updateQuantity(item.product._id, item.size, item.color, item.quantity - 1)}
                      className="px-3 py-1.5 text-neutral-600 hover:bg-neutral-100 text-xs font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 py-1.5 text-xs font-bold text-black min-w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product._id, item.size, item.color, item.quantity + 1)}
                      className="px-3 py-1.5 text-neutral-600 hover:bg-neutral-100 text-xs font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* Move to Wishlist & Remove */}
                  <div className="flex items-center gap-3 text-xs">
                    <button
                      onClick={() => handleMoveToWishlist(item)}
                      className="text-neutral-500 hover:text-black transition-colors flex items-center gap-1"
                      title="Move to wishlist"
                    >
                      <Heart className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Wishlist</span>
                    </button>
                    <button
                      onClick={() => removeFromCart(item.product._id, item.size, item.color)}
                      className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-1"
                      title="Remove from bag"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-neutral-600 hover:text-black transition-colors pt-2"
          >
            ← Continue Browsing Collections
          </Link>
        </div>

        {/* Order Summary & Coupon Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-neutral-200/90 shadow-lg space-y-5">
            <h3 className="font-serif text-lg font-bold text-neutral-900 pb-3 border-b border-neutral-100">
              Summary of Acquisition
            </h3>

            {/* Coupon Code Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                Privilege / Coupon Code
              </label>
              {couponCode ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50 border border-[#C6A76B]/40">
                  <div className="flex items-center gap-2 text-xs">
                    <Tag className="w-4 h-4 text-[#C6A76B]" />
                    <span className="font-bold text-neutral-900">{couponCode}</span>
                    <span className="text-emerald-700 font-semibold">(-${couponDiscount})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-red-500 hover:underline font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value.toUpperCase())}
                    placeholder="e.g. VOGUE10 or GOLD20"
                    className="flex-1 bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs uppercase font-medium focus:outline-none focus:border-[#C6A76B]"
                  />
                  <button
                    type="submit"
                    disabled={validating}
                    className="bg-[#111111] hover:bg-black text-[#C6A76B] px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold"
                  >
                    {validating ? 'Verifying...' : 'Apply'}
                  </button>
                </form>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-3 pt-3 border-t border-neutral-100 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>Atelier Subtotal</span>
                <span className="font-bold text-black">${subtotal.toFixed(2)}</span>
              </div>

              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Privilege Discount</span>
                  <span>-${couponDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>White-Glove Express Shipping</span>
                <span className="font-bold text-black">
                  {shipping === 0 ? <span className="text-emerald-600">COMPLIMENTARY</span> : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Luxury Sales Tax (8%)</span>
                <span className="font-bold text-black">${tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between pt-3 border-t border-neutral-200 text-base font-extrabold text-black">
                <span>Total Payable</span>
                <span className="text-lg">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full flex items-center justify-center gap-2 bg-[#111111] hover:bg-[#C6A76B] hover:text-black text-white py-4 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all shadow-xl"
            >
              <span>Proceed to Bespoke Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-[#C6A76B]" />
              <span>256-Bit Encrypted Payment • PCI-DSS Certified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
