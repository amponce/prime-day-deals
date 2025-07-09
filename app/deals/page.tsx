import { tvDeals } from '@/lib/data';
import ClientDeals from './ClientDeals';

export const metadata = {
  title: 'All TV Deals | Best Prices on OLED, QLED & More',
  description: 'Browse all TV deals with up to 60% off. Filter by technology, size, and price to find your perfect TV.',
};

export default function DealsPage() {
  return (
    <div className="py-8">
      <div className="container-custom">
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-4xl font-bold mb-4">All TV Deals</h1>
          <p className="text-xl text-gray-600 dark:text-dark-text-secondary">
            Find your perfect TV from our curated selection
          </p>
        </div>
        
        <ClientDeals initialDeals={tvDeals} />
      </div>
    </div>
  );
}