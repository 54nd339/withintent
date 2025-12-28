import { useState, useEffect, useMemo, useRef, startTransition } from 'react';
import { Product, ProductStatus } from '@/lib/types';
import { calculateMaxPrice, getInitialPriceRange, sortProductsByDate, filterProducts, ProductFilters } from '@/lib/productUtils';

const INITIAL_DISPLAY = 10;

interface UseProductFiltersOptions {
  products: Product[];
}

export function useProductFilters({ products }: UseProductFiltersOptions) {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedCollection, setSelectedCollection] = useState<string | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<ProductStatus | undefined>();
  const [priceRange, setPriceRange] = useState<[number, number]>(() => getInitialPriceRange(products));
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY);

  // Calculate max price
  const maxPrice = useMemo(() => calculateMaxPrice(products), [products]);

  // Update price range when maxPrice changes (only if uninitialized)
  useEffect(() => {
    if (priceRange[1] === 0 && maxPrice > 0) {
      setPriceRange([0, maxPrice]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxPrice]);

  // Track filter changes to reset display count
  const filterKey = useMemo(
    () => `${searchText}-${selectedCategory}-${selectedCollection}-${selectedStatus}`,
    [searchText, selectedCategory, selectedCollection, selectedStatus]
  );

  const prevFilterKeyRef = useRef<string>(filterKey);

  // Reset display count when filters change
  useEffect(() => {
    if (prevFilterKeyRef.current !== filterKey) {
      prevFilterKeyRef.current = filterKey;
      startTransition(() => {
        setDisplayCount(INITIAL_DISPLAY);
      });
    }
  }, [filterKey]);

  // Sort products
  const sortedProducts = useMemo(() => sortProductsByDate(products), [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    const filters: ProductFilters = {
      searchText,
      selectedCategory,
      selectedCollection,
      selectedStatus,
      priceRange,
    };
    return filterProducts(sortedProducts, filters);
  }, [sortedProducts, searchText, selectedCategory, selectedCollection, selectedStatus, priceRange]);

  // Products to display (with pagination)
  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, displayCount);
  }, [filteredProducts, displayCount]);

  const hasMoreProducts = displayCount < filteredProducts.length;

  const hasActiveFilters = selectedCategory || selectedCollection || selectedStatus || priceRange[0] > 0 || priceRange[1] < maxPrice || searchText;

  return {
    // Filter state
    searchText,
    setSearchText,
    selectedCategory,
    setSelectedCategory,
    selectedCollection,
    setSelectedCollection,
    selectedStatus,
    setSelectedStatus,
    priceRange,
    setPriceRange,

    // Computed values
    maxPrice,
    filteredProducts,
    displayedProducts,
    hasMoreProducts,
    hasActiveFilters,
    displayCount,
    setDisplayCount,
  };
}
