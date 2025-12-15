'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HeroBlock } from '@/app/types';
import { getSpacingClasses, getAlignmentClasses } from '@/app/lib/utils';
import { RichText, Cta } from '@/app/components';

interface HeroSectionProps {
  data?: HeroBlock;
}

export function HeroSection({ data }: HeroSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  
  // Smooth parallax with easing - moves slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'], {
    clamp: false,
  });

  if (!data) {
    return null;
  }

  const spacingClasses = getSpacingClasses(
    data.paddingTop,
    data.paddingBottom,
    data.marginTop,
    data.marginBottom
  );

  const alignmentClasses = getAlignmentClasses(data.textAlignment);
  const minHeight = data.minHeight 
    ? (typeof data.minHeight === 'number' ? `${data.minHeight}vh` : data.minHeight)
    : '100vh';
  const overlayOpacity = data.overlayOpacity || 20;
  const overlayColor = data.overlayColor?.hex || '#000000';

  return (
    <section
      ref={ref}
      className={`relative w-full overflow-hidden flex items-center justify-center bg-neutral-900 ${spacingClasses}`}
      style={{ minHeight }}
    >
      {data.backgroundImage && (
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
              src={data.backgroundImage.url}
              alt={data.backgroundImage.fileName || 'Hero background'}
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
              opacity: overlayOpacity / 100,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10" />
        </motion.div>
      )}

      <div className={`relative z-20 flex flex-col items-center justify-center h-full text-center px-4 w-full mt-10 ${alignmentClasses}`}>
        {data.headline && (
          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="font-serif text-[15vw] md:text-[12vw] leading-[0.85] text-white/90 tracking-tighter mix-blend-overlay"
            >
              {data.headline}
            </motion.h1>
          </div>
        )}

        {data.subHeadline && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col items-center mt-4 md:mt-8"
          >
            <RichText
              content={data.subHeadline}
              className="font-sans text-[10px] md:text-sm text-white/80 tracking-[0.4em] uppercase text-center"
            />
          </motion.div>
        )}

        {data.buttons && data.buttons.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col md:flex-row items-center gap-4 mt-8"
          >
            {data.buttons.map((button, index) => (
              <Cta key={index} cta={button} />
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
