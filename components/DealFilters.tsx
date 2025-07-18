'use client';

interface DealFiltersProps {
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  selectedTech: string[];
  setSelectedTech: (tech: string[]) => void;
  selectedSizes: number[];
  setSelectedSizes: (sizes: number[]) => void;
}

export default function DealFilters({
  priceRange,
  setPriceRange,
  selectedTech,
  setSelectedTech,
  selectedSizes,
  setSelectedSizes
}: DealFiltersProps) {

  const technologies = ['OLED', 'QLED', 'Mini-LED', 'LED', 'QD-OLED'];
  const sizes = [40, 43, 48, 50, 55, 65, 70, 75, 77, 85, 98];

  return (
    <div className="bg-white dark:bg-dark-surface rounded-xl shadow-md dark:shadow-none dark:border dark:border-dark-border p-6">
      <h3 className="text-xl font-bold mb-6 text-text-dark dark:text-white">Filter Deals</h3>
      
      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3 text-text-dark dark:text-white">Price Range</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-text-gray dark:text-dark-text-secondary">
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
        <h4 className="font-semibold mb-3 text-text-dark dark:text-white">Technology</h4>
        <div className="space-y-2">
          {technologies.map((tech) => (
            <label key={tech} className="flex items-center text-text-dark dark:text-white cursor-pointer">
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
        <h4 className="font-semibold mb-3 text-text-dark dark:text-white">Screen Size</h4>
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
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-red-500'
              }`}
            >
              {size}"
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