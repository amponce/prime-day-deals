#!/usr/bin/env tsx
import { fetchAmazonTVDeals, updateTVDeals } from '../lib/amazon-scraper';
import { tvDeals } from '../lib/data';
import fs from 'fs/promises';
import path from 'path';

async function main() {
  console.log('🔍 Fetching real Amazon TV deals...');
  
  try {
    // Option 1: Fetch completely fresh deals
    if (process.argv.includes('--fresh')) {
      const freshDeals = await fetchAmazonTVDeals();
      console.log(`✅ Fetched ${freshDeals.length} TV deals from Amazon`);
      
      // Save to a JSON file for inspection
      await fs.writeFile(
        path.join(process.cwd(), 'fresh-deals.json'),
        JSON.stringify(freshDeals, null, 2)
      );
      console.log('📝 Saved fresh deals to fresh-deals.json');
      
      // Generate TypeScript code to replace in data.ts
      const tsCode = generateTypeScriptCode(freshDeals);
      await fs.writeFile(
        path.join(process.cwd(), 'updated-tv-deals.ts'),
        tsCode
      );
      console.log('📝 Generated TypeScript code in updated-tv-deals.ts');
    }
    
    // Option 2: Update existing deals with fresh prices
    else {
      const updatedDeals = await updateTVDeals(tvDeals);
      console.log(`✅ Updated ${updatedDeals.length} TV deals`);
      
      // Save updated deals
      const tsCode = generateTypeScriptCode(updatedDeals);
      await fs.writeFile(
        path.join(process.cwd(), 'updated-tv-deals.ts'),
        tsCode
      );
      console.log('📝 Generated updated TypeScript code in updated-tv-deals.ts');
    }
    
  } catch (error) {
    console.error('❌ Error fetching deals:', error);
    
    // Provide helpful error messages
    if (error.message.includes('RAINFOREST_API_KEY')) {
      console.log('\n⚠️  To use the Rainforest API:');
      console.log('1. Sign up at https://www.rainforestapi.com/');
      console.log('2. Add your API key to .env: RAINFOREST_API_KEY=your_key_here');
      console.log('3. Run this script again\n');
    }
  }
}

function generateTypeScriptCode(deals: any[]): string {
  const dealsCode = deals.map(deal => {
    return `  {
    id: '${deal.id}',
    name: '${deal.name.replace(/'/g, "\\'")}',
    brand: '${deal.brand}',
    model: '${deal.model}',
    size: ${deal.size},
    technology: '${deal.technology}',
    currentPrice: ${deal.currentPrice},
    originalPrice: ${deal.originalPrice},
    discount: ${deal.discount},
    rating: ${deal.rating},${deal.reviewCount ? `
    reviewCount: ${deal.reviewCount},` : ''}
    features: [${deal.features.map(f => `'${f}'`).join(', ')}],
    dealRating: '${deal.dealRating}',
    highlights: [${deal.highlights.map(h => `'${h.replace(/'/g, "\\'")}'`).join(', ')}],
    affiliateUrl: \`${deal.affiliateUrl}\`,${deal.imageUrl ? `
    imageUrl: '${deal.imageUrl}',` : ''}
  }`;
  }).join(',\n');

  return `import { TV } from '@/types';

// Replace 'YOUR-AFFILIATE-TAG' with your actual Amazon Associates tag
const AFFILIATE_TAG = 'YOUR-AFFILIATE-TAG';

// Real Amazon TV deals - Last updated: ${new Date().toISOString()}
export const tvDeals: TV[] = [
${dealsCode}
];
`;
}

// Run the script
main().catch(console.error);