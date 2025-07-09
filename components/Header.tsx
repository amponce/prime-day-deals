'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container-custom py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            DealRoom
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/deals" className="hover:text-primary transition-colors">
              TV Deals
            </Link>
            <Link href="/rooms" className="hover:text-primary transition-colors">
              Room Designs
            </Link>
            <Link href="/guide" className="hover:text-primary transition-colors">
              Buying Guide
            </Link>
            <Link href="/pinterest" className="hover:text-primary transition-colors">
              Pinterest Gallery
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <Link href="/deals" className="block py-2 hover:text-primary transition-colors">
              TV Deals
            </Link>
            <Link href="/rooms" className="block py-2 hover:text-primary transition-colors">
              Room Designs
            </Link>
            <Link href="/guide" className="block py-2 hover:text-primary transition-colors">
              Buying Guide
            </Link>
            <Link href="/pinterest" className="block py-2 hover:text-primary transition-colors">
              Pinterest Gallery
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}