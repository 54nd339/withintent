import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { startTransition } from 'react';
import { Product } from '@/lib/types';
import { useProductModalContext } from '@/contexts';

/**
 * Hook to lock/unlock body scroll (useful for modals)
 */
export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLocked]);
}

interface UseProductModalOptions {
  products?: Product[];
  enableUrlSync?: boolean;
  basePath?: string;
}

/**
 * Hook to get product modal handler from context
 * Use this when you only need the handler and don't manage modal state
 */
export function useProductModalHandler() {
  const context = useProductModalContext();
  return context?.handleProductClick;
}

export function useProductModal(options?: UseProductModalOptions) {
  const { products, enableUrlSync = false, basePath = '/shop' } = options || {};
  const searchParams = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open modal from URL query param
  useEffect(() => {
    if (enableUrlSync && products && products.length > 0) {
      const productSlug = searchParams.get('product');
      if (productSlug) {
        const product = products.find(p => p.slug === productSlug);
        if (product && product.slug !== selectedProduct?.slug) {
          startTransition(() => {
            setSelectedProduct(product);
            setIsModalOpen(true);
          });
        }
      }
    }
  }, [searchParams, products, enableUrlSync, selectedProduct]);

  const handleProductClick = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    if (enableUrlSync) {
      window.history.pushState({}, '', `${basePath}?product=${product.slug}`);
    }
  }, [enableUrlSync, basePath]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    if (enableUrlSync) {
      window.history.pushState({}, '', basePath);
    }
  }, [enableUrlSync, basePath]);

  return {
    selectedProduct,
    isModalOpen,
    handleProductClick,
    handleCloseModal,
  };
}
