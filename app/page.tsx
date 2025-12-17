'use client';

import React, { useState, useEffect } from 'react';
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
  FaqSection
} from '@/app/components';
import { useTheme } from '@/app/providers';
import { hygraphClient, GET_GLOBAL_SETTINGS, GET_PAGE_BY_SLUG, GET_PRODUCTS_BY_COLLECTION, GET_ALL_PRODUCTS, GET_ALL_CATEGORIES } from '@/app/lib/hygraph';
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

export default function App() {
  useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [globalSettings, setGlobalSettings] = useState<GlobalSetting | null>(null);
  const [page, setPage] = useState<Page | null>(null);
  const [products, setProducts] = useState<Record<string, Product[]>>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const globalSettingId = process.env.NEXT_PUBLIC_HYGRAPH_GLOBAL_SETTING_ID;
        
        if (!globalSettingId) {
          throw new Error('HYGRAPH_GLOBAL_SETTING_ID is not defined');
        }

        // Fetch global settings and page in parallel
        const [globalSettingsData, pageData] = await Promise.all([
          hygraphClient.request<{ globalSetting: GlobalSetting }>(GET_GLOBAL_SETTINGS, {
            id: globalSettingId,
          }),
          hygraphClient.request<{ page: Page }>(GET_PAGE_BY_SLUG, {
            slug: 'home',
          }),
        ]);

        setGlobalSettings(globalSettingsData.globalSetting);
        setPage(pageData.page);

        // Fetch products for each ProductGridBlock and categories for CategoryGridBlock
        if (pageData.page.sections) {
          const productPromises = pageData.page.sections
            .filter((section): section is ProductGridBlock => 'filterCollection' in section || 'filterCategory' in section)
            .map(async (section) => {
              if (section.filterCollection?.slug) {
                const collectionData = await hygraphClient.request<{
                  collections: Array<{ products: Product[] }>;
                }>(GET_PRODUCTS_BY_COLLECTION, {
                  slug: section.filterCollection.slug,
                  limit: section.grid?.limit,
                });

                return {
                  key: section.filterCollection.slug,
                  products: collectionData.collections[0]?.products || [],
                };
              } else if (section.filterCategory?.slug) {
                // Handle category filter if needed
                const allProductsData = await hygraphClient.request<{
                  products: Product[];
                }>(GET_ALL_PRODUCTS, {
                  limit: section.grid?.limit,
                });

                return {
                  key: section.filterCategory.slug,
                  products: allProductsData.products || [],
                };
              } else {
                // Fetch all products if no filter
                const allProductsData = await hygraphClient.request<{
                  products: Product[];
                }>(GET_ALL_PRODUCTS, {
                  limit: section.grid?.limit,
                });

                return {
                  key: 'all',
                  products: allProductsData.products || [],
                };
              }
            });

          const productResults = await Promise.all(productPromises);
          const productsMap: Record<string, Product[]> = {};
          productResults.forEach((result) => {
            productsMap[result.key] = result.products;
          });
          setProducts(productsMap);

          // Fetch categories if any CategoryGridBlock exists
          const hasCategoryGrid = pageData.page.sections.some(
            (section): section is CategoryGridBlock => 'grid' in section && section.grid?.kind === 'categories'
          );
          
          if (hasCategoryGrid) {
            const categoriesData = await hygraphClient.request<{
              categories: Category[];
            }>(GET_ALL_CATEGORIES);
            setCategories(categoriesData.categories || []);
          }
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

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
          <p className="text-neutral-600 dark:text-neutral-400 text-sm">
            Please check your environment variables and API configuration.
          </p>
        </div>
      </div>
    );
  }

  if (!page || !globalSettings) {
    return null;
  }

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
            return <TextSection key={index} data={section as TextBlock} />;
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
    </div>
  );
}
