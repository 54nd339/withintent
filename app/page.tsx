'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { Navbar, Footer, HeroSection, PhilosophySection, ProductGrid, StorySection } from '@/app/components';
import { useTheme } from '@/app/providers';
import { hygraphClient, GET_GLOBAL_SETTINGS, GET_PAGE_BY_SLUG, GET_PRODUCTS_BY_COLLECTION, GET_ALL_PRODUCTS } from '@/app/lib/hygraph';
import { GlobalSetting, Page, Product, ProductGridBlock, HeroBlock } from '@/app/types';
import { formatWhatsAppUrl } from '@/app/lib/utils';

export default function App() {
  useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [globalSettings, setGlobalSettings] = useState<GlobalSetting | null>(null);
  const [page, setPage] = useState<Page | null>(null);
  const [products, setProducts] = useState<Record<string, Product[]>>({});
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

        // Fetch products for each ProductGridBlock
        if (pageData.page.sections) {
          const productPromises = pageData.page.sections
            .filter((section): section is ProductGridBlock => 'filterCollection' in section)
            .map(async (section) => {
              if (section.filterCollection?.slug) {
                const collectionData = await hygraphClient.request<{
                  collections: Array<{ products: Product[] }>;
                }>(GET_PRODUCTS_BY_COLLECTION, {
                  slug: section.filterCollection.slug,
                  limit: section.limit,
                });

                return {
                  key: section.filterCollection.slug,
                  products: collectionData.collections[0]?.products || [],
                };
              } else {
                // Fetch all products if no collection filter
                const allProductsData = await hygraphClient.request<{
                  products: Product[];
                }>(GET_ALL_PRODUCTS, {
                  limit: section.limit,
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
          const sectionAny = section as any;

          if (('heroHeadline' in section || 'headline' in section || 'backgroundImage' in section) && 
              ('backgroundImage' in section || 'subHeadline' in section || 'showScrollIndicator' in section)) {
            const heroSection: HeroBlock = {
              headline: sectionAny.heroHeadline || sectionAny.headline,
              subHeadline: sectionAny.subHeadline,
              eyebrow: sectionAny.eyebrow,
              backgroundImage: sectionAny.backgroundImage,
              overlayColor: sectionAny.overlayColor,
              overlayOpacity: sectionAny.overlayOpacity,
              minHeight: sectionAny.minHeight,
              showScrollIndicator: sectionAny.showScrollIndicator,
              scrollIndicatorText: sectionAny.scrollIndicatorText,
              textAlignment: sectionAny.textAlignment,
              buttons: sectionAny.buttons,
              paddingTop: sectionAny.paddingTop,
              paddingBottom: sectionAny.paddingBottom,
              marginTop: sectionAny.marginTop,
              marginBottom: sectionAny.marginBottom,
            };
            return <HeroSection key={index} data={heroSection} />;
          }

          // PhilosophyBlock
          if ('quote' in section && 'description' in section) {
            return <PhilosophySection key={index} data={section} />;
          }

          // ProductGridBlock
          if ('filterCollection' in section || 'product' in section) {
            const gridSection = { ...section, headline: (section as any).gridHeadline };
            delete (gridSection as any).gridHeadline;
            const collectionSlug = gridSection.filterCollection?.slug || 'all';
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
          if ('heading' in section && 'content' in section) {
            return <StorySection key={index} data={section} />;
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
