import type { CSSProperties } from 'react';
import type { ThemeSetting } from '@/lib/types';
import { DEFAULT_THEME_LIGHT, DEFAULT_THEME_DARK } from '@/lib/constants';

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
