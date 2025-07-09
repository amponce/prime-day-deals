#!/usr/bin/env tsx
import fs from 'fs/promises';
import path from 'path';

// Quick one-command update script
async function quickUpdate() {
  console.log('⚡ Quick TV Deals Update\n');
  
  // Step 1: Check for JSON files
  const files = await fs.readdir(process.cwd());
  const jsonFiles = files.filter(f => f.startsWith('amazon-tv-deals') && f.endsWith('.json'));
  
  let jsonData;
  let source = '';
  
  // Try to find JSON data from various sources
  if (jsonFiles.length > 0) {
    // Use the most recent JSON file
    const latestFile = jsonFiles.sort().reverse()[0];
    console.log(`📁 Found JSON file: ${latestFile}`);
    const content = await fs.readFile(latestFile, 'utf-8');
    jsonData = JSON.parse(content);
    source = latestFile;
  } else {
    // Try results.md
    try {
      const resultsContent = await fs.readFile('results/results.md', 'utf-8');
      const jsonMatch = resultsContent.match(/\[\s*\{[\s\S]*\}\s*\]/);
      if (jsonMatch) {
        jsonData = { deals: JSON.parse(jsonMatch[0]) };
        source = 'results/results.md';
        console.log('📋 Found data in results/results.md');
      }
    } catch (e) {
      // Ignore if results.md doesn't exist
    }
  }
  
  if (!jsonData) {
    console.log('❌ No TV deals data found!\n');
    console.log('To get data:');
    console.log('1. Go to: https://www.amazon.com/s?k=tv+deals&rh=p_n_deal_type%3A23566064011');
    console.log('2. Run the browser console script from: scripts/amazon-to-json-simple.js');
    console.log('3. Run this script again');
    return;
  }
  
  const deals = jsonData.deals || jsonData;
  console.log(`✅ Processing ${deals.length} deals from ${source}\n`);
  
  // Generate TypeScript code
  const tvDeals = deals
    .filter((d: any) => d.currentPrice && d.size)
    .slice(0, 15)
    .map((d: any) => ({
      id: `${(d.brand || 'tv').toLowerCase().replace(/\s+/g, '-')}-${d.asin}`,
      name: d.title.substring(0, 60),
      brand: d.brand || 'Unknown',
      model: d.asin,
      size: d.size || 55,
      technology: d.technology || 'LED',
      currentPrice: d.currentPrice,
      originalPrice: d.originalPrice || d.currentPrice * 1.4,
      discount: d.discount || 25,
      rating: d.rating || 4.0,
      reviewCount: d.reviewCount,
      features: (d.features || ['4K UHD', 'Smart TV']).slice(0, 4),
      dealRating: d.discount >= 30 ? 'excellent' : d.discount >= 20 ? 'good' : 'fair',
      highlights: [
        d.dealBadge,
        d.discount > 0 ? `${d.discount}% off` : null,
        d.size >= 65 ? 'Large Screen' : null,
        'Free Shipping'
      ].filter(Boolean).slice(0, 4),
      affiliateUrl: d.affiliateUrl || `https://www.amazon.com/dp/${d.asin}?tag=YOUR-AFFILIATE-TAG`,
      imageUrl: d.imageUrl
    }));
  
  // Update lib/data.ts
  const dataPath = 'lib/data.ts';
  const dataContent = await fs.readFile(dataPath, 'utf-8');
  
  // Find and replace tvDeals array
  const regex = /export const tvDeals: TV\[\] = \[[\s\S]*?\];/;
  const newTvDeals = `export const tvDeals: TV[] = [
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
    features: [${tv.features.map(f => `'${f}'`).join(', ')}],
    dealRating: '${tv.dealRating}',
    highlights: [${tv.highlights.map(h => `'${h}'`).join(', ')}],
    affiliateUrl: \`${tv.affiliateUrl.replace('YOUR-AFFILIATE-TAG', '${AFFILIATE_TAG}')}\`,${tv.imageUrl ? `
    imageUrl: '${tv.imageUrl}',` : ''}
  }`).join(',\n')}
];`;
  
  const newContent = dataContent.replace(regex, newTvDeals);
  
  // Backup and update
  await fs.writeFile('lib/data.ts.backup', dataContent);
  await fs.writeFile(dataPath, newContent);
  
  console.log('✅ Updated lib/data.ts');
  console.log('📁 Backup saved to lib/data.ts.backup');
  console.log(`\n📊 Updated ${tvDeals.length} TV deals`);
  console.log(`💰 Prices: $${Math.min(...tvDeals.map(t => t.currentPrice))} - $${Math.max(...tvDeals.map(t => t.currentPrice))}`);
  console.log('\n🚀 Run `npm run dev` to see the changes!');
}

quickUpdate().catch(console.error);