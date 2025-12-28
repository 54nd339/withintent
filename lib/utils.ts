import { createElement } from 'react';
import type { ReactNode, CSSProperties } from 'react';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import { Instagram, Mail, MessageCircle } from 'lucide-react';
import { SpacingSize, LayoutSetting, ThemeSetting, NavigationItem, Button } from '@/lib/types';
import { DEFAULT_THEME_LIGHT, DEFAULT_THEME_DARK, DEFAULT_LAYOUT } from './constants';
import { spacingVariants } from './styles';

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

  return clsx(classes.filter(Boolean));
}

// Re-export formatting utilities for backward compatibility
export {
  formatWhatsAppUrl,
  createWhatsAppCheckoutLink,
  formatINR,
} from './formatting';

// Re-export spacingVariants for backward compatibility
export { spacingVariants } from './styles';

/**
 * Get the effective price (discount price if available, otherwise regular price)
 */
export function getEffectivePrice(product: { price: number; discountPrice?: number }): number {
  return product.discountPrice || product.price;
}

/**
 * Get the absolute URL for a product page
 */
export function getProductUrl(slug: string): string {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/shop/product/${slug}`;
  }
  return `/shop/product/${slug}`;
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
 * Generate href from NavigationItem or Button
 * Priority: externalUrl > url > page slug > collection slug > category slug > '#'
 */
export function getHrefFromNavigationItem(item: NavigationItem | Button): string {
  if ('externalUrl' in item && item.externalUrl) {
    return item.externalUrl;
  }
  if (item.url) {
    return item.url;
  }
  if (item.page?.slug) {
    return `/${item.page.slug}`;
  }
  if (item.collection?.slug) {
    return `/collection/${item.collection.slug}`;
  }
  if (item.category?.slug) {
    return `/category/${item.category.slug}`;
  }
  return '#';
}

/**
 * Get icon component for button type
 */
export function getButtonIcon(button: Button): ReactNode | null {
  if (!button.url || !button.type) return null;

  switch (button.type) {
    case 'instagram':
      return createElement(Instagram, { size: 18 });
    case 'email':
      return createElement(Mail, { size: 18 });
    case 'whatsApp':
      return createElement(MessageCircle, { size: 18 });
    default:
      return null;
  }
}

/**
 * Get href for button based on type
 */
export function getButtonHref(button: Button): string | null {
  if (!button.url) return null;

  if (button.type === 'whatsApp') {
    const whatsappNumber = button.url.replace(/[^\d]/g, '');
    return `https://wa.me/${whatsappNumber}`;
  }

  if (button.type === 'email') {
    return `mailto:${button.url}`;
  }

  return button.url;
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
 * Gap size variants
 */
const gapVariants = cva('gap-4 sm:gap-6 md:gap-8 lg:gap-10', {
  variants: {
    size: {
      none: 'gap-0',
      xs: 'gap-1 sm:gap-1.5 md:gap-2',
      sm: 'gap-2 sm:gap-3 md:gap-4 lg:gap-6',
      md: 'gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10',
      lg: 'gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-14',
      xl: 'gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 2xl:gap-20',
      xl2: 'gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 2xl:gap-24',
    },
  },
});

/**
 * Get gap size classes - Responsive across all breakpoints
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
 * Normalize opacity value from Hygraph (0–1 or 0–100) to CSS-compatible 0–1 range
 */
function normalizeOpacity(value: number): number {
  return value > 1 ? value / 100 : value;
}

/**
 * Get overlay opacity with fallback chain
 */
function getOverlayOpacity(
  theme: ThemeSetting,
  defaults: ThemeSetting,
  isDark: boolean
): number {
  if (isDark) {
    const raw = theme.darkOverlayOpacity ?? theme.overlayOpacity ?? defaults.overlayOpacity ?? 0.2;
    return normalizeOpacity(raw);
  }
  const raw = theme.overlayOpacity ?? defaults.overlayOpacity ?? 0.2;
  return normalizeOpacity(raw);
}

/**
 * Merge theme with defaults based on dark mode
 */
export function getThemeWithDefaults(theme?: ThemeSetting | null, isDark: boolean = false): ThemeSetting {
  const defaults = isDark ? DEFAULT_THEME_DARK : DEFAULT_THEME_LIGHT;

  if (!theme) return defaults;

  return {
    backgroundColor: theme.backgroundColor ?? defaults.backgroundColor,
    darkBackgroundColor: theme.darkBackgroundColor ?? theme.backgroundColor ?? defaults.backgroundColor,
    textColor: theme.textColor ?? defaults.textColor,
    darkTextColor: theme.darkTextColor ?? theme.textColor ?? defaults.textColor,
    accentColor: theme.accentColor ?? defaults.accentColor,
    darkAccentColor: theme.darkAccentColor ?? theme.accentColor ?? defaults.accentColor,
    overlayColor: theme.overlayColor ?? defaults.overlayColor,
    darkOverlayColor: theme.darkOverlayColor ?? theme.overlayColor ?? defaults.overlayColor,
    overlayOpacity: getOverlayOpacity(theme, defaults, false),
    darkOverlayOpacity: getOverlayOpacity(theme, defaults, true),
    borderRadius: theme.borderRadius ?? defaults.borderRadius ?? 'none',
    shadow: theme.shadow ?? defaults.shadow ?? 'none',
  };
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
 * Get overlay opacity and color for banner/background overlays
 */
export function getOverlayStyles(theme: ThemeSetting, isDark: boolean): {
  opacity: number;
  color: string;
} {
  const opacity = isDark
    ? (theme.darkOverlayOpacity ?? theme.overlayOpacity ?? 0.2)
    : (theme.overlayOpacity ?? 0.2);
  
  const color = isDark
    ? (theme.darkOverlayColor?.hex || theme.overlayColor?.hex || '#000000')
    : (theme.overlayColor?.hex || '#000000');

  return { opacity, color };
}

/**
 * Get theme styles as CSSProperties for inline styles
 */
export function getThemeStyles(theme: ThemeSetting, isDark: boolean): CSSProperties {
  const bgColor = isDark
    ? (theme.darkBackgroundColor?.hex || theme.backgroundColor?.hex)
    : theme.backgroundColor?.hex;
  const textColor = isDark
    ? (theme.darkTextColor?.hex || theme.textColor?.hex)
    : theme.textColor?.hex;

  const styles: CSSProperties = {};

  if (bgColor) {
    styles.backgroundColor = bgColor;
  }

  if (textColor) {
    styles.color = textColor;
  }

  return styles;
}

/**
 * Create a Map from an array using a key extractor function
 * Useful for creating lookup maps by slug, id, or other unique keys
 */
export function createMapByKey<T, K extends string | number>(
  items: T[],
  keyExtractor: (item: T) => K
): Map<K, T> {
  return new Map(items.map((item) => [keyExtractor(item), item]));
}
