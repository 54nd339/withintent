import React from 'react';
import { SpacingSize, LayoutSetting, ThemeSetting } from '@/app/types';
import { DEFAULT_THEME_LIGHT, DEFAULT_THEME_DARK, DEFAULT_LAYOUT } from './constants';

/**
 * Convert SpacingSize enum to Tailwind CSS classes
 */
function getSpacingClasses(
  paddingTop?: SpacingSize | null,
  paddingBottom?: SpacingSize | null,
  paddingLeft?: SpacingSize | null,
  paddingRight?: SpacingSize | null,
  marginTop?: SpacingSize | null,
  marginBottom?: SpacingSize | null,
  marginLeft?: SpacingSize | null,
  marginRight?: SpacingSize | null
): string {
  const classes: string[] = [];

  // Padding Top - Responsive across all breakpoints
  if (paddingTop && paddingTop !== 'none') {
    const paddingMap: Record<SpacingSize, string> = {
      none: '',
      xs: 'pt-2 sm:pt-3 md:pt-4',
      sm: 'pt-3 sm:pt-4 md:pt-6 lg:pt-8',
      md: 'pt-4 sm:pt-6 md:pt-8 lg:pt-12 xl:pt-16',
      lg: 'pt-6 sm:pt-8 md:pt-12 lg:pt-16 xl:pt-20 2xl:pt-24',
      xl: 'pt-8 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-24 2xl:pt-28',
      'xl2': 'pt-10 sm:pt-16 md:pt-20 lg:pt-24 xl:pt-28 2xl:pt-32',
    };
    classes.push(paddingMap[paddingTop]);
  }

  // Padding Bottom - Responsive across all breakpoints
  if (paddingBottom && paddingBottom !== 'none') {
    const paddingMap: Record<SpacingSize, string> = {
      none: '',
      xs: 'pb-2 sm:pb-3 md:pb-4',
      sm: 'pb-3 sm:pb-4 md:pb-6 lg:pb-8',
      md: 'pb-4 sm:pb-6 md:pb-8 lg:pb-12 xl:pb-16',
      lg: 'pb-6 sm:pb-8 md:pb-12 lg:pb-16 xl:pb-20 2xl:pb-24',
      xl: 'pb-8 sm:pb-12 md:pb-16 lg:pb-20 xl:pb-24 2xl:pb-28',
      'xl2': 'pb-10 sm:pb-16 md:pb-20 lg:pb-24 xl:pb-28 2xl:pb-32',
    };
    classes.push(paddingMap[paddingBottom]);
  }

  // Padding Left - Responsive across all breakpoints
  if (paddingLeft && paddingLeft !== 'none') {
    const paddingMap: Record<SpacingSize, string> = {
      none: '',
      xs: 'pl-2 sm:pl-3 md:pl-4',
      sm: 'pl-3 sm:pl-4 md:pl-6 lg:pl-8',
      md: 'pl-4 sm:pl-6 md:pl-8 lg:pl-12 xl:pl-16',
      lg: 'pl-6 sm:pl-8 md:pl-12 lg:pl-16 xl:pl-20 2xl:pl-24',
      xl: 'pl-8 sm:pl-12 md:pl-16 lg:pl-20 xl:pl-24 2xl:pl-28',
      'xl2': 'pl-10 sm:pl-16 md:pl-20 lg:pl-24 xl:pl-28 2xl:pl-32',
    };
    classes.push(paddingMap[paddingLeft]);
  }

  // Padding Right - Responsive across all breakpoints
  if (paddingRight && paddingRight !== 'none') {
    const paddingMap: Record<SpacingSize, string> = {
      none: '',
      xs: 'pr-2 sm:pr-3 md:pr-4',
      sm: 'pr-3 sm:pr-4 md:pr-6 lg:pr-8',
      md: 'pr-4 sm:pr-6 md:pr-8 lg:pr-12 xl:pr-16',
      lg: 'pr-6 sm:pr-8 md:pr-12 lg:pr-16 xl:pr-20 2xl:pr-24',
      xl: 'pr-8 sm:pr-12 md:pr-16 lg:pr-20 xl:pr-24 2xl:pr-28',
      'xl2': 'pr-10 sm:pr-16 md:pr-20 lg:pr-24 xl:pr-28 2xl:pr-32',
    };
    classes.push(paddingMap[paddingRight]);
  }

  // Margin Top - Responsive across all breakpoints
  if (marginTop && marginTop !== 'none') {
    const marginMap: Record<SpacingSize, string> = {
      none: '',
      xs: 'mt-2 sm:mt-3 md:mt-4',
      sm: 'mt-3 sm:mt-4 md:mt-6 lg:mt-8',
      md: 'mt-4 sm:mt-6 md:mt-8 lg:mt-12 xl:mt-16',
      lg: 'mt-6 sm:mt-8 md:mt-12 lg:mt-16 xl:mt-20 2xl:mt-24',
      xl: 'mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24 2xl:mt-28',
      'xl2': 'mt-10 sm:mt-16 md:mt-20 lg:mt-24 xl:mt-28 2xl:mt-32',
    };
    classes.push(marginMap[marginTop]);
  }

  // Margin Bottom - Responsive across all breakpoints
  if (marginBottom && marginBottom !== 'none') {
    const marginMap: Record<SpacingSize, string> = {
      none: '',
      xs: 'mb-2 sm:mb-3 md:mb-4',
      sm: 'mb-3 sm:mb-4 md:mb-6 lg:mb-8',
      md: 'mb-4 sm:mb-6 md:mb-8 lg:mb-12 xl:mb-16',
      lg: 'mb-6 sm:mb-8 md:mb-12 lg:mb-16 xl:mb-20 2xl:mb-24',
      xl: 'mb-8 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-24 2xl:mb-28',
      'xl2': 'mb-10 sm:mb-16 md:mb-20 lg:mb-24 xl:mb-28 2xl:mb-32',
    };
    classes.push(marginMap[marginBottom]);
  }

  // Margin Left - Responsive across all breakpoints
  if (marginLeft && marginLeft !== 'none') {
    const marginMap: Record<SpacingSize, string> = {
      none: '',
      xs: 'ml-2 sm:ml-3 md:ml-4',
      sm: 'ml-3 sm:ml-4 md:ml-6 lg:ml-8',
      md: 'ml-4 sm:ml-6 md:ml-8 lg:ml-12 xl:ml-16',
      lg: 'ml-6 sm:ml-8 md:ml-12 lg:ml-16 xl:ml-20 2xl:ml-24',
      xl: 'ml-8 sm:ml-12 md:ml-16 lg:ml-20 xl:ml-24 2xl:ml-28',
      'xl2': 'ml-10 sm:ml-16 md:ml-20 lg:ml-24 xl:ml-28 2xl:ml-32',
    };
    classes.push(marginMap[marginLeft]);
  }

  // Margin Right - Responsive across all breakpoints
  if (marginRight && marginRight !== 'none') {
    const marginMap: Record<SpacingSize, string> = {
      none: '',
      xs: 'mr-2 sm:mr-3 md:mr-4',
      sm: 'mr-3 sm:mr-4 md:mr-6 lg:mr-8',
      md: 'mr-4 sm:mr-6 md:mr-8 lg:mr-12 xl:mr-16',
      lg: 'mr-6 sm:mr-8 md:mr-12 lg:mr-16 xl:mr-20 2xl:mr-24',
      xl: 'mr-8 sm:mr-12 md:mr-16 lg:mr-20 xl:mr-24 2xl:mr-28',
      'xl2': 'mr-10 sm:mr-16 md:mr-20 lg:mr-24 xl:mr-28 2xl:mr-32',
    };
    classes.push(marginMap[marginRight]);
  }

  return classes.join(' ');
}

/**
 * Get spacing classes from LayoutSetting component
 */
export function getSpacingClassesFromLayout(layout?: LayoutSetting | null): string {
  if (!layout) return '';
  return getSpacingClasses(
    layout.paddingTop,
    layout.paddingBottom,
    layout.paddingLeft,
    layout.paddingRight,
    layout.marginTop,
    layout.marginBottom,
    layout.marginLeft,
    layout.marginRight
  );
}

/**
 * Format WhatsApp number to URL
 */
export function formatWhatsAppUrl(number: string): string {
  const cleaned = number.replace(/[^\d]/g, '');
  return `https://wa.me/${cleaned}`;
}

/**
 * Create WhatsApp inquiry link with message
 */
export function createWhatsAppInquiryLink(whatsAppNumber: string, productTitle: string): string {
  const url = formatWhatsAppUrl(whatsAppNumber);
  return `${url}?text=${encodeURIComponent(`I am interested in ${productTitle}`)}`;
}

/**
 * Format INR currency
 */
export const formatINR = (value: number) => `₹${value.toLocaleString("en-IN")}`;

/**
 * Get alignment classes
 */
function getAlignmentClasses(alignment?: string | null): string {
  switch (alignment) {
    case 'left':
      return 'text-left';
    case 'right':
      return 'text-right';
    case 'center':
      return 'text-center';
    default:
      return 'text-center';
  }
}

/**
 * Get alignment classes from LayoutSetting component
 */
export function getAlignmentClassesFromLayout(layout?: LayoutSetting | null): string {
  if (!layout) return 'text-center';
  return getAlignmentClasses(layout.textAlign);
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
 * Get gap size classes - Responsive across all breakpoints
 */
export function getGapSizeClasses(gapSize?: SpacingSize | null): string {
  switch (gapSize) {
    case 'xs':
      return 'gap-1 sm:gap-1.5 md:gap-2';
    case 'sm':
      return 'gap-2 sm:gap-3 md:gap-4 lg:gap-6';
    case 'md':
      return 'gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10';
    case 'lg':
      return 'gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-14';
    case 'xl':
      return 'gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 2xl:gap-20';
    case 'xl2':
      return 'gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 2xl:gap-24';
    case 'none':
      return 'gap-0';
    default:
      return 'gap-4 sm:gap-6 md:gap-8 lg:gap-10';
  }
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
 * Merge theme with defaults based on dark mode
 */
export function getThemeWithDefaults(theme?: ThemeSetting | null, isDark: boolean = false): ThemeSetting {
  const defaults = isDark ? DEFAULT_THEME_DARK : DEFAULT_THEME_LIGHT;

  if (!theme) return defaults;

  // Hygraph stores overlay opacities as 0–1 or 0–100; normalise to 0–1 for CSS
  const normalizeOpacity = (value: number): number =>
    value > 1 ? value / 100 : value;

  const overlayOpacityRaw =
    theme.overlayOpacity ?? defaults.overlayOpacity ?? 0.2;
  const darkOverlayOpacityRaw =
    theme.darkOverlayOpacity ??
    theme.overlayOpacity ??
    defaults.overlayOpacity ??
    0.2;

  return {
    backgroundColor: theme.backgroundColor || defaults.backgroundColor,
    darkBackgroundColor: theme.darkBackgroundColor || theme.backgroundColor || defaults.backgroundColor,
    textColor: theme.textColor || defaults.textColor,
    darkTextColor: theme.darkTextColor || theme.textColor || defaults.textColor,
    accentColor: theme.accentColor || defaults.accentColor,
    darkAccentColor: theme.darkAccentColor || theme.accentColor || defaults.accentColor,
    overlayColor: theme.overlayColor || defaults.overlayColor,
    darkOverlayColor: theme.darkOverlayColor || theme.overlayColor || defaults.overlayColor,
    overlayOpacity: normalizeOpacity(overlayOpacityRaw),
    darkOverlayOpacity: normalizeOpacity(darkOverlayOpacityRaw),
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
 * Get theme styles as React.CSSProperties for inline styles
 */
export function getThemeStyles(theme: ThemeSetting, isDark: boolean): React.CSSProperties {
  const bgColor = isDark
    ? (theme.darkBackgroundColor?.hex || theme.backgroundColor?.hex)
    : theme.backgroundColor?.hex;
  const textColor = isDark
    ? (theme.darkTextColor?.hex || theme.textColor?.hex)
    : theme.textColor?.hex;

  const styles: React.CSSProperties = {};

  if (bgColor) {
    styles.backgroundColor = bgColor;
  }

  if (textColor) {
    styles.color = textColor;
  }

  return styles;
}
