'use client';

import React, { useMemo, useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { Product, Category, Collection, ProductStatus } from '@/app/types';
import { ProductCard } from '@/app/components/ui/ProductCard';
import { FilterBar } from '@/app/components/ui/FilterBar';

const INITIAL_DISPLAY = 10;
const LOAD_MORE_COUNT = 5;
const MAX_PRODUCTS = 50;

interface ProductGridWithFiltersProps {
  products: Product[];
  categories: Category[];
  collections: Collection[];
  whatsAppNumber?: string;
  showPrice?: boolean;
  showStatus?: boolean;
  gridColumns?: 'one' | 'two' | 'three' | 'four';
  gapSize?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xl2';
  onProductClick?: (product: Product) => void;
  showCategoryFilter?: boolean;
  showCollectionFilter?: boolean;
}

export function ProductGridWithFilters({
  products,
  categories,
  collections,
  whatsAppNumber,
  showPrice = true,
  showStatus = true,
  onProductClick,
  showCategoryFilter = true,
  showCollectionFilter = true,
}: ProductGridWithFiltersProps) {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedCollection, setSelectedCollection] = useState<string | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<ProductStatus | undefined>();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY);

  // Calculate max price
  const maxPrice = useMemo(() => {
    if (products.length === 0) return 100000;
    return Math.max(...products.map((p) => p.price || 0), 100000);
  }, [products]);

  // Initialize price range
  React.useEffect(() => {
    if (priceRange[1] === 0 && maxPrice > 0) {
      setPriceRange([0, maxPrice]);
    }
  }, [maxPrice, priceRange]);

  // Sort products by createdAt (recent first) and limit to MAX_PRODUCTS
  const sortedProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
      .slice(0, MAX_PRODUCTS);
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return sortedProducts.filter((product) => {
      // Search filter
      if (searchText) {
        const searchLower = searchText.toLowerCase();
        const matchesSearch =
          product.title.toLowerCase().includes(searchLower) ||
          product.categories?.some((cat) => cat.name.toLowerCase().includes(searchLower)) ||
          product.collections?.some((col) => col.title.toLowerCase().includes(searchLower));
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategory) {
        const hasCategory = product.categories?.some((cat) => cat.slug === selectedCategory);
        if (!hasCategory) return false;
      }

      // Collection filter
      if (selectedCollection) {
        const hasCollection = product.collections?.some((col) => col.slug === selectedCollection);
        if (!hasCollection) return false;
      }

      // Status filter
      if (selectedStatus) {
        if (product.productStatus !== selectedStatus) return false;
      }

      // Price range filter
      const productPrice = product.price || 0;
      if (productPrice < priceRange[0] || productPrice > priceRange[1]) return false;

      return true;
    });
  }, [sortedProducts, searchText, selectedCategory, selectedCollection, selectedStatus, priceRange]);

  // Products to display (with pagination)
  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, displayCount);
  }, [filteredProducts, displayCount]);

  // Reset display count when filters change
  React.useEffect(() => {
    setDisplayCount(INITIAL_DISPLAY);
  }, [searchText, selectedCategory, selectedCollection, selectedStatus, priceRange]);

  const hasMoreProducts = displayCount < filteredProducts.length;

  const hasActiveFilters = selectedCategory || selectedCollection || selectedStatus || priceRange[0] > 0 || priceRange[1] < maxPrice || searchText;

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
            selectedCategory={selectedCategory}
            selectedCollection={selectedCollection}
            selectedStatus={selectedStatus}
            priceRange={priceRange}
            maxPrice={maxPrice}
            onCategoryChange={setSelectedCategory}
            onCollectionChange={setSelectedCollection}
            onStatusChange={setSelectedStatus}
            onPriceRangeChange={setPriceRange}
            searchText={searchText}
            onSearchChange={setSearchText}
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
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
              {displayedProducts.map((product, index) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  index={index}
                  whatsAppNumber={whatsAppNumber}
                  showPrice={showPrice}
                  showStatus={showStatus}
                  onProductClick={onProductClick}
                />
              ))}
            </div>
            {hasMoreProducts && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setDisplayCount((prev) => Math.min(prev + LOAD_MORE_COUNT, filteredProducts.length))}
                  className="px-6 py-3 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-sm uppercase tracking-widest"
                >
                  Show More ({Math.min(LOAD_MORE_COUNT, filteredProducts.length - displayCount)} more)
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 text-neutral-600 dark:text-neutral-400">
            <p>No products found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
