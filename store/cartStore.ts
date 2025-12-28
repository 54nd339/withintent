import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/lib/types';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productSlug: string) => void;
  updateQuantity: (productSlug: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const items = get().items;
        const existingItem = items.find(item => item.product.slug === product.slug);

        if (existingItem) {
          set({
            items: items.map(item =>
              item.product.slug === product.slug
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            items: [...items, { product, quantity: 1 }],
          });
        }
      },

      removeItem: (productSlug) => {
        set({
          items: get().items.filter(item => item.product.slug !== productSlug),
        });
      },

      updateQuantity: (productSlug, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productSlug);
          return;
        }

        set({
          items: get().items.map(item =>
            item.product.slug === productSlug
              ? { ...item, quantity }
              : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
