'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar, Footer, CollectionBanner, CollectionsGrid, ProductGridWithFilters, ProductModal } from '@/app/components';
import { hygraphClient, GET_GLOBAL_SETTINGS, GET_ALL_PRODUCTS, GET_ALL_CATEGORIES, GET_ALL_COLLECTIONS } from '@/app/lib/hygraph';
import { GlobalSetting, Product, Category, Collection } from '@/app/types';
import { useTheme } from '@/app/providers';

export default function ShopPage() {
  useTheme();
  const searchParams = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [globalSettings, setGlobalSettings] = useState<GlobalSetting | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const globalSettingId = process.env.NEXT_PUBLIC_HYGRAPH_GLOBAL_SETTING_ID;
        
        if (!globalSettingId) {
          throw new Error('HYGRAPH_GLOBAL_SETTING_ID is not defined');
        }

        // Fetch all data in parallel
        const [globalSettingsData, productsData, categoriesData, collectionsData] = await Promise.all([
          hygraphClient.request<{ globalSetting: GlobalSetting }>(GET_GLOBAL_SETTINGS, {
            id: globalSettingId,
          }),
          hygraphClient.request<{ products: Product[] }>(GET_ALL_PRODUCTS, { limit: 50, orderBy: 'createdAt_DESC' }),
          hygraphClient.request<{ categories: Category[] }>(GET_ALL_CATEGORIES),
          hygraphClient.request<{ collections: Collection[] }>(GET_ALL_COLLECTIONS),
        ]);

        setGlobalSettings(globalSettingsData.globalSetting);
        setProducts(productsData.products || []);
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
  }, []);

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
    // Update URL without navigation
    window.history.pushState({}, '', `/shop?product=${product.slug}`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    // Clear URL param
    window.history.pushState({}, '', '/shop');
  };

  // Get banner collection (most recent with showInBanner = true)
  const bannerCollection = collections.find((col) => col.showInBanner) || collections[0];
  const otherCollections = collections.filter((col) => col.slug !== bannerCollection?.slug);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900 dark:border-white mx-auto mb-4"></div>
          <p className="text-neutral-600 dark:text-neutral-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!globalSettings) {
    return null;
  }

  return (
    <div className="min-h-screen transition-colors duration-700 ease-in-out bg-[var(--background)] text-[var(--foreground)] dark:bg-[#121212] dark:text-[#f8f5ef]">
      {globalSettings.mainNavigation && (
        <Navbar
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          navigation={globalSettings.mainNavigation}
          logo={globalSettings.logo}
        />
      )}

      <main className="pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-10 md:pb-12 lg:pb-16">
        {/* Banner Collection */}
        {bannerCollection && (
          <div className="mb-12 sm:mb-16 md:mb-20 lg:mb-24 px-4 sm:px-5 md:px-6 lg:px-8">
            <CollectionBanner collection={bannerCollection} />
          </div>
        )}

        {/* Collections Grid */}
        {otherCollections.length > 0 && (
          <div className="mb-12 sm:mb-16 md:mb-20 lg:mb-24 px-4 sm:px-5 md:px-6 lg:px-8">
            <CollectionsGrid collections={otherCollections} />
          </div>
        )}

        {/* Categories Grid */}
        {categories.length > 0 && (
          <div className="mb-12 sm:mb-16 md:mb-20 lg:mb-24 px-4 sm:px-5 md:px-6 lg:px-8 py-12 sm:py-16 md:py-20 bg-neutral-50 dark:bg-[#1a1a1a]">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-8 sm:mb-10 md:mb-14 text-neutral-900 dark:text-neutral-50 tracking-tight">
              Shop by Category
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {categories.map((category) => (
                <a
                  key={category.slug}
                  href={`/shop/category/${category.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100 dark:bg-neutral-700">
                    {category.coverImage && (
                      <img
                        src={category.coverImage.url}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
                      <h3 className="font-serif text-lg md:text-xl text-white group-hover:text-white/90 transition-colors duration-300">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Products with Filters */}
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

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        whatsAppNumber={globalSettings.whatsAppNumber}
      />
    </div>
  );
}

