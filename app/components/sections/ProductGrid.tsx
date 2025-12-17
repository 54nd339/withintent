'use client';

import { ArrowRight } from 'lucide-react';
import { FadeInText, ProductCard, Button, RichText } from '@/app/components';
import { ProductGridBlock, Product } from '@/app/types';
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

interface ProductGridProps {
  data?: ProductGridBlock;
  products?: Product[];
  whatsAppNumber?: string;
  onProductClick?: (product: Product) => void;
}

export function ProductGrid({ data, products = [], whatsAppNumber, onProductClick }: ProductGridProps) {
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
  const displayProducts = limit ? products.slice(0, limit) : products;

  const header = data.header;

  return (
    <section
      id="shop"
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

      {displayProducts.length > 0 ? (
        <div className={`grid ${gridColumns} ${gapSize}`}>
          {displayProducts.map((product, index) => (
            <ProductCard
              key={product.slug}
              product={product}
              index={index}
              whatsAppNumber={whatsAppNumber}
              showPrice={data.showPrice}
              showStatus={data.showStatus}
              onProductClick={onProductClick}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 sm:py-10 md:py-12 lg:py-16" style={{ opacity: 0.6, color: themeStyles.color || 'inherit' }}>
          <p>No products available at the moment.</p>
        </div>
      )}
    </section>
  );
}
