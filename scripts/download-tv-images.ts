#!/usr/bin/env tsx
import fs from 'fs/promises';
import path from 'path';
import { tvDeals } from '../lib/data';

// Script to download TV images from Amazon or use placeholders
async function downloadTVImages() {
  console.log('📸 Downloading TV images...\n');
  
  // Create images directory
  const imagesDir = path.join(process.cwd(), 'public', 'tv-images');
  await fs.mkdir(imagesDir, { recursive: true });
  
  // If you have image URLs from scraping, add them here
  const imageUrls: Record<string, string> = {
    // Example format:
    // 'lg-c4-48-oled': 'https://m.media-amazon.com/images/I/...',
  };
  
  // Generate Next.js Image component code
  const imageImports: string[] = [];
  const imageComponents: string[] = [];
  
  for (const tv of tvDeals) {
    const imageUrl = imageUrls[tv.id];
    
    if (imageUrl) {
      // If we have a real Amazon image URL
      console.log(`✅ ${tv.name}: ${imageUrl}`);
      
      imageComponents.push(`
  {/* ${tv.name} */}
  <Image
    src="${imageUrl}"
    alt="${tv.name}"
    width={300}
    height={300}
    className="w-full h-48 object-contain"
    unoptimized
  />`);
    } else {
      // Use placeholder
      console.log(`📦 ${tv.name}: Using placeholder`);
      
      imageComponents.push(`
  {/* ${tv.name} */}
  <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
    <div className="text-center">
      <div className="text-4xl mb-2">📺</div>
      <div className="text-sm font-medium">${tv.size}" ${tv.technology}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400">${tv.brand}</div>
    </div>
  </div>`);
    }
  }
  
  // Save component code
  const componentCode = `// TV Image Components
import Image from 'next/image';

// Add these to your TV card components:
${imageComponents.join('\n')}
`;
  
  await fs.writeFile('tv-image-components.tsx', componentCode);
  console.log('\n✅ Saved image component code to tv-image-components.tsx');
  
  // Alternative: Direct image mapping
  const imageMapping = `// TV Image URL Mapping
export const tvImages: Record<string, string> = {
${tvDeals.map(tv => `  '${tv.id}': '${imageUrls[tv.id] || `/api/placeholder/${tv.size}/${tv.technology}`}',`).join('\n')}
};

// Usage in component:
// <img src={tvImages[tv.id]} alt={tv.name} className="w-full h-48 object-contain" />
`;
  
  await fs.writeFile('tv-image-mapping.ts', imageMapping);
  console.log('✅ Saved image mapping to tv-image-mapping.ts');
  
  console.log('\n📝 To get real Amazon images:');
  console.log('1. Go to the Amazon deals page');
  console.log('2. Run the browser console script (amazon-console-extractor.js)');
  console.log('3. The script will extract image URLs automatically');
  console.log('4. Copy the imageUrl values and add them to this script');
}

// Create a placeholder API route
const placeholderAPI = `// app/api/placeholder/[size]/[tech]/route.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(
  request: Request,
  { params }: { params: { size: string; tech: string } }
) {
  const { size, tech } = params;
  
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a1a1a',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 20 }}>📺</div>
        <div style={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}>
          {size}" {tech}
        </div>
        <div style={{ fontSize: 24, color: '#888', marginTop: 10 }}>
          TV Deal
        </div>
      </div>
    ),
    {
      width: 600,
      height: 600,
    }
  );
}`;

async function main() {
  await downloadTVImages();
  
  console.log('\n🎨 Placeholder API Route:');
  console.log(placeholderAPI);
  
  console.log('\n✨ Options for TV images:');
  console.log('1. Use Amazon CDN URLs directly (best performance)');
  console.log('2. Create placeholder images with Next.js OG Image');
  console.log('3. Use emoji placeholders (current solution)');
  console.log('4. Download and serve locally (not recommended - copyright)');
}

main().catch(console.error);