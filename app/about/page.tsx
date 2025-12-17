'use client';

import React, { useState, useEffect } from 'react';
import { Navbar, Footer, StorySection, FaqSection } from '@/app/components';
import { hygraphClient, GET_GLOBAL_SETTINGS, GET_PAGE_BY_SLUG } from '@/app/lib/hygraph';
import { GlobalSetting, Page, StoryBlock, FaqBlock } from '@/app/types';
import { useTheme } from '@/app/providers';

export default function AboutPage() {
  useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [globalSettings, setGlobalSettings] = useState<GlobalSetting | null>(null);
  const [page, setPage] = useState<Page | null>(null);
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
            slug: 'about',
          }),
        ]);

        setGlobalSettings(globalSettingsData.globalSetting);
        setPage(pageData.page);
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
        </div>
      </div>
    );
  }

  if (!page || !globalSettings) {
    return null;
  }

  // Separate StoryBlocks and FaqBlock from sections
  const storyBlocks: StoryBlock[] = [];
  let faqBlock: FaqBlock | null = null;

  if (page.sections) {
    page.sections.forEach((section) => {
      if ('primaryButton' in section && 'text' in section && 'media' in section) {
        storyBlocks.push(section as StoryBlock);
      } else if ('accordion' in section) {
        faqBlock = section as FaqBlock;
      }
    });
  }

  return (
    <div className="min-h-screen transition-colors duration-700 ease-in-out bg-[var(--background)] text-[var(--foreground)] dark:bg-neutral-900 dark:text-neutral-100">
      {page.showNavigation && globalSettings.mainNavigation && (
        <Navbar
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          navigation={globalSettings.mainNavigation}
          logo={globalSettings.logo}
        />
      )}

      <main className="pt-16 sm:pt-20">
        {/* StoryBlocks (Team Members) */}
        {storyBlocks.map((storyBlock, index) => (
          <StorySection key={index} data={storyBlock} />
        ))}

        {/* FAQ Block */}
        {faqBlock && <FaqSection data={faqBlock} />}
      </main>

      {page.showFooter && globalSettings.footer && (
        <Footer data={globalSettings.footer} />
      )}
    </div>
  );
}

