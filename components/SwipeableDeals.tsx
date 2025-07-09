'use client';

import { useState } from 'react';
import { TV } from '@/types';
import TVDealCard from './TVDealCard';

interface SwipeableDealsProps {
  deals: TV[];
}

export default function SwipeableDeals({ deals }: SwipeableDealsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipeLeft = () => {
    if (currentIndex < deals.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSwipeRight = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full">
      {/* Card Container */}
      <div className="relative min-h-[500px]">
        {deals.map((tv, index) => (
          <div
            key={tv.id}
            className={`transition-all duration-300 ${
              index === currentIndex
                ? 'relative opacity-100'
                : 'absolute inset-0 pointer-events-none ' +
                  (index < currentIndex
                    ? 'opacity-0 -translate-x-full'
                    : 'opacity-0 translate-x-full')
            }`}
          >
            <TVDealCard
              tv={tv}
              enableSwipe={index === currentIndex}
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 left-2 right-2 flex justify-between pointer-events-none">
        <button
          onClick={handleSwipeRight}
          disabled={currentIndex === 0}
          className={`pointer-events-auto p-3 rounded-full bg-white dark:bg-dark-surface-2 shadow-lg transition-all ${
            currentIndex === 0 ? 'opacity-50' : 'hover:shadow-xl'
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleSwipeLeft}
          disabled={currentIndex === deals.length - 1}
          className={`pointer-events-auto p-3 rounded-full bg-white dark:bg-dark-surface-2 shadow-lg transition-all ${
            currentIndex === deals.length - 1 ? 'opacity-50' : 'hover:shadow-xl'
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center space-x-2 mt-4">
        {deals.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-primary dark:bg-red-500 w-8'
                : 'bg-gray-300 dark:bg-dark-border hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="text-center mt-4 text-sm text-gray-600 dark:text-dark-text-secondary">
        {currentIndex + 1} / {deals.length}
      </div>
    </div>
  );
}