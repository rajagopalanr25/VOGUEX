import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  couponCode: string | null;
  couponDiscount: number;
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getShipping: () => number;
  getTax: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: null,
      couponDiscount: 0,

      addToCart: (product, size, color, quantity = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.product._id === product._id && item.size === size && item.color === color
          );

          if (existingIndex > -1) {
            const updated = [...state.items];
            updated[existingIndex].quantity += quantity;
            return { items: updated };
          } else {
            return {
              items: [...state.items, { product, size, color, quantity }]
            };
          }
        });
      },

      removeFromCart: (productId, size, color) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.product._id === productId && item.size === size && item.color === color)
          )
        }));
      },

      updateQuantity: (productId, size, color, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId, size, color);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.product._id === productId && item.size === size && item.color === color
              ? { ...item, quantity }
              : item
          )
        }));
      },

      applyCoupon: (code, discount) => {
        set({ couponCode: code, couponDiscount: discount });
      },

      removeCoupon: () => {
        set({ couponCode: null, couponDiscount: 0 });
      },

      clearCart: () => {
        set({ items: [], couponCode: null, couponDiscount: 0 });
      },

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      },

      getShipping: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        return subtotal >= 200 ? 0 : 25;
      },

      getTax: () => {
        const subtotal = get().getSubtotal();
        const discount = get().couponDiscount;
        const taxable = Math.max(0, subtotal - discount);
        return Math.round(taxable * 0.08 * 100) / 100;
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().couponDiscount;
        const shipping = get().getShipping();
        const tax = get().getTax();
        return Math.max(0, Math.round((subtotal - discount + shipping + tax) * 100) / 100);
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      }
    }),
    {
      name: 'voguex_cart_storage'
    }
  )
);

