import React from 'react';
import { Link } from 'react-router-dom';
import { X, Sparkles, User, ShoppingBag, Heart, ShieldCheck } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import { useAuthStore } from '../../store/useAuthStore';

export const MobileNav: React.FC = () => {
  const { isMobileNavOpen, closeMobileNav } = useUIStore();
  const { user, isAuthenticated, isAdmin, logout } = useAuthStore();

  if (!isMobileNavOpen) return null;

  const links = [
    { name: 'Shop All', path: '/shop' },
    { name: 'Men’s Haute Collection', path: '/shop?category=Men' },
    { name: 'Women’s Privé', path: '/shop?category=Women' },
    { name: 'Junior & Kids', path: '/shop?category=Kids' },
    { name: 'New Arrivals', path: '/shop?category=New%20Arrivals' },
    { name: 'Best Sellers', path: '/shop?category=Best%20Sellers' },
    { name: '3D Interactive Atelier', path: '/#atelier-3d' },
    { name: 'Order Live Tracking', path: '/track' }
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeMobileNav}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#111111] text-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-300">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
            <div>
              <span className="font-serif tracking-[0.25em] text-xl font-extrabold text-white">
                VOGUEX
              </span>
              <span className="block text-[8px] tracking-[0.4em] text-[#C6A76B] uppercase font-semibold">
                HAUTE COUTURE
              </span>
            </div>
            <button
              onClick={closeMobileNav}
              className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links */}
          <nav className="mt-6 space-y-4">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={closeMobileNav}
                className="block text-sm tracking-wider uppercase font-medium text-neutral-300 hover:text-[#C6A76B] transition-colors py-1.5"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* User Footer in Drawer */}
        <div className="pt-6 border-t border-neutral-800 space-y-3">
          {isAuthenticated && user ? (
            <>
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#C6A76B]"
                />
                <div className="truncate">
                  <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                  <p className="text-xs text-neutral-400 truncate">{user.email}</p>
                </div>
              </div>

              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={closeMobileNav}
                  className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#C6A76B] font-semibold py-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Admin Dashboard
                </Link>
              )}

              <Link
                to="/profile"
                onClick={closeMobileNav}
                className="block text-xs uppercase tracking-wider text-neutral-300 py-1"
              >
                Profile & Saved Addresses
              </Link>
              <Link
                to="/orders"
                onClick={closeMobileNav}
                className="block text-xs uppercase tracking-wider text-neutral-300 py-1"
              >
                My Orders
              </Link>
              <button
                onClick={() => {
                  logout();
                  closeMobileNav();
                }}
                className="block w-full text-left text-xs uppercase tracking-wider text-red-400 py-1"
              >
                Sign Out
              </button>
            </>
          ) : (
            <div className="space-y-2">
              <Link
                to="/login"
                onClick={closeMobileNav}
                className="block w-full text-center py-2.5 rounded-lg bg-[#C6A76B] text-black text-xs font-semibold uppercase tracking-wider hover:bg-[#b39459] transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={closeMobileNav}
                className="block w-full text-center py-2.5 rounded-lg border border-neutral-700 text-white text-xs font-semibold uppercase tracking-wider hover:border-neutral-500 transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

