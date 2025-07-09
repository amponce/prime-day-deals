'use client';

import { useState, useEffect } from 'react';
import { TV } from '@/types';
import TVDealCard from '@/components/TVDealCard';
import SwipeableDeals from '@/components/SwipeableDeals';
import DealFilters from '@/components/DealFilters';

interface ClientDealsProps {
  initialDeals: TV[];
}

export default function ClientDeals({ initialDeals }: ClientDealsProps) {
  const [deals] = useState(initialDeals);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Filters Sidebar */}
      <div className="lg:col-span-1">
        <DealFilters />
      </div>
      
      {/* Deals Grid/Swipeable */}
      <div className="lg:col-span-3">
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600 dark:text-dark-text-secondary">
            Showing {deals.length} deals
          </p>
          <select className="border dark:border-dark-border dark:bg-dark-surface rounded-lg px-4 py-2">
            <option>Sort by: Best Deals</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Biggest Discount</option>
          </select>
        </div>
        
        {/* Mobile: Swipeable Cards */}
        {isMobile ? (
          <SwipeableDeals deals={deals} />
        ) : (
          /* Desktop: Grid Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deals.map((tv) => (
              <TVDealCard key={tv.id} tv={tv} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}