'use client';

import React, { useState } from 'react';
import { Navbar, Footer, StorySection, FaqSection, PageWrapper } from '@/app/components';
import { GlobalSetting, Page, StoryBlock, FaqBlock } from '@/app/types';
import { useTheme } from '@/app/providers';

interface AboutPageClientProps {
  globalSettings: GlobalSetting;
  page: Page;
}

export default function AboutPageClient({ globalSettings, page }: AboutPageClientProps) {
  useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <PageWrapper>
      {page.showNavigation && globalSettings.mainNavigation && (
        <Navbar
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          navigation={globalSettings.mainNavigation}
          logo={globalSettings.logo}
        />
      )}

      <main className="pt-16 sm:pt-20">
        {storyBlocks.map((storyBlock, index) => (
          <StorySection key={index} data={storyBlock} />
        ))}

        {faqBlock && <FaqSection data={faqBlock} />}
      </main>

      {page.showFooter && globalSettings.footer && (
        <Footer data={globalSettings.footer} />
      )}
    </PageWrapper>
  );
}

