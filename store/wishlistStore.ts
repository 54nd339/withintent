import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/lib/types';

interface WishlistStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productSlug: string) => void;
  isInWishlist: (productSlug: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        if (!product) return;
        const items = get().items;
        const exists = items.some(item => item.slug === product.slug);

        if (!exists) {
          set({
            items: [...items, product],
          });
        }
      },

      removeItem: (productSlug) => {
        if (!productSlug) return;
        set({
          items: get().items.filter(item => item.slug !== productSlug),
        });
      },

      isInWishlist: (productSlug) => {
        if (!productSlug) return false;
        return get().items.some(item => item.slug === productSlug);
      },

      clearWishlist: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
);
