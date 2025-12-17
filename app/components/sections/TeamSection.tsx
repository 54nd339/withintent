'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FadeInText, RichText, Cta } from '@/app/components';
import { TeamBlock, Card } from '@/app/types';
import { 
  getSpacingClassesFromLayout, 
  getContainerWidthClasses,
  getGridColumnsClasses, 
  getGapSizeClasses,
  getThemeWithDefaults,
  getThemeStyles,
  getLayoutWithDefaults
} from '@/app/lib/utils';
import { useTheme } from '@/app/providers';

interface TeamSectionProps {
  data?: TeamBlock;
}

function TeamCard({ card, index }: { card: Card; index: number }) {
  const mediaAsset = card.media?.asset;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group text-center"
    >
      <div className="relative aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-6 rounded-full mx-auto max-w-[200px]">
        {mediaAsset && (
          <motion.img
            src={mediaAsset.url}
            alt={card.media?.alt || card.title || `Team member ${index + 1}`}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
        )}
      </div>
      {card.title && (
        <h3 className="font-serif text-lg mb-2 text-neutral-900 dark:text-neutral-100">
          {card.title}
        </h3>
      )}
      {card.subtitle && (
        <p className="font-sans text-sm text-neutral-700 dark:text-neutral-400 mb-4">
          {card.subtitle}
        </p>
      )}
      {card.body && (
        <div className="font-sans text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
          <RichText content={card.body} />
        </div>
      )}
      {card.buttons && card.buttons.length > 0 && (
        <div className="flex justify-center gap-4">
          {card.buttons.map((button, btnIndex) => (
            <Cta key={btnIndex} cta={button} />
          ))}
        </div>
      )}
    </motion.div>
  );
}

export function TeamSection({ data }: TeamSectionProps) {
  const { darkMode } = useTheme();

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
    <section 
      className={`px-4 sm:px-5 md:px-6 lg:px-8 mx-auto ${spacingClasses} ${containerWidthClasses}`}
      style={themeStyles}
    >
      <div className="mb-6 sm:mb-8 md:mb-12 lg:mb-16 xl:mb-20 text-center">
        <FadeInText>
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
              className="font-serif text-4xl mb-4"
              style={{ color: themeStyles.color || 'inherit' }}
            >
              {header.heading}
            </h2>
          )}
          {header?.subheading && (
            <p 
              className="font-sans text-lg mb-4"
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
            <TeamCard key={index} card={card} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 sm:py-10 md:py-12 lg:py-16" style={{ opacity: 0.6, color: themeStyles.color || 'inherit' }}>
          <p>No team members available at the moment.</p>
        </div>
      )}
    </section>
  );
}

