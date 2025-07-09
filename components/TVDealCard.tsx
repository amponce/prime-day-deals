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
    <div className="pin-card group h-full" onMouseEnter={() => setIsPinHovered(true)} onMouseLeave={() => setIsPinHovered(false)}>
      {/* Pin Button */}
      <button
        onClick={handlePin}
        className={`absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full font-semibold text-sm z-10 transition-opacity duration-300 ${
          isPinHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        📌 Save
      </button>
      
      {/* Deal Badge */}
      <div className="deal-badge">{tv.discount}% OFF</div>
      
      {/* TV Image */}
      {tv.imageUrl ? (
        <div className="h-64 bg-gray-100 dark:bg-dark-surface-2">
          <img 
            src={tv.imageUrl} 
            alt={`${tv.name} ${tv.size} inch ${tv.technology} TV`}
            className="w-full h-full object-contain"
          />
        </div>
      ) : (
        <TVImagePlaceholder tv={tv} />
      )}
      
      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold">{tv.name}</h3>
          <span className={`tech-badge text-white ${getTechColor(tv.technology)}`}>
            {tv.technology}
          </span>
        </div>
        
        {/* Price */}
        <div className="mb-4">
          <div className="text-3xl font-bold text-primary dark:text-red-500">${tv.currentPrice}</div>
          <div className="text-gray-500 dark:text-dark-text-secondary line-through">${tv.originalPrice}</div>
          <div className="text-green-600 dark:text-green-500 font-semibold">Save ${tv.originalPrice - tv.currentPrice}</div>
        </div>
        
        {/* Features */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {tv.features.slice(0, 3).map((feature, index) => (
              <span key={index} className="text-xs bg-gray-100 dark:bg-dark-surface-2 px-2 py-1 rounded">
                {feature}
              </span>
            ))}
          </div>
        </div>
        
        {/* Highlights */}
        <ul className="text-sm text-gray-600 dark:text-dark-text-secondary mb-6 space-y-1">
          {tv.highlights.slice(0, 3).map((highlight, index) => (
            <li key={index} className="flex items-start">
              <span className="text-green-500 dark:text-green-400 mr-2">✓</span>
              {highlight}
            </li>
          ))}
        </ul>
        
        {/* CTA Button */}
        <a 
          href={tv.affiliateUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full btn-primary block text-center"
        >
          Shop This Deal →
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