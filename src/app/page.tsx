import React from 'react';
import { PRODUCTS } from '@/data/products';
import { PromoBanner } from '@/components/home/PromoBanner';
import { CategoryRow } from '@/components/home/CategoryRow';
import { ProductCarousel } from '@/components/home/ProductCarousel';
import { EditorialCollections } from '@/components/home/EditorialCollections';
import { BudgetSection } from '@/components/home/BudgetSection';
import { AllProductsSection } from '@/components/home/AllProductsSection';
import { ReviewsStrip } from '@/components/home/ReviewsStrip';
import { TrustBadges } from '@/components/layout/TrustBadges';

export default function HomePage() {
  // Filter products for carousels
  const newArrivals = PRODUCTS.filter((p) => p.isNew || p.badges.includes('NEW'));
  const bestSellers = PRODUCTS.filter((p) => p.bestseller || p.badges.includes('BESTSELLER'));
  const festiveEdit = PRODUCTS.filter((p) => p.category === 'festive-wear');

  return (
    <div className="flex flex-col w-full">
      {/* 3. Promo Banner with Live Countdown */}
      <PromoBanner />

      {/* 4. Circular Categories Row */}
      <CategoryRow />

      {/* 5. Product Carousels */}
      {/* Carousel 1: New Arrivals */}
      <ProductCarousel
        title="New Arrivals"
        subtitle="Fresh drops straight from our bridal couture ateliers"
        viewAllHref="/collections/new-arrivals"
        products={newArrivals.length > 0 ? newArrivals : PRODUCTS.slice(0, 6)}
      />

      {/* Carousel 2: Best Sellers */}
      <ProductCarousel
        title="Best Sellers"
        subtitle="Our most loved, viral corsets and fusion silhouettes"
        viewAllHref="/collections/best-sellers"
        products={bestSellers.length > 0 ? bestSellers : PRODUCTS.slice(4, 10)}
      />

      {/* 6. Shop By Collection (Editorial) */}
      <EditorialCollections />

      {/* Carousel 3: Festive Edit */}
      <ProductCarousel
        title="Festive Edit"
        subtitle="Zari lehengas, pre-draped sarees, and royal velvets"
        viewAllHref="/collections/festive-wear"
        products={festiveEdit}
      />

      {/* 7. Shop By Budget Chips */}
      <BudgetSection />

      {/* 8. All Products Grid with Infinite/Load More */}
      <AllProductsSection />

      {/* 9. Reviews Strip */}
      <ReviewsStrip />

      {/* 10. Trust Badges */}
      <TrustBadges />
    </div>
  );
}

