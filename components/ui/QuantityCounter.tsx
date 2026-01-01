'use client';

import type { MouseEvent } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import {
  getQuantityCounterClasses,
  getQuantityCounterButtonClasses,
  getQuantityCounterDisplayClasses,
} from '@/lib/utils';

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
    <div className={getQuantityCounterClasses(variant, className)}>
      <button
        onClick={handleDecrease}
        className={getQuantityCounterButtonClasses(variant)}
        aria-label={showRemove ? 'Remove item' : 'Decrease quantity'}
      >
        {showRemove ? <Trash2 size={iconSize} /> : <Minus size={iconSize} />}
      </button>
      <span className={getQuantityCounterDisplayClasses(variant)}>
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        className={getQuantityCounterButtonClasses(variant)}
        aria-label="Increase quantity"
      >
        <Plus size={iconSize} />
      </button>
    </div>
  );
}
