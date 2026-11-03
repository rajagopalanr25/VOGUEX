import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Star,
  Check,
  Truck,
  ShieldCheck,
  RefreshCw,
  Box,
  Share2,
  Sparkles,
  ArrowRight,
  Eye,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { ProductViewer3D } from '../components/3d/ProductViewer3D';
import { ProductCard } from '../components/products/ProductCard';
import { fetchProductById, fetchProducts, fetchProductReviewsApi, submitProductReviewApi } from '../services/api';
import { Product, Review } from '../types';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { useUIStore } from '../store/useUIStore';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<'3d' | 'gallery'>('3d');
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Delivery checker
  const [pincode, setPincode] = useState('');
  const [deliveryResult, setDeliveryResult] = useState<string | null>(null);

  // Review form
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { showToast, setSizeGuideOpen } = useUIStore();

  useEffect(() => {
    const loadProductData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const prod = await fetchProductById(id);
        setProduct(prod);
        setSelectedColor(prod.colors[0]?.name || '');
        setSelectedSize(prod.sizes[0]?.size || '');

        // Fetch reviews
        const revData = await fetchProductReviewsApi(id);
        setReviews(revData.reviews);

        // Fetch related products
        const relData = await fetchProducts({ category: prod.category, limit: 4 });
        setRelatedProducts(relData.products.filter((p) => p._id !== id));
      } catch (err) {
        console.error('Failed to load product:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProductData();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-neutral-400">
        <Loader2 className="w-10 h-10 animate-spin text-[#C6A76B] mb-3" />
        <p className="text-xs uppercase tracking-widest font-medium">Entering VOGUEX Atelier Chamber...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-24">
        <h2 className="font-serif text-2xl font-bold">Product Archive Not Found</h2>
        <Link to="/shop" className="mt-4 inline-block text-xs uppercase tracking-widest text-[#C6A76B] font-semibold underline">
          Return to Shop
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product._id);
  const activeColorObj = product.colors.find((c) => c.name === selectedColor) || product.colors[0];

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    showToast(`Added ${quantity}x ${product.name} (${selectedSize}, ${selectedColor}) to your bag.`, 'success');
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  };

  const handleWishlistToggle = () => {
    const added = toggleWishlist(product);
    showToast(added ? 'Saved to private wishlist' : 'Removed from wishlist', 'info');
  };

  const handleCheckDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.length < 4) {
      showToast('Please enter a valid postal code', 'error');
      return;
    }
    const days = Math.floor(2 + Math.random() * 2);
    const date = new Date(Date.now() + days * 24 * 3600 * 1000).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
    setDeliveryResult(`Available! White-glove delivery guaranteed by ${date}. Courier: BlueDart / DHL VIP.`);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmittingReview(true);
    try {
      const added = await submitProductReviewApi(product._id, {
        rating: newRating,
        comment: newComment,
        title: 'Atelier Acquisition Review'
      });
      setReviews([added, ...reviews]);
      setNewComment('');
      showToast('Thank you. Your verified review has been published.', 'success');
    } catch (err) {
      showToast('Unable to submit review right now.', 'error');
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-20">
      {/* Product Top Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left Visual Chamber (3D Viewer + Gallery) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Visual Mode Switcher (3D vs Photography) */}
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-2 bg-neutral-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setActiveTab('3d')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                  activeTab === '3d'
                    ? 'bg-[#111111] text-[#C6A76B] shadow-sm'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>Interactive 3D Model</span>
              </button>
              <button
                onClick={() => setActiveTab('gallery')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                  activeTab === 'gallery'
                    ? 'bg-[#111111] text-[#C6A76B] shadow-sm'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Editorial Photography ({product.images.length})</span>
              </button>
            </div>

            <span className="text-[11px] uppercase tracking-wider text-neutral-400 hidden sm:inline">
              360° Rotate & Zoom Enabled
            </span>
          </div>

          {/* Visual Canvas Display */}
          {activeTab === '3d' ? (
            <div className="shadow-2xl rounded-2xl overflow-hidden">
              <ProductViewer3D
                modelType={product.model3dType || 'mannequin'}
                color={activeColorObj?.hex || '#111111'}
                autoRotateDefault={true}
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-md">
                <img
                  src={product.images[selectedImage] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-24 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? 'border-[#C6A76B] scale-105' : 'border-neutral-200 opacity-60'
                    }`}
                  >
                    <img src={img} alt="Angle thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Features */}
          <div className="grid grid-cols-3 gap-4 pt-4 text-center">
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
              <ShieldCheck className="w-4 h-4 text-[#C6A76B] mx-auto mb-1" />
              <p className="text-[10px] font-bold uppercase tracking-wider text-black">100% Certified</p>
              <p className="text-[9px] text-neutral-400">Atelier Certificate</p>
            </div>
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
              <Truck className="w-4 h-4 text-[#C6A76B] mx-auto mb-1" />
              <p className="text-[10px] font-bold uppercase tracking-wider text-black">Free Shipping</p>
              <p className="text-[9px] text-neutral-400">Orders above $200</p>
            </div>
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
              <RefreshCw className="w-4 h-4 text-[#C6A76B] mx-auto mb-1" />
              <p className="text-[10px] font-bold uppercase tracking-wider text-black">Complimentary Returns</p>
              <p className="text-[9px] text-neutral-400">30-day window</p>
            </div>
          </div>
        </div>

        {/* Right Product Specifications & Purchasing */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header */}
          <div>
            <div className="flex justify-between items-center text-xs uppercase tracking-widest text-[#C6A76B] font-bold">
              <span>{product.brand}</span>
              <span>ITEM ID: {product._id}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 mt-1">
              {product.name}
            </h1>

            {/* Ratings & Stock */}
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-neutral-300'}`}
                  />
                ))}
                <span className="text-xs font-bold text-neutral-800 ml-1.5">{product.rating}</span>
              </div>
              <span className="text-neutral-300">•</span>
              <span className="text-xs text-neutral-500">{reviews.length} Verified Reviews</span>
              <span className="text-neutral-300">•</span>
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> In Stock ({product.stockCount} left)
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-4 py-3 border-y border-neutral-200">
            <span className="text-3xl font-extrabold text-neutral-950">${product.price}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-lg text-neutral-400 line-through">${product.originalPrice}</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  Save {product.discount}% Sitewide
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-neutral-600 leading-relaxed">
            {product.description}
          </p>

          {/* Color Switcher */}
          <div>
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-black">
                Fabric Shade: <span className="font-medium text-neutral-500">{selectedColor}</span>
              </span>
            </div>
            <div className="flex gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedColor === c.name
                      ? 'border-[#C6A76B] scale-110 shadow-md shadow-[#C6A76B]/30'
                      : 'border-neutral-300'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                >
                  {selectedColor === c.name && (
                    <Check className={`w-3.5 h-3.5 ${c.hex === '#ECE8DF' ? 'text-black' : 'text-white'}`} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-black">
                Select Tailored Size
              </span>
              <button
                type="button"
                onClick={() => setSizeGuideOpen(true)}
                className="text-xs text-[#997b41] hover:underline font-semibold"
              >
                Size Guide & Recommendations
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2.5">
              {product.sizes.map((s) => (
                <button
                  key={s.size}
                  onClick={() => setSelectedSize(s.size)}
                  className={`py-3 text-xs font-bold rounded-xl border text-center transition-all ${
                    selectedSize === s.size
                      ? 'border-[#111111] bg-[#111111] text-white shadow-md'
                      : 'border-neutral-200 text-neutral-700 hover:border-neutral-400 bg-white'
                  }`}
                >
                  {s.size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & CTA Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-neutral-300 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-3 text-neutral-600 hover:bg-neutral-100 text-sm font-bold"
                >
                  -
                </button>
                <span className="px-4 py-3 text-xs font-bold text-black min-w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-3 text-neutral-600 hover:bg-neutral-100 text-sm font-bold"
                >
                  +
                </button>
              </div>

              {/* Add to Bag */}
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-[#111111] hover:bg-[#C6A76B] hover:text-black text-white py-3.5 px-6 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Atelier Bag</span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={handleWishlistToggle}
                className={`p-3.5 rounded-xl border transition-colors ${
                  inWishlist
                    ? 'border-red-500 bg-red-50 text-red-500'
                    : 'border-neutral-300 text-neutral-700 hover:border-black hover:text-black'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              className="w-full bg-[#C6A76B] hover:bg-[#b39459] text-black py-3.5 rounded-xl text-xs uppercase tracking-widest font-semibold transition-colors shadow-md"
            >
              Acquire Now with Fast Checkout
            </button>
          </div>

          {/* PIN Code Delivery Estimator */}
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
            <span className="text-xs font-bold uppercase tracking-wider text-black">
              Delivery Availability Checker
            </span>
            <form onSubmit={handleCheckDelivery} className="flex gap-2 mt-2">
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter Postal / ZIP Code (e.g. 10001)"
                className="flex-1 bg-white border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:border-[#C6A76B]"
              />
              <button
                type="submit"
                className="bg-[#111111] hover:bg-black text-white text-xs px-4 py-2 rounded-xl uppercase tracking-wider font-semibold"
              >
                Verify
              </button>
            </form>
            {deliveryResult && (
              <p className="text-xs text-emerald-700 font-medium mt-2 flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{deliveryResult}</span>
              </p>
            )}
          </div>

          {/* Composition Details */}
          {product.details && product.details.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-neutral-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-black">
                Textile Composition & Sartorial Details
              </h4>
              <ul className="space-y-1.5 text-xs text-neutral-600">
                {product.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C6A76B] mt-1.5 shrink-0" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* VERIFIED CUSTOMER REVIEWS SECTION */}
      <section className="pt-12 border-t border-neutral-200">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center">
            <p className="text-xs uppercase tracking-widest text-[#C6A76B] font-bold">Client Testimonials</p>
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mt-1">Verified Atelier Reviews</h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-sm font-bold text-neutral-900">{product.rating} / 5.0</span>
              <span className="text-xs text-neutral-400">({reviews.length} authentic acquisitions)</span>
            </div>
          </div>

          {/* Review List */}
          <div className="space-y-6">
            {reviews.map((rev) => (
              <div key={rev._id} className="p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-neutral-900">{rev.userName}</span>
                      {rev.verifiedPurchase && (
                        <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">
                          Verified Acquisition
                        </span>
                      )}
                    </div>
                    <div className="flex text-amber-500 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'text-neutral-200'}`} />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-neutral-400">
                    {new Date(rev.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {rev.title && <h4 className="text-sm font-bold text-neutral-900">{rev.title}</h4>}
                <p className="text-xs text-neutral-600 leading-relaxed">{rev.comment}</p>
              </div>
            ))}
          </div>

          {/* Review Submission Form */}
          <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200">
            <h3 className="font-serif text-lg font-bold text-neutral-900">Share Your Sartorial Experience</h3>
            <p className="text-xs text-neutral-500 mt-1">Your feedback assists fellow patrons in selecting tailored luxury.</p>

            <form onSubmit={handleReviewSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Rating (Stars)
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewRating(star)}
                      className="p-1 text-amber-500 focus:outline-none"
                    >
                      <Star className={`w-6 h-6 ${star <= newRating ? 'fill-current' : 'text-neutral-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Your Review
                </label>
                <textarea
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Describe fabric texture, fit, drape, and overall silhouette..."
                  className="w-full bg-white border border-neutral-200 rounded-xl p-3 text-xs text-neutral-800 focus:outline-none focus:border-[#C6A76B]"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submittingReview}
                className="bg-[#111111] hover:bg-[#C6A76B] hover:text-black text-white text-xs uppercase tracking-widest font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                {submittingReview ? 'Dispatching Review...' : 'Submit Verified Review'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* RELATED CREATIONS */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-neutral-200">
          <div className="flex justify-between items-end mb-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#C6A76B] font-bold">Curated Ensembles</p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 mt-1">
                Complete The Look
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-xs uppercase tracking-wider font-semibold text-neutral-700 hover:text-black flex items-center gap-1"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
