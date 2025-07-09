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
    <section className="bg-gradient-to-br from-primary to-red-700 dark:from-red-800 dark:to-red-950 text-white py-12 md:py-20">
      <div className="container-custom text-center">
        <div className="inline-block bg-black/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
          <span className="font-semibold">⏰ DEALS END IN: {timeLeft}</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Epic TV Deals for Prime Day
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
          Save up to 60% on premium OLED, QLED, and Mini-LED TVs from top brands.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/deals" className="btn-primary bg-white dark:bg-dark-surface text-primary dark:text-red-500 hover:bg-gray-100 dark:hover:bg-dark-surface-2">
            Browse TV Deals →
          </Link>
          <Link href="/guide" className="btn-secondary bg-transparent border-2 border-white hover:bg-white dark:hover:bg-dark-surface hover:text-primary dark:hover:text-white">
            TV Buying Guide →
          </Link>
        </div>
        
        <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div>
            <div className="text-3xl font-bold">12+</div>
            <div className="opacity-80">TV Deals</div>
          </div>
          <div>
            <div className="text-3xl font-bold">5</div>
            <div className="opacity-80">Technologies</div>
          </div>
          <div>
            <div className="text-3xl font-bold">60%</div>
            <div className="opacity-80">Max Savings</div>
          </div>
        </div>
      </div>
    </section>
  );
}