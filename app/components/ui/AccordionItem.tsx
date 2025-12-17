'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RichText } from './RichText';
import { AccordionItem as AccordionItemType } from '@/app/types';

interface AccordionItemProps {
  item: AccordionItemType;
  isOpen: boolean;
  onToggle: () => void;
  themeStyles: React.CSSProperties;
}

export function AccordionItem({
  item,
  isOpen,
  onToggle,
  themeStyles
}: AccordionItemProps) {
  return (
    <div className="border-b" style={{ borderColor: themeStyles.color || 'currentColor', borderBottomWidth: '1px', opacity: 0.7 }}>
      <button
        onClick={onToggle}
        className="w-full py-6 flex justify-between items-center text-left hover:opacity-80 transition-opacity"
        style={{ color: themeStyles.color || 'inherit', opacity: 1 }}
      >
        <span className="font-sans text-lg font-medium pr-8" style={{ opacity: 1 }}>{item.label}</span>
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
              style={{ opacity: 0.9, color: themeStyles.color || 'inherit' }}
            >
              <RichText content={item.content} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

