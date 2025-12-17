'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/app/types';
import { formatINR, createWhatsAppInquiryLink } from '@/app/lib/utils';

type Props = {
  product: Product;
  index: number;
  whatsAppNumber?: string;
  showPrice?: boolean;
  showStatus?: boolean;
  onProductClick?: (product: Product) => void;
};

export function ProductCard({ product, index, whatsAppNumber = '919876543210', showPrice = true, showStatus = true, onProductClick }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  const mainImage = product.mainImage?.url;
  const galleryImage = product.galleryImages?.[0]?.url;
  const hoverImage = galleryImage && galleryImage !== mainImage ? galleryImage : null;
  const hasHoverImage = hoverImage !== null;
  const status = product.productStatus?.toUpperCase();

  const whatsappLink = (title: string) => createWhatsAppInquiryLink(whatsAppNumber, title);

  const handleClick = () => {
    if (onProductClick) {
      onProductClick(product);
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
          <button
            onClick={() => window.open(whatsappLink(product.title), '_blank')}
            className="w-full py-2 border border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100 text-xs uppercase tracking-widest hover:bg-neutral-900 hover:text-white dark:hover:bg-neutral-100 dark:hover:text-black transition-colors"
          >
            Inquire via WhatsApp
          </button>
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
          <span className="font-serif text-sm font-medium text-neutral-900 dark:text-neutral-100 flex-shrink-0 whitespace-nowrap">
            {formatINR(product.price)}
          </span>
        )}
      </div>

      <div className="mt-4 md:hidden">
        <button
          onClick={() => window.open(whatsappLink(product.title), '_blank')}
          className="w-full py-3 border border-neutral-200 dark:border-neutral-700 text-xs uppercase tracking-widest text-neutral-900 dark:text-neutral-100"
        >
          Acquire
        </button>
      </div>
    </motion.div>
  );
}
