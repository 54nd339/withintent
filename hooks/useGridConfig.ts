import { getGridColumnsClasses, getGapSizeClasses } from '@/lib/utils';
import type { Grid } from '@/lib/types';

interface UseGridConfigOptions {
  grid?: Grid | null;
}

export function useGridConfig({ grid }: UseGridConfigOptions) {
  const gridColumns = getGridColumnsClasses(grid?.columns);
  const gapSize = getGapSizeClasses(grid?.gapSize);
  const limit = grid?.limit;

  return {
    gridColumns,
    gapSize,
    limit,
    gridClassName: `grid ${gridColumns} ${gapSize}`,
  };
}
