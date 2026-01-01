'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const MotionImage = motion.create(Image);
import { SectionHeader, EmptyState, ViewAllButton } from '@/components';
import { getGridConfig } from '@/lib/utils';
import { CategoryGridBlock, Category } from '@/lib/types';
import { useSectionLayout } from '@/hooks';
import { RESPONSIVE_PADDING, SECTION_HEADER_MARGIN } from '@/lib/constants';

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
            <MotionImage
              src={category.coverImage.url}
              alt={category.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
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
  const { themeStyles, spacingClasses, containerWidthClasses } = useSectionLayout({
    layout: data?.layout,
    theme: data?.theme,
  });

  if (!data) {
    return null;
  }

  const { gridClassName, limit } = getGridConfig({ grid: data.grid });
  const displayCategories = limit ? categories.slice(0, limit) : categories;

  const header = data.header;

  return (
    <section
      className={`${RESPONSIVE_PADDING} mx-auto ${spacingClasses} ${containerWidthClasses}`}
      style={themeStyles}
    >
      <div className={`flex justify-between items-end ${SECTION_HEADER_MARGIN}`}>
        <SectionHeader
          text={header}
          themeStyles={themeStyles}
          className="text-left"
        />
        <ViewAllButton
          button={data.grid?.viewAllButton}
          show={data.grid?.showViewAll}
        />
      </div>

      {displayCategories.length > 0 ? (
        <div className={gridClassName}>
          {displayCategories.map((category, index) => (
            <CategoryCard key={category.slug} category={category} index={index} />
          ))}
        </div>
      ) : (
        <EmptyState
          message="No categories available at the moment."
          themeStyles={themeStyles}
        />
      )}
    </section>
  );
}
