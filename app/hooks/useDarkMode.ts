'use client';

import { useEffect, useState } from 'react';

export function useDarkMode(initial = false) {
  const [darkMode, setDarkMode] = useState<boolean>(initial);

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    if (saved) {
      const isDark = saved === 'dark';
      setDarkMode(isDark);
      document.documentElement.classList.toggle('dark', isDark);
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      try {
        localStorage.setItem('theme', next ? 'dark' : 'light');
      } catch {}
      return next;
    });
  };

  return { darkMode, toggleTheme };
}
