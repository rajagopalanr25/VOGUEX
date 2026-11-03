import { create } from 'zustand';
import { Product } from '../types';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface UIState {
  isSearchOpen: boolean;
  isMobileNavOpen: boolean;
  quickViewProduct: Product | null;
  sizeGuideOpen: boolean;
  toasts: Toast[];
  openSearch: () => void;
  closeSearch: () => void;
  toggleMobileNav: () => void;
  closeMobileNav: () => void;
  setQuickViewProduct: (product: Product | null) => void;
  setSizeGuideOpen: (open: boolean) => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSearchOpen: false,
  isMobileNavOpen: false,
  quickViewProduct: null,
  sizeGuideOpen: false,
  toasts: [],

  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),

  toggleMobileNav: () => set((state) => ({ isMobileNavOpen: !state.isMobileNavOpen })),
  closeMobileNav: () => set({ isMobileNavOpen: false }),

  setQuickViewProduct: (product) => set({ quickViewProduct: product }),
  setSizeGuideOpen: (open) => set({ sizeGuideOpen: open }),

  showToast: (message, type = 'success') => {
    const id = `${Date.now()}_${Math.random()}`;
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }]
    }));
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id)
      }));
    }, 3500);
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id)
    }))
}));

