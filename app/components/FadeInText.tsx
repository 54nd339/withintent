'use client';

import React from 'react';
import { motion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

export function FadeInText({ children, delay = 0, className }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
