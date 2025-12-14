"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Navbar, Footer } from "@/app/components";
import { HeroSection, PhilosophySection, ProductGrid, StorySection } from "@/app/sections";
import { useTheme } from "@/app/providers/ThemeProvider";

export default function App() {
  useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className={`min-h-screen transition-colors duration-700 ease-in-out bg-[var(--background)] text-[var(--foreground)] dark:bg-neutral-900 dark:text-neutral-100`}
    >
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <main>
        <HeroSection />
        <PhilosophySection />
        <ProductGrid />
        <StorySection />
      </main>

      <Footer />

      <motion.a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 right-6 md:hidden z-50 bg-green-600 text-white p-4 rounded-full shadow-xl"
      >
        <ShoppingBag size={24} />
      </motion.a>
    </div>
  );
}
