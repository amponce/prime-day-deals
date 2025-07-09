#!/usr/bin/env tsx
import fs from 'fs/promises';
import path from 'path';
import { TV } from '../types';

interface AmazonDeal {
  asin: string;
  title: string;
  brand: string | null;
  model: string | null;
  size: number | null;
  technology: string;
  description: string;
  currentPrice: number | null;
  originalPrice: number | null;
  discount: number;
  discountAmount: number;
  currency: string;
  rating: number | null;
  reviewCount: number | null;
  imageUrl: string;
  thumbnailUrl: string | null;
  largeImageUrl: string | null;
  features: string[];
  dealBadge: string | null;
  coupon: string | null;
  isPrime: boolean;
  isBestSeller: boolean;
  shipping: string | null;
  stockStatus: string;
  productUrl: string;
  affiliateUrl: string;
  scrapedAt: string;
  source: string;
}

interface AmazonJSON {
  metadata: {
    source: string;
    url: string;
    scrapedAt: string;
    totalProducts: number;
  };
  deals: AmazonDeal[];
}

async function processAmazonJSON(filename: string) {
  console.log('📄 Processing Amazon JSON file...\n');
  
  try {
    // Read the JSON file
    const jsonPath = path.join(process.cwd(), filename);
    const jsonData = await fs.readFile(jsonPath, 'utf-8');
    const data: AmazonJSON = JSON.parse(jsonData);
    
    console.log(`✅ Loaded ${data.deals.length} deals from ${filename}`);
    console.log(`📅 Scraped at: ${data.metadata.scrapedAt}\n`);
    
    // Convert to our TV interface
    const tvDeals: TV[] = data.deals
      .filter(deal => deal.currentPrice && deal.size) // Only deals with price and size
      .map((deal, index) => {
        // Determine deal rating based on discount
        let dealRating: 'excellent' | 'good' | 'fair' = 'fair';
        if (deal.discount >= 30) dealRating = 'excellent';
        else if (deal.discount >= 20) dealRating = 'good';
        
        // Create highlights
        const highlights: string[] = [];
        if (deal.dealBadge) highlights.push(deal.dealBadge);
        if (deal.discount > 0) highlights.push(`Save ${deal.discount}%`);
        if (deal.isBestSeller) highlights.push('Best Seller');
        if (deal.isPrime) highlights.push('Prime Delivery');
        if (deal.coupon) highlights.push(deal.coupon);
        if (deal.size && deal.size >= 65) highlights.push('Large Screen');
        if (deal.technology === 'OLED' || deal.technology === 'QD-OLED') highlights.push('Premium Display');
        
        // Ensure we have at least 2 highlights
        if (highlights.length === 0) highlights.push('Great Value', 'Free Shipping');
        if (highlights.length === 1) highlights.push('Popular Choice');
        
        return {
          id: deal.brand ? `${deal.brand.toLowerCase()}-${deal.asin}` : `tv-${deal.asin}`,
          name: deal.title.length > 60 ? deal.title.substring(0, 57) + '...' : deal.title,
          brand: deal.brand || 'Unknown',
          model: deal.model || deal.asin,
          size: deal.size || 55,
          technology: deal.technology as TV['technology'],
          currentPrice: deal.currentPrice || 999,
          originalPrice: deal.originalPrice || deal.currentPrice || 1499,
          discount: deal.discount || 0,
          rating: deal.rating || 4.0,
          reviewCount: deal.reviewCount || undefined,
          features: deal.features.slice(0, 4), // Limit to 4 features
          dealRating,
          highlights: highlights.slice(0, 4), // Limit to 4 highlights
          affiliateUrl: deal.affiliateUrl,
          imageUrl: deal.largeImageUrl || deal.imageUrl || undefined,
        };
      })
      .slice(0, 15); // Limit to 15 deals
    
    // Generate TypeScript code
    const tsCode = `import { TV } from '@/types';

// Amazon TV Deals - Scraped on ${new Date(data.metadata.scrapedAt).toLocaleDateString()}
// Source: ${data.metadata.source}
// Remember to replace YOUR-AFFILIATE-TAG with your actual Amazon Associates tag

const AFFILIATE_TAG = process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG || 'YOUR-AFFILIATE-TAG';

export const tvDeals: TV[] = [
${tvDeals.map(tv => `  {
    id: '${tv.id}',
    name: '${tv.name.replace(/'/g, "\\'")}',
    brand: '${tv.brand}',
    model: '${tv.model}',
    size: ${tv.size},
    technology: '${tv.technology}',
    currentPrice: ${tv.currentPrice},
    originalPrice: ${tv.originalPrice},
    discount: ${tv.discount},
    rating: ${tv.rating},${tv.reviewCount ? `
    reviewCount: ${tv.reviewCount},` : ''}
    features: [${tv.features.map(f => `'${f.replace(/'/g, "\\'")}'`).join(', ')}],
    dealRating: '${tv.dealRating}',
    highlights: [${tv.highlights.map(h => `'${h.replace(/'/g, "\\'")}'`).join(', ')}],
    affiliateUrl: \`${tv.affiliateUrl.replace('YOUR-AFFILIATE-TAG', '${AFFILIATE_TAG}')}\`,${tv.imageUrl ? `
    imageUrl: '${tv.imageUrl}',` : ''}
  }`).join(',\n')}
];`;
    
    // Save TypeScript file
    const outputPath = path.join(process.cwd(), 'amazon-tv-deals.ts');
    await fs.writeFile(outputPath, tsCode);
    console.log(`✅ Generated TypeScript file: amazon-tv-deals.ts`);
    
    // Save a clean JSON version too
    const cleanJSON = {
      lastUpdated: data.metadata.scrapedAt,
      source: data.metadata.source,
      deals: tvDeals
    };
    await fs.writeFile('tv-deals-clean.json', JSON.stringify(cleanJSON, null, 2));
    console.log('✅ Generated clean JSON: tv-deals-clean.json');
    
    // Show summary
    console.log('\n📊 Summary:');
    console.log(`- Total deals processed: ${tvDeals.length}`);
    console.log(`- Brands: ${[...new Set(tvDeals.map(tv => tv.brand))].join(', ')}`);
    console.log(`- Technologies: ${[...new Set(tvDeals.map(tv => tv.technology))].join(', ')}`);
    console.log(`- Price range: $${Math.min(...tvDeals.map(tv => tv.currentPrice))} - $${Math.max(...tvDeals.map(tv => tv.currentPrice))}`);
    console.log(`- Average discount: ${Math.round(tvDeals.reduce((sum, tv) => sum + tv.discount, 0) / tvDeals.length)}%`);
    
    // Show images summary
    const dealsWithImages = tvDeals.filter(tv => tv.imageUrl).length;
    console.log(`\n🖼️ Images: ${dealsWithImages}/${tvDeals.length} deals have images`);
    
    console.log('\n✅ Next steps:');
    console.log('1. Copy the content from amazon-tv-deals.ts');
    console.log('2. Replace the tvDeals array in /lib/data.ts');
    console.log('3. Update YOUR-AFFILIATE-TAG with your actual tag');
    console.log('4. The images will load directly from Amazon CDN');
    
  } catch (error) {
    console.error('❌ Error processing JSON file:', error);
    console.log('\nMake sure:');
    console.log('1. The JSON file exists in the project root');
    console.log('2. The filename is correct');
    console.log('3. The JSON format matches the expected structure');
  }
}

// Check command line arguments
const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('Usage: npm run process-json <filename>');
  console.log('Example: npm run process-json amazon-tv-deals-2025-01-09.json');
  console.log('\nLooking for JSON files in current directory...\n');
  
  // List available JSON files
  const files = await fs.readdir(process.cwd());
  const jsonFiles = files.filter(f => f.startsWith('amazon-tv-deals') && f.endsWith('.json'));
  
  if (jsonFiles.length > 0) {
    console.log('Found JSON files:');
    jsonFiles.forEach(f => console.log(`  - ${f}`));
    console.log('\nRun: npm run process-json <filename>');
  } else {
    console.log('No amazon-tv-deals JSON files found.');
    console.log('First, run the browser console script to extract deals from Amazon.');
  }
} else {
  processAmazonJSON(args[0]);
}