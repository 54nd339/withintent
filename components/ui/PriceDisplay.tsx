import { formatINR } from '@/lib/utils';

const SIZE_CLASSES = {
  sm: {
    current: 'text-sm',
    original: 'text-xs',
  },
  base: {
    current: 'text-base',
    original: 'text-sm',
  },
  lg: {
    current: 'text-lg',
    original: 'text-base',
  },
  xl: {
    current: 'text-2xl',
    original: 'text-lg',
  },
} as const;

interface PriceDisplayProps {
  price: number;
  discountPrice?: number;
  size?: 'sm' | 'base' | 'lg' | 'xl';
  className?: string;
}

export function PriceDisplay({ price, discountPrice, size = 'base', className = '' }: PriceDisplayProps) {
  const classes = SIZE_CLASSES[size];

  if (discountPrice) {
    return (
      <div className={`flex flex-col ${className}`}>
        <span className={`font-serif font-medium text-neutral-900 dark:text-neutral-100 ${classes.current}`}>
          {formatINR(discountPrice)}
        </span>
        <span className={`font-serif text-neutral-500 dark:text-neutral-500 line-through ${classes.original}`}>
          {formatINR(price)}
        </span>
      </div>
    );
  }

  return (
    <span className={`font-serif font-medium text-neutral-900 dark:text-neutral-100 ${classes.current} ${className}`}>
      {formatINR(price)}
    </span>
  );
}
