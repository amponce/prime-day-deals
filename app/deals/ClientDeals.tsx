'use client';

import { useState, useEffect, useMemo } from 'react';
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
  const [sortBy, setSortBy] = useState('best');
  
  // Filter states
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter and sort deals
  const filteredDeals = useMemo(() => {
    let filtered = deals.filter(tv => {
      // Price filter
      if (tv.currentPrice < priceRange[0] || tv.currentPrice > priceRange[1]) {
        return false;
      }
      
      // Technology filter
      if (selectedTech.length > 0 && !selectedTech.includes(tv.technology)) {
        return false;
      }
      
      // Size filter
      if (selectedSizes.length > 0 && !selectedSizes.includes(tv.size)) {
        return false;
      }
      
      return true;
    });

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.currentPrice - b.currentPrice);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.currentPrice - a.currentPrice);
        break;
      case 'discount':
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      default:
        // Best deals (combination of discount and rating)
        filtered.sort((a, b) => (b.discount * b.rating) - (a.discount * a.rating));
    }

    return filtered;
  }, [deals, priceRange, selectedTech, selectedSizes, sortBy]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Filters Sidebar */}
      <div className="lg:col-span-1">
        <DealFilters 
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedTech={selectedTech}
          setSelectedTech={setSelectedTech}
          selectedSizes={selectedSizes}
          setSelectedSizes={setSelectedSizes}
        />
      </div>
      
      {/* Deals Grid/Swipeable */}
      <div className="lg:col-span-3">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-gray-600 dark:text-dark-text-secondary">
            Showing {filteredDeals.length} of {deals.length} deals
          </p>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border dark:border-dark-border dark:bg-dark-surface rounded-lg px-4 py-2 text-sm sm:text-base"
          >
            <option value="best">Sort by: Best Deals</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="discount">Biggest Discount</option>
          </select>
        </div>
        
        {/* No results message */}
        {filteredDeals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-dark-text-secondary mb-4">
              No deals match your filters
            </p>
            <button
              onClick={() => {
                setPriceRange([0, 5000]);
                setSelectedTech([]);
                setSelectedSizes([]);
              }}
              className="text-primary dark:text-red-500 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            {/* Mobile: Swipeable Cards */}
            {isMobile ? (
              <SwipeableDeals deals={filteredDeals} />
            ) : (
              /* Desktop: Grid Layout */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDeals.map((tv) => (
                  <TVDealCard key={tv.id} tv={tv} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}