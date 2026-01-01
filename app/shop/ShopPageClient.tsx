'use client';

import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CollectionBanner, CollectionsGrid, ProductGridWithFilters, PageWrapper, LoadingSpinner } from '@/components';
import { GlobalSetting, Product, Category, Collection } from '@/lib/types';
import { RESPONSIVE_PADDING } from '@/lib/constants';

interface ShopPageClientProps {
  globalSettings: GlobalSetting;
  products: Product[];
  categories: Category[];
  collections: Collection[];
}

export default function ShopPageClient({ globalSettings, products, categories, collections }: ShopPageClientProps) {
  const bannerCollection = collections.find((col) => col.showInBanner) || collections[0];
  const otherCollections = collections.filter((col) => col.slug !== bannerCollection?.slug);

  return (
    <PageWrapper globalSettings={globalSettings} >
      <main className="pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-10 md:pb-12 lg:pb-16">
        {bannerCollection && (
          <div className={`mb-12 sm:mb-16 md:mb-20 lg:mb-24 ${RESPONSIVE_PADDING}`}>
            <CollectionBanner collection={bannerCollection} />
          </div>
        )}

        {otherCollections.length > 0 && (
          <div className={`mb-12 sm:mb-16 md:mb-20 lg:mb-24 ${RESPONSIVE_PADDING}`}>
            <CollectionsGrid collections={otherCollections} />
          </div>
        )}

        {categories.length > 0 && (
          <div className={`mb-12 sm:mb-16 md:mb-20 lg:mb-24 ${RESPONSIVE_PADDING} py-12 sm:py-16 md:py-20 bg-neutral-50 dark:bg-[#1a1a1a]`}>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-8 sm:mb-10 md:mb-14 text-neutral-900 dark:text-neutral-50 tracking-tight">
              Shop by Category
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/shop/category/${category.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100 dark:bg-neutral-700">
                    {category.coverImage && (
                      <Image
                        src={category.coverImage.url}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
                      <h3 className="font-serif text-lg md:text-xl text-white group-hover:text-white/90 transition-colors duration-300">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className={RESPONSIVE_PADDING}>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-8 sm:mb-10 md:mb-14 text-neutral-900 dark:text-neutral-100 tracking-tight">
            All Products
          </h2>
          <Suspense fallback={<div className="py-12"><LoadingSpinner /></div>}>
            <ProductGridWithFilters
              products={products}
              categories={categories}
              collections={collections}
            />
          </Suspense>
        </div>
      </main>
    </PageWrapper>
  );
}
