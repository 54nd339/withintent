'use client';

import Image from 'next/image';
import { ProductGridWithFilters, PageWrapper } from '@/components';
import { GlobalSetting, Category, Collection, Product } from '@/lib/types';
import { RESPONSIVE_PADDING } from '@/lib/constants';

interface CategoryPageClientProps {
  globalSettings: GlobalSetting;
  category: Category;
  products: Product[];
  categories: Category[];
  collections: Collection[];
}

export default function CategoryPageClient({
  globalSettings,
  category,
  products,
  categories,
  collections,
}: CategoryPageClientProps) {
  return (
    <PageWrapper globalSettings={globalSettings} >
      <main className={`${RESPONSIVE_PADDING} pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-10 md:pb-12 lg:pb-16`}>
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4 text-neutral-900 dark:text-neutral-100">
            {category.name}
          </h1>
          {category.coverImage && (
            <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-lg">
              <Image
                src={category.coverImage.url}
                alt={category.name}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>

        <ProductGridWithFilters
          products={products}
          categories={categories}
          collections={collections}
          showCategoryFilter={false}
        />
      </main>
    </PageWrapper>
  );
}
