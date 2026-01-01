import { createElement, type ReactNode } from 'react';
import { Instagram, Mail, MessageCircle } from 'lucide-react';
import type { Button } from '@/lib/types';

/**
 * Get icon component for button type
 */
export function getButtonIcon(button: Button): ReactNode | null {
  if (!button.url || !button.type) return null;

  switch (button.type) {
    case 'instagram':
      return createElement(Instagram, { size: 18 });
    case 'email':
      return createElement(Mail, { size: 18 });
    case 'whatsApp':
      return createElement(MessageCircle, { size: 18 });
    default:
      return null;
  }
}
