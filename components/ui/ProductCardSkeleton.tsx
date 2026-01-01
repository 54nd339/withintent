export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Image skeleton */}
      <div className="relative aspect-[3/4] bg-neutral-200 dark:bg-neutral-700 rounded-lg mb-3" />
      
      {/* Title skeleton */}
      <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded mb-2 w-3/4" />
      
      {/* Price skeleton */}
      <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2" />
    </div>
  );
}
