'use client';

import type { MouseEvent } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';

const quantityCounterVariants = cva('flex items-center', {
  variants: {
    variant: {
      desktop: 'gap-2',
      mobile: 'gap-0 border border-neutral-200 dark:border-neutral-700 rounded overflow-hidden',
      checkout: 'gap-3',
    },
  },
});

const buttonVariants = cva(
  'flex items-center justify-center transition-colors',
  {
    variants: {
      variant: {
        desktop: 'flex-shrink-0 w-10 h-10 border border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-900 hover:text-white dark:hover:bg-neutral-100 dark:hover:text-black',
        mobile: 'flex-shrink-0 w-12 border-r border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 last:border-r-0 last:border-l',
        checkout: 'p-1.5 sm:p-1 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800',
      },
    },
  }
);

const quantityDisplayVariants = cva('text-xs uppercase tracking-widest text-neutral-900 dark:text-neutral-100 text-center', {
  variants: {
    variant: {
      desktop: 'flex-1 py-2 border-y border-neutral-900 dark:border-neutral-100',
      mobile: 'flex-1 py-3 px-4 flex items-center justify-center',
      checkout: 'font-sans text-sm w-8',
    },
  },
});

type QuantityCounterProps = {
  quantity: number;
  onIncrease: (e: MouseEvent) => void;
  onDecrease: (e: MouseEvent) => void;
  onRemove?: (e: MouseEvent) => void;
  variant?: 'desktop' | 'mobile' | 'checkout';
  className?: string;
};

export function QuantityCounter({
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
  variant = 'desktop',
  className,
}: QuantityCounterProps) {
  const showRemove = variant === 'desktop' && quantity === 1 && onRemove;
  const handleDecrease = showRemove ? onRemove : onDecrease;
  const iconSize = variant === 'checkout' ? 16 : variant === 'mobile' ? 18 : 16;

  return (
    <div className={clsx(quantityCounterVariants({ variant }), className)}>
      <button
        onClick={handleDecrease}
        className={buttonVariants({ variant })}
        aria-label={showRemove ? 'Remove item' : 'Decrease quantity'}
      >
        {showRemove ? <Trash2 size={iconSize} /> : <Minus size={iconSize} />}
      </button>
      <span className={quantityDisplayVariants({ variant })}>
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        className={buttonVariants({ variant })}
        aria-label="Increase quantity"
      >
        <Plus size={iconSize} />
      </button>
    </div>
  );
}
