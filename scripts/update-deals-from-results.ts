#!/usr/bin/env tsx
import fs from 'fs/promises';
import path from 'path';
import { TV } from '../types';

// Streamlined script to update TV deals from results.md
async function updateDealsFromResults() {
  console.log('📋 Processing TV deals from results.md...\n');
  
  try {
    // Read the results file
    const resultsPath = path.join(process.cwd(), 'results/results.md');
    const resultsContent = await fs.readFile(resultsPath, 'utf-8');
    
    // Extract JSON data from the markdown
    // Find the JSON array that starts with [ and ends with ]
    const jsonMatch = resultsContent.match(/\[\s*\{[\s\S]*\}\s*\]/);
    if (!jsonMatch) {
      throw new Error('Could not find JSON data in results.md');
    }
    
    // Parse the JSON data
    const deals = JSON.parse(jsonMatch[0]);
    console.log(`✅ Found ${deals.length} TV deals in results.md`);
    
    // Convert to our TV interface
    const tvDeals: TV[] = deals
      .filter((deal: any) => deal.currentPrice && deal.size)
      .slice(0, 15) // Limit to 15 deals
      .map((deal: any, index: number) => {
        // Determine deal rating
        let dealRating: 'excellent' | 'good' | 'fair' = 'fair';
        if (deal.discount >= 30) dealRating = 'excellent';
        else if (deal.discount >= 20) dealRating = 'good';
        
        // Create highlights
        const highlights: string[] = [];
        if (deal.dealBadge) highlights.push(deal.dealBadge);
        if (deal.discount > 0) highlights.push(`Save ${deal.discount}%`);
        if (deal.size >= 65) highlights.push('Large Screen');
        if (deal.technology === 'OLED' || deal.technology === 'QD-OLED') highlights.push('Premium Display');
        if (deal.technology === 'Mini-LED' || deal.technology === 'QLED') highlights.push('Quantum Colors');
        if (deal.features.includes('120Hz') || deal.features.includes('144Hz')) highlights.push('Gaming Ready');
        
        // Ensure we have at least 2 highlights
        if (highlights.length === 0) highlights.push('Great Value', 'Free Shipping');
        if (highlights.length === 1) highlights.push('Popular Choice');
        
        return {
          id: `${deal.brand.toLowerCase().replace(/\s+/g, '-')}-${deal.asin}`,
          name: deal.title.length > 60 ? deal.title.substring(0, 57) + '...' : deal.title,
          brand: deal.brand,
          model: deal.asin, // Using ASIN as model since it's not in the data
          size: deal.size,
          technology: deal.technology as TV['technology'],
          currentPrice: deal.currentPrice,
          originalPrice: deal.originalPrice || deal.currentPrice * 1.4,
          discount: deal.discount || 0,
          rating: deal.rating || 4.0,
          reviewCount: deal.reviewCount || undefined,
          features: deal.features.slice(0, 4),
          dealRating,
          highlights: highlights.slice(0, 4),
          affiliateUrl: deal.affiliateUrl,
          imageUrl: deal.imageUrl || undefined,
        };
      });
    
    // Generate TypeScript code
    const tsCode = `import { TV } from '@/types';

// Amazon TV Deals - Updated ${new Date().toLocaleDateString()}
// Generated from scraped Amazon data
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
    
    // Update lib/data.ts directly
    const dataPath = path.join(process.cwd(), 'lib/data.ts');
    const dataContent = await fs.readFile(dataPath, 'utf-8');
    
    // Find where tvDeals starts and ends
    const tvDealsStart = dataContent.indexOf('export const tvDeals: TV[] = [');
    const tvDealsEnd = dataContent.indexOf('];', tvDealsStart) + 2;
    
    if (tvDealsStart === -1) {
      throw new Error('Could not find tvDeals array in lib/data.ts');
    }
    
    // Replace the tvDeals section
    const newDataContent = 
      dataContent.substring(0, tvDealsStart) +
      tsCode.substring(tsCode.indexOf('export const tvDeals')) +
      dataContent.substring(tvDealsEnd);
    
    // Write back to file
    await fs.writeFile(dataPath, newDataContent);
    console.log('✅ Updated lib/data.ts with new TV deals');
    
    // Also save a backup
    await fs.writeFile('lib/data.ts.backup', dataContent);
    console.log('📁 Saved backup to lib/data.ts.backup');
    
    // Show summary
    console.log('\n📊 Summary:');
    console.log(`- Total deals updated: ${tvDeals.length}`);
    console.log(`- Brands: ${[...new Set(tvDeals.map(tv => tv.brand))].join(', ')}`);
    console.log(`- Price range: $${Math.min(...tvDeals.map(tv => tv.currentPrice))} - $${Math.max(...tvDeals.map(tv => tv.currentPrice))}`);
    console.log(`- Average discount: ${Math.round(tvDeals.reduce((sum, tv) => sum + tv.discount, 0) / tvDeals.length)}%`);
    
    // Show top deals
    console.log('\n🔥 Top 5 Deals by Discount:');
    tvDeals
      .sort((a, b) => b.discount - a.discount)
      .slice(0, 5)
      .forEach((tv, i) => {
        console.log(`${i + 1}. ${tv.name} - ${tv.discount}% off ($${tv.currentPrice})`);
      });
    
    console.log('\n✅ Done! Your TV deals are now updated.');
    console.log('🚀 Run `npm run dev` to see the changes');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\nTroubleshooting:');
    console.log('1. Make sure results/results.md exists');
    console.log('2. Ensure the JSON data is properly formatted');
    console.log('3. Check that lib/data.ts has the tvDeals array');
  }
}

// Run the update
updateDealsFromResults();