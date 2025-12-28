'use client';

import { ShoppingBag } from 'lucide-react';
import { FloatingButton } from '@/components';
import { useCartTotalItems } from '@/hooks';

export function FloatingButtons() {
  const cartCount = useCartTotalItems();

  return (
    <FloatingButton
      href="/checkout"
      icon={ShoppingBag}
      count={cartCount}
      position="right"
    />
  );
}
