'use client';

import { motion } from 'framer-motion';
import { FadeInText, RichText, Button } from '@/app/components';
import { StoryBlock } from '@/app/types';
import {
  getSpacingClassesFromLayout,
  getContainerWidthClasses,
  getLayoutTypeClasses,
  getThemeWithDefaults,
  getThemeStyles,
  getLayoutWithDefaults
} from '@/app/lib/utils';
import { useTheme } from '@/app/providers';

interface StorySectionProps {
  data?: StoryBlock;
}

export function StorySection({ data }: StorySectionProps) {
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
  const layoutTypeClasses = getLayoutTypeClasses(layout.layoutType);

  const mediaAsset = data.media?.asset;
  const text = data.text;
  const isOffsetRight = layout.layoutType === 'offsetRight';

  return (
    <section
      id="journal"
      className={`px-4 sm:px-5 md:px-6 lg:px-8 mx-auto ${spacingClasses} ${containerWidthClasses}`}
      style={themeStyles}
    >
      <div className={`${layoutTypeClasses || 'grid grid-cols-1 md:grid-cols-2'} gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center`}>
        {mediaAsset && (
          <div
            className={`relative aspect-square md:aspect-[4/5] overflow-hidden ${isOffsetRight ? 'md:order-2' : ''
              }`}
          >
            <motion.img
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5 }}
              src={mediaAsset.url}
              alt={data.media?.alt || mediaAsset.fileName || 'Story image'}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className={`${isOffsetRight ? 'md:pr-12 md:pl-0' : 'md:pl-12'}`}>
          <FadeInText>
            {text?.eyebrow && (
              <span
                className="block font-sans text-xs tracking-[0.3em] uppercase mb-4 sm:mb-5 md:mb-6"
                style={{ opacity: 0.7, color: themeStyles.color || 'inherit' }}
              >
                {text.eyebrow}
              </span>
            )}
            {text?.heading && (
              <h2
                className="font-serif text-4xl md:text-5xl mb-6 sm:mb-7 md:mb-8 lg:mb-10"
                style={{ color: themeStyles.color || 'inherit' }}
              >
                {text.heading}
              </h2>
            )}
            {text?.subheading && (
              <p
                className="font-sans text-lg mb-6 sm:mb-7 md:mb-8 lg:mb-10"
                style={{ opacity: 0.8, color: themeStyles.color || 'inherit' }}
              >
                {text.subheading}
              </p>
            )}
            {text?.body && (
              <div
                className="font-sans mb-6 sm:mb-7 md:mb-8 lg:mb-10 leading-relaxed"
                style={{ opacity: 0.8, color: themeStyles.color || 'inherit' }}
              >
                <RichText content={text.body} />
              </div>
            )}
            {data.primaryButton && <Button cta={data.primaryButton} />}
          </FadeInText>
        </div>
      </div>
    </section>
  );
}
