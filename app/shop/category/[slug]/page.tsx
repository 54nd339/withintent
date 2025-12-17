'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Navbar, Footer, ProductGridWithFilters, ProductModal, LoadingSpinner, ErrorMessage, PageWrapper } from '@/app/components';
import { hygraphClient, GET_GLOBAL_SETTINGS, GET_CATEGORY_BY_SLUG, GET_ALL_CATEGORIES, GET_ALL_COLLECTIONS } from '@/app/lib/hygraph';
import { GlobalSetting, Category, Collection, Product } from '@/app/types';
import { useTheme } from '@/app/providers';
import { useProductModal } from '@/app/hooks';

export default function CategoryPage() {
  useTheme();
  const params = useParams();
  const slug = params?.slug as string;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [globalSettings, setGlobalSettings] = useState<GlobalSetting | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const { selectedProduct, isModalOpen, handleProductClick, handleCloseModal } = useProductModal();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!slug) return;

      try {
        const globalSettingId = process.env.NEXT_PUBLIC_HYGRAPH_GLOBAL_SETTING_ID;

        if (!globalSettingId) {
          throw new Error('HYGRAPH_GLOBAL_SETTING_ID is not defined');
        }

        // Fetch all data in parallel
        const [globalSettingsData, categoryData, categoriesData, collectionsData] = await Promise.all([
          hygraphClient.request<{ globalSetting: GlobalSetting }>(GET_GLOBAL_SETTINGS, {
            id: globalSettingId,
          }),
          hygraphClient.request<{ category: Category }>(GET_CATEGORY_BY_SLUG, {
            slug,
          }),
          hygraphClient.request<{ categories: Category[] }>(GET_ALL_CATEGORIES),
          hygraphClient.request<{ collections: Collection[] }>(GET_ALL_COLLECTIONS),
        ]);

        setGlobalSettings(globalSettingsData.globalSetting);
        setCategory(categoryData.category);
        setProducts(categoryData.category?.products || []);
        setCategories(categoriesData.categories || []);
        setCollections(collectionsData.collections || []);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !category) {
    return <ErrorMessage error={error || 'Category not found'} />;
  }

  if (!globalSettings) {
    return null;
  }

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

      <main className="px-4 sm:px-5 md:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-10 md:pb-12 lg:pb-16">
        {/* Category Header */}
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

        {/* Products with Filters */}
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
          showCategoryFilter={false}
        />
      </main>

      {globalSettings.footer && (
        <Footer data={globalSettings.footer} />
      )}

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        whatsAppNumber={globalSettings.whatsAppNumber}
      />
    </PageWrapper>
  );
}
