'use client';

import React, { createContext, useContext, useEffect, useLayoutEffect, useMemo, useState, startTransition } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  darkMode: boolean;
  mounted: boolean;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // Hydrate theme from localStorage after mount to avoid SSR mismatch
  useLayoutEffect(() => {
    let initial: Theme = 'light';
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') {
        initial = saved as Theme;
      } else if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
        initial = 'dark';
      }
    } catch { }
    
    // Set both theme and mounted in the same transition to avoid double render
    startTransition(() => {
      setThemeState(initial);
      setMounted(true);
    });
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    try {
      localStorage.setItem('theme', theme);
    } catch { }
  }, [theme, mounted]);

  const toggleTheme = () => setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  const setTheme = (t: Theme) => setThemeState(t);

  const value = useMemo(
    () => ({ theme, darkMode: theme === 'dark', mounted, toggleTheme, setTheme }),
    [theme, mounted]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
