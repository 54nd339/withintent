'use client';

import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Navbar, Footer, ProductGridWithFilters, ProductModal, PageWrapper } from '@/app/components';
import { GlobalSetting, Collection, Category, Product } from '@/app/types';
import { useTheme } from '@/app/providers';
import { useProductModal } from '@/app/hooks';
import { RichText } from '@/app/components/ui/RichText';
import { SCROLL_ANIMATION } from '@/app/lib/constants';

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
  useTheme();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, SCROLL_ANIMATION.PARALLAX_INPUT, SCROLL_ANIMATION.PARALLAX_OUTPUT);
  const opacity = useTransform(scrollY, SCROLL_ANIMATION.OPACITY_INPUT, SCROLL_ANIMATION.OPACITY_OUTPUT);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { selectedProduct, isModalOpen, handleProductClick, handleCloseModal } = useProductModal();

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

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        whatsAppNumber={globalSettings.whatsAppNumber}
      />
    </PageWrapper>
  );
}

