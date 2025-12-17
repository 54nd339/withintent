'use client';

import React from 'react';
import { FadeInText, RichText } from '@/app/components';
import { TextBlock } from '@/app/types';
import { 
  getSpacingClassesFromLayout, 
  getContainerWidthClasses,
  getAlignmentClassesFromLayout,
  getThemeWithDefaults,
  getThemeStyles,
  getLayoutWithDefaults
} from '@/app/lib/utils';
import { useTheme } from '@/app/providers';

interface TextSectionProps {
  data?: TextBlock;
}

export function TextSection({ data }: TextSectionProps) {
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

  const text = data.text;

  return (
    <section
      className={`px-4 sm:px-5 md:px-6 lg:px-8 mx-auto ${spacingClasses} ${containerWidthClasses} ${alignmentClasses}`}
      style={themeStyles}
    >
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
            className="font-sans leading-relaxed"
            style={{ opacity: 0.8, color: themeStyles.color || 'inherit' }}
          >
            <RichText content={text.body} />
          </div>
        )}
      </FadeInText>
    </section>
  );
}

