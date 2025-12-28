import { useCartStore } from '@/store';
import { getEffectivePrice } from '@/lib/utils';
import { CartItem } from '@/store/cartStore';

export function useCartTotalItems() {
  return useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );
}

export function useCartTotalPrice() {
  return useCartStore((state) =>
    state.items.reduce((total, item) => {
      const price = getEffectivePrice(item.product);
      return total + (price * item.quantity);
    }, 0)
  );
}

export function useCartItem(productSlug: string): CartItem | undefined {
  return useCartStore((state) => 
    state.items.find(item => item.product.slug === productSlug)
  );
}
