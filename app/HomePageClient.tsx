'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import {
  Navbar,
  Footer,
  HeroSection,
  ProductGrid,
  StorySection,
  BannerSection,
  TextSection,
  CategoryGridSection,
  GallerySection,
  FaqSection,
  ProductModal,
} from '@/app/components';
import { useTheme } from '@/app/providers';
import {
  GlobalSetting,
  Page,
  Product,
  ProductGridBlock,
  HeroBlock,
  StoryBlock,
  BannerBlock,
  TextBlock,
  CategoryGridBlock,
  GalleryBlock,
  FaqBlock,
  Category
} from '@/app/types';
import { formatWhatsAppUrl } from '@/app/lib/utils';

interface HomePageClientProps {
  page: Page;
  globalSettings: GlobalSetting;
  products: Record<string, Product[]>;
  categories: Category[];
}

export default function HomePageClient({ page, globalSettings, products, categories }: HomePageClientProps) {
  useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const whatsAppNumber = page.whatsAppLink
    ? page.whatsAppLink.replace(/[^\d]/g, '')
    : globalSettings.whatsAppNumber || '919876543210';

  const whatsAppUrl = formatWhatsAppUrl(whatsAppNumber);

  return (
    <div
      className={`min-h-screen transition-colors duration-700 ease-in-out bg-[var(--background)] text-[var(--foreground)] dark:bg-neutral-900 dark:text-neutral-100`}
    >
      {page.showNavigation && (
        <Navbar
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          navigation={globalSettings.mainNavigation}
          logo={globalSettings.logo}
        />
      )}

      <main>
        {page.sections?.map((section, index) => {
          // HeroBlock
          if ('showScrollIndicator' in section || ('text' in section && 'media' in section && 'buttons' in section)) {
            return <HeroSection key={index} data={section as HeroBlock} />;
          }

          // ProductGridBlock
          if ('filterCollection' in section || 'filterCategory' in section || ('grid' in section && (section as ProductGridBlock).grid?.kind === 'products')) {
            const gridSection = section as ProductGridBlock;
            const collectionSlug = gridSection.filterCollection?.slug || gridSection.filterCategory?.slug || 'all';
            const sectionProducts = products[collectionSlug] || [];
            return (
              <ProductGrid
                key={index}
                data={gridSection}
                products={sectionProducts}
                whatsAppNumber={whatsAppNumber}
                onProductClick={setSelectedProduct}
              />
            );
          }

          // StoryBlock
          if ('primaryButton' in section && 'text' in section && 'media' in section) {
            return <StorySection key={index} data={section as StoryBlock} />;
          }

          // BannerBlock
          if ('backgroundMedia' in section && 'buttons' in section) {
            return <BannerSection key={index} data={section as BannerBlock} />;
          }

          // TextBlock
          if ('text' in section && !('media' in section) && !('primaryButton' in section) && !('grid' in section) && !('backgroundMedia' in section)) {
            return <TextSection id="philosophy" key={index} data={section as TextBlock} />;
          }

          // CategoryGridBlock
          if ('grid' in section && (section as CategoryGridBlock).grid?.kind === 'categories') {
            return <CategoryGridSection key={index} data={section as CategoryGridBlock} categories={categories} />;
          }

          // GalleryBlock
          if ('cards' in section && 'enableLightbox' in section) {
            return <GallerySection key={index} data={section as GalleryBlock} />;
          }

          // FaqBlock
          if ('accordion' in section) {
            return <FaqSection key={index} data={section as FaqBlock} />;
          }

          return null;
        })}
      </main>

      {page.showFooter && globalSettings.footer && (
        <Footer data={globalSettings.footer} />
      )}

      {page.whatsAppEnabled && (
        <motion.a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          className="fixed bottom-6 right-6 md:hidden z-50 bg-green-600 text-white p-4 rounded-full shadow-xl"
        >
          <ShoppingBag size={24} />
        </motion.a>
      )}

      <ProductModal
        isOpen={!!selectedProduct}
        product={selectedProduct}
        whatsAppNumber={whatsAppNumber}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

