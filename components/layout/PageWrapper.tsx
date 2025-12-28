'use client';

import React, { useState, Suspense } from 'react';
import { FloatingButtons, ProductModal, Navbar, Footer, LoadingSpinner } from '@/components';
import { ProductModalProvider } from '@/contexts';
import { useProductModal } from '@/hooks';
import { GlobalSetting, Product } from '@/lib/types';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
  globalSettings?: GlobalSetting;
  showNavigation?: boolean;
  showFooter?: boolean;
  enableProductModal?: boolean;
  products?: Product[];
  enableUrlSync?: boolean;
  basePath?: string;
}

function PageWrapperContent({
  children,
  className = '',
  globalSettings,
  showNavigation = true,
  showFooter = true,
  enableProductModal = false,
  products,
  enableUrlSync = false,
  basePath = '/shop',
}: PageWrapperProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { selectedProduct, isModalOpen, handleProductClick, handleCloseModal } = useProductModal(
    enableProductModal ? { products, enableUrlSync, basePath } : undefined
  );

  const content = (
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
      {enableProductModal && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
      <FloatingButtons />
    </div>
  );

  if (enableProductModal) {
    return (
      <ProductModalProvider handleProductClick={handleProductClick}>
        {content}
      </ProductModalProvider>
    );
  }

  return content;
}

export function PageWrapper(props: PageWrapperProps) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PageWrapperContent {...props} />
    </Suspense>
  );
}
