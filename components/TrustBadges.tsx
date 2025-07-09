'use client';

import { ShieldCheckIcon, TruckIcon, LockClosedIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export default function TrustBadges() {
  const badges = [
    {
      icon: <ShieldCheckIcon className="w-6 h-6" />,
      title: 'Price Match Promise',
      description: 'We verify the lowest prices'
    },
    {
      icon: <TruckIcon className="w-6 h-6" />,
      title: 'Fast & Free Shipping',
      description: 'Prime delivery included'
    },
    {
      icon: <LockClosedIcon className="w-6 h-6" />,
      title: 'Buyer Protection',
      description: "Amazon's A-to-Z Guarantee"
    },
    {
      icon: <ChartBarIcon className="w-6 h-6" />,
      title: 'Expert Reviews',
      description: 'Unbiased recommendations'
    }
  ];

  return (
    <section className="bg-bg-light dark:bg-dark-surface py-8 border-b border-border-light dark:border-dark-border">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white dark:bg-dark-surface-2 rounded-full flex items-center justify-center text-primary dark:text-primary shadow-sm">
                {badge.icon}
              </div>
              <div>
                <h3 className="font-semibold text-text-dark dark:text-white">{badge.title}</h3>
                <p className="text-sm text-text-gray dark:text-dark-text-secondary">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}