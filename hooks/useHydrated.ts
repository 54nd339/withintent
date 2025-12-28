import { useState, useEffect } from 'react';

/**
 * Hook to detect if component has hydrated on the client
 * Useful for preventing hydration mismatches with Zustand persist
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}
