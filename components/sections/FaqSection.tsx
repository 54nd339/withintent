'use client';

import { useState } from 'react';
import { AccordionItem, SectionHeader, EmptyState } from '@/components';
import { useSectionLayout } from '@/hooks';
import { FaqBlock } from '@/lib/types';
import { RESPONSIVE_PADDING } from '@/lib/constants';

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
      className={`${RESPONSIVE_PADDING} mx-auto ${spacingClasses} ${containerWidthClasses}`}
      style={themeStyles}
    >
      <SectionHeader text={data.header} themeStyles={themeStyles} />

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
        <EmptyState
          message="No FAQ items available at the moment."
          themeStyles={themeStyles}
        />
      )}
    </section>
  );
}
