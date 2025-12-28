'use client';

import type { CSSProperties, ReactNode } from 'react';
import { FadeInText, RichText } from '@/components';
import type { TextGroup } from '@/lib/types';

interface SectionHeaderProps {
  text?: TextGroup | null;
  themeStyles?: CSSProperties;
  className?: string;
  wrapperClassName?: string;
  eyebrowClassName?: string;
  headingClassName?: string;
  subheadingClassName?: string;
  bodyClassName?: string;
  eyebrowElement?: 'h3' | 'span';
  showFadeIn?: boolean;
  fadeInDelay?: number;
  children?: ReactNode;
}

export function SectionHeader({
  text,
  themeStyles,
  className = '',
  wrapperClassName = '',
  eyebrowClassName = '',
  headingClassName = '',
  subheadingClassName = '',
  bodyClassName = '',
  eyebrowElement = 'h3',
  showFadeIn = true,
  fadeInDelay = 0,
  children,
}: SectionHeaderProps) {
  if (!text && !children) return null;

  const content = (
    <>
      {text?.eyebrow && (
        eyebrowElement === 'h3' ? (
          <h3
            className={`font-sans text-xs tracking-[0.3em] uppercase mb-4 ${eyebrowClassName}`}
            style={{ opacity: 0.7, color: themeStyles?.color || 'inherit' }}
          >
            {text.eyebrow}
          </h3>
        ) : (
          <span
            className={`block font-sans text-xs tracking-[0.3em] uppercase mb-4 sm:mb-5 md:mb-6 ${eyebrowClassName}`}
            style={{ opacity: 0.7, color: themeStyles?.color || 'inherit' }}
          >
            {text.eyebrow}
          </span>
        )
      )}
      {text?.heading && (
        <h2
          className={`font-serif text-4xl ${headingClassName}`}
          style={{ color: themeStyles?.color || 'inherit' }}
        >
          {text.heading}
        </h2>
      )}
      {text?.subheading && (
        <p
          className={`font-sans text-lg mt-2 ${subheadingClassName}`}
          style={{ opacity: 0.8, color: themeStyles?.color || 'inherit' }}
        >
          {text.subheading}
        </p>
      )}
      {text?.body && (
        <div className={`mt-4 ${bodyClassName}`}>
          <RichText content={text.body} />
        </div>
      )}
      {children}
    </>
  );

  const wrappedContent = wrapperClassName ? (
    <div className={wrapperClassName}>{content}</div>
  ) : (
    content
  );

  if (showFadeIn) {
    return (
      <FadeInText delay={fadeInDelay} className={className}>
        {wrappedContent}
      </FadeInText>
    );
  }

  return <div className={className}>{wrappedContent}</div>;
}
