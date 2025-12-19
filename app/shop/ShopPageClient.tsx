'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar, Footer, CollectionBanner, CollectionsGrid, ProductGridWithFilters, ProductModal, PageWrapper } from '@/app/components';
import { GlobalSetting, Product, Category, Collection } from '@/app/types';
import { useTheme } from '@/app/providers';

interface ShopPageClientProps {
  globalSettings: GlobalSetting;
  products: Product[];
  categories: Category[];
  collections: Collection[];
}

function ShopPageContent({ globalSettings, products, categories, collections }: ShopPageClientProps) {
  useTheme();
  const searchParams = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open modal from URL query param
  useEffect(() => {
    const productSlug = searchParams.get('product');
    if (productSlug && products.length > 0) {
      const product = products.find(p => p.slug === productSlug);
      if (product) {
        setSelectedProduct(product);
        setIsModalOpen(true);
      }
    }
  }, [searchParams, products]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    window.history.pushState({}, '', `/shop?product=${product.slug}`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    window.history.pushState({}, '', '/shop');
  };

  const bannerCollection = collections.find((col) => col.showInBanner) || collections[0];
  const otherCollections = collections.filter((col) => col.slug !== bannerCollection?.slug);

  return (
    <PageWrapper>
      {globalSettings.mainNavigation && (
        <Navbar
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          navigation={globalSettings.mainNavigation}
          logo={globalSettings.logo}
        />
      )}

      <main className="pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-10 md:pb-12 lg:pb-16">
        {bannerCollection && (
          <div className="mb-12 sm:mb-16 md:mb-20 lg:mb-24 px-4 sm:px-5 md:px-6 lg:px-8">
            <CollectionBanner collection={bannerCollection} />
          </div>
        )}

        {otherCollections.length > 0 && (
          <div className="mb-12 sm:mb-16 md:mb-20 lg:mb-24 px-4 sm:px-5 md:px-6 lg:px-8">
            <CollectionsGrid collections={otherCollections} />
          </div>
        )}

        {categories.length > 0 && (
          <div className="mb-12 sm:mb-16 md:mb-20 lg:mb-24 px-4 sm:px-5 md:px-6 lg:px-8 py-12 sm:py-16 md:py-20 bg-neutral-50 dark:bg-[#1a1a1a]">
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

        <div className="px-4 sm:px-5 md:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-8 sm:mb-10 md:mb-14 text-neutral-900 dark:text-neutral-100 tracking-tight">
            All Products
          </h2>
          <ProductGridWithFilters
            products={products}
            categories={categories}
            collections={collections}
            whatsAppNumber={globalSettings.whatsAppNumber}
            showPrice={true}
            showStatus={true}
            gridColumns="three"
            gapSize="md"
            onProductClick={handleProductClick}
          />
        </div>
      </main>

      {globalSettings.footer && (
        <Footer data={globalSettings.footer} />
      )}

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        whatsAppNumber={globalSettings.whatsAppNumber}
      />
    </PageWrapper>
  );
}

export default function ShopPageClient(props: ShopPageClientProps) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ShopPageContent {...props} />
    </Suspense>
  );
}
