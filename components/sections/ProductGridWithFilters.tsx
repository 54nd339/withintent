'use client';

import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { SlidersHorizontal, X } from 'lucide-react';
import { FilterBar, ProductCardSkeleton } from '@/components';
import { ProductGridBase } from './ProductGridBase';
import { Product, Category, Collection, SpacingSize, GridColumns } from '@/lib/types';
import { FilterProvider, useFilterContext } from '@/providers';

const LOAD_MORE_COUNT = 10;

interface ProductGridWithFiltersProps {
  products: Product[];
  categories: Category[];
  collections: Collection[];
  showPrice?: boolean;
  showStatus?: boolean;
  gridColumns?: GridColumns;
  gapSize?: SpacingSize;
  showCategoryFilter?: boolean;
  showCollectionFilter?: boolean;
}

function ProductGridWithFiltersContent({
  categories,
  collections,
  showPrice = true,
  showStatus = true,
  showCategoryFilter = true,
  showCollectionFilter = true,
}: Omit<ProductGridWithFiltersProps, 'products'>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { computed } = useFilterContext();
  const { filteredProducts, displayedProducts, hasMoreProducts, hasActiveFilters, setDisplayCount } = computed;
  const loadingRef = useRef(false);

  // Infinite scroll with intersection observer
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && hasMoreProducts && !loadingRef.current) {
      loadingRef.current = true;
      
      // Use setTimeout to avoid setState in effect warning
      const loadTimer = setTimeout(() => {
        setIsLoadingMore(true);
      }, 0);
      
      // Simulate smooth loading (minimum 300ms)
      const updateTimer = setTimeout(() => {
        setDisplayCount((prev) => prev + LOAD_MORE_COUNT);
        setIsLoadingMore(false);
        loadingRef.current = false;
      }, 300);

      return () => {
        clearTimeout(loadTimer);
        clearTimeout(updateTimer);
      };
    }
  }, [inView, hasMoreProducts, setDisplayCount]);

  return (
    <div>
      {/* Filter Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="flex items-center gap-2 px-4 py-3 mb-6 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
      >
        <SlidersHorizontal size={18} />
        <span className="text-sm uppercase tracking-widest">Filters</span>
        {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-white" />}
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Slide-in Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white dark:bg-neutral-900 z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Sidebar Header */}
        <div className="sticky top-0 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 p-4 flex items-center justify-between z-10">
          <span className="text-sm uppercase tracking-widest font-medium text-neutral-900 dark:text-neutral-100">Filters</span>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
          >
            <X size={20} className="text-neutral-600 dark:text-neutral-400" />
          </button>
        </div>

        {/* Filter Content */}
        <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
          <FilterBar
            categories={categories}
            collections={collections}
            showCategoryFilter={showCategoryFilter}
            showCollectionFilter={showCollectionFilter}
          />
        </div>
      </div>

      {/* Main Content */}
      <div>
        {/* Results Count */}
        <div className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
          Showing {displayedProducts.length} of {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
        </div>

        {/* Product Grid */}
        {displayedProducts.length > 0 ? (
          <>
            <ProductGridBase
              products={displayedProducts}
              gridClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6"
              showPrice={showPrice}
              showStatus={showStatus}
              quickAnimation={true}
            />
            {hasMoreProducts && (
              <div ref={ref} className="mt-8">
                {isLoadingMore ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
                    {Array.from({ length: Math.min(LOAD_MORE_COUNT, filteredProducts.length - displayedProducts.length) }).map((_, i) => (
                      <ProductCardSkeleton key={i} />
                    ))}
                  </div>
                ) : (
                  <div className="h-20 flex items-center justify-center">
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">Scroll to load more...</div>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <ProductGridBase
            products={[]}
            gridClassName=""
            showPrice={showPrice}
            showStatus={showStatus}
            emptyStateClassName="text-center py-12 text-neutral-600 dark:text-neutral-400"
            emptyStateMessage="No products found matching your filters."
          />
        )}
      </div>
    </div>
  );
}

export function ProductGridWithFilters({
  products,
  categories,
  collections,
  showPrice = true,
  showStatus = true,
  showCategoryFilter = true,
  showCollectionFilter = true,
}: ProductGridWithFiltersProps) {
  return (
    <FilterProvider products={products}>
      <ProductGridWithFiltersContent
        categories={categories}
        collections={collections}
        showPrice={showPrice}
        showStatus={showStatus}
        showCategoryFilter={showCategoryFilter}
        showCollectionFilter={showCollectionFilter}
      />
    </FilterProvider>
  );
}
