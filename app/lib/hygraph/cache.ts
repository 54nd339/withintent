import { cache } from 'react';
import { hygraphClient } from './hygraph';
import { DocumentNode } from 'graphql';

// Cache duration: 1 hour (3600 seconds)
const CACHE_DURATION = 3600;

/**
 * Cached request wrapper that uses React's cache for request deduplication
 * and Next.js's built-in caching for data persistence
 */
export const cachedRequest = cache(
  async <T = any>(query: DocumentNode | string, variables?: Record<string, any>): Promise<T> => {
    return hygraphClient.request<T>(query, variables);
  }
);

/**
 * Create a cache key for a query and variables
 */
export function createCacheKey(query: string, variables?: Record<string, any>): string {
  const varsString = variables ? JSON.stringify(variables) : '';
  return `hygraph:${query}:${varsString}`;
}

