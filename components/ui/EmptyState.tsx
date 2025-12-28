'use client';

import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel = 'Continue Shopping',
  actionHref = '/shop'
}: EmptyStateProps) {
  return (
    <main className="pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 md:pb-16 lg:pb-20 min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <Icon size={64} className="mx-auto mb-6 text-neutral-300 dark:text-neutral-700" />
        <h1 className="font-serif text-3xl md:text-4xl mb-4 text-neutral-900 dark:text-neutral-100">
          {title}
        </h1>
        {description && (
          <p className="text-neutral-600 dark:text-neutral-400 mb-8">
            {description}
          </p>
        )}
        <Link
          href={actionHref}
          className="inline-block px-8 py-3 border border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100 text-sm uppercase tracking-widest hover:bg-neutral-900 hover:text-white dark:hover:bg-neutral-100 dark:hover:text-black transition-colors"
        >
          {actionLabel}
        </Link>
      </div>
    </main>
  );
}
