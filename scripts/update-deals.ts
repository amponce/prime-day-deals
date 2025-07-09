#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';
import { TV } from '../types';

const AFFILIATE_TAG = process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG || 'codebyte-20';

interface InputDeal {
  asin?: string;
  id?: string;
  title?: string;
  name?: string;
  current_price?: string;
  currentPrice?: string;
  original_price?: string;
  originalPrice?: string;
  discount_percentage?: string;
  discount?: string;
  image_url?: string;
  imageUrl?: string;
  brand?: string;
  size?: string;
  rating?: string;
  review_count?: string;
  reviewCount?: string;
  features?: string[];
  highlights?: string[];
}

function detectTechnology(title: string): 'OLED' | 'QLED' | 'Mini-LED' | 'LED' {
  const titleLower = title.toLowerCase();
  if (titleLower.includes('oled')) return 'OLED';
  if (titleLower.includes('qled')) return 'QLED';
  if (titleLower.includes('mini-led') || titleLower.includes('mini led')) return 'Mini-LED';
  return 'LED';
}

function extractSize(title: string): number {
  const sizeMatch = title.match(/(\d{2,3})["\s-]+(inch|in\b|")/i);
  return sizeMatch ? parseInt(sizeMatch[1]) : 55;
}

function convertDeal(deal: InputDeal): TV {
  const asin = deal.asin || deal.id || '';
  const title = deal.title || deal.name || '';
  const currentPrice = parseFloat(deal.current_price || deal.currentPrice || '0');
  const originalPrice = parseFloat(deal.original_price || deal.originalPrice || '0');
  const discountNum = parseInt(deal.discount_percentage || deal.discount || '0') || 
    Math.round((1 - (currentPrice / originalPrice)) * 100);

  return {
    id: asin,
    name: title,
    brand: deal.brand || title.split(' ')[0] || 'Unknown',
    model: asin,
    size: parseInt(deal.size || '') || extractSize(title),
    technology: detectTechnology(title),
    currentPrice,
    originalPrice,
    discount: discountNum,
    rating: parseFloat(deal.rating || '4.3'),
    reviewCount: parseInt(deal.review_count || deal.reviewCount || '0'),
    features: deal.features || ['4K UHD', 'Smart TV', 'HDR'],
    dealRating: discountNum > 30 ? 'excellent' : discountNum > 20 ? 'good' : 'fair',
    highlights: deal.highlights || [
      `Save $${(originalPrice - currentPrice).toFixed(2)}`,
      `${discountNum}% OFF`,
      'Prime Day Deal'
    ],
    affiliateUrl: `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`,
    imageUrl: deal.image_url || deal.imageUrl || '',
  };
}

async function updateDeals() {
  try {
    // Check for JSON file in results directory
    const resultsDir = path.join(process.cwd(), 'results');
    let inputDeals: InputDeal[] = [];

    if (fs.existsSync(resultsDir)) {
      const files = fs.readdirSync(resultsDir).filter(f => f.endsWith('.json'));
      if (files.length > 0) {
        const latestFile = files.sort().pop()!;
        const content = fs.readFileSync(path.join(resultsDir, latestFile), 'utf-8');
        const parsed = JSON.parse(content);
        inputDeals = Array.isArray(parsed) ? parsed : [parsed];
        console.log(`📁 Found ${inputDeals.length} deals in ${latestFile}`);
      }
    }

    // Also check for command line input
    if (process.argv[2]) {
      try {
        const cliDeals = JSON.parse(process.argv[2]);
        inputDeals = inputDeals.concat(Array.isArray(cliDeals) ? cliDeals : [cliDeals]);
      } catch (e) {
        console.error('Failed to parse command line JSON');
      }
    }

    if (inputDeals.length === 0) {
      console.log('❌ No deals found. Place a JSON file in /results or pass JSON as argument.');
      return;
    }

    // Read current data.ts
    const dataPath = path.join(process.cwd(), 'lib', 'data.ts');
    const dataContent = fs.readFileSync(dataPath, 'utf-8');

    // Extract existing deals
    const existingDealsMatch = dataContent.match(/export const tvDeals: TV\[\] = \[([\s\S]*?)\];/);
    if (!existingDealsMatch) {
      console.error('❌ Could not find tvDeals array in data.ts');
      return;
    }

    // Get existing IDs
    const existingIds = new Set<string>();
    const idMatches = dataContent.matchAll(/id:\s*['"]([^'"]+)['"]/g);
    for (const match of idMatches) {
      existingIds.add(match[1]);
    }

    // Process new deals
    const newDeals: TV[] = [];
    const duplicates: string[] = [];

    for (const deal of inputDeals) {
      const converted = convertDeal(deal);
      if (existingIds.has(converted.id)) {
        duplicates.push(`${converted.name} (${converted.id})`);
      } else {
        newDeals.push(converted);
        existingIds.add(converted.id);
      }
    }

    console.log(`\n📊 Results:`);
    console.log(`✅ New deals: ${newDeals.length}`);
    console.log(`⚠️  Duplicates: ${duplicates.length}`);

    if (duplicates.length > 0) {
      console.log('\nDuplicate deals:');
      duplicates.forEach(d => console.log(`  - ${d}`));
    }

    if (newDeals.length === 0) {
      console.log('\n✨ No new deals to add.');
      return;
    }

    // Generate new deals code
    const newDealsCode = newDeals.map(tv => {
      return `  {
    id: '${tv.id}',
    name: '${tv.name.replace(/'/g, "\\'")}',
    brand: '${tv.brand}',
    model: '${tv.model}',
    size: ${tv.size},
    technology: '${tv.technology}',
    currentPrice: ${tv.currentPrice},
    originalPrice: ${tv.originalPrice},
    discount: ${tv.discount},
    rating: ${tv.rating},
    reviewCount: ${tv.reviewCount},
    features: ${JSON.stringify(tv.features)},
    dealRating: '${tv.dealRating}',
    highlights: ${JSON.stringify(tv.highlights)},
    affiliateUrl: \`https://www.amazon.com/dp/${tv.id}?tag=\${AFFILIATE_TAG}\`,
    imageUrl: '${tv.imageUrl}',
  }`;
    }).join(',\n');

    // Insert new deals before the closing bracket
    const updatedContent = dataContent.replace(
      /export const tvDeals: TV\[\] = \[([\s\S]*?)\];/,
      (match, existingDeals) => {
        return `export const tvDeals: TV[] = [${existingDeals.trimEnd()},\n${newDealsCode}\n];`;
      }
    );

    // Write updated content
    fs.writeFileSync(dataPath, updatedContent);

    console.log('\n✅ Successfully added new deals to lib/data.ts');
    console.log('\nNew deals added:');
    newDeals.forEach(tv => {
      console.log(`  📺 ${tv.name}`);
      console.log(`     💰 $${tv.currentPrice} (was $${tv.originalPrice}) - ${tv.discount}% OFF`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

updateDeals();