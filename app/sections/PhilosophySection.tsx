import React from 'react';
import { FadeInText } from '@/app/components';

export function PhilosophySection() {
  return (
    <section id="philosophy" className="py-32 px-6 max-w-5xl mx-auto text-center relative text-neutral-900 dark:text-neutral-100">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-neutral-300 to-transparent dark:from-neutral-700"></div>
      <FadeInText>
        <span className="block font-sans text-xs tracking-[0.3em] uppercase text-neutral-600 dark:text-neutral-400 mb-8">Our Philosophy</span>
        <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-8">&ldquo;We believe jewelry carries memory. Every piece we curate has lived a life before it finds you.&rdquo;</h2>
        <p className="font-sans text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-xl mx-auto">Sourced from vintage markets and artisan collectors across India. Restored with care. Sold with intent.</p>
      </FadeInText>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-t from-neutral-300 to-transparent dark:from-neutral-700"></div>
    </section>
  );
}
