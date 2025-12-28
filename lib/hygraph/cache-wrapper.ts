import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { CACHE_REVALIDATE } from '@/lib/constants';

interface CacheOptions {
  key: string;
  tags: string[];
  revalidate?: number;
}

/**
 * Generic wrapper for creating cached data fetchers
 * Reduces repetitive code by handling React cache + Next.js unstable_cache
 */
export function createCachedFetcher<T, Args extends any[] = []>(
  fetcher: (...args: Args) => Promise<T>,
  getCacheOptions: (...args: Args) => CacheOptions
) {
  return cache((...args: Args) => {
    const { key, tags, revalidate = CACHE_REVALIDATE } = getCacheOptions(...args);
    return unstable_cache(
      async () => fetcher(...args),
      [key],
      {
        tags,
        revalidate,
      }
    )();
  });
}
