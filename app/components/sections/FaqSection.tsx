'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeInText, RichText } from '@/app/components';
import { FaqBlock, AccordionItem } from '@/app/types';
import { 
  getSpacingClassesFromLayout, 
  getContainerWidthClasses,
  getThemeWithDefaults,
  getThemeStyles,
  getLayoutWithDefaults
} from '@/app/lib/utils';
import { useTheme } from '@/app/providers';

interface FaqSectionProps {
  data?: FaqBlock;
}

function AccordionItemComponent({ 
  item, 
  isOpen, 
  onToggle,
  themeStyles 
}: { 
  item: AccordionItem; 
  isOpen: boolean; 
  onToggle: () => void;
  themeStyles: React.CSSProperties;
}) {
  return (
    <div className="border-b" style={{ borderColor: themeStyles.color || 'currentColor', opacity: 0.2 }}>
      <button
        onClick={onToggle}
        className="w-full py-6 flex justify-between items-center text-left hover:opacity-70 transition-opacity"
        style={{ color: themeStyles.color || 'inherit' }}
      >
        <span className="font-sans text-lg font-medium pr-8">{item.label}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div 
              className="pb-6 font-sans leading-relaxed"
              style={{ opacity: 0.8, color: themeStyles.color || 'inherit' }}
            >
              <RichText content={item.content} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqSection({ data }: FaqSectionProps) {
  const { darkMode } = useTheme();
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

  // Get layout and theme with defaults
  const layout = getLayoutWithDefaults(data.layout);
  const theme = getThemeWithDefaults(data.theme, darkMode);
  const themeStyles = getThemeStyles(theme, darkMode);

  const spacingClasses = getSpacingClassesFromLayout(layout);
  const containerWidthClasses = getContainerWidthClasses(layout.containerWidth);

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

  const header = data.header;

  return (
    <section 
      className={`px-4 sm:px-5 md:px-6 lg:px-8 mx-auto ${spacingClasses} ${containerWidthClasses}`}
      style={themeStyles}
    >
      <div className="mb-6 sm:mb-8 md:mb-12 lg:mb-16 xl:mb-20 text-center">
        <FadeInText>
          {header?.eyebrow && (
            <h3 
              className="font-sans text-xs tracking-[0.3em] uppercase mb-4"
              style={{ opacity: 0.7, color: themeStyles.color || 'inherit' }}
            >
              {header.eyebrow}
            </h3>
          )}
          {header?.heading && (
            <h2 
              className="font-serif text-4xl mb-4"
              style={{ color: themeStyles.color || 'inherit' }}
            >
              {header.heading}
            </h2>
          )}
          {header?.subheading && (
            <p 
              className="font-sans text-lg mb-4"
              style={{ opacity: 0.8, color: themeStyles.color || 'inherit' }}
            >
              {header.subheading}
            </p>
          )}
          {header?.body && (
            <div className="mt-4">
              <RichText content={header.body} />
            </div>
          )}
        </FadeInText>
      </div>

      {items.length > 0 ? (
        <div className="max-w-3xl mx-auto">
          {items.map((item, index) => (
            <AccordionItemComponent
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

