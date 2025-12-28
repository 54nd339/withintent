'use client';

import { useState } from 'react';
import { AccordionItem, SectionHeader } from '@/components';
import { useSectionLayout } from '@/hooks';
import { FaqBlock } from '@/lib/types';

interface FaqSectionProps {
  data?: FaqBlock;
}

export function FaqSection({ data }: FaqSectionProps) {
  const { themeStyles, spacingClasses, containerWidthClasses } = useSectionLayout({
    layout: data?.layout,
    theme: data?.theme,
  });

  const [openItems, setOpenItems] = useState<Set<number>>(
    new Set(
      data?.accordion?.items
        ?.map((item, index) => (item.defaultOpen ? index : -1))
        .filter((idx) => idx !== -1) || []
    )
  );

  if (!data) {
    return null;
  }

  const accordion = data.accordion;
  const items = accordion?.items || [];
  const isSingle = accordion?.style === 'single';

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        if (isSingle) {
          newSet.clear();
        }
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <section
      className={`px-4 sm:px-5 md:px-6 lg:px-8 mx-auto ${spacingClasses} ${containerWidthClasses}`}
      style={themeStyles}
    >
      <SectionHeader header={data.header} themeStyles={themeStyles} />

      {items.length > 0 ? (
        <div className="max-w-3xl mx-auto">
          {items.map((item, index) => (
            <AccordionItem
              key={index}
              item={item}
              isOpen={openItems.has(index)}
              onToggle={() => toggleItem(index)}
              themeStyles={themeStyles}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 sm:py-10 md:py-12 lg:py-16" style={{ opacity: 0.6, color: themeStyles.color || 'inherit' }}>
          <p>No FAQ items available at the moment.</p>
        </div>
      )}
    </section>
  );
}
