'use client';

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
  id: string;
  data?: TextBlock;
}

export function TextSection({ id, data }: TextSectionProps) {
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
      id={id}
      className={`px-4 sm:px-5 md:px-6 lg:px-8 mx-auto relative ${spacingClasses} ${alignmentClasses} ${containerWidthClasses}`}
      style={themeStyles}
    >
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-current to-transparent"
        style={{ opacity: 0.3, color: themeStyles.color || 'currentColor' }}
      />
      <FadeInText>
        {text?.eyebrow && (
          <span 
            className="block font-sans text-xs tracking-[0.3em] uppercase mb-6 sm:mb-7 md:mb-8 lg:mb-10"
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
        {data?.quote && (
          <h2 
            className="font-serif text-3xl md:text-5xl leading-tight mb-6 sm:mb-7 md:mb-8 lg:mb-10"
            style={{ color: themeStyles.color || 'inherit' }}
          >
            &ldquo;{data.quote}&rdquo;
          </h2>
        )}
        {text?.body && (
          <div 
            className="font-sans text-lg leading-relaxed max-w-xl mx-auto"
            style={{ opacity: 0.8, color: themeStyles.color || 'inherit' }}
          >
            <RichText content={text.body} />
          </div>
        )}
      </FadeInText>
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-t from-current to-transparent"
        style={{ opacity: 0.3, color: themeStyles.color || 'currentColor' }}
      />
    </section>
  );
}
