import type { CSSProperties } from 'react';
import { ProductCard } from '@/components';
import { Product } from '@/lib/types';

interface ProductGridBaseProps {
  products: Product[];
  gridClassName: string;
  showPrice?: boolean;
  showStatus?: boolean;
  emptyStateMessage?: string;
  emptyStateClassName?: string;
  emptyStateStyle?: CSSProperties;
}

/**
 * Shared base component for rendering product grids
 * Ensures consistent gap/column behavior across ProductGrid and ProductGridWithFilters
 */
export function ProductGridBase({
  products,
  gridClassName,
  showPrice = true,
  showStatus = true,
  emptyStateMessage = 'No products available at the moment.',
  emptyStateClassName = 'text-center py-8 sm:py-10 md:py-12 lg:py-16',
  emptyStateStyle,
}: ProductGridBaseProps) {
  if (products.length === 0) {
    return (
      <div className={emptyStateClassName} style={emptyStateStyle}>
        <p>{emptyStateMessage}</p>
      </div>
    );
  }

  return (
    <div className={gridClassName}>
      {products.map((product, index) => (
        <ProductCard
          key={product.slug}
          product={product}
          index={index}
          showPrice={showPrice}
          showStatus={showStatus}
        />
      ))}
    </div>
  );
}
