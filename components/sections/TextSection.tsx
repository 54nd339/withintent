'use client';

import { SectionHeader } from '@/components';
import { useSectionLayout } from '@/hooks';
import { TextBlock } from '@/lib/types';
import { RESPONSIVE_PADDING } from '@/lib/constants';

interface TextSectionProps {
  id: string;
  data?: TextBlock;
}

export function TextSection({ id, data }: TextSectionProps) {
  const { themeStyles, spacingClasses, containerWidthClasses, alignmentClasses } = useSectionLayout({
    layout: data?.layout,
    theme: data?.theme,
    includeAlignment: true,
  });

  if (!data) {
    return null;
  }

  const text = data.text;

  return (
    <section
      id={id}
      className={`${RESPONSIVE_PADDING} mx-auto relative ${spacingClasses} ${alignmentClasses} ${containerWidthClasses}`}
      style={themeStyles}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-current to-transparent"
        style={{ opacity: 0.3, color: themeStyles.color || 'currentColor' }}
      />
      <SectionHeader
        text={text}
        themeStyles={themeStyles}
        eyebrowElement="span"
        eyebrowClassName="mb-6 sm:mb-7 md:mb-8 lg:mb-10"
        headingClassName="text-3xl md:text-5xl mb-4 sm:mb-5 md:mb-6 lg:mb-8"
        subheadingClassName="mb-4 sm:mb-5 md:mb-6 lg:mb-8"
        bodyClassName="font-sans text-lg leading-relaxed max-w-xl mx-auto"
      >
        {data?.quote && (
          <h2
            className="font-serif text-3xl md:text-5xl leading-tight mb-6 sm:mb-7 md:mb-8 lg:mb-10"
            style={{ color: themeStyles.color || 'inherit' }}
          >
            &ldquo;{data.quote}&rdquo;
          </h2>
        )}
      </SectionHeader>
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-t from-current to-transparent"
        style={{ opacity: 0.3, color: themeStyles.color || 'currentColor' }}
      />
    </section>
  );
}
