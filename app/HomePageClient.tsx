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
  Category,
  SectionType,
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
          switch (section.__typename) {
            case SectionType.HeroBlock:
              return <HeroSection key={index} data={section} />;

            case SectionType.ProductGridBlock: {
              const gridSection = section as ProductGridBlock;
              const collectionSlug = gridSection.filterCollection?.slug || gridSection.filterCategory?.slug || 'all';
              const sectionProducts = products[collectionSlug] || [];
              return (
                <ProductGrid
                  key={index}
                  data={section}
                  products={sectionProducts}
                  whatsAppNumber={whatsAppNumber}
                  onProductClick={setSelectedProduct}
                />
              );
            }

            case SectionType.StoryBlock:
              return <StorySection key={index} data={section} />;

            case SectionType.BannerBlock:
              return <BannerSection key={index} data={section} />;

            case SectionType.TextBlock:
              return <TextSection id="philosophy" key={index} data={section} />;

            case SectionType.CategoryGridBlock:
              return <CategoryGridSection key={index} data={section} categories={categories} />;

            case SectionType.GalleryBlock:
              return <GallerySection key={index} data={section} />;

            case SectionType.FaqBlock:
              return <FaqSection key={index} data={section} />;

            default:
              return null;
          }
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
