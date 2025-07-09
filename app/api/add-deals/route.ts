import { NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';
import { TV } from '@/types';

const AFFILIATE_TAG = process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG || 'codebyte-20';

export async function POST(request: Request) {
  try {
    const { deals } = await request.json();
    
    if (!deals || !Array.isArray(deals)) {
      return NextResponse.json({ success: false, error: 'Invalid deals data' });
    }

    // Read current data.ts
    const dataPath = path.join(process.cwd(), 'lib', 'data.ts');
    let dataContent = fs.readFileSync(dataPath, 'utf-8');

    // Convert deals to TypeScript format
    const newDealsCode = deals.map((tv: TV) => {
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

    // Find the end of tvDeals array and insert new deals
    const tvDealsMatch = dataContent.match(/export const tvDeals: TV\[\] = \[([\s\S]*?)\];/);
    if (!tvDealsMatch) {
      return NextResponse.json({ success: false, error: 'Could not find tvDeals array' });
    }

    // Insert new deals before the closing bracket
    const updatedContent = dataContent.replace(
      /export const tvDeals: TV\[\] = \[([\s\S]*?)\];/,
      (match, existingDeals) => {
        // Remove trailing whitespace and check if we need a comma
        const trimmed = existingDeals.trimEnd();
        const needsComma = trimmed && !trimmed.endsWith(',');
        
        return `export const tvDeals: TV[] = [${trimmed}${needsComma ? ',' : ''}
${newDealsCode}
];`;
      }
    );

    // Write back to file
    fs.writeFileSync(dataPath, updatedContent);

    return NextResponse.json({ 
      success: true, 
      message: `Added ${deals.length} new deals`,
      count: deals.length 
    });

  } catch (error) {
    console.error('Error adding deals:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}