'use client';

import { useState, type MouseEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionImage = motion.create(Image);
import { PriceDisplay, QuantityCounter, ProductQuickView } from '@/components';
import { getBlurPlaceholder, getProductStatus, isProductSold, showToast } from '@/lib/utils';
import { Product } from '@/lib/types';
import { useCartStore, useWishlistStore } from '@/store';
import { useCartItem, useStore } from '@/hooks';

type Props = {
  product: Product;
  index: number;
  showPrice?: boolean;
  showStatus?: boolean;
  quickAnimation?: boolean;
};

export function ProductCard({ product, index, showPrice = true, showStatus = true, quickAnimation = false }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const cartItem = useCartItem(product.slug);
  const quantity = cartItem?.quantity || 0;
  const isInCart = quantity > 0;

  const addToWishlist = useStore(useWishlistStore, (state) => state.addItem);
  const removeFromWishlist = useStore(useWishlistStore, (state) => state.removeItem);
  const isInWishlist = useStore(useWishlistStore, (state) => state.isInWishlist(product.slug)) ?? false;

  const mainImage = product.mainImage?.url;
  const mainBlur = product.mainImage?.blurDataURL;
  const galleryImage = product.galleryImages?.[0];
  const hoverImage = galleryImage && galleryImage.url !== mainImage ? galleryImage : null;
  const hasHoverImage = hoverImage !== null;
  const status = getProductStatus(product);
  const isSold = isProductSold(product);

  const handleAddToCart = (e: MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    showToast.success('Added to cart');
  };

  const handleIncrease = (e: MouseEvent) => {
    e.stopPropagation();
    updateQuantity(product.slug, quantity + 1);
  };

  const handleDecrease = (e: MouseEvent) => {
    e.stopPropagation();
    if (quantity > 1) {
      updateQuantity(product.slug, quantity - 1);
    } else {
      removeItem(product.slug);
      showToast.info('Removed from cart');
    }
  };

  const handleRemove = (e: MouseEvent) => {
    e.stopPropagation();
    removeItem(product.slug);
    showToast.info('Removed from cart');
  };

  const handleWishlistToggle = (e: MouseEvent) => {
    e.stopPropagation();
    if (!addToWishlist || !removeFromWishlist || !product) return;
    
    if (isInWishlist) {
      removeFromWishlist(product.slug);
      showToast.info('Removed from wishlist');
    } else {
      addToWishlist(product);
      showToast.success('Added to wishlist');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: quickAnimation ? 20 : 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: quickAnimation ? 0.2 : 0.8, 
        delay: quickAnimation ? 0 : index * 0.1 
      }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-6">
        {showStatus && status && (
          <span className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/90 dark:bg-black/90 text-[10px] uppercase tracking-widest backdrop-blur-sm shadow-sm">
            {status}
          </span>
        )}

        <div className="absolute top-4 right-4 z-20 flex gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsQuickViewOpen(true);
            }}
            className="p-2 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white dark:hover:bg-black transition-colors"
            aria-label="Quick view"
          >
            <Eye size={18} className="text-neutral-900 dark:text-neutral-100" />
          </button>
          <button
            onClick={handleWishlistToggle}
            className="p-2 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white dark:hover:bg-black transition-colors"
            aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              size={18}
              className={isInWishlist ? 'fill-red-500 text-red-500' : 'text-neutral-900 dark:text-neutral-100'}
            />
          </button>
        </div>

        <Link href={`/shop/product/${product.slug}`} className="absolute inset-0 z-10">
          {mainImage && (
            <>
              <MotionImage
                src={mainImage}
                alt={product.title}
                fill
                className="object-cover pointer-events-none"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                placeholder="blur"
                blurDataURL={mainBlur || getBlurPlaceholder()}
                animate={{
                  opacity: hasHoverImage && isHovered ? 0 : 1,
                  scale: !hasHoverImage && isHovered ? 1.1 : 1,
                }}
                transition={{ duration: quickAnimation ? 0.2 : 0.7, ease: 'easeInOut' }}
              />
              {hasHoverImage && hoverImage && (
                <MotionImage
                  src={hoverImage.url}
                  alt={product.title}
                  fill
                  className="object-cover pointer-events-none"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  placeholder="blur"
                  blurDataURL={hoverImage.blurDataURL || getBlurPlaceholder()}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1.1 : 1,
                  }}
                  transition={{ duration: quickAnimation ? 0.2 : 0.7, ease: 'easeInOut' }}
                />
              )}
            </>
          )}
        </Link>

        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out hidden md:block bg-white/80 dark:bg-black/60 backdrop-blur-md z-20">
          {isSold ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              disabled
              className="w-full py-2 border border-neutral-300 dark:border-neutral-700 text-neutral-400 dark:text-neutral-600 text-xs uppercase tracking-widest cursor-not-allowed opacity-50"
            >
              Sold Out
            </button>
          ) : isInCart ? (
            <QuantityCounter
              quantity={quantity}
              onIncrease={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleIncrease(e);
              }}
              onDecrease={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDecrease(e);
              }}
              onRemove={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleRemove(e);
              }}
              variant="desktop"
            />
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToCart(e);
              }}
              className="w-full py-2 border border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100 text-xs uppercase tracking-widest hover:bg-neutral-900 hover:text-white dark:hover:bg-neutral-100 dark:hover:text-black transition-colors"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>

      <div className="flex justify-between items-baseline gap-4">
        <div className="flex-1 min-w-0">
          <Link href={`/shop/product/${product.slug}`}>
            <h3 className="font-serif text-lg mb-1 text-neutral-900 dark:text-neutral-100 group-hover:opacity-70 transition-opacity">
              {product.title}
            </h3>
          </Link>
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
          <QuantityCounter
            quantity={quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onRemove={handleRemove}
            variant="mobile"
          />
        ) : (
          <button
            onClick={handleAddToCart}
            className="w-full py-3 border border-neutral-200 dark:border-neutral-700 text-xs uppercase tracking-widest text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            Add to Cart
          </button>
        )}
      </div>

      <ProductQuickView
        product={product}
        open={isQuickViewOpen}
        onOpenChange={setIsQuickViewOpen}
      />
    </motion.div>
  );
}
