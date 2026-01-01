'use client';

import { SectionHeader, ViewAllButton } from '@/components';
import { ProductGridBase } from './ProductGridBase';
import { getGridConfig } from '@/lib/utils';
import { ProductGridBlock, Product } from '@/lib/types';
import { useSectionLayout } from '@/hooks';
import { RESPONSIVE_PADDING, SECTION_HEADER_MARGIN } from '@/lib/constants';

interface ProductGridProps {
  data?: ProductGridBlock;
  products?: Product[];
}

export function ProductGrid({ data, products = [] }: ProductGridProps) {
  const { themeStyles, spacingClasses, containerWidthClasses } = useSectionLayout({
    layout: data?.layout,
    theme: data?.theme,
  });

  if (!data) {
    return null;
  }

  const { gridClassName, limit } = getGridConfig({ grid: data.grid });
  const displayProducts = limit ? products.slice(0, limit) : products;

  const header = data.header;

  return (
    <section
      id="shop"
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

      <ProductGridBase
        products={displayProducts}
        gridClassName={gridClassName}
        showPrice={data.showPrice}
        showStatus={data.showStatus}
        emptyStateClassName="text-center py-8 sm:py-10 md:py-12 lg:py-16"
        emptyStateMessage="No products available at the moment."
        emptyStateStyle={{ opacity: 0.6, color: themeStyles.color || 'inherit' }}
      />
    </section>
  );
}
