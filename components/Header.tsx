'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-secondary dark:bg-dark-surface text-white sticky top-0 z-40 shadow-md">
      <nav className="container-custom py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold">PrimeDealHub</span>
            <span className="bg-primary text-white px-2 py-1 rounded text-xs font-semibold uppercase">VERIFIED</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-lg">🔒</span>
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">✓</span>
                <span>Authorized Affiliate</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">⭐</span>
                <span>4.8/5 Trust Score</span>
              </div>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div className="md:hidden mt-4 pb-4 border-t border-gray-600 pt-4">
            <Link href="/deals" className="block py-2 hover:text-primary transition-colors">
              TV Deals
            </Link>
            <Link href="/guide" className="block py-2 hover:text-primary transition-colors">
              Buying Guide
            </Link>
            <Link href="/pinterest" className="block py-2 hover:text-primary transition-colors">
              Pinterest Gallery
            </Link>
            <div className="mt-4 pt-4 border-t border-gray-600 space-y-2 text-sm opacity-90">
              <div className="flex items-center gap-2">
                <span>🔒</span>
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>Authorized Affiliate</span>
              </div>
              <div className="flex items-center gap-2">
                <span>⭐</span>
                <span>4.8/5 Trust Score</span>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}