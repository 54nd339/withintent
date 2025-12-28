'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  // Full page variant props
  icon?: LucideIcon;
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  
  // Section variant props
  message?: string;
  themeStyles?: CSSProperties;
  className?: string;
  
  // Variant control
  variant?: 'page' | 'section';
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel = 'Continue Shopping',
  actionHref = '/shop',
  message,
  themeStyles,
  className = 'text-center py-8 sm:py-10 md:py-12 lg:py-16',
  variant,
}: EmptyStateProps) {
  // Auto-detect variant based on props
  const isPageVariant = variant === 'page' || (Icon && title);
  const isSectionVariant = variant === 'section' || (!Icon && !title && message);

  // Section variant (simple message)
  if (isSectionVariant && message) {
    return (
      <div
        className={className}
        style={{ opacity: 0.6, color: themeStyles?.color || 'inherit' }}
      >
        <p>{message}</p>
      </div>
    );
  }

  // Page variant (full page with icon, title, action)
  if (isPageVariant && Icon && title) {
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

  return null;
}
