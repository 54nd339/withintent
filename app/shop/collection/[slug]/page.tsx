'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Navbar, Footer, ProductGridWithFilters, ProductModal, LoadingSpinner, ErrorMessage, PageWrapper } from '@/app/components';
import { hygraphClient, GET_GLOBAL_SETTINGS, GET_COLLECTION_BY_SLUG, GET_ALL_CATEGORIES, GET_ALL_COLLECTIONS } from '@/app/lib/hygraph';
import { GlobalSetting, Collection, Category, Product } from '@/app/types';
import { useTheme } from '@/app/providers';
import { useProductModal } from '@/app/hooks';
import { RichText } from '@/app/components/ui/RichText';
import { SCROLL_ANIMATION } from '@/app/lib/constants';

export default function CollectionPage() {
  useTheme();
  const params = useParams();
  const slug = params?.slug as string;
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, SCROLL_ANIMATION.PARALLAX_INPUT, SCROLL_ANIMATION.PARALLAX_OUTPUT);
  const opacity = useTransform(scrollY, SCROLL_ANIMATION.OPACITY_INPUT, SCROLL_ANIMATION.OPACITY_OUTPUT);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [globalSettings, setGlobalSettings] = useState<GlobalSetting | null>(null);
  const [collection, setCollection] = useState<Collection | null>(null);
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
        const [globalSettingsData, collectionData, categoriesData, collectionsData] = await Promise.all([
          hygraphClient.request<{ globalSetting: GlobalSetting }>(GET_GLOBAL_SETTINGS, {
            id: globalSettingId,
          }),
          hygraphClient.request<{ collection: Collection }>(GET_COLLECTION_BY_SLUG, {
            slug,
          }),
          hygraphClient.request<{ categories: Category[] }>(GET_ALL_CATEGORIES),
          hygraphClient.request<{ collections: Collection[] }>(GET_ALL_COLLECTIONS),
        ]);

        setGlobalSettings(globalSettingsData.globalSetting);
        setCollection(collectionData.collection);
        setProducts(collectionData.collection?.products || []);
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

  if (error || !collection) {
    return <ErrorMessage error={error || 'Collection not found'} />;
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

      {/* Hero Section */}
      <div className="relative w-full min-h-[60vh] md:min-h-[70vh] overflow-hidden flex items-center justify-center">
        {collection.coverImage && (
          <motion.div
            className="absolute inset-0 z-0"
            style={{ y }}
          >
            <motion.img
              src={collection.coverImage.url}
              alt={collection.title}
              className="w-full h-full object-cover scale-110"
              style={{ opacity }}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1.1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
          </motion.div>
        )}

        <div className="relative z-10 text-center text-white px-4 sm:px-6 md:px-8">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/70 mb-4 sm:mb-6"
          >
            Collection
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 sm:mb-6 tracking-tight"
          >
            {collection.title}
          </motion.h1>
          {collection.description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="max-w-2xl mx-auto text-sm sm:text-base text-white/80 leading-relaxed"
            >
              <RichText content={collection.description} />
            </motion.div>
          )}
        </div>
      </div>

      <main className="px-4 sm:px-5 md:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
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
          showCollectionFilter={false}
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
