'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  backHref?: string;
  backLabel?: string;
}

export function PageHeader({ title, backHref = '/shop', backLabel = 'Continue Shopping' }: PageHeaderProps) {
  return (
    <div className="mt-4 sm:mt-6 md:mt-8 mb-6 sm:mb-8">
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors mb-4 sm:mb-6 relative group"
      >
        <ArrowLeft size={16} />
        <span className="relative">
          {backLabel}
          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full" />
        </span>
      </Link>
      <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-neutral-900 dark:text-neutral-100">
        {title}
      </h1>
    </div>
  );
}
