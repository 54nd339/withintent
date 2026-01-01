'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const MotionImage = motion.create(Image);
import { X } from 'lucide-react';
import { SectionHeader, EmptyState } from '@/components';
import { getGridConfig } from '@/lib/utils';
import { GalleryBlock, Card } from '@/lib/types';
import { useSectionLayout } from '@/hooks';
import { RESPONSIVE_PADDING, SECTION_HEADER_MARGIN } from '@/lib/constants';

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
          <MotionImage
            src={mediaAsset.url}
            alt={card.media?.alt || card.title || `Gallery image ${index + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
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
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const { themeStyles, spacingClasses, containerWidthClasses } = useSectionLayout({
    layout: data?.layout,
    theme: data?.theme,
  });

  if (!data) {
    return null;
  }

  const { gridClassName, limit } = getGridConfig({ grid: data.grid });
  const displayCards = limit && data.cards ? data.cards.slice(0, limit) : (data.cards || []);

  const header = data.header;

  return (
    <>
      <section
        className={`${RESPONSIVE_PADDING} mx-auto ${spacingClasses} ${containerWidthClasses}`}
      style={themeStyles}
    >
      <div className={`flex justify-between items-end ${SECTION_HEADER_MARGIN}`}>
          <SectionHeader
            text={header}
            themeStyles={themeStyles}
            className="text-left"
          />
        </div>

        {displayCards.length > 0 ? (
          <div className={gridClassName}>
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
          <EmptyState
            message="No gallery items available at the moment."
            themeStyles={themeStyles}
          />
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
