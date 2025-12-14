'use client';

import React from 'react';
import Image from 'next/image';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '@/app/providers';

type Props = {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
};

export function Navbar({ isMenuOpen, setIsMenuOpen }: Props) {
  const { darkMode, toggleTheme } = useTheme();
  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-colors duration-500 text-neutral-900 dark:text-neutral-50 ${
        isMenuOpen
          ? 'bg-[var(--background)]/90 dark:bg-neutral-900 shadow-sm'
          : 'backdrop-blur-md border-b border-black/5 dark:border-white/10 bg-[var(--background)]/70 dark:bg-neutral-900/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Image
          src="/logo.svg"
          alt="WITH INTENT Logo"
          width={60}
          height={60}
          className="object-contain"
        />

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-12 font-sans text-xs tracking-[0.2em] uppercase text-neutral-900 dark:text-neutral-50">
          <NavLink href="#shop">Shop</NavLink>
          <NavLink href="#philosophy">Philosophy</NavLink>
          <NavLink href="#journal">Journal</NavLink>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-6">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
          </button>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden overflow-hidden bg-white dark:bg-neutral-900 absolute top-20 left-0 w-full z-40">
        <div
          className={`flex flex-col items-center justify-center transition-[height,opacity] duration-300 ${
            isMenuOpen ? 'opacity-100 h-[80vh]' : 'opacity-0 h-0'
          }`}
        >
          <div className="flex flex-col items-center space-y-8 font-serif text-3xl">
            <a href="#shop" onClick={() => setIsMenuOpen(false)}>
              Shop
            </a>
            <a href="#philosophy" onClick={() => setIsMenuOpen(false)}>
              Philosophy
            </a>
            <a href="#journal" onClick={() => setIsMenuOpen(false)}>
              Journal
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="relative group py-2">
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full" />
    </a>
  );
}
