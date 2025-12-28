'use client';

import Image from 'next/image';
import { FadeInText, RichText, Button } from '@/components';
import {
  getSpacingClassesFromLayout,
  getContainerWidthClasses,
  getAlignmentClassesFromLayout,
  getThemeWithDefaults,
  getThemeStyles,
  getLayoutWithDefaults
} from '@/lib/utils';
import { BannerBlock } from '@/lib/types';
import { useTheme } from '@/providers';

interface BannerSectionProps {
  data?: BannerBlock;
}

export function BannerSection({ data }: BannerSectionProps) {
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
  const alignmentClasses = getAlignmentClassesFromLayout(layout);

  const backgroundMedia = data.backgroundMedia?.asset;
  const text = data.text;

  const overlayOpacity = darkMode
    ? (theme.darkOverlayOpacity ?? theme.overlayOpacity ?? 0.2)
    : (theme.overlayOpacity ?? 0.2);
  const overlayColor = darkMode
    ? (theme.darkOverlayColor?.hex || theme.overlayColor?.hex || '#000000')
    : (theme.overlayColor?.hex || '#000000');

  return (
    <section
      className={`relative w-full overflow-hidden flex items-center justify-center ${spacingClasses}`}
      style={themeStyles}
    >
      {backgroundMedia && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundMedia.url}
            alt={data.backgroundMedia?.alt || backgroundMedia.fileName || 'Banner background'}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 z-10"
            style={{
              backgroundColor: overlayColor,
              opacity: overlayOpacity,
            }}
          />
        </div>
      )}

      <div className={`relative z-20 px-4 sm:px-5 md:px-6 lg:px-8 w-full ${containerWidthClasses} ${alignmentClasses}`}>
        <FadeInText>
          {text?.eyebrow && (
            <span
              className="block font-sans text-xs tracking-[0.3em] uppercase mb-3 sm:mb-4 md:mb-5"
              style={{ opacity: 0.7, color: themeStyles.color || 'inherit' }}
            >
              {text.eyebrow}
            </span>
          )}
          {text?.heading && (
            <h2
              className="font-serif text-3xl md:text-5xl mb-4 sm:mb-5 md:mb-6 lg:mb-8"
              style={{ color: themeStyles.color || 'inherit' }}
            >
              {text.heading}
            </h2>
          )}
          {text?.subheading && (
            <p
              className="font-sans text-lg mb-4 sm:mb-5 md:mb-6 lg:mb-8"
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
          {data.buttons && data.buttons.length > 0 && (
            <div className="flex flex-col md:flex-row items-center gap-4">
              {data.buttons.map((button, index) => (
                <Button key={index} cta={button} />
              ))}
            </div>
          )}
        </FadeInText>
      </div>
    </section>
  );
}
