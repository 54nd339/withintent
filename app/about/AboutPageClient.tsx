'use client';

import { StorySection, FaqSection, TestimonialSection, PageWrapper } from '@/components';
import { GlobalSetting, Page, StoryBlock, FaqBlock, TestimonialBlock, SectionType } from '@/lib/types';

interface AboutPageClientProps {
  globalSettings: GlobalSetting;
  page: Page;
}

export default function AboutPageClient({ globalSettings, page }: AboutPageClientProps) {
  const storyBlocks = page.sections?.filter(
    (section): section is StoryBlock => section.__typename === SectionType.StoryBlock
  ) || [];

  const faqBlock = page.sections?.find(
    (section): section is FaqBlock => section.__typename === SectionType.FaqBlock
  ) || null;

  const testimonialBlocks = page.sections?.filter(
    (section): section is TestimonialBlock => section.__typename === SectionType.TestimonialBlock
  ) || [];

  return (
    <PageWrapper globalSettings={globalSettings} showNavigation={page.showNavigation} showFooter={page.showFooter}>
      <main className="pt-16 sm:pt-20">
        {storyBlocks.map((storyBlock, index) => (
          <StorySection key={index} data={storyBlock} />
        ))}

        {testimonialBlocks.map((testimonialBlock, index) => (
          <TestimonialSection key={index} data={testimonialBlock} />
        ))}

        {faqBlock && <FaqSection data={faqBlock} />}
      </main>
    </PageWrapper>
  );
}
