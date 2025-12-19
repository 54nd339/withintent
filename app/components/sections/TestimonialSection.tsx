'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FadeInText, RichText } from '@/app/components';
import { TestimonialBlock } from '@/app/types';
import {
  getSpacingClassesFromLayout,
  getContainerWidthClasses,
  getThemeWithDefaults,
  getThemeStyles,
  getLayoutWithDefaults
} from '@/app/lib/utils';
import { useTheme } from '@/app/providers';

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

  const header = data.header;
  const testimonials = data.testimonials || [];

  return (
    <section
      className={`px-4 sm:px-5 md:px-6 lg:px-8 mx-auto ${spacingClasses} ${containerWidthClasses}`}
      style={themeStyles}
    >
      {header && (
        <div className="mb-6 sm:mb-8 md:mb-12 lg:mb-16 xl:mb-20 text-center">
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
        <div
          className="text-center py-8 sm:py-10 md:py-12 lg:py-16"
          style={{ opacity: 0.6, color: themeStyles.color || 'inherit' }}
        >
          <p>No testimonials available at the moment.</p>
        </div>
      )}
    </section>
  );
}

