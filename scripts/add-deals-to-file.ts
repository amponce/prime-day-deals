#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

const AFFILIATE_TAG = process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG || 'codebyte-20';

interface InputDeal {
  id?: string;
  asin?: string;
  name?: string;
  title?: string;
  brand?: string;
  model?: string;
  size?: number | string;
  technology?: string;
  currentPrice?: number | string;
  current_price?: string;
  originalPrice?: number | string | null;
  original_price?: string | null;
  discount?: number | string;
  discount_percentage?: string;
  rating?: number | string;
  reviewCount?: number | string;
  review_count?: string;
  features?: string[];
  highlights?: string[];
  imageUrl?: string;
  image_url?: string;
  affiliateUrl?: string;
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

function convertToTypeScript(deals: InputDeal[]): string {
  return deals.map(deal => {
    const id = deal.id || deal.asin || '';
    const name = (deal.name || deal.title || '').replace(/'/g, "\\'");
    const brand = deal.brand || (deal.name || deal.title || '').split(' ')[0] || 'Unknown';
    const currentPrice = parseFloat(String(deal.currentPrice || deal.current_price || '0'));
    const originalPrice = deal.originalPrice !== null && deal.original_price !== null 
      ? parseFloat(String(deal.originalPrice || deal.original_price || '0'))
      : currentPrice * 1.5; // Default to 33% off if no original price
    const discount = parseInt(String(deal.discount || deal.discount_percentage || '0')) || 
      Math.round((1 - (currentPrice / originalPrice)) * 100);

    return `  {
    id: '${id}',
    name: '${name}',
    brand: '${brand}',
    model: '${deal.model || id}',
    size: ${parseInt(String(deal.size || '0')) || extractSize(name)},
    technology: '${deal.technology || detectTechnology(name)}',
    currentPrice: ${currentPrice},
    originalPrice: ${originalPrice},
    discount: ${discount},
    rating: ${parseFloat(String(deal.rating || '4.3'))},
    reviewCount: ${parseInt(String(deal.reviewCount || deal.review_count || '0'))},
    features: ${JSON.stringify(deal.features || ['4K UHD', 'Smart TV'])},
    dealRating: '${discount > 30 ? 'excellent' : discount > 20 ? 'good' : 'fair'}',
    highlights: ${JSON.stringify(deal.highlights || [`Save $${(originalPrice - currentPrice).toFixed(2)}`])},
    affiliateUrl: \`https://www.amazon.com/dp/${id}?tag=\${AFFILIATE_TAG}\`,
    imageUrl: '${deal.imageUrl || deal.image_url || ''}',
  }`;
  }).join(',\n');
}

async function addDealsToFile() {
  try {
    // Read from stdin or file argument
    let input = '';
    
    if (process.argv[2]) {
      // Read from file
      input = fs.readFileSync(process.argv[2], 'utf-8');
    } else {
      // Read from stdin
      console.log('Paste your JSON array of deals, then press Ctrl+D when done:');
      for await (const chunk of process.stdin) {
        input += chunk;
      }
    }

    if (!input.trim()) {
      console.error('❌ No input provided');
      return;
    }

    // Parse JSON
    const deals = JSON.parse(input);
    if (!Array.isArray(deals)) {
      console.error('❌ Input must be a JSON array');
      return;
    }

    // Read current data.ts
    const dataPath = path.join(process.cwd(), 'lib', 'data.ts');
    let dataContent = fs.readFileSync(dataPath, 'utf-8');

    // Find the tvDeals array
    const tvDealsMatch = dataContent.match(/export const tvDeals: TV\[\] = \[([\s\S]*?)\];/);
    if (!tvDealsMatch) {
      console.error('❌ Could not find tvDeals array in data.ts');
      return;
    }

    // Get existing IDs to check for duplicates
    const existingIds = new Set<string>();
    const idMatches = dataContent.matchAll(/id:\s*['"]([^'"]+)['"]/g);
    for (const match of idMatches) {
      existingIds.add(match[1]);
    }

    // Filter out duplicates
    const newDeals = deals.filter(deal => {
      const id = deal.id || deal.asin;
      return id && !existingIds.has(id);
    });

    if (newDeals.length === 0) {
      console.log('✨ No new deals to add (all are duplicates)');
      return;
    }

    console.log(`📦 Adding ${newDeals.length} new deals...`);

    // Convert to TypeScript format
    const newDealsCode = convertToTypeScript(newDeals);

    // Insert new deals before the closing bracket
    const updatedContent = dataContent.replace(
      /export const tvDeals: TV\[\] = \[([\s\S]*?)\];/,
      (match, existingDeals) => {
        // Remove trailing comma and whitespace from existing deals
        const trimmed = existingDeals.trimEnd();
        const needsComma = trimmed && !trimmed.endsWith(',');
        
        return `export const tvDeals: TV[] = [${trimmed}${needsComma ? ',' : ''}\n${newDealsCode}\n];`;
      }
    );

    // Write back to file
    fs.writeFileSync(dataPath, updatedContent);

    console.log('✅ Successfully added new deals to lib/data.ts');
    console.log('\nNew deals added:');
    newDeals.forEach(deal => {
      const name = deal.name || deal.title || 'Unknown';
      const price = deal.currentPrice || deal.current_price || '0';
      console.log(`  📺 ${name} - $${price}`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\nMake sure your JSON is properly formatted.');
  }
}

addDealsToFile();