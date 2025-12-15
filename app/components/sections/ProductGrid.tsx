'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { FadeInText, ProductCard, Cta } from '@/app/components';
import { ProductGridBlock, Product } from '@/app/types';
import { getSpacingClasses, getGridColumnsClasses, getGapSizeClasses } from '@/app/lib/utils';

interface ProductGridProps {
  data?: ProductGridBlock;
  products?: Product[];
  whatsAppNumber?: string;
}

export function ProductGrid({ data, products = [], whatsAppNumber }: ProductGridProps) {
  if (!data) {
    return null;
  }

  const spacingClasses = getSpacingClasses(
    data.paddingTop,
    data.paddingBottom,
    data.marginTop,
    data.marginBottom
  );

  const gridColumns = getGridColumnsClasses(data.columns);
  const gapSize = getGapSizeClasses(data.gapSize);
  const displayProducts = data.limit ? products.slice(0, data.limit) : products;

  return (
    <section id="shop" className={`px-6 max-w-7xl mx-auto ${spacingClasses}`}>
      <div className="flex justify-between items-end mb-16">
        <FadeInText className="text-left">
          {data.eyebrow && (
            <h3 className="font-sans text-xs tracking-[0.3em] uppercase mb-4 text-neutral-700 dark:text-neutral-400">
              {data.eyebrow}
            </h3>
          )}
          {data.headline && (
            <h2 className="font-serif text-4xl text-neutral-900 dark:text-white">
              {data.headline}
            </h2>
          )}
        </FadeInText>
        {data.showViewAllLink && data.viewAllLink && (
          <FadeInText delay={0.2} className="hidden md:block">
            <div className="group flex items-center font-sans text-xs tracking-widest uppercase text-neutral-800 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors">
              <Cta cta={data.viewAllLink} />
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
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-neutral-500">
          <p>No products available at the moment.</p>
        </div>
      )}
    </section>
  );
}
