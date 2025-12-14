import React from 'react';
import { motion } from 'framer-motion';
import { FadeInText } from '@/app/components';

export function StorySection() {
  return (
    <section id="journal" className="py-24 bg-[#f8f5ef] dark:bg-black/20 text-neutral-900 dark:text-neutral-100">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-square md:aspect-[4/5] overflow-hidden">
          <motion.img
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            src="https://images.unsplash.com/photo-1618403088890-3d9ff6f4c8b1?q=80&w=2574&auto=format&fit=crop"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:pl-12">
          <FadeInText>
            <span className="block font-sans text-xs tracking-[0.3em] uppercase text-neutral-700 dark:text-neutral-400 mb-6">The Journal</span>
            <h2 className="font-serif text-4xl md:text-5xl mb-8">The Art of <br />Imperfection</h2>
            <p className="font-sans text-neutral-800 dark:text-neutral-300 mb-8 leading-relaxed">
              Vintage jewelry is never perfect. It carries the marks of time—a slight patina on silver, a softened edge on gold.
              We teach you how to care for these heirlooms and why their imperfections make them priceless.
            </p>
            <a href="#" className="inline-block border-b border-black dark:border-white pb-1 font-sans text-xs tracking-widest uppercase hover:opacity-60 transition-opacity text-neutral-900 dark:text-white">Read the Story</a>
          </FadeInText>
        </div>
      </div>
    </section>
  );
}
