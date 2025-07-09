import { tvDeals } from '@/lib/data';
import TVDealCard from '@/components/TVDealCard';
import DealFilters from '@/components/DealFilters';

export const metadata = {
  title: 'All TV Deals | Best Prices on OLED, QLED & More',
  description: 'Browse all TV deals with up to 60% off. Filter by technology, size, and price to find your perfect TV.',
};

export default function DealsPage() {
  return (
    <div className="py-8">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">All TV Deals</h1>
          <p className="text-xl text-gray-600">Find your perfect TV from our curated selection</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <DealFilters />
          </div>
          
          {/* Deals Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">Showing {tvDeals.length} deals</p>
              <select className="border rounded-lg px-4 py-2">
                <option>Sort by: Best Deals</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Biggest Discount</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tvDeals.map((tv) => (
                <TVDealCard key={tv.id} tv={tv} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}