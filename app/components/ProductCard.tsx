'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/app/types';
import { formatINR, whatsappLink } from '@/app/utils';

type Props = {
  product: Product;
  index: number;
};

export function ProductCard({ product, index }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-6">
        {product.status !== 'AVAILABLE' && (
          <span className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/90 dark:bg-black/90 text-[10px] uppercase tracking-widest backdrop-blur-sm shadow-sm">
            {product.status}
          </span>
        )}

        <motion.img
          src={product.image}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
          style={{ opacity: isHovered ? 0 : 1 }}
        />
        <motion.img
          src={product.hoverImage}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out scale-105"
          style={{ opacity: isHovered ? 1 : 0 }}
        />

        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out hidden md:block bg-white/80 dark:bg-black/60 backdrop-blur-md">
          <button
            onClick={() => window.open(whatsappLink(product.title), '_blank')}
            className="w-full py-2 border border-current text-xs uppercase tracking-widest hover:bg-current hover:text-white dark:hover:text-black transition-colors"
          >
            Inquire via WhatsApp
          </button>
        </div>
      </div>

      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-serif text-lg mb-1 text-neutral-900 dark:text-neutral-100 group-hover:opacity-70 transition-opacity">
            {product.title}
          </h3>
          <p className="font-sans text-xs text-neutral-700 dark:text-neutral-400">{product.category}</p>
        </div>
        <span className="font-sans text-sm font-medium text-neutral-900 dark:text-neutral-100">{formatINR(product.price)}</span>
      </div>

      <div className="mt-4 md:hidden">
        <button
          onClick={() => window.open(whatsappLink(product.title), '_blank')}
          className="w-full py-3 border border-neutral-200 dark:border-neutral-700 text-xs uppercase tracking-widest text-neutral-900 dark:text-neutral-100"
        >
          Acquire
        </button>
      </div>
    </motion.div>
  );
}
