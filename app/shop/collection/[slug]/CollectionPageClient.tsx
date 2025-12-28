'use client';

import { useScroll, useTransform } from 'framer-motion';
import { ProductGridWithFilters, PageWrapper, CollectionHero } from '@/components';
import { GlobalSetting, Collection, Category, Product } from '@/lib/types';
import { SCROLL_ANIMATION, RESPONSIVE_PADDING } from '@/lib/constants';

interface CollectionPageClientProps {
  globalSettings: GlobalSetting;
  collection: Collection;
  products: Product[];
  categories: Category[];
  collections: Collection[];
}

export default function CollectionPageClient({
  globalSettings,
  collection,
  products,
  categories,
  collections,
}: CollectionPageClientProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, SCROLL_ANIMATION.PARALLAX_INPUT, SCROLL_ANIMATION.PARALLAX_OUTPUT);
  const opacity = useTransform(scrollY, SCROLL_ANIMATION.OPACITY_INPUT, SCROLL_ANIMATION.OPACITY_OUTPUT);

  return (
    <PageWrapper globalSettings={globalSettings} >
      <CollectionHero
        collection={collection}
        variant="page"
        parallaxY={y}
        parallaxOpacity={opacity}
      />

      <main className={`${RESPONSIVE_PADDING} py-12 sm:py-16 md:py-20`}>
        <ProductGridWithFilters
          products={products}
          categories={categories}
          collections={collections}
          showCollectionFilter={false}
        />
      </main>
    </PageWrapper>
  );
}
