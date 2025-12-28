import { useTheme } from '@/providers';
import {
  getLayoutWithDefaults,
  getThemeWithDefaults,
  getThemeStyles,
  getSpacingClassesFromLayout,
  getContainerWidthClasses,
  getAlignmentClassesFromLayout,
  getLayoutTypeClasses,
} from '@/lib/utils';
import { LayoutSetting, ThemeSetting } from '@/lib/types';

interface UseSectionLayoutOptions {
  layout?: LayoutSetting | null;
  theme?: ThemeSetting | null;
  includeAlignment?: boolean;
  includeLayoutType?: boolean;
}

export function useSectionLayout({
  layout,
  theme,
  includeAlignment = false,
  includeLayoutType = false,
}: UseSectionLayoutOptions) {
  const { darkMode } = useTheme();

  const layoutWithDefaults = getLayoutWithDefaults(layout);
  const themeWithDefaults = getThemeWithDefaults(theme, darkMode);
  const themeStyles = getThemeStyles(themeWithDefaults, darkMode);

  const spacingClasses = getSpacingClassesFromLayout(layoutWithDefaults);
  const containerWidthClasses = getContainerWidthClasses(layoutWithDefaults.containerWidth);
  const alignmentClasses = includeAlignment ? getAlignmentClassesFromLayout(layoutWithDefaults) : '';
  const layoutTypeClasses = includeLayoutType ? getLayoutTypeClasses(layoutWithDefaults.layoutType) : '';

  return {
    darkMode,
    layout: layoutWithDefaults,
    theme: themeWithDefaults,
    themeStyles,
    spacingClasses,
    containerWidthClasses,
    alignmentClasses,
    layoutTypeClasses,
  };
}
