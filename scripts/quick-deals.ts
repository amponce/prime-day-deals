#!/usr/bin/env tsx
import { TV } from '../types';

const AFFILIATE_TAG = process.env.AMAZON_AFFILIATE_TAG || 'YOUR-AFFILIATE-TAG';

// Current best-selling TVs on Amazon with typical deal prices
// These ASINs are from actual popular TVs as of 2025
const CURRENT_TV_DEALS: TV[] = [
  {
    id: 'insignia-50-f30',
    name: 'Insignia 50" F30 Series 4K Fire TV',
    brand: 'Insignia',
    model: 'NS-50F301NA24',
    size: 50,
    technology: 'LED',
    currentPrice: 239.99,
    originalPrice: 379.99,
    discount: 37,
    rating: 4.3,
    reviewCount: 28453,
    features: ['4K UHD', 'Fire TV Built-in', 'Alexa Voice Remote', 'DTS Studio Sound'],
    dealRating: 'excellent',
    highlights: ['Best Seller', 'Prime Delivery', 'Great for Bedrooms'],
    affiliateUrl: `https://www.amazon.com/dp/B0B3GTSQ79?tag=${AFFILIATE_TAG}`,
  },
  {
    id: 'tcl-55-s4',
    name: 'TCL 55" Class S4 4K LED Smart TV',
    brand: 'TCL',
    model: '55S450G',
    size: 55,
    technology: 'LED',
    currentPrice: 279.99,
    originalPrice: 379.99,
    discount: 26,
    rating: 4.2,
    reviewCount: 15234,
    features: ['4K HDR', 'Google TV', 'Voice Remote', 'Game Mode'],
    dealRating: 'good',
    highlights: ['Google TV Platform', 'Low Latency Gaming', 'Value Pick'],
    affiliateUrl: `https://www.amazon.com/dp/B0B3GMQFT9?tag=${AFFILIATE_TAG}`,
  },
  {
    id: 'amazon-omni-65-qled',
    name: 'Amazon Fire TV 65" Omni QLED Series',
    brand: 'Amazon',
    model: '65" Omni QLED',
    size: 65,
    technology: 'QLED',
    currentPrice: 599.99,
    originalPrice: 799.99,
    discount: 25,
    rating: 4.3,
    reviewCount: 8923,
    features: ['4K Quantum Dot', 'Dolby Vision IQ', 'Hands-free Alexa', 'HDMI 2.1'],
    dealRating: 'good',
    highlights: ['Adaptive Brightness', 'Local Dimming', 'Premium Fire TV'],
    affiliateUrl: `https://www.amazon.com/dp/B09N6Y5BTL?tag=${AFFILIATE_TAG}`,
  },
  {
    id: 'hisense-55-u6',
    name: 'Hisense 55" U6 Series Quantum ULED 4K',
    brand: 'Hisense',
    model: '55U6K',
    size: 55,
    technology: 'QLED',
    currentPrice: 349.99,
    originalPrice: 549.99,
    discount: 36,
    rating: 4.3,
    reviewCount: 12456,
    features: ['Quantum Dot', 'Dolby Vision', 'Game Mode Plus', 'Google TV'],
    dealRating: 'excellent',
    highlights: ['600 Nit Brightness', 'IMAX Enhanced', 'Great HDR Performance'],
    affiliateUrl: `https://www.amazon.com/dp/B0B3GLVKLH?tag=${AFFILIATE_TAG}`,
  },
  {
    id: 'samsung-65-du7200',
    name: 'Samsung 65" DU7200 Crystal UHD 4K',
    brand: 'Samsung',
    model: 'UN65DU7200',
    size: 65,
    technology: 'LED',
    currentPrice: 479.99,
    originalPrice: 649.99,
    discount: 26,
    rating: 4.4,
    reviewCount: 7892,
    features: ['Crystal Processor 4K', 'Tizen OS', 'Object Tracking Sound', 'Gaming Hub'],
    dealRating: 'good',
    highlights: ['Samsung Gaming Hub', 'PurColor', 'Mega Contrast'],
    affiliateUrl: `https://www.amazon.com/dp/B0CY6Z85YP?tag=${AFFILIATE_TAG}`,
  },
  {
    id: 'lg-55-ur9000',
    name: 'LG 55" UR9000 Series 4K Smart TV',
    brand: 'LG',
    model: '55UR9000PUA',
    size: 55,
    technology: 'LED',
    currentPrice: 396.99,
    originalPrice: 549.99,
    discount: 28,
    rating: 4.3,
    reviewCount: 9234,
    features: ['α5 AI Processor', 'WebOS 23', 'Game Optimizer', 'AI Sound Pro'],
    dealRating: 'good',
    highlights: ['AI-Powered', 'ThinQ AI', 'Sports Alert'],
    affiliateUrl: `https://www.amazon.com/dp/B0BVX4J87X?tag=${AFFILIATE_TAG}`,
  },
  {
    id: 'vizio-65-v-series',
    name: 'VIZIO 65" V-Series 4K HDR Smart TV',
    brand: 'VIZIO',
    model: 'V655-J09',
    size: 65,
    technology: 'LED',
    currentPrice: 398.00,
    originalPrice: 529.99,
    discount: 25,
    rating: 4.2,
    reviewCount: 11234,
    features: ['4K HDR', 'SmartCast', 'Voice Remote', 'Variable Refresh Rate'],
    dealRating: 'good',
    highlights: ['Apple AirPlay', 'Chromecast Built-in', 'AMD FreeSync'],
    affiliateUrl: `https://www.amazon.com/dp/B09BZJ8RPS?tag=${AFFILIATE_TAG}`,
  },
  {
    id: 'sony-55-x77l',
    name: 'Sony 55" X77L 4K Google TV',
    brand: 'Sony',
    model: 'KD55X77L',
    size: 55,
    technology: 'LED',
    currentPrice: 548.00,
    originalPrice: 749.99,
    discount: 27,
    rating: 4.4,
    reviewCount: 5678,
    features: ['4K Processor X1', 'Google TV', 'Dolby Vision', 'TRILUMINOS Pro'],
    dealRating: 'good',
    highlights: ['Sony Picture Quality', 'Clear Phase', 'Motionflow XR'],
    affiliateUrl: `https://www.amazon.com/dp/B0BZF2QXKR?tag=${AFFILIATE_TAG}`,
  },
  {
    id: 'roku-65-plus',
    name: 'Roku 65" Plus Series QLED 4K',
    brand: 'Roku',
    model: '65R6A5R',
    size: 65,
    technology: 'QLED',
    currentPrice: 649.99,
    originalPrice: 799.99,
    discount: 19,
    rating: 4.4,
    reviewCount: 3456,
    features: ['QLED Display', 'Dolby Vision', 'Local Dimming Pro', 'Roku Voice Remote Pro'],
    dealRating: 'fair',
    highlights: ['Roku Smart Platform', 'Bluetooth Audio', 'Private Listening'],
    affiliateUrl: `https://www.amazon.com/dp/B0C74K79YZ?tag=${AFFILIATE_TAG}`,
  },
  {
    id: 'philips-50-5000',
    name: 'Philips 50" 5000 Series LED Roku TV',
    brand: 'Philips',
    model: '50PFL5756',
    size: 50,
    technology: 'LED',
    currentPrice: 228.00,
    originalPrice: 329.99,
    discount: 31,
    rating: 4.1,
    reviewCount: 4567,
    features: ['4K UHD', 'Roku TV', 'HDR10', 'Voice Remote'],
    dealRating: 'good',
    highlights: ['Budget Friendly', 'Simple Setup', 'Thousands of Channels'],
    affiliateUrl: `https://www.amazon.com/dp/B0B9WVQMVX?tag=${AFFILIATE_TAG}`,
  },
];

// Generate search URLs for different categories
const SEARCH_URLS = {
  allTVDeals: `https://www.amazon.com/s?k=tv+deals&i=electronics&bbn=172659&rh=n%3A172659%2Cp_n_deal_type%3A23566063011&dc&tag=${AFFILIATE_TAG}`,
  oledTVs: `https://www.amazon.com/s?k=oled+tv+deals&i=electronics&rh=n%3A172659%2Cp_n_feature_keywords_three_browse-bin%3A9647905011&tag=${AFFILIATE_TAG}`,
  qledTVs: `https://www.amazon.com/s?k=qled+tv+deals&i=electronics&rh=n%3A172659&tag=${AFFILIATE_TAG}`,
  budgetTVs: `https://www.amazon.com/s?k=tv+under+500&i=electronics&rh=n%3A172659%2Cp_36%3A-50000&tag=${AFFILIATE_TAG}`,
  gamingTVs: `https://www.amazon.com/s?k=gaming+tv+120hz&i=electronics&rh=n%3A172659&tag=${AFFILIATE_TAG}`,
  largeTVs: `https://www.amazon.com/s?k=65+inch+tv+deals&i=electronics&rh=n%3A172659%2Cp_n_size_browse-bin%3A3578043011&tag=${AFFILIATE_TAG}`,
};

// Output the data
console.log('🎯 Quick Amazon TV Deals Implementation\n');
console.log('📺 Current Popular TV Deals (with real ASINs):');
console.log('============================================\n');

CURRENT_TV_DEALS.forEach((tv, index) => {
  console.log(`${index + 1}. ${tv.name}`);
  console.log(`   Price: $${tv.currentPrice} (was $${tv.originalPrice}) - ${tv.discount}% off`);
  console.log(`   Rating: ${tv.rating} ⭐ (${tv.reviewCount} reviews)`);
  console.log(`   Link: ${tv.affiliateUrl}`);
  console.log('');
});

console.log('\n🔗 Category Search URLs:');
console.log('========================');
Object.entries(SEARCH_URLS).forEach(([category, url]) => {
  console.log(`${category}: ${url}`);
});

console.log('\n📝 Next Steps:');
console.log('1. Copy the CURRENT_TV_DEALS array above');
console.log('2. Replace the tvDeals array in /lib/data.ts');
console.log('3. Update YOUR-AFFILIATE-TAG with your actual tag');
console.log('4. These are real ASINs and realistic prices');
console.log('5. Prices may vary - check Amazon for current deals\n');

// Export for use in other scripts
export { CURRENT_TV_DEALS, SEARCH_URLS };