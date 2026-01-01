import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility to merge Tailwind classes with conflict resolution
 */
export function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(inputs));
}

/**
 * Create a Map from an array using a key extractor function
 */
export function createMapByKey<T, K extends string | number>(
  items: T[],
  keyExtractor: (item: T) => K
): Map<K, T> {
  return new Map(items.map((item) => [keyExtractor(item), item]));
}

export * from './url';
export * from './theme';
export * from './layout';
export * from './variants';
export * from './image';
export * from './product';
export * from './toast';
export * from './icon';
export * from './grid';
