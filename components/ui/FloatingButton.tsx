'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FloatingButtonProps {
  href: string;
  icon: LucideIcon;
  count: number;
  position: 'left' | 'right';
  iconClassName?: string;
}

export function FloatingButton({
  href,
  icon: Icon,
  count,
  position,
  iconClassName = '',
}: FloatingButtonProps) {
  const positionClass = position === 'left' ? 'left-6' : 'right-6';

  return (
    <Link href={href}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        className={`fixed bottom-6 ${positionClass} md:hidden z-50 w-14 h-14 rounded-full backdrop-blur-md bg-white/80 dark:bg-neutral-900/80 border border-white/20 dark:border-neutral-700/30 shadow-lg flex items-center justify-center`}
      >
        <div className="relative">
          <Icon size={22} className={iconClassName} />

          <AnimatePresence>
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center border-2 border-white dark:border-neutral-900"
              >
                {count > 9 ? '9+' : count}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </Link>
  );
}
