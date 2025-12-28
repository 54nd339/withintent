'use client';

import React, { useState, useEffect, startTransition } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, Heart } from 'lucide-react';
import { PriceDisplay } from '@/components';
import { useCartStore, useWishlistStore } from '@/store';
import { useCartItem } from '@/hooks';
import { Product } from '@/lib/types';

type Props = {
  product: Product;
  index: number;
  showPrice?: boolean;
  showStatus?: boolean;
  onProductClick?: (product: Product) => void;
};

export function ProductCard({ product, index, showPrice = true, showStatus = true, onProductClick }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const cartItem = useCartItem(product.slug);
  const quantity = cartItem?.quantity || 0;
  const isInCart = quantity > 0;
  
  const addToWishlist = useWishlistStore((state) => state.addItem);
  const removeFromWishlist = useWishlistStore((state) => state.removeItem);
  const isInWishlistStore = useWishlistStore((state) => state.isInWishlist(product.slug));
  
  // Update wishlist state after mount to prevent hydration mismatch
  useEffect(() => {
    startTransition(() => {
      setIsInWishlist(isInWishlistStore);
    });
  }, [isInWishlistStore]);

  const mainImage = product.mainImage?.url;
  const galleryImage = product.galleryImages?.[0]?.url;
  const hoverImage = galleryImage && galleryImage !== mainImage ? galleryImage : null;
  const hasHoverImage = hoverImage !== null;
  const status = product.productStatus?.toUpperCase();
  const isSold = product.productStatus === 'sold';

  const handleClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

  const handleIncrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(product.slug, quantity + 1);
  };

  const handleDecrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity > 1) {
      updateQuantity(product.slug, quantity - 1);
    } else {
      removeItem(product.slug);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeItem(product.slug);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWishlist) {
      removeFromWishlist(product.slug);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-6">
        {showStatus && status && status !== 'AVAILABLE' && (
          <span className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/90 dark:bg-black/90 text-[10px] uppercase tracking-widest backdrop-blur-sm shadow-sm">
            {status}
          </span>
        )}

        <button
          onClick={handleWishlistToggle}
          className="absolute top-4 right-4 z-20 p-2 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white dark:hover:bg-black transition-colors"
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={18}
            className={isInWishlist ? 'fill-red-500 text-red-500' : 'text-neutral-900 dark:text-neutral-100'}
          />
        </button>

        {mainImage && (
          <>
            <motion.img
              src={mainImage}
              alt={product.title}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
              animate={{
                opacity: hasHoverImage && isHovered ? 0 : 1,
                scale: !hasHoverImage && isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            />
            {hasHoverImage && hoverImage && (
              <motion.img
                src={hoverImage}
                alt={product.title}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
                animate={{
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
              />
            )}
          </>
        )}

        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out hidden md:block bg-white/80 dark:bg-black/60 backdrop-blur-md">
          {isInCart ? (
            <div className="flex items-center gap-2">
              <button
                onClick={quantity === 1 ? handleRemove : handleDecrease}
                className="flex-shrink-0 w-10 h-10 border border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-900 hover:text-white dark:hover:bg-neutral-100 dark:hover:text-black transition-colors flex items-center justify-center"
              >
                {quantity === 1 ? <Trash2 size={16} /> : <Minus size={16} />}
              </button>
              <span className="flex-1 py-2 text-xs uppercase tracking-widest text-neutral-900 dark:text-neutral-100 text-center border-y border-neutral-900 dark:border-neutral-100">
                {quantity}
              </span>
              <button
                onClick={handleIncrease}
                className="flex-shrink-0 w-10 h-10 border border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-900 hover:text-white dark:hover:bg-neutral-100 dark:hover:text-black transition-colors flex items-center justify-center"
              >
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="w-full py-2 border border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100 text-xs uppercase tracking-widest hover:bg-neutral-900 hover:text-white dark:hover:bg-neutral-100 dark:hover:text-black transition-colors"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>

      <div className="flex justify-between items-baseline gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-lg mb-1 text-neutral-900 dark:text-neutral-100 group-hover:opacity-70 transition-opacity">
            {product.title}
          </h3>
          {product.categories && product.categories.length > 0 && (
            <p className="font-sans text-xs text-neutral-700 dark:text-neutral-400">
              {product.categories[0].name}
            </p>
          )}
        </div>
        {showPrice !== false && product.price && (
          <div className="flex-shrink-0 whitespace-nowrap flex flex-col items-end">
            <PriceDisplay
              price={product.price}
              discountPrice={product.discountPrice}
              size="sm"
            />
          </div>
        )}
      </div>

      <div className="mt-4 md:hidden">
        {isSold ? (
          <button
            disabled
            className="w-full py-3 border border-neutral-300 dark:border-neutral-700 text-neutral-400 dark:text-neutral-600 text-xs uppercase tracking-widest cursor-not-allowed opacity-50"
          >
            Sold Out
          </button>
        ) : isInCart ? (
          <div className="flex items-stretch gap-0 border border-neutral-200 dark:border-neutral-700 rounded overflow-hidden">
            <button
              onClick={quantity === 1 ? handleRemove : handleDecrease}
              className="flex-shrink-0 w-12 border-r border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center"
            >
              {quantity === 1 ? <Trash2 size={18} /> : <Minus size={18} />}
            </button>
            <span className="flex-1 py-3 px-4 text-xs uppercase tracking-widest text-neutral-900 dark:text-neutral-100 text-center flex items-center justify-center">
              {quantity}
            </span>
            <button
              onClick={handleIncrease}
              className="flex-shrink-0 w-12 border-l border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center"
            >
              <Plus size={18} />
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className="w-full py-3 border border-neutral-200 dark:border-neutral-700 text-xs uppercase tracking-widest text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            Add to Cart
          </button>
        )}
      </div>
    </motion.div>
  );
}
