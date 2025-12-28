'use client';

import { ArrowRight } from 'lucide-react';
import { FadeInText, Button } from '@/components';
import type { Button as ButtonType } from '@/lib/types';

interface ViewAllButtonProps {
  button?: ButtonType | null;
  show?: boolean;
}

export function ViewAllButton({ button, show = true }: ViewAllButtonProps) {
  if (!show || !button) return null;

  return (
    <FadeInText delay={0.2} className="hidden md:block">
      <div className="group flex items-center font-sans text-xs tracking-widest uppercase transition-colors">
        <Button cta={button} />
        <ArrowRight size={14} className="ml-2 group-hover:translate-x-2 transition-transform" />
      </div>
    </FadeInText>
  );
}
