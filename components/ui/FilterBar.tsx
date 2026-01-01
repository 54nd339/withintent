'use client';

import * as Slider from '@radix-ui/react-slider';
import { X, Search } from 'lucide-react';
import { Category, Collection } from '@/lib/types';
import { useFilterContext } from '@/providers/FilterProvider';

interface FilterBarProps {
  categories: Category[];
  collections: Collection[];
  showCategoryFilter?: boolean;
  showCollectionFilter?: boolean;
  className?: string;
}

export function FilterBar({
  categories,
  collections,
  showCategoryFilter = true,
  showCollectionFilter = true,
  className = '',
}: FilterBarProps) {
  const { state, handlers, computed } = useFilterContext();
  const { selectedCategory, selectedCollection, selectedStatus, priceRange, searchText } = state;
  const { setSearchText, setSelectedCategory, setSelectedCollection, setSelectedStatus, setPriceRange } = handlers;
  const { maxPrice } = computed;

  const hasActiveFilters = selectedCategory || selectedCollection || selectedStatus || priceRange[0] > 0 || priceRange[1] < maxPrice || searchText;

  const clearAllFilters = () => {
    setSelectedCategory(null);
    setSelectedCollection(null);
    setSelectedStatus(null);
    setPriceRange([0, maxPrice]);
    setSearchText('');
  };

  const handleSliderChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search */}
      <div>
        <h3 className="text-xs uppercase tracking-widest mb-3 text-neutral-600 dark:text-neutral-400">Search</h3>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-400"
          />
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

      {/* Category Filter */}
      {showCategoryFilter && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs uppercase tracking-widest text-neutral-600 dark:text-neutral-400">Category</h3>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-xs uppercase tracking-widest text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                Clear Filter
              </button>
            )}
          </div>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => setSelectedCategory(category.slug)}
                className={`block w-full text-left px-3 py-2 text-sm transition-colors rounded ${selectedCategory === category.slug
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
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs uppercase tracking-widest text-neutral-600 dark:text-neutral-400">Collection</h3>
            {selectedCollection && (
              <button
                onClick={() => setSelectedCollection(null)}
                className="text-xs uppercase tracking-widest text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                Clear Filter
              </button>
            )}
          </div>
          <div className="space-y-2">
            {collections.map((collection) => (
              <button
                key={collection.slug}
                onClick={() => setSelectedCollection(collection.slug)}
                className={`block w-full text-left px-3 py-2 text-sm transition-colors rounded ${selectedCollection === collection.slug
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
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs uppercase tracking-widest text-neutral-600 dark:text-neutral-400">Status</h3>
          {selectedStatus && (
            <button
              onClick={() => setSelectedStatus(null)}
              className="text-xs uppercase tracking-widest text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              Clear Filter
            </button>
          )}
        </div>
        <div className="space-y-2">
          {(['available', 'reserved', 'sold'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`block w-full text-left px-3 py-2 text-sm transition-colors capitalize rounded ${selectedStatus === status
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
              onChange={(e) => setPriceRange([Math.min(Number(e.target.value), priceRange[1] - 1000), priceRange[1]])}
              placeholder="Min"
              className="flex-1 px-3 py-2 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 text-sm rounded"
            />
            <input
              type="number"
              min={priceRange[0]}
              max={maxPrice}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Math.max(Number(e.target.value), priceRange[0] + 1000)])}
              placeholder="Max"
              className="flex-1 px-3 py-2 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 text-sm rounded"
            />
          </div>

          {/* Dual range slider */}
          <Slider.Root
            value={[priceRange[0], priceRange[1]]}
            onValueChange={handleSliderChange}
            min={0}
            max={maxPrice}
            step={1000}
            className="relative flex items-center w-full h-6"
          >
            <Slider.Track className="relative h-1 w-full bg-neutral-200 dark:bg-neutral-600 rounded-full">
              <Slider.Range className="absolute h-full bg-neutral-900 dark:bg-white rounded-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-5 h-5 bg-neutral-900 dark:bg-white rounded-full shadow-lg border-2 border-white dark:border-neutral-900 cursor-pointer hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2" />
            <Slider.Thumb className="block w-5 h-5 bg-neutral-900 dark:bg-white rounded-full shadow-lg border-2 border-white dark:border-neutral-900 cursor-pointer hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2" />
          </Slider.Root>

          <div className="flex justify-between text-xs text-neutral-600 dark:text-neutral-400">
            <span>₹{priceRange[0].toLocaleString('en-IN')}</span>
            <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
