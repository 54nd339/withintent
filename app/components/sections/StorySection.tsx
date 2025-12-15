import React from 'react';
import { motion } from 'framer-motion';
import { FadeInText, RichText, Cta } from '@/app/components';
import { StoryBlock } from '@/app/types';
import { getSpacingClasses } from '@/app/lib/utils';

interface StorySectionProps {
  data?: StoryBlock;
}

export function StorySection({ data }: StorySectionProps) {
  if (!data) {
    return null;
  }

  const spacingClasses = getSpacingClasses(
    data.paddingTop,
    data.paddingBottom,
    data.marginTop,
    data.marginBottom
  );

  const backgroundColor = data.backgroundColor?.hex || '#f8f5ef';
  const imagePosition = data.imagePosition || 'left';

  return (
    <section
      id="journal"
      className={`${spacingClasses} bg-[#f8f5ef] dark:bg-black/20 text-neutral-900 dark:text-neutral-100`}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {data.image && (
          <div
            className={`relative aspect-square md:aspect-[4/5] overflow-hidden ${
              imagePosition === 'right' ? 'md:order-2' : ''
            }`}
          >
            <motion.img
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5 }}
              src={data.image.url}
              alt={data.image.fileName || 'Story image'}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className={`md:pl-12 ${imagePosition === 'right' ? 'md:pr-12 md:pl-0' : ''}`}>
          <FadeInText>
            {data.eyebrow && (
              <span className="block font-sans text-xs tracking-[0.3em] uppercase text-neutral-700 dark:text-neutral-400 mb-6">
                {data.eyebrow}
              </span>
            )}
            {data.heading && (() => {
              const headingLines = data.heading.split('\n');
              return (
                <h2 className="font-serif text-4xl md:text-5xl mb-8 text-neutral-900 dark:text-neutral-100">
                  {headingLines.map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < headingLines.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </h2>
              );
            })()}
            {data.content && (
              <div className="font-sans text-neutral-800 dark:text-neutral-300 mb-8 leading-relaxed">
                <RichText content={data.content} />
              </div>
            )}
            {data.cta && <Cta cta={data.cta} />}
          </FadeInText>
        </div>
      </div>
    </section>
  );
}
