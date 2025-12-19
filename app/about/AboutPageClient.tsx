'use client';

import React, { useState } from 'react';
import { Navbar, Footer, StorySection, FaqSection, TestimonialSection, PageWrapper } from '@/app/components';
import { GlobalSetting, Page, StoryBlock, FaqBlock, TestimonialBlock, SectionType } from '@/app/types';
import { useTheme } from '@/app/providers';

interface AboutPageClientProps {
  globalSettings: GlobalSetting;
  page: Page;
}

export default function AboutPageClient({ globalSettings, page }: AboutPageClientProps) {
  useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Separate StoryBlocks, FaqBlock, and TestimonialBlocks from sections
  const storyBlocks: StoryBlock[] = [];
  let faqBlock: FaqBlock | null = null;
  const testimonialBlocks: TestimonialBlock[] = [];

  if (page.sections) {
    page.sections.forEach((section) => {
      switch (section.__typename) {
        case SectionType.StoryBlock:
          storyBlocks.push(section);
          break;
        case SectionType.FaqBlock:
          faqBlock = section;
          break;
        case SectionType.TestimonialBlock:
          testimonialBlocks.push(section);
          break;
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

        {testimonialBlocks.map((testimonialBlock, index) => (
          <TestimonialSection key={index} data={testimonialBlock} />
        ))}

        {faqBlock && <FaqSection data={faqBlock} />}
      </main>

      {page.showFooter && globalSettings.footer && (
        <Footer data={globalSettings.footer} />
      )}
    </PageWrapper>
  );
}
