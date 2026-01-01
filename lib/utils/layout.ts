import type { LayoutSetting, SpacingSize } from '@/lib/types';
import { DEFAULT_LAYOUT } from '@/lib/constants';
import {
  spacingVariants,
  gapVariants,
  quantityCounterVariants,
  quantityCounterButtonVariants,
  quantityCounterDisplayVariants,
} from './variants';
import { cn } from './index';

/**
 * Get spacing classes from LayoutSetting component
 */
export function getSpacingClassesFromLayout(layout?: LayoutSetting | null): string {
  if (!layout) return '';

  const classes: string[] = [];

  if (layout.paddingTop && layout.paddingTop !== 'none') {
    classes.push(spacingVariants({ type: 'paddingTop', size: layout.paddingTop }));
  }
  if (layout.paddingBottom && layout.paddingBottom !== 'none') {
    classes.push(spacingVariants({ type: 'paddingBottom', size: layout.paddingBottom }));
  }
  if (layout.paddingLeft && layout.paddingLeft !== 'none') {
    classes.push(spacingVariants({ type: 'paddingLeft', size: layout.paddingLeft }));
  }
  if (layout.paddingRight && layout.paddingRight !== 'none') {
    classes.push(spacingVariants({ type: 'paddingRight', size: layout.paddingRight }));
  }
  if (layout.marginTop && layout.marginTop !== 'none') {
    classes.push(spacingVariants({ type: 'marginTop', size: layout.marginTop }));
  }
  if (layout.marginBottom && layout.marginBottom !== 'none') {
    classes.push(spacingVariants({ type: 'marginBottom', size: layout.marginBottom }));
  }
  if (layout.marginLeft && layout.marginLeft !== 'none') {
    classes.push(spacingVariants({ type: 'marginLeft', size: layout.marginLeft }));
  }
  if (layout.marginRight && layout.marginRight !== 'none') {
    classes.push(spacingVariants({ type: 'marginRight', size: layout.marginRight }));
  }

  return cn(classes.filter(Boolean));
}

/**
 * Get alignment classes from LayoutSetting component
 */
export function getAlignmentClassesFromLayout(layout?: LayoutSetting | null): string {
  if (!layout || !layout.textAlign) return 'text-center';
  const alignmentMap: Record<string, string> = {
    left: 'text-left',
    right: 'text-right',
    center: 'text-center',
  };
  return alignmentMap[layout.textAlign] || 'text-center';
}

/**
 * Get grid columns classes
 */
export function getGridColumnsClasses(columns?: string | null): string {
  switch (columns) {
    case 'one':
      return 'grid-cols-1';
    case 'two':
      return 'grid-cols-1 md:grid-cols-2';
    case 'three':
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    case 'four':
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
    default:
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
  }
}

/**
 * Get gap size classes
 */
export function getGapSizeClasses(gapSize?: SpacingSize | null): string {
  return gapVariants({ size: gapSize || undefined });
}

/**
 * Get container width classes from LayoutSetting
 */
export function getContainerWidthClasses(containerWidth?: string | null): string {
  switch (containerWidth) {
    case 'narrow':
      return 'max-w-4xl';
    case 'wide':
      return 'max-w-7xl';
    case 'full':
      return 'max-w-full';
    case 'default':
    default:
      return 'max-w-5xl';
  }
}

/**
 * Get layout type classes
 */
export function getLayoutTypeClasses(layoutType?: string | null): string {
  switch (layoutType) {
    case 'twoColumn':
      return 'grid grid-cols-1 md:grid-cols-2';
    case 'offsetLeft':
      return 'grid grid-cols-1 md:grid-cols-2 md:gap-12';
    case 'offsetRight':
      return 'grid grid-cols-1 md:grid-cols-2 md:gap-12';
    case 'fullWidth':
    default:
      return '';
  }
}

/**
 * Merge layout with defaults
 */
export function getLayoutWithDefaults(layout?: LayoutSetting | null): LayoutSetting {
  if (!layout) return DEFAULT_LAYOUT;

  return {
    paddingTop: layout.paddingTop ?? DEFAULT_LAYOUT.paddingTop,
    paddingBottom: layout.paddingBottom ?? DEFAULT_LAYOUT.paddingBottom,
    paddingLeft: layout.paddingLeft ?? DEFAULT_LAYOUT.paddingLeft,
    paddingRight: layout.paddingRight ?? DEFAULT_LAYOUT.paddingRight,
    marginTop: layout.marginTop ?? DEFAULT_LAYOUT.marginTop,
    marginBottom: layout.marginBottom ?? DEFAULT_LAYOUT.marginBottom,
    marginLeft: layout.marginLeft ?? DEFAULT_LAYOUT.marginLeft,
    marginRight: layout.marginRight ?? DEFAULT_LAYOUT.marginRight,
    textAlign: layout.textAlign ?? DEFAULT_LAYOUT.textAlign,
    verticalAlign: layout.verticalAlign ?? DEFAULT_LAYOUT.verticalAlign,
    containerWidth: layout.containerWidth ?? DEFAULT_LAYOUT.containerWidth,
    minHeight: layout.minHeight ?? DEFAULT_LAYOUT.minHeight,
    layoutType: layout.layoutType ?? DEFAULT_LAYOUT.layoutType,
    dividerHeight: layout.dividerHeight ?? DEFAULT_LAYOUT.dividerHeight,
  };
}

/**
 * Get quantity counter container classes
 */
export function getQuantityCounterClasses(
  variant: 'desktop' | 'mobile' | 'checkout' = 'desktop',
  className?: string | null
): string {
  return cn(quantityCounterVariants({ variant }), className);
}

/**
 * Get quantity counter button classes
 */
export function getQuantityCounterButtonClasses(
  variant: 'desktop' | 'mobile' | 'checkout' = 'desktop'
): string {
  return quantityCounterButtonVariants({ variant });
}

/**
 * Get quantity counter display classes
 */
export function getQuantityCounterDisplayClasses(
  variant: 'desktop' | 'mobile' | 'checkout' = 'desktop'
): string {
  return quantityCounterDisplayVariants({ variant });
}
