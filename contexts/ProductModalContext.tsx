'use client';

import React, { createContext, useContext } from 'react';
import { Product } from '@/lib/types';

interface ProductModalContextType {
  handleProductClick: (product: Product) => void;
}

const ProductModalContext = createContext<ProductModalContextType | null>(null);

export function useProductModalContext() {
  const context = useContext(ProductModalContext);
  return context;
}

interface ProductModalProviderProps {
  children: React.ReactNode;
  handleProductClick: (product: Product) => void;
}

export function ProductModalProvider({ children, handleProductClick }: ProductModalProviderProps) {
  return (
    <ProductModalContext.Provider value={{ handleProductClick }}>
      {children}
    </ProductModalContext.Provider>
  );
}
