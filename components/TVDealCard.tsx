'use client';

import { TV } from '@/types';
import { useState } from 'react';
import TVImagePlaceholder from './TVImagePlaceholder';
import SwipeableCard from './SwipeableCard';

interface TVDealCardProps {
  tv: TV;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  enableSwipe?: boolean;
}

export default function TVDealCard({ tv, onSwipeLeft, onSwipeRight, enableSwipe = false }: TVDealCardProps) {
  const [isPinHovered, setIsPinHovered] = useState(false);

  const getTechColor = (tech: string) => {
    const colors: Record<string, string> = {
      'OLED': 'bg-purple-600',
      'QLED': 'bg-blue-600',
      'Mini-LED': 'bg-orange-600',
      'LED': 'bg-gray-600',
      'QD-OLED': 'bg-red-600',
      'Micro-LED': 'bg-yellow-600',
    };
    return colors[tech] || 'bg-gray-600';
  };

  const handlePin = () => {
    const description = `${tv.name} ${tv.size}" ${tv.technology} TV only $${tv.currentPrice} - Save ${tv.discount}%!`;
    const url = encodeURIComponent(window.location.href);
    const desc = encodeURIComponent(description);
    window.open(`https://pinterest.com/pin/create/button/?url=${url}&description=${desc}`, '_blank');
  };

  const cardContent = (
    <div className="bg-white dark:bg-dark-surface rounded-xl shadow-card hover:shadow-card-hover border border-border-light dark:border-dark-border transition-all duration-300 group h-full relative overflow-hidden flex flex-col" onMouseEnter={() => setIsPinHovered(true)} onMouseLeave={() => setIsPinHovered(false)}>
      {/* Pin Button */}
      <button
        onClick={handlePin}
        className={`absolute top-4 right-4 bg-white dark:bg-dark-surface-2 text-primary dark:text-primary px-3 py-1.5 rounded-md font-semibold text-sm z-20 transition-all duration-300 hover:scale-105 shadow-md ${
          isPinHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
      >
        📌 Save
      </button>
      
      {/* Deal Badge - Only show if there's a real discount */}
      {tv.discount > 0 && (
        <div className="deal-badge">
          {tv.discount}% OFF
        </div>
      )}
      
      {/* TV Image - Clickable */}
      <a 
        href={tv.affiliateUrl || '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative h-56 bg-bg-light dark:bg-dark-surface-2 cursor-pointer"
      >
        {tv.imageUrl ? (
          <img 
            src={tv.imageUrl} 
            alt={`${tv.name} ${tv.size} inch ${tv.technology} TV`}
            className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <TVImagePlaceholder tv={tv} />
        )}
        
        {/* Best Seller Badge */}
        {tv.reviewCount && tv.reviewCount > 500 && (
          <div className="absolute bottom-2 left-2 bg-accent text-white px-3 py-1 rounded-md text-xs font-bold">
            ⭐ Best Seller
          </div>
        )}
      </a>
      
      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-3">
          <span className={`tech-badge text-white ${getTechColor(tv.technology)} mb-2 inline-block`}>
            {tv.technology}
          </span>
          <h3 className="text-lg font-semibold text-text-dark dark:text-white line-clamp-2 min-h-[3.5rem]">{tv.name}</h3>
        </div>
        
        {/* Price */}
        <div className="mb-4">
          <div className="flex items-baseline gap-3 mb-1">
            <span className="text-3xl font-bold text-primary">
              ${tv.currentPrice.toFixed(2)}
            </span>
            {tv.originalPrice > 0 && (
              <span className="text-lg text-text-gray line-through">
                ${tv.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {tv.originalPrice > 0 && tv.discount > 0 && (
            <div className="savings-badge inline-block">
              Save ${(tv.originalPrice - tv.currentPrice).toFixed(2)}
            </div>
          )}
        </div>
        
        
        {/* Highlights */}
        <ul className="text-sm text-text-gray dark:text-dark-text-secondary mb-4 space-y-1 flex-1">
          {tv.highlights.slice(0, 4).map((highlight, index) => (
            <li key={index} className="flex items-start">
              <span className="text-success mr-2 font-bold">✓</span>
              {highlight}
            </li>
          ))}
        </ul>
        
        {/* Rating */}
        {tv.rating && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(tv.rating) ? '' : 'opacity-30'}>★</span>
              ))}
            </div>
            <span className="text-sm text-text-gray dark:text-dark-text-secondary">
              {tv.rating} {tv.reviewCount ? `(${tv.reviewCount.toLocaleString()} reviews)` : ''}
            </span>
          </div>
        )}
        
        {/* CTA Button - Always at bottom */}
        <a 
          href={tv.affiliateUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-md transition-all duration-200 block text-center mt-auto"
        >
          View Deal on Amazon →
        </a>
      </div>
    </div>
  );

  if (enableSwipe) {
    return (
      <SwipeableCard onSwipeLeft={onSwipeLeft} onSwipeRight={onSwipeRight}>
        {cardContent}
      </SwipeableCard>
    );
  }

  return cardContent;
}