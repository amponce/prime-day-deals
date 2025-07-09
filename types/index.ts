export interface TV {
  id: string;
  name: string;
  brand: string;
  model: string;
  size: number;
  technology: 'OLED' | 'QLED' | 'Mini-LED' | 'LED' | 'QD-OLED' | 'Micro-LED';
  currentPrice: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount?: number;
  features: string[];
  dealRating: 'excellent' | 'good' | 'fair' | 'poor';
  affiliateUrl?: string;
  imageUrl?: string;
  highlights: string[];
}

export interface Room {
  id: string;
  name: string;
  style: 'modern' | 'cozy' | 'minimal' | 'luxury' | 'industrial' | 'boho';
  description: string;
  totalBudget: number;
  featuredTV: TV;
  furniture: Furniture[];
  saves: number;
  imagePrompt?: string;
}

export interface Furniture {
  id: string;
  name: string;
  price: number;
  category: string;
  affiliateUrl?: string;
  position?: {
    x: number;
    y: number;
  };
}

export interface Technology {
  id: string;
  name: string;
  description: string;
  pros: string[];
  cons: string[];
  priceRange: {
    min: number;
    max: number;
  };
  bestFor: string;
  metrics: {
    contrast: number;
    brightness: number;
    color: number;
  };
}