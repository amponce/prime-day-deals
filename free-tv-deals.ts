import { TV } from '@/types';

// Free Amazon TV Deal Solution
// Uses category links that always show current deals
// No API required, always up-to-date

const AFFILIATE_TAG = 'YOUR-AFFILIATE-TAG';

// Category-based deals that link to live Amazon searches
export const tvDeals: TV[] = [
  {
    id: 'category-oled',
    name: 'Best OLED TV Deals Today',
    brand: 'Multiple',
    model: 'Various',
    size: 55,
    technology: 'OLED',
    currentPrice: 999, // Approximate starting price
    originalPrice: 1499,
    discount: 33,
    rating: 4.5,
    features: ["Perfect Blacks","Infinite Contrast","4K HDR","Smart TV"],
    dealRating: 'excellent',
    highlights: ["Updated Daily","Multiple Brands","Best Prices"],
    affiliateUrl: 'https://www.amazon.com/s?k=OLED+TV&i=electronics&bbn=172659&rh=n%3A172659%2Cp_36%3A50000-300000&s=review-rank&tag=YOUR-AFFILIATE-TAG',
  },
  {
    id: 'category-budget',
    name: 'Top Budget 4K TV Deals',
    brand: 'Multiple',
    model: 'Various',
    size: 50,
    technology: 'LED',
    currentPrice: 299, // Approximate starting price
    originalPrice: 499,
    discount: 40,
    rating: 4.2,
    features: ["4K Resolution","Smart TV","HDR Support","Great Value"],
    dealRating: 'excellent',
    highlights: ["Under $500","Free Shipping","Top Rated"],
    affiliateUrl: 'https://www.amazon.com/s?k=4K+TV&i=electronics&bbn=172659&rh=n%3A172659%2Cp_36%3A15000-50000&s=review-rank&tag=YOUR-AFFILIATE-TAG',
  },
  {
    id: 'category-large',
    name: 'Best 65"+ TV Deals',
    brand: 'Multiple',
    model: 'Various',
    size: 65,
    technology: 'QLED',
    currentPrice: 599, // Approximate starting price
    originalPrice: 999,
    discount: 40,
    rating: 4.4,
    features: ["Large Screen","Quantum Dot","4K HDR","Premium Features"],
    dealRating: 'excellent',
    highlights: ["Big Screen Experience","Theater Quality","Smart Features"],
    affiliateUrl: 'https://www.amazon.com/s?k=65+inch+TV&i=electronics&bbn=172659&rh=n%3A172659%2Cp_36%3A40000-200000&s=review-rank&tag=YOUR-AFFILIATE-TAG',
  }
];

// Direct category links for "See More Deals" sections
export const categoryLinks = [
  {
    "name": "OLED TV Deals",
    "url": "https://www.amazon.com/s?k=OLED+TV&i=electronics&bbn=172659&rh=n%3A172659%2Cp_36%3A50000-300000&s=review-rank&tag=YOUR-AFFILIATE-TAG",
    "description": "Shop OLED TV deals from $500 to $3000"
  },
  {
    "name": "Budget TV Deals",
    "url": "https://www.amazon.com/s?k=4K+TV&i=electronics&bbn=172659&rh=n%3A172659%2Cp_36%3A15000-50000&s=review-rank&tag=YOUR-AFFILIATE-TAG",
    "description": "Shop 4K TV deals from $150 to $500"
  },
  {
    "name": "Large TV Deals",
    "url": "https://www.amazon.com/s?k=65+inch+TV&i=electronics&bbn=172659&rh=n%3A172659%2Cp_36%3A40000-200000&s=review-rank&tag=YOUR-AFFILIATE-TAG",
    "description": "Shop 65 inch TV deals from $400 to $2000"
  },
  {
    "name": "Gaming TV Deals",
    "url": "https://www.amazon.com/s?k=120hz+gaming+TV&i=electronics&bbn=172659&rh=n%3A172659%2Cp_36%3A30000-200000&s=review-rank&tag=YOUR-AFFILIATE-TAG",
    "description": "Shop 120hz gaming TV deals from $300 to $2000"
  },
  {
    "name": "QLED TV Deals",
    "url": "https://www.amazon.com/s?k=QLED+TV&i=electronics&bbn=172659&rh=n%3A172659%2Cp_36%3A30000-150000&s=review-rank&tag=YOUR-AFFILIATE-TAG",
    "description": "Shop QLED TV deals from $300 to $1500"
  }
];

// Recent deals found on Reddit (if any)
export const communityDeals = [
  {
    "asin": "B00PCW6TZG",
    "title": "Here are some (Real) early Black Friday Deals.",
    "url": "https://www.reddit.com/r/deals/comments/2n5wud/here_are_some_real_early_black_friday_deals/",
    "score": 18,
    "created": "2014-11-23T13:13:45.000Z"
  }
];
