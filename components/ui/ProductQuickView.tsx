'use client';

import { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PriceDisplay, RichText } from '@/components';
import { getProductStatus, isProductSold, getBlurPlaceholder, showToast } from '@/lib/utils';
import { Product } from '@/lib/types';
import { useCartStore } from '@/store';

interface ProductQuickViewProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductQuickView({ product, open, onOpenChange }: ProductQuickViewProps) {
  const addItem = useCartStore((state) => state.addItem);
  const status = getProductStatus(product);
  const isSold = isProductSold(product);
  const mainImage = product.mainImage?.url;
  const mainBlur = product.mainImage?.blurDataURL;
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleAddToCart = () => {
    if (!isSold) {
      addItem(product);
      showToast.success('Added to cart');
      onOpenChange(false);
    }
  };

  const handleClose = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Handle ESC key
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, handleClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [open]);

  const modalContent = (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleOverlayClick}
        >
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50"
            aria-hidden="true"
          />

          {/* Modal Content */}
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative w-[95vw] sm:w-full max-w-5xl h-[95vh] sm:h-[90vh] max-h-[95vh] sm:max-h-[90vh] bg-white dark:bg-neutral-900 z-50 rounded-lg sm:rounded-xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-white/50 dark:hover:bg-black/50 rounded-full transition-colors z-20"
          aria-label="Close"
        >
          <X size={18} className="sm:w-5 sm:h-5" />
        </button>

        <div className="flex flex-col md:flex-row flex-1 min-h-0 overflow-hidden">
          {/* Image Section */}
          <div className="relative w-full md:w-1/2 h-48 sm:h-64 md:h-full bg-neutral-100 dark:bg-neutral-800 flex-shrink-0 overflow-hidden">
            {mainImage && (
              <Image
                src={mainImage}
                alt={product.title}
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL={mainBlur || getBlurPlaceholder()}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
            {status && (
              <span className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2.5 py-1 sm:px-3 bg-white/90 dark:bg-black/90 text-[10px] uppercase tracking-widest backdrop-blur-sm shadow-sm rounded">
                {status}
              </span>
            )}
          </div>

          {/* Content Section */}
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 lg:p-8 min-h-0">
              <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl mb-3 sm:mb-4 text-neutral-900 dark:text-neutral-100 pr-8 sm:pr-12">
                {product.title}
              </h2>

              {/* Categories */}
              {product.categories && product.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4 sm:mb-5">
                  {product.categories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/shop/category/${category.slug}`}
                      className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                      onClick={() => onOpenChange(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* Price */}
              {product.price && (
                <div className="mb-4 sm:mb-6">
                  <PriceDisplay
                    price={product.price}
                    discountPrice={product.discountPrice}
                    size="lg"
                  />
                </div>
              )}

              {/* Description */}
              {product.description && (
                <div className="mb-4 sm:mb-6 prose prose-sm dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300">
                  <RichText content={product.description} />
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex-shrink-0 flex flex-row gap-2 sm:gap-3 p-3 sm:p-4 lg:p-6 border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
              <button
                onClick={handleAddToCart}
                disabled={isSold}
                className={`flex-1 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm uppercase tracking-widest transition-colors rounded ${isSold
                  ? 'bg-neutral-300 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-500 cursor-not-allowed opacity-50'
                  : 'bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-900'
                  }`}
              >
                {isSold ? 'Sold Out' : 'Add to Cart'}
              </button>
              <Link
                href={`/shop/product/${product.slug}`}
                onClick={() => onOpenChange(false)}
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 text-center border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 text-xs sm:text-sm uppercase tracking-widest hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors rounded"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );

  // Render modal using portal
  if (!open) {
    return null;
  }

  try {
    return createPortal(modalContent, document.body);
  } catch {
    return null;
  }
}
