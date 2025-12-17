'use client';

import React, { useCallback } from 'react';
import { X, Search } from 'lucide-react';
import { Category, Collection, ProductStatus } from '@/app/types';

interface FilterBarProps {
  categories: Category[];
  collections: Collection[];
  selectedCategory?: string;
  selectedCollection?: string;
  selectedStatus?: ProductStatus;
  priceRange: [number, number];
  maxPrice: number;
  onCategoryChange: (category: string | undefined) => void;
  onCollectionChange: (collection: string | undefined) => void;
  onStatusChange: (status: ProductStatus | undefined) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  searchText?: string;
  onSearchChange?: (text: string) => void;
  showCategoryFilter?: boolean;
  showCollectionFilter?: boolean;
  className?: string;
}

export function FilterBar({
  categories,
  collections,
  selectedCategory,
  selectedCollection,
  selectedStatus,
  priceRange,
  maxPrice,
  onCategoryChange,
  onCollectionChange,
  onStatusChange,
  onPriceRangeChange,
  searchText = '',
  onSearchChange,
  showCategoryFilter = true,
  showCollectionFilter = true,
  className = '',
}: FilterBarProps) {

  const hasActiveFilters = selectedCategory || selectedCollection || selectedStatus || priceRange[0] > 0 || priceRange[1] < maxPrice || searchText;

  const clearAllFilters = () => {
    onCategoryChange(undefined);
    onCollectionChange(undefined);
    onStatusChange(undefined);
    onPriceRangeChange([0, maxPrice]);
    onSearchChange?.('');
  };

  // Calculate percentage for slider positioning
  const minPercent = (priceRange[0] / maxPrice) * 100;
  const maxPercent = (priceRange[1] / maxPrice) * 100;

  const handleMinChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), priceRange[1] - 1000);
    onPriceRangeChange([value, priceRange[1]]);
  }, [priceRange, onPriceRangeChange]);

  const handleMaxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), priceRange[0] + 1000);
    onPriceRangeChange([priceRange[0], value]);
  }, [priceRange, onPriceRangeChange]);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search */}
      {onSearchChange && (
        <div>
          <h3 className="text-xs uppercase tracking-widest mb-3 text-neutral-600 dark:text-neutral-400">Search</h3>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchText}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-400"
            />
          </div>
        </div>
      )}

      {/* Category Filter */}
      {showCategoryFilter && (
        <div>
          <h3 className="text-xs uppercase tracking-widest mb-3 text-neutral-600 dark:text-neutral-400">Category</h3>
          <div className="space-y-2">
            <button
              onClick={() => onCategoryChange(undefined)}
              className={`block w-full text-left px-3 py-2 text-sm transition-colors rounded ${
                !selectedCategory
                  ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => onCategoryChange(category.slug)}
                className={`block w-full text-left px-3 py-2 text-sm transition-colors rounded ${
                  selectedCategory === category.slug
                    ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Collection Filter */}
      {showCollectionFilter && (
        <div>
          <h3 className="text-xs uppercase tracking-widest mb-3 text-neutral-600 dark:text-neutral-400">Collection</h3>
          <div className="space-y-2">
            <button
              onClick={() => onCollectionChange(undefined)}
              className={`block w-full text-left px-3 py-2 text-sm transition-colors rounded ${
                !selectedCollection
                  ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              All Collections
            </button>
            {collections.map((collection) => (
              <button
                key={collection.slug}
                onClick={() => onCollectionChange(collection.slug)}
                className={`block w-full text-left px-3 py-2 text-sm transition-colors rounded ${
                  selectedCollection === collection.slug
                    ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                {collection.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Status Filter */}
      <div>
        <h3 className="text-xs uppercase tracking-widest mb-3 text-neutral-600 dark:text-neutral-400">Status</h3>
        <div className="space-y-2">
          <button
            onClick={() => onStatusChange(undefined)}
            className={`block w-full text-left px-3 py-2 text-sm transition-colors rounded ${
              !selectedStatus
                ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700'
            }`}
          >
            All Status
          </button>
          {(['available', 'reserved', 'sold'] as ProductStatus[]).map((status) => (
            <button
              key={status}
              onClick={() => onStatusChange(status)}
              className={`block w-full text-left px-3 py-2 text-sm transition-colors capitalize rounded ${
                selectedStatus === status
                  ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter - Dual Slider */}
      <div>
        <h3 className="text-xs uppercase tracking-widest mb-3 text-neutral-600 dark:text-neutral-400">Price Range</h3>
        <div className="space-y-4">
          {/* Number inputs */}
          <div className="flex gap-2">
            <input
              type="number"
              min="0"
              max={priceRange[1]}
              value={priceRange[0]}
              onChange={(e) => onPriceRangeChange([Math.min(Number(e.target.value), priceRange[1] - 1000), priceRange[1]])}
              placeholder="Min"
              className="flex-1 px-3 py-2 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 text-sm rounded"
            />
            <input
              type="number"
              min={priceRange[0]}
              max={maxPrice}
              value={priceRange[1]}
              onChange={(e) => onPriceRangeChange([priceRange[0], Math.max(Number(e.target.value), priceRange[0] + 1000)])}
              placeholder="Max"
              className="flex-1 px-3 py-2 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 text-sm rounded"
            />
          </div>
          
          {/* Dual range slider */}
          <div className="relative h-6">
            {/* Track background */}
            <div className="absolute top-1/2 -translate-y-1/2 w-full h-1 bg-neutral-200 dark:bg-neutral-600 rounded" />
            
            {/* Active track */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 h-1 bg-neutral-900 dark:bg-white rounded"
              style={{ 
                left: `${minPercent}%`, 
                width: `${maxPercent - minPercent}%` 
              }}
            />
            
            {/* Min slider */}
            <input
              type="range"
              min="0"
              max={maxPrice}
              value={priceRange[0]}
              onChange={handleMinChange}
              className="absolute w-full h-6 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-neutral-900 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-neutral-900 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white dark:[&::-webkit-slider-thumb]:bg-white dark:[&::-webkit-slider-thumb]:border-neutral-900 dark:[&::-moz-range-thumb]:bg-white dark:[&::-moz-range-thumb]:border-neutral-900"
            />
            
            {/* Max slider */}
            <input
              type="range"
              min="0"
              max={maxPrice}
              value={priceRange[1]}
              onChange={handleMaxChange}
              className="absolute w-full h-6 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-neutral-900 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-neutral-900 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white dark:[&::-webkit-slider-thumb]:bg-white dark:[&::-webkit-slider-thumb]:border-neutral-900 dark:[&::-moz-range-thumb]:bg-white dark:[&::-moz-range-thumb]:border-neutral-900"
            />
          </div>
          
          <div className="flex justify-between text-xs text-neutral-600 dark:text-neutral-400">
            <span>₹{priceRange[0].toLocaleString('en-IN')}</span>
            <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-neutral-200 dark:border-neutral-700 text-sm uppercase tracking-widest text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors rounded"
        >
          <X size={16} />
          Clear All Filters
        </button>
      )}
    </div>
  );
}
