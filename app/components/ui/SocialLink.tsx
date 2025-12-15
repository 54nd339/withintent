import React from 'react';
import { Instagram, Mail, MessageCircle, Facebook } from 'lucide-react';
import { SocialLink as SocialLinkType, Social } from '@/app/types';

interface SocialLinkProps {
  link: SocialLinkType;
  className?: string;
}

const iconMap: Record<Social, React.ComponentType<{ size?: number; className?: string }>> = {
  instagram: Instagram,
  email: Mail,
  whatsapp: MessageCircle,
  facebook: Facebook,
};

export function SocialLink({ link, className = '' }: SocialLinkProps) {
  const Icon = iconMap[link.platform];

  if (!Icon) {
    return null;
  }

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`hover:text-white transition-colors ${className}`}
      aria-label={link.platform}
    >
      <Icon size={20} />
    </a>
  );
}

