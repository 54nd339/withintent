'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Share2, Check } from 'lucide-react';
import { Product } from '@/app/types';
import { formatINR, formatWhatsAppUrl } from '@/app/lib/utils';
import { RichText } from './RichText';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  whatsAppNumber?: string;
}

export function ProductModal({ product, isOpen, onClose, whatsAppNumber = '919876543210' }: ProductModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  // Reset image index when product changes using a key-based approach
  const productKey = product?.slug || '';
  const [imageKey, setImageKey] = React.useState(productKey);

  React.useEffect(() => {
    if (productKey && productKey !== imageKey) {
      setImageKey(productKey);
      setCurrentImageIndex(0);
    }
  }, [productKey, imageKey]);

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/shop?product=${product?.slug}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!product) return null;

  const allImages = [
    product.mainImage,
    ...(product.galleryImages || [])
  ].filter(Boolean);

  const currentImage = allImages[currentImageIndex];
  const status = product.productStatus?.toUpperCase();

  const whatsappLink = () => {
    const url = formatWhatsAppUrl(whatsAppNumber);
    return `${url}?text=${encodeURIComponent(`I am interested in ${product.title}`)}`;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-4 sm:inset-8 md:inset-12 lg:inset-16 xl:inset-24 z-50 bg-white dark:bg-neutral-900 rounded-lg overflow-hidden flex flex-col max-w-7xl mx-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-neutral-800 transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col lg:flex-row h-full overflow-y-auto">
              {/* Image Section */}
              <div className="relative flex-1 bg-neutral-100 dark:bg-neutral-800 min-h-[300px] lg:min-h-0">
                {currentImage && (
                  <>
                    <Image
                      src={currentImage.url}
                      alt={product.title}
                      fill
                      className="object-contain"
                    />

                    {/* Image Navigation */}
                    {allImages.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            prevImage();
                          }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-neutral-800 transition-colors"
                          aria-label="Previous image"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            nextImage();
                          }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-neutral-800 transition-colors"
                          aria-label="Next image"
                        >
                          <ChevronRight size={20} />
                        </button>

                        {/* Image Indicators */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {allImages.map((_, index) => (
                            <button
                              key={index}
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentImageIndex(index);
                              }}
                              className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex
                                  ? 'bg-white w-8'
                                  : 'bg-white/50'
                                }`}
                              aria-label={`Go to image ${index + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>

              {/* Content Section */}
              <div className="flex-1 p-6 sm:p-8 md:p-10 lg:p-12 overflow-y-auto">
                <div className="max-w-2xl">
                  {/* Status Badge */}
                  {status && status !== 'AVAILABLE' && (
                    <span className="inline-block mb-4 px-3 py-1 bg-neutral-200 dark:bg-neutral-700 text-xs uppercase tracking-widest">
                      {status}
                    </span>
                  )}

                  {/* Title */}
                  <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-4 text-neutral-900 dark:text-neutral-100">
                    {product.title}
                  </h1>

                  {/* Categories */}
                  {product.categories && product.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.categories.map((category) => (
                        <span
                          key={category.slug}
                          className="text-sm text-neutral-600 dark:text-neutral-400"
                        >
                          {category.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Price */}
                  {product.price && (
                    <div className="mb-6">
                      <span className="font-serif text-2xl font-medium text-neutral-900 dark:text-neutral-100">
                        {formatINR(product.price)}
                      </span>
                    </div>
                  )}

                  {/* Description */}
                  {product.description && (
                    <div className="mb-8 prose prose-sm dark:prose-invert max-w-none">
                      <RichText content={product.description} />
                    </div>
                  )}

                  {/* Collections */}
                  {product.collections && product.collections.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xs uppercase tracking-widest mb-2 text-neutral-600 dark:text-neutral-400">
                        Collections
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {product.collections.map((collection) => (
                          <span
                            key={collection.slug}
                            className="text-sm text-neutral-700 dark:text-neutral-300"
                          >
                            {collection.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={whatsappLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-8 py-3 bg-green-600 hover:bg-green-700 text-white text-sm uppercase tracking-widest transition-colors text-center"
                    >
                      Inquire via WhatsApp
                    </a>
                    <button
                      onClick={handleShare}
                      className="flex items-center justify-center gap-2 px-6 py-3 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 text-sm uppercase tracking-widest hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check size={16} />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Share2 size={16} />
                          Share
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
