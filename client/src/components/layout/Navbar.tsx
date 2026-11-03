import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User as UserIcon, Menu, X, ShieldCheck } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useUIStore } from '../../store/useUIStore';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const cartCount = useCartStore((state) => state.getItemCount());
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const { user, isAuthenticated, isAdmin, logout } = useAuthStore();
  const { openSearch, toggleMobileNav } = useUIStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Shop All', path: '/shop' },
    { name: 'Men', path: '/shop?category=Men' },
    { name: 'Women', path: '/shop?category=Women' },
    { name: 'Kids', path: '/shop?category=Kids' },
    { name: 'New Arrivals', path: '/shop?category=New%20Arrivals' },
    { name: 'Best Sellers', path: '/shop?category=Best%20Sellers' },
    { name: '3D Virtual Atelier', path: '/#atelier-3d' }
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-200/80 py-3.5'
          : 'bg-[#F7F6F2] py-5 border-b border-neutral-200/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={toggleMobileNav}
              className="p-2 text-neutral-800 hover:text-black focus:outline-none"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              onClick={openSearch}
              className="p-2 text-neutral-800 hover:text-black ml-1"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex-1 lg:flex-initial text-center lg:text-left">
            <Link to="/" className="inline-block group">
              <span className="font-serif tracking-[0.28em] text-2xl sm:text-3xl font-extrabold text-[#111111] group-hover:text-[#C6A76B] transition-colors">
                VOGUEX
              </span>
              <span className="block text-[8px] tracking-[0.45em] text-[#C6A76B] uppercase font-semibold -mt-1">
                HAUTE COUTURE
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[13px] tracking-widest uppercase transition-all duration-200 py-1 border-b-2 font-medium ${
                  location.pathname + location.search === link.path
                    ? 'border-[#C6A76B] text-black font-semibold'
                    : 'border-transparent text-neutral-600 hover:text-black hover:border-neutral-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Search (Desktop) */}
            <button
              onClick={openSearch}
              className="hidden lg:flex items-center gap-2 p-2 text-neutral-700 hover:text-[#C6A76B] transition-colors"
              title="Search collection"
            >
              <Search className="w-5 h-5" />
              <span className="text-xs uppercase tracking-wider text-neutral-400">Search</span>
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 text-neutral-800 hover:text-[#C6A76B] transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#111111] text-[#C6A76B] text-[10px] font-bold flex items-center justify-center border border-[#C6A76B]">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-neutral-800 hover:text-[#C6A76B] transition-colors"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#C6A76B] text-black text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Account Menu */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-1.5 p-2 text-neutral-800 hover:text-[#C6A76B] transition-colors focus:outline-none"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover border border-[#C6A76B]"
                  />
                ) : (
                  <UserIcon className="w-5 h-5" />
                )}
              </button>

              {userDropdownOpen && (
                <div
                  onMouseLeave={() => setUserDropdownOpen(false)}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-neutral-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                >
                  {isAuthenticated && user ? (
                    <>
                      <div className="px-4 py-2 border-b border-neutral-100">
                        <p className="text-xs text-neutral-400 uppercase tracking-wider">Signed in as</p>
                        <p className="text-sm font-semibold text-neutral-900 truncate">{user.name}</p>
                        <p className="text-xs text-neutral-500 truncate">{user.email}</p>
                      </div>

                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-[#C6A76B] hover:bg-neutral-50 font-medium"
                        >
                          <ShieldCheck className="w-4 h-4" />
                          Admin Command Portal
                        </Link>
                      )}

                      <Link
                        to="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                      >
                        My Profile & Addresses
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                      >
                        Order History & Tracking
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                          navigate('/');
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-2 border-b border-neutral-100">
                        <p className="text-xs text-neutral-500">Welcome to VOGUEX Atelier</p>
                      </div>
                      <Link
                        to="/login"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50"
                      >
                        Create Atelier Account
                      </Link>
                      <div className="border-t border-neutral-100 mt-1 pt-1">
                        <Link
                          to="/track"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-4 py-2 text-xs text-neutral-500 hover:bg-neutral-50"
                        >
                          Track Guest Order
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

