'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { FadeInText, RichText } from '@/components';
import {
  getSpacingClassesFromLayout,
  getContainerWidthClasses,
  getGridColumnsClasses,
  getGapSizeClasses,
  getThemeWithDefaults,
  getThemeStyles,
  getLayoutWithDefaults
} from '@/lib/utils';
import { GalleryBlock, Card } from '@/lib/types';
import { useTheme } from '@/providers';

interface GallerySectionProps {
  data?: GalleryBlock;
}

function GalleryCard({ card, index, onOpen }: { card: Card; index: number; onOpen: () => void }) {
  const mediaAsset = card.media?.asset;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={onOpen}
    >
      <div className="relative aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-4">
        {mediaAsset && (
          <motion.img
            src={mediaAsset.url}
            alt={card.media?.alt || card.title || `Gallery image ${index + 1}`}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
        )}
        {card.badge && (
          <span className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/90 dark:bg-black/90 text-[10px] uppercase tracking-widest backdrop-blur-sm shadow-sm">
            {card.badge}
          </span>
        )}
      </div>
      {card.title && (
        <h3 className="font-serif text-lg mb-1 text-neutral-900 dark:text-neutral-100 group-hover:opacity-70 transition-opacity">
          {card.title}
        </h3>
      )}
      {card.subtitle && (
        <p className="font-sans text-xs text-neutral-700 dark:text-neutral-400">
          {card.subtitle}
        </p>
      )}
    </motion.div>
  );
}

export function GallerySection({ data }: GallerySectionProps) {
  const { darkMode } = useTheme();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  if (!data) {
    return null;
  }

  // Get layout and theme with defaults
  const layout = getLayoutWithDefaults(data.layout);
  const theme = getThemeWithDefaults(data.theme, darkMode);
  const themeStyles = getThemeStyles(theme, darkMode);

  const spacingClasses = getSpacingClassesFromLayout(layout);
  const containerWidthClasses = getContainerWidthClasses(layout.containerWidth);

  const grid = data.grid;
  const gridColumns = getGridColumnsClasses(grid?.columns);
  const gapSize = getGapSizeClasses(grid?.gapSize);
  const limit = grid?.limit;
  const displayCards = limit && data.cards ? data.cards.slice(0, limit) : (data.cards || []);

  const header = data.header;

  return (
    <>
      <section
        className={`px-4 sm:px-5 md:px-6 lg:px-8 mx-auto ${spacingClasses} ${containerWidthClasses}`}
        style={themeStyles}
      >
        <div className="flex justify-between items-end mb-6 sm:mb-8 md:mb-12 lg:mb-16 xl:mb-20">
          <FadeInText className="text-left">
            {header?.eyebrow && (
              <h3
                className="font-sans text-xs tracking-[0.3em] uppercase mb-4"
                style={{ opacity: 0.7, color: themeStyles.color || 'inherit' }}
              >
                {header.eyebrow}
              </h3>
            )}
            {header?.heading && (
              <h2
                className="font-serif text-4xl"
                style={{ color: themeStyles.color || 'inherit' }}
              >
                {header.heading}
              </h2>
            )}
            {header?.subheading && (
              <p
                className="font-sans text-lg mt-2"
                style={{ opacity: 0.8, color: themeStyles.color || 'inherit' }}
              >
                {header.subheading}
              </p>
            )}
            {header?.body && (
              <div className="mt-4">
                <RichText content={header.body} />
              </div>
            )}
          </FadeInText>
        </div>

        {displayCards.length > 0 ? (
          <div className={`grid ${gridColumns} ${gapSize}`}>
            {displayCards.map((card, index) => (
              <GalleryCard
                key={index}
                card={card}
                index={index}
                onOpen={() => data.enableLightbox && setSelectedImage(index)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-10 md:py-12 lg:py-16" style={{ opacity: 0.6, color: themeStyles.color || 'inherit' }}>
            <p>No gallery items available at the moment.</p>
          </div>
        )}
      </section>

      {/* Lightbox */}
      {data.enableLightbox && selectedImage !== null && displayCards[selectedImage] && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </motion.button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-7xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {displayCards[selectedImage].media?.asset && (
                <Image
                  src={displayCards[selectedImage].media!.asset!.url}
                  alt={displayCards[selectedImage].media?.alt || displayCards[selectedImage].title || 'Gallery image'}
                  width={displayCards[selectedImage].media!.asset!.width || 1200}
                  height={displayCards[selectedImage].media!.asset!.height || 800}
                  className="object-contain max-h-[90vh] w-auto"
                />
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}
