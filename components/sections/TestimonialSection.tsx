'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { SectionHeader, RichText, EmptyState } from '@/components';
import { TestimonialBlock } from '@/lib/types';
import { useSectionLayout } from '@/hooks';
import { RESPONSIVE_PADDING, SECTION_HEADER_MARGIN } from '@/lib/constants';

interface TestimonialSectionProps {
  data?: TestimonialBlock;
}

function StarRating({ rating }: { rating: number }) {
  const clampedRating = Math.max(0, Math.min(5, rating));
  const fullStars = Math.floor(clampedRating);
  const hasHalfStar = clampedRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1" style={{ color: '#fbbf24' }}>
      {[...Array(fullStars)].map((_, i) => (
        <svg
          key={`full-${i}`}
          className="w-5 h-5 fill-current"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
      {hasHalfStar && (
        <svg className="w-5 h-5" viewBox="0 0 20 20">
          <defs>
            <linearGradient id={`half-${fullStars}`}>
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            fill={`url(#half-${fullStars})`}
            className="fill-current"
            d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
          />
        </svg>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <svg
          key={`empty-${i}`}
          className="w-5 h-5 fill-none stroke-current"
          viewBox="0 0 20 20"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
          />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialSection({ data }: TestimonialSectionProps) {
  const { themeStyles, spacingClasses, containerWidthClasses, theme, darkMode } = useSectionLayout({
    layout: data?.layout,
    theme: data?.theme,
  });

  if (!data) {
    return null;
  }

  const header = data.header;
  const testimonials = data.testimonials || [];

  return (
    <section
      className={`${RESPONSIVE_PADDING} mx-auto ${spacingClasses} ${containerWidthClasses}`}
      style={themeStyles}
    >
      {header && (
        <SectionHeader
          text={header}
          themeStyles={themeStyles}
          wrapperClassName={`${SECTION_HEADER_MARGIN} text-center`}
          headingClassName="mb-4"
          subheadingClassName="mb-4"
        />
      )}

      {testimonials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-neutral-900 rounded-lg p-6 sm:p-8 shadow-md"
              style={{
                backgroundColor: darkMode
                  ? theme.darkBackgroundColor?.hex || '#171717'
                  : theme.backgroundColor?.hex || '#ffffff',
                color: darkMode
                  ? theme.darkTextColor?.hex || '#f5f5f5'
                  : theme.textColor?.hex || '#171717',
              }}
            >
              <div className="mb-4">
                <StarRating rating={testimonial.rating} />
              </div>
              <div
                className="mb-6 leading-relaxed"
                style={{
                  opacity: 0.9,
                  color: darkMode
                    ? theme.darkTextColor?.hex || '#f5f5f5'
                    : theme.textColor?.hex || '#171717',
                }}
              >
                {testimonial.review?.body && (
                  <RichText content={testimonial.review.body} />
                )}
              </div>
              <div className="flex items-center gap-4">
                {testimonial.image && (
                  <Image
                    src={testimonial.image.url}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <p
                    className="font-semibold"
                    style={{
                      color: darkMode
                        ? theme.darkTextColor?.hex || '#f5f5f5'
                        : theme.textColor?.hex || '#171717',
                    }}
                  >
                    {testimonial.name}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <EmptyState
          message="No testimonials available at the moment."
          themeStyles={themeStyles}
        />
      )}
    </section>
  );
}
