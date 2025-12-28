'use client';

import { FadeInText, RichText } from '@/components';
import { TextGroup } from '@/lib/types';

interface SectionHeaderProps {
  header?: TextGroup;
  themeStyles: React.CSSProperties;
  className?: string;
  alignment?: 'left' | 'center' | 'right';
}

export function SectionHeader({ header, themeStyles, className = '', alignment = 'center' }: SectionHeaderProps) {
  if (!header) return null;

  const alignmentClass = alignment === 'left' ? 'text-left' : alignment === 'right' ? 'text-right' : 'text-center';

  return (
    <div className={`mb-6 sm:mb-8 md:mb-12 lg:mb-16 xl:mb-20 ${alignmentClass} ${className}`}>
      <FadeInText>
        {header.eyebrow && (
          <h3
            className="font-sans text-xs tracking-[0.3em] uppercase mb-4"
            style={{ opacity: 0.7, color: themeStyles.color || 'inherit' }}
          >
            {header.eyebrow}
          </h3>
        )}
        {header.heading && (
          <h2
            className="font-serif text-4xl mb-4"
            style={{ color: themeStyles.color || 'inherit' }}
          >
            {header.heading}
          </h2>
        )}
        {header.subheading && (
          <p
            className="font-sans text-lg mb-4"
            style={{ opacity: 0.8, color: themeStyles.color || 'inherit' }}
          >
            {header.subheading}
          </p>
        )}
        {header.body && (
          <div className="mt-4">
            <RichText content={header.body} />
          </div>
        )}
      </FadeInText>
    </div>
  );
}
