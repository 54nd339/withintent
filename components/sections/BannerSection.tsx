'use client';

import Image from 'next/image';
import { SectionHeader, Button } from '@/components';
import { getOverlayStyles } from '@/lib/utils';
import { BannerBlock } from '@/lib/types';
import { useSectionLayout } from '@/hooks';
import { useTheme } from '@/providers';
import { RESPONSIVE_PADDING } from '@/lib/constants';

interface BannerSectionProps {
  data?: BannerBlock;
}

export function BannerSection({ data }: BannerSectionProps) {
  const { darkMode } = useTheme();

  if (!data) {
    return null;
  }

  const { themeStyles, spacingClasses, containerWidthClasses, alignmentClasses, theme } = useSectionLayout({
    layout: data.layout,
    theme: data.theme,
    includeAlignment: true,
  });

  const backgroundMedia = data.backgroundMedia?.asset;
  const text = data.text;
  const { opacity: overlayOpacity, color: overlayColor } = getOverlayStyles(theme, darkMode);

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

      <div className={`relative z-20 ${RESPONSIVE_PADDING} w-full ${containerWidthClasses} ${alignmentClasses}`}>
        <SectionHeader
          text={text}
          themeStyles={themeStyles}
          eyebrowElement="span"
          eyebrowClassName="mb-3 sm:mb-4 md:mb-5"
          headingClassName="text-3xl md:text-5xl mb-4 sm:mb-5 md:mb-6 lg:mb-8"
          subheadingClassName="mb-4 sm:mb-5 md:mb-6 lg:mb-8"
          bodyClassName="font-sans mb-6 sm:mb-7 md:mb-8 lg:mb-10 leading-relaxed"
        >
          {data.buttons && data.buttons.length > 0 && (
            <div className="flex flex-col md:flex-row items-center gap-4">
              {data.buttons.map((button, index) => (
                <Button key={index} cta={button} />
              ))}
            </div>
          )}
        </SectionHeader>
      </div>
    </section>
  );
}
