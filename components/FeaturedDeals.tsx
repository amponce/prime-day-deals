import { tvDeals } from '@/lib/data';
import TVDealCard from './TVDealCard';
import Link from 'next/link';

export default function FeaturedDeals() {
  const featuredDeals = tvDeals.slice(0, 6);

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-text-dark dark:text-white">Hottest TV Deals Right Now</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">Hand-picked deals with the biggest savings</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDeals.map((tv) => (
            <TVDealCard key={tv.id} tv={tv} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/deals" className="btn-primary">
            View All TV Deals →
          </Link>
        </div>
      </div>
    </section>
  );
}