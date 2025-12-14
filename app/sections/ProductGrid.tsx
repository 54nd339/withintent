import React from 'react';
import { ArrowRight } from 'lucide-react';
import { FadeInText, ProductCard } from '@/app/components';
import { PRODUCTS } from '@/app/constants';

export function ProductGrid() {
  return (
    <section id="shop" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-16">
        <FadeInText className="text-left">
          <h3 className="font-sans text-xs tracking-[0.3em] uppercase mb-4 text-neutral-700 dark:text-neutral-400">The Latest Drop</h3>
          <h2 className="font-serif text-4xl text-neutral-900 dark:text-white">December Collection</h2>
        </FadeInText>
        <FadeInText delay={0.2} className="hidden md:block">
          <a href="#" className="group flex items-center font-sans text-xs tracking-widest uppercase text-neutral-800 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors">
            View Archive <ArrowRight size={14} className="ml-2 group-hover:translate-x-2 transition-transform" />
          </a>
        </FadeInText>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
        {PRODUCTS.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}
