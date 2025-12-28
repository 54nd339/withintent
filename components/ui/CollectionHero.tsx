'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Collection } from '@/lib/types';
import { RichText } from '@/components';

const MotionImage = motion.create(Image);

interface CollectionHeroProps {
  collection: Collection;
  variant?: 'page' | 'banner';
  className?: string;
  parallaxY?: any;
  parallaxOpacity?: any;
  onBannerClick?: () => void;
}

export function CollectionHero({
  collection,
  variant = 'page',
  className = '',
  parallaxY,
  parallaxOpacity,
  onBannerClick,
}: CollectionHeroProps) {
  if (!collection) return null;

  const isBanner = variant === 'banner';
  const containerClasses = isBanner
    ? `relative w-full min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-2xl ${className}`
    : `relative w-full min-h-[60vh] md:min-h-[70vh] overflow-hidden flex items-center justify-center ${className}`;

  const imageWrapper = isBanner ? (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {collection.coverImage && (
        <MotionImage
          src={collection.coverImage.url}
          alt={collection.title}
          fill
          className="object-cover"
          sizes="100vw"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          whileHover={isBanner ? { scale: 1.05 } : undefined}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-500" />
    </motion.div>
  ) : (
    <motion.div
      className="absolute inset-0 z-0"
      style={{ y: parallaxY }}
    >
      {collection.coverImage && (
        <MotionImage
          src={collection.coverImage.url}
          alt={collection.title}
          fill
          className="object-cover"
          sizes="100vw"
          style={{ opacity: parallaxOpacity }}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
    </motion.div>
  );

  const contentWrapper = isBanner ? (
    <div className="absolute inset-0 flex flex-col justify-end items-start text-left text-white p-8 sm:p-12 md:p-16 lg:p-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl"
      >
        <motion.span
          className="inline-block text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/70 mb-4 sm:mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Featured Collection
        </motion.span>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-4 sm:mb-6 leading-[0.9] tracking-tight">
          {collection.title}
        </h2>
        {collection.description && (
          <div className="max-w-xl mb-8 sm:mb-10 text-sm sm:text-base text-white/80 leading-relaxed">
            <RichText content={collection.description} />
          </div>
        )}
        <motion.div
          className="inline-flex items-center gap-3 text-xs sm:text-sm uppercase tracking-[0.2em] border-b border-white/40 pb-2 group-hover:border-white group-hover:gap-5 transition-all duration-500"
          whileHover={{ x: 5 }}
        >
          <span>Explore Collection</span>
          <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
        </motion.div>
      </motion.div>
    </div>
  ) : (
    <div className="relative z-10 text-center text-white px-4 sm:px-6 md:px-8">
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="inline-block text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/70 mb-4 sm:mb-6"
      >
        Collection
      </motion.span>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 sm:mb-6 tracking-tight"
      >
        {collection.title}
      </motion.h1>
      {collection.description && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-2xl mx-auto text-sm sm:text-base text-white/80 leading-relaxed"
        >
          <RichText content={collection.description} />
        </motion.div>
      )}
    </div>
  );

  const wrapper = isBanner ? (
    <motion.div className={containerClasses} onClick={onBannerClick}>
      {imageWrapper}
      {contentWrapper}
    </motion.div>
  ) : (
    <div className={containerClasses}>
      {imageWrapper}
      {contentWrapper}
    </div>
  );

  return wrapper;
}
