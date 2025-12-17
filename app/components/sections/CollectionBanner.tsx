'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Collection } from '@/app/types';
import { RichText } from '@/app/components/ui/RichText';

interface CollectionBannerProps {
  collection: Collection;
  className?: string;
}

export function CollectionBanner({ collection, className = '' }: CollectionBannerProps) {
  if (!collection) return null;

  return (
    <Link href={`/shop/collection/${collection.slug}`} className={`block group ${className}`}>
      <motion.div 
        className="relative w-full min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-2xl"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {collection.coverImage && (
          <motion.img
            src={collection.coverImage.url}
            alt={collection.title}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-500" />

        {/* Content */}
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
      </motion.div>
    </Link>
  );
}

