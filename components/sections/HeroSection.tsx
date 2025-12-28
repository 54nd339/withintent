'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RichText, Button } from '@/components';
import {
  getSpacingClassesFromLayout,
  getAlignmentClassesFromLayout,
  getThemeWithDefaults,
  getThemeStyles,
  getLayoutWithDefaults
} from '@/lib/utils';
import { HeroBlock } from '@/lib/types';
import { useTheme } from '@/providers';

interface HeroSectionProps {
  data?: HeroBlock;
}

export function HeroSection({ data }: HeroSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const { darkMode } = useTheme();

  // Intensified parallax for more dramatic effect
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'], {
    clamp: true,
  });

  if (!data) {
    return null;
  }

  // Get layout and theme with defaults
  const layout = getLayoutWithDefaults(data.layout);
  const theme = getThemeWithDefaults(data.theme, darkMode);
  const themeStyles = getThemeStyles(theme, darkMode);

  const spacingClasses = getSpacingClassesFromLayout(layout);
  const alignmentClasses = getAlignmentClassesFromLayout(layout);
  const minHeight = layout.minHeight || '100vh';

  const overlayOpacity = darkMode
    ? (theme.darkOverlayOpacity ?? theme.overlayOpacity ?? 0.2)
    : (theme.overlayOpacity ?? 0.2);
  const overlayColor = darkMode
    ? (theme.darkOverlayColor?.hex || theme.overlayColor?.hex || '#000000')
    : (theme.overlayColor?.hex || '#000000');

  const mediaAsset = data.media?.asset;
  const text = data.text;

  return (
    <section
      ref={ref}
      className={`relative w-full overflow-hidden flex items-center justify-center ${spacingClasses}`}
      style={{
        minHeight,
        ...themeStyles,
      }}
    >
      {mediaAsset && (
        <motion.div
          style={{
            y,
            willChange: 'transform',
          }}
          className="absolute inset-0 z-0"
        >
          <motion.div
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: 'easeOut' }}
            className="relative w-full h-full"
          >
            <Image
              src={mediaAsset.url}
              alt={data.media?.alt || mediaAsset.fileName || 'Hero background'}
              fill
              priority
              className="object-cover opacity-90"
              sizes="100vw"
            />
          </motion.div>
          <div
            className="absolute inset-0 z-10"
            style={{
              backgroundColor: overlayColor,
              opacity: overlayOpacity,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10" />
        </motion.div>
      )}

      <div className={`relative z-20 flex flex-col items-center justify-center h-full px-4 sm:px-5 md:px-6 lg:px-8 w-full mt-6 sm:mt-8 md:mt-10 lg:mt-12 ${alignmentClasses}`}>
        {text?.eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-3 sm:mb-4 md:mb-5"
          >
            <span className="font-sans text-[10px] md:text-sm tracking-[0.4em] uppercase">
              {text.eyebrow}
            </span>
          </motion.div>
        )}

        {text?.heading && (
          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="font-serif text-[15vw] md:text-[12vw] leading-[0.85] tracking-tighter mix-blend-overlay"
              style={{ color: themeStyles.color || 'inherit' }}
            >
              {text.heading}
            </motion.h1>
          </div>
        )}

        {data.emphasisText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-3 sm:mb-4 md:mb-5"
          >
            <span className="font-serif text-2xl md:text-4xl" style={{ color: themeStyles.color || 'inherit' }}>
              {data.emphasisText}
            </span>
          </motion.div>
        )}

        {text?.subheading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col items-center mt-3 sm:mt-4 md:mt-6 lg:mt-8"
          >
            <span className="font-sans text-[10px] md:text-sm tracking-[0.4em] uppercase">
              {text.subheading}
            </span>
          </motion.div>
        )}

        {text?.body && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col items-center mt-3 sm:mt-4 md:mt-6 lg:mt-8"
          >
            <RichText
              content={text.body}
              className="font-sans text-[10px] md:text-sm tracking-[0.4em] uppercase"
            />
          </motion.div>
        )}

        {data.buttons && data.buttons.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col md:flex-row items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 mt-6 sm:mt-7 md:mt-8 lg:mt-10"
          >
            {data.buttons.map((button, index) => (
              <Button key={index} cta={button} />
            ))}
          </motion.div>
        )}
      </div>

      {data.showScrollIndicator && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
        >
          <span className="font-sans text-[10px] text-white/50 tracking-[0.2em] uppercase">
            {data.scrollIndicatorText || 'Explore'}
          </span>
          <div className="w-[1px] h-16 bg-white/10 relative overflow-hidden">
            <motion.div
              animate={{ y: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-white to-transparent"
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
