import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types';

interface WishlistState {
  items: Product[];
  toggleWishlist: (product: Product) => boolean; // returns true if added, false if removed
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      toggleWishlist: (product: Product) => {
        const exists = get().items.some((p) => p._id === product._id);
        if (exists) {
          set((state) => ({
            items: state.items.filter((p) => p._id !== product._id)
          }));
          return false;
        } else {
          set((state) => ({
            items: [...state.items, product]
          }));
          return true;
        }
      },

      removeFromWishlist: (productId: string) => {
        set((state) => ({
          items: state.items.filter((p) => p._id !== productId)
        }));
      },

      isInWishlist: (productId: string) => {
        return get().items.some((p) => p._id === productId);
      },

      clearWishlist: () => {
        set({ items: [] });
      }
    }),
    {
      name: 'voguex_wishlist_storage'
    }
  )
);

