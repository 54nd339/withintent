'use client';

import Link from 'next/link';
import { CollectionHero } from '@/components';
import { Collection } from '@/lib/types';

interface CollectionBannerProps {
  collection: Collection;
  className?: string;
}

export function CollectionBanner({ collection, className = '' }: CollectionBannerProps) {
  if (!collection) return null;

  return (
    <Link href={`/shop/collection/${collection.slug}`} className={`block group ${className}`}>
      <CollectionHero collection={collection} variant="banner" />
    </Link>
  );
}
