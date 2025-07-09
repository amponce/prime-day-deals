#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the data file
const dataPath = path.join(__dirname, '../lib/data.ts');
const dataContent = fs.readFileSync(dataPath, 'utf8');

// Extract all TV deals
const tvMatches = dataContent.matchAll(/{\s*id:\s*['"]([^'"]+)['"][\s\S]*?name:\s*['"]([^'"]+)['"][\s\S]*?currentPrice:\s*(\d+(?:\.\d+)?)[\s\S]*?}/g);

const tvDeals = [];
for (const match of tvMatches) {
  tvDeals.push({
    id: match[1],
    name: match[2],
    price: parseFloat(match[3])
  });
}

console.log(`Total TV deals found: ${tvDeals.length}`);

// Check for duplicate IDs
const idCounts = {};
const duplicateIds = [];

tvDeals.forEach(tv => {
  if (idCounts[tv.id]) {
    idCounts[tv.id]++;
    if (!duplicateIds.includes(tv.id)) {
      duplicateIds.push(tv.id);
    }
  } else {
    idCounts[tv.id] = 1;
  }
});

if (duplicateIds.length > 0) {
  console.log('\n❌ Duplicate IDs found:');
  duplicateIds.forEach(id => {
    console.log(`  - "${id}" appears ${idCounts[id]} times`);
  });
} else {
  console.log('\n✅ No duplicate IDs found');
}

// Check for duplicate names (potential duplicates with different IDs)
const nameCounts = {};
const duplicateNames = [];

tvDeals.forEach(tv => {
  const normalizedName = tv.name.toLowerCase().trim();
  if (nameCounts[normalizedName]) {
    nameCounts[normalizedName].count++;
    nameCounts[normalizedName].items.push(tv);
  } else {
    nameCounts[normalizedName] = {
      count: 1,
      items: [tv]
    };
  }
});

Object.entries(nameCounts).forEach(([name, data]) => {
  if (data.count > 1) {
    duplicateNames.push(data.items);
  }
});

if (duplicateNames.length > 0) {
  console.log('\n⚠️  Potential duplicate products (same/similar names):');
  duplicateNames.forEach(group => {
    console.log(`\n  "${group[0].name}" appears ${group.length} times:`);
    group.forEach(tv => {
      console.log(`    - ID: ${tv.id}, Price: $${tv.price}`);
    });
  });
} else {
  console.log('\n✅ No duplicate product names found');
}

// Summary
console.log('\n📊 Summary:');
console.log(`  - Total products: ${tvDeals.length}`);
console.log(`  - Unique IDs: ${Object.keys(idCounts).length}`);
console.log(`  - Duplicate IDs: ${duplicateIds.length}`);
console.log(`  - Duplicate names: ${duplicateNames.length}`);