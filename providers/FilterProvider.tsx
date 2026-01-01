'use client';

import { createContext, useContext, useState, useMemo, useCallback, useEffect, useRef, startTransition, type ReactNode } from 'react';
import { useQueryState, parseAsString, parseAsInteger } from 'nuqs';
import { Product, ProductStatus } from '@/lib/types';
import { calculateMaxPrice, getInitialPriceRange } from '@/lib/utils';

const INITIAL_DISPLAY = 10;

interface FilterState {
  searchText: string;
  selectedCategory: string | null;
  selectedCollection: string | null;
  selectedStatus: ProductStatus | null;
  priceRange: [number, number];
}

interface FilterHandlers {
  setSearchText: (text: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setSelectedCollection: (collection: string | null) => void;
  setSelectedStatus: (status: ProductStatus | null) => void;
  setPriceRange: (range: [number, number]) => void;
}

interface FilterComputed {
  maxPrice: number;
  filteredProducts: Product[];
  displayedProducts: Product[];
  hasMoreProducts: boolean;
  hasActiveFilters: boolean;
  displayCount: number;
  setDisplayCount: (count: number | ((prev: number) => number)) => void;
}

interface FilterContextValue {
  state: FilterState;
  handlers: FilterHandlers;
  computed: FilterComputed;
}

const FilterContext = createContext<FilterContextValue | null>(null);

interface FilterProviderProps {
  children: ReactNode;
  products: Product[];
}

export function FilterProvider({ children, products }: FilterProviderProps) {
  // Calculate initial values first (needed for withDefault)
  const calculatedMaxPrice = useMemo(() => calculateMaxPrice(products), [products]);
  const initialPriceRange = useMemo(() => getInitialPriceRange(products), [products]);

  // URL-synced state with nuqs
  const [searchText, setSearchText] = useQueryState('q', parseAsString.withDefault(''));
  const [selectedCategory, setSelectedCategory] = useQueryState('category', parseAsString);
  const [selectedCollection, setSelectedCollection] = useQueryState('collection', parseAsString);
  const [selectedStatus, setSelectedStatus] = useQueryState('status', {
    parse: (value): ProductStatus | null => {
      if (value === 'available' || value === 'reserved' || value === 'sold') {
        return value as ProductStatus;
      }
      return null;
    },
    serialize: (value) => value || '',
    defaultValue: null,
  });
  const [minPrice, setMinPrice] = useQueryState('minPrice', parseAsInteger.withDefault(initialPriceRange[0]));
  const [maxPrice, setMaxPrice] = useQueryState('maxPrice', parseAsInteger.withDefault(initialPriceRange[1]));

  // Local pagination state
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY);
  const productsLengthRef = useRef(products.length);

  // Reset display count when products array changes (server sends new filtered results)
  useEffect(() => {
    if (productsLengthRef.current !== products.length) {
      productsLengthRef.current = products.length;
      startTransition(() => {
        setDisplayCount(INITIAL_DISPLAY);
      });
    }
  }, [products.length]);

  // Stable callback for updating display count
  const handleSetDisplayCount = useCallback((count: number | ((prev: number) => number)) => {
    setDisplayCount(count);
  }, []);

  const priceRange: [number, number] = useMemo(() => [minPrice, maxPrice], [minPrice, maxPrice]);
  const displayedProducts = useMemo(() => products.slice(0, displayCount), [products, displayCount]);
  const hasMoreProducts = useMemo(() => displayCount < products.length, [displayCount, products.length]);
  const hasActiveFilters = useMemo(() => Boolean(
    selectedCategory ||
    selectedCollection ||
    selectedStatus ||
    (minPrice > initialPriceRange[0]) ||
    (maxPrice < initialPriceRange[1]) ||
    searchText
  ), [selectedCategory, selectedCollection, selectedStatus, minPrice, maxPrice, initialPriceRange, searchText]);

  const value: FilterContextValue = {
    state: {
      searchText,
      selectedCategory,
      selectedCollection,
      selectedStatus,
      priceRange,
    },
    handlers: {
      setSearchText,
      setSelectedCategory,
      setSelectedCollection,
      setSelectedStatus,
      setPriceRange: (range) => {
        setMinPrice(range[0] === initialPriceRange[0] ? null : range[0]);
        setMaxPrice(range[1] === initialPriceRange[1] ? null : range[1]);
      },
    },
    computed: {
      maxPrice: calculatedMaxPrice,
      filteredProducts: products,
      displayedProducts,
      hasMoreProducts,
      hasActiveFilters,
      displayCount,
      setDisplayCount: handleSetDisplayCount,
    },
  };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}

export function useFilterContext() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilterContext must be used within FilterProvider');
  }
  return context;
}
