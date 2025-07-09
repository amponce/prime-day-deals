'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState('48H 00M');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const endTime = new Date(now.getTime() + 48 * 60 * 60 * 1000);
      const diff = endTime.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${hours}H ${minutes}M`);
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-secondary to-gray-800 text-white py-16 md:py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1717295248380-9b10f252dbcb?q=80&w=3628&auto=format&fit=crop" 
          alt="Modern living room with TV"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/80 to-gray-800/90" />
      </div>
      <div className="container-custom text-center relative z-10">
        <div className="inline-flex items-center bg-primary px-6 py-3 rounded-md mb-8">
          <span className="text-sm font-bold uppercase tracking-wider">🔥 PRIME DAY DEALS LIVE NOW - LIMITED TIME</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Massive TV Deals
        </h1>
        
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
          Live price tracking • Updated every 5 minutes
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/deals" className="bg-primary hover:bg-primary-dark text-white font-semibold py-4 px-8 rounded-md text-lg transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg">
            View All Deals →
          </Link>
        </div>
        
      </div>
    </section>
  );
}