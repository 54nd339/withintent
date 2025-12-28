'use client';

import React, { useState } from 'react';
import { FloatingButtons, Navbar, Footer } from '@/components';
import { GlobalSetting } from '@/lib/types';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
  globalSettings?: GlobalSetting;
  showNavigation?: boolean;
  showFooter?: boolean;
}

export function PageWrapper({
  children,
  className = '',
  globalSettings,
  showNavigation = true,
  showFooter = true,
}: PageWrapperProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={`min-h-screen transition-colors duration-700 ease-in-out bg-[var(--background)] text-[var(--foreground)] dark:bg-[#121212] dark:text-[#f8f5ef] ${className}`}>
      {showNavigation && globalSettings?.mainNavigation && (
        <Navbar
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          navigation={globalSettings.mainNavigation}
          logo={globalSettings.logo}
        />
      )}
      {children}
      {showFooter && globalSettings?.footer && (
        <Footer data={globalSettings.footer} />
      )}
      <FloatingButtons />
    </div>
  );
}
