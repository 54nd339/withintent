'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Collection } from '@/app/types';

interface CollectionsGridProps {
  collections: Collection[];
  className?: string;
}

export function CollectionsGrid({ collections, className = '' }: CollectionsGridProps) {
  if (!collections || collections.length === 0) return null;

  return (
    <div className={className}>
      <h2 className="font-serif text-3xl md:text-4xl mb-6 sm:mb-8 md:mb-12 text-neutral-900 dark:text-neutral-100">
        Collections
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {collections.map((collection, index) => (
          <motion.div
            key={collection.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Link
              href={`/shop/collection/${collection.slug}`}
              className="block group"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-4">
                {collection.coverImage && (
                  <motion.img
                    src={collection.coverImage.url}
                    alt={collection.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
              <h3 className="font-serif text-xl mb-2 text-neutral-900 dark:text-neutral-100 group-hover:opacity-70 transition-opacity">
                {collection.title}
              </h3>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
