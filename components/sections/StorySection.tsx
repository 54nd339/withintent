'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const MotionImage = motion.create(Image);
import { SectionHeader, Button } from '@/components';
import { StoryBlock } from '@/lib/types';
import { useSectionLayout } from '@/hooks';
import { RESPONSIVE_PADDING } from '@/lib/constants';

interface StorySectionProps {
  data?: StoryBlock;
}

export function StorySection({ data }: StorySectionProps) {
  if (!data) {
    return null;
  }

  const { themeStyles, spacingClasses, containerWidthClasses, layoutTypeClasses, layout } = useSectionLayout({
    layout: data.layout,
    theme: data.theme,
    includeLayoutType: true,
  });

  const mediaAsset = data.media?.asset;
  const text = data.text;
  const isOffsetRight = layout.layoutType === 'offsetRight';

  return (
    <section
      id="journal"
      className={`${RESPONSIVE_PADDING} mx-auto ${spacingClasses} ${containerWidthClasses}`}
      style={themeStyles}
    >
      <div className={`${layoutTypeClasses || 'grid grid-cols-1 md:grid-cols-2'} gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center`}>
        {mediaAsset && (
          <div
            className={`relative aspect-square md:aspect-[4/5] overflow-hidden ${isOffsetRight ? 'md:order-2' : ''
              }`}
          >
            <MotionImage
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5 }}
              src={mediaAsset.url}
              alt={data.media?.alt || mediaAsset.fileName || 'Story image'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}

        <div className={`${isOffsetRight ? 'md:pr-12 md:pl-0' : 'md:pl-12'}`}>
          <SectionHeader
            text={text}
            themeStyles={themeStyles}
            eyebrowElement="span"
            eyebrowClassName="mb-4 sm:mb-5 md:mb-6"
            headingClassName="text-4xl md:text-5xl mb-6 sm:mb-7 md:mb-8 lg:mb-10"
            subheadingClassName="mb-6 sm:mb-7 md:mb-8 lg:mb-10"
            bodyClassName="font-sans mb-6 sm:mb-7 md:mb-8 lg:mb-10 leading-relaxed"
          >
            {data.primaryButton && <Button cta={data.primaryButton} />}
          </SectionHeader>
        </div>
      </div>
    </section>
  );
}
