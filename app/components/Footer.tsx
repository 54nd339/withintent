import React from 'react';
import { Instagram, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400 py-20 px-6 font-sans text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <h4 className="font-serif text-2xl text-white mb-6 tracking-widest">WITH INTENT</h4>
          <p className="leading-relaxed text-xs">
            A curated jewelry resell startup founded by <a href="https://www.instagram.com/_ally11_/" className="hover:text-white transition-colors">Ally</a>, <a href="https://www.instagram.com/alsoshrushti/" className="hover:text-white transition-colors">Shrushti</a> & <a href="https://www.instagram.com/raman.aggrawal/" className="hover:text-white transition-colors">Raman</a>.
            <br />
            <br />
            Crafted in India.
          </p>
        </div>

        <div>
          <h5 className="text-white uppercase tracking-widest text-xs mb-6">Shop</h5>
          <ul className="space-y-4 text-xs">
            <li><a href="#" className="hover:text-white transition-colors">All Products</a></li>
            <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Necklaces</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Earrings</a></li>
          </ul>
        </div>

        <div>
          <h5 className="text-white uppercase tracking-widest text-xs mb-6">Company</h5>
          <ul className="space-y-4 text-xs">
            <li><a href="#" className="hover:text-white transition-colors">Our Philosophy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Journal</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h5 className="text-white uppercase tracking-widest text-xs mb-6">Connect</h5>
          <div className="flex space-x-4">
            <a href="https://www.instagram.com/withintent.in/" className="hover:text-white transition-colors"><Instagram size={20} /></a>
            <a href="mailto:contact@withintent.in" className="hover:text-white transition-colors"><Mail size={20} /></a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-600">
        <p>&copy; 2025 With Intent. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </div>
    </footer>
  );
}
