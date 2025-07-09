#!/bin/bash

echo "🚀 Building Next.js app for Cloudflare Pages..."

# Clean up old builds
echo "🧹 Cleaning up old builds..."
rm -rf dist out .next

# Build Next.js app
echo "📦 Building Next.js app..."
npm run build:next

# Move the output to dist directory
echo "📁 Moving build output to dist directory..."
if [ -d "out" ]; then
  mv out dist
else
  echo "❌ Error: Next.js build output not found in 'out' directory"
  exit 1
fi

# Verify the build
echo "✅ Verifying build output..."
if [ -f "dist/index.html" ]; then
  echo "✅ Build successful! Files in dist:"
  ls -la dist/
else
  echo "❌ Error: index.html not found in dist directory"
  exit 1
fi

echo "🎉 Build complete! Ready for Cloudflare deployment."