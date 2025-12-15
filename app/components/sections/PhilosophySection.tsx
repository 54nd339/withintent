import React from 'react';
import { FadeInText, RichText } from '@/app/components';
import { PhilosophyBlock } from '@/app/types';
import { getSpacingClasses, getAlignmentClasses } from '@/app/lib/utils';

interface PhilosophySectionProps {
  data?: PhilosophyBlock;
}

export function PhilosophySection({ data }: PhilosophySectionProps) {
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

  return (
    <section
      id="philosophy"
      className={`px-6 max-w-5xl mx-auto relative text-neutral-900 dark:text-neutral-100 ${spacingClasses} ${alignmentClasses}`}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-neutral-300 to-transparent dark:from-neutral-700"></div>
      <FadeInText>
        {data.eyebrow && (
          <span className="block font-sans text-xs tracking-[0.3em] uppercase text-neutral-600 dark:text-neutral-400 mb-8">
            {data.eyebrow}
          </span>
        )}
        {data.quote && (
          <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-8">
            &ldquo;{data.quote}&rdquo;
          </h2>
        )}
        {data.description && (
          <div className="font-sans text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-xl mx-auto">
            <RichText content={data.description} />
          </div>
        )}
      </FadeInText>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-t from-neutral-300 to-transparent dark:from-neutral-700"></div>
    </section>
  );
}
