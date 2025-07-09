'use client';

import { useState } from 'react';

export default function DealFilters() {
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const technologies = ['OLED', 'QLED', 'Mini-LED', 'LED', 'QD-OLED'];
  const sizes = ['43"', '48"', '50"', '55"', '65"', '75"', '77"', '85"', '98"'];

  return (
    <div className="bg-white dark:bg-dark-surface rounded-xl shadow-md dark:shadow-none dark:border dark:border-dark-border p-6">
      <h3 className="text-xl font-bold mb-6">Filter Deals</h3>
      
      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Price Range</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
          <input
            type="range"
            min="0"
            max="5000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full"
          />
        </div>
      </div>
      
      {/* Technology */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Technology</h4>
        <div className="space-y-2">
          {technologies.map((tech) => (
            <label key={tech} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedTech.includes(tech)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedTech([...selectedTech, tech]);
                  } else {
                    setSelectedTech(selectedTech.filter(t => t !== tech));
                  }
                }}
                className="mr-2"
              />
              {tech}
            </label>
          ))}
        </div>
      </div>
      
      {/* Screen Size */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Screen Size</h4>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => {
                if (selectedSizes.includes(size)) {
                  setSelectedSizes(selectedSizes.filter(s => s !== size));
                } else {
                  setSelectedSizes([...selectedSizes, size]);
                }
              }}
              className={`py-1 px-2 text-sm rounded border transition-colors ${
                selectedSizes.includes(size)
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white dark:bg-dark-surface-2 text-gray-700 dark:text-dark-text border-gray-300 dark:border-dark-border hover:border-primary dark:hover:border-red-500'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      
      {/* Clear Filters */}
      <button
        onClick={() => {
          setPriceRange([0, 5000]);
          setSelectedTech([]);
          setSelectedSizes([]);
        }}
        className="w-full py-2 text-center text-primary dark:text-red-500 font-semibold hover:underline"
      >
        Clear All Filters
      </button>
    </div>
  );
}