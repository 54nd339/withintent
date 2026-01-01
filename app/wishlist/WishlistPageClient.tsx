'use client';

import { Heart } from 'lucide-react';
import { ProductCard, PageHeader, EmptyState, PageWrapper } from '@/components';
import { GlobalSetting } from '@/lib/types';
import { useWishlistStore } from '@/store';
import { useStore } from '@/hooks';
import { RESPONSIVE_PADDING } from '@/lib/constants';

interface WishlistPageClientProps {
  globalSettings: GlobalSetting;
}

export function WishlistPageClient({ globalSettings }: WishlistPageClientProps) {
  const wishlistItems = useStore(useWishlistStore, (state) => state.items);

  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <PageWrapper globalSettings={globalSettings}>
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          description="Start saving items you love for later"
        />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper globalSettings={globalSettings} >
      <main className="pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 md:pb-16 lg:pb-20 min-h-screen">
        <div className={`max-w-6xl mx-auto ${RESPONSIVE_PADDING}`}>
          <PageHeader title="Your Wishlist" />

          {/* Wishlist Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {wishlistItems.map((product, index) => (
              <ProductCard
                key={product.slug}
                product={product}
                index={index}
              />
            ))}
          </div>
        </div>
      </main>
    </PageWrapper>
  );
}
