'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FadeInText, RichText, Button } from '@/app/components';
import { CategoryGridBlock, Category } from '@/app/types';
import {
  getSpacingClassesFromLayout,
  getContainerWidthClasses,
  getGridColumnsClasses,
  getGapSizeClasses,
  getThemeWithDefaults,
  getThemeStyles,
  getLayoutWithDefaults
} from '@/app/lib/utils';
import { useTheme } from '@/app/providers';

interface CategoryGridSectionProps {
  data?: CategoryGridBlock;
  categories?: Category[];
}

function CategoryCard({ category, index }: { category: Category; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <Link href={`/category/${category.slug}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-6">
          {category.coverImage && (
            <motion.img
              src={category.coverImage.url}
              alt={category.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            />
          )}
        </div>
        <h3 className="font-serif text-lg mb-1 text-neutral-900 dark:text-neutral-100 group-hover:opacity-70 transition-opacity">
          {category.name}
        </h3>
      </Link>
    </motion.div>
  );
}

export function CategoryGridSection({ data, categories = [] }: CategoryGridSectionProps) {
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

  const grid = data.grid;
  const gridColumns = getGridColumnsClasses(grid?.columns);
  const gapSize = getGapSizeClasses(grid?.gapSize);
  const limit = grid?.limit;
  const displayCategories = limit ? categories.slice(0, limit) : categories;

  const header = data.header;

  return (
    <section
      className={`px-4 sm:px-5 md:px-6 lg:px-8 mx-auto ${spacingClasses} ${containerWidthClasses}`}
      style={themeStyles}
    >
      <div className="flex justify-between items-end mb-6 sm:mb-8 md:mb-12 lg:mb-16 xl:mb-20">
        <FadeInText className="text-left">
          {header?.eyebrow && (
            <h3
              className="font-sans text-xs tracking-[0.3em] uppercase mb-4"
              style={{ opacity: 0.7, color: themeStyles.color || 'inherit' }}
            >
              {header.eyebrow}
            </h3>
          )}
          {header?.heading && (
            <h2
              className="font-serif text-4xl"
              style={{ color: themeStyles.color || 'inherit' }}
            >
              {header.heading}
            </h2>
          )}
          {header?.subheading && (
            <p
              className="font-sans text-lg mt-2"
              style={{ opacity: 0.8, color: themeStyles.color || 'inherit' }}
            >
              {header.subheading}
            </p>
          )}
          {header?.body && (
            <div className="mt-4">
              <RichText content={header.body} />
            </div>
          )}
        </FadeInText>
        {grid?.showViewAll && grid.viewAllButton && (
          <FadeInText delay={0.2} className="hidden md:block">
            <div className="group flex items-center font-sans text-xs tracking-widest uppercase transition-colors">
              <Button cta={grid.viewAllButton} />
              <ArrowRight size={14} className="ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </FadeInText>
        )}
      </div>

      {displayCategories.length > 0 ? (
        <div className={`grid ${gridColumns} ${gapSize}`}>
          {displayCategories.map((category, index) => (
            <CategoryCard key={category.slug} category={category} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 sm:py-10 md:py-12 lg:py-16" style={{ opacity: 0.6, color: themeStyles.color || 'inherit' }}>
          <p>No categories available at the moment.</p>
        </div>
      )}
    </section>
  );
}
