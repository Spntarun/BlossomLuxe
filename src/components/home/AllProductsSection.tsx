'use client';

import React, { useState } from 'react';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { Loader2 } from 'lucide-react';

export function AllProductsSection() {
  const [displayedCount, setDisplayedCount] = useState(12);
  const [loadingMore, setLoadingMore] = useState(false);

  const displayedProducts = PRODUCTS.slice(0, displayedCount);
  const hasMore = displayedCount < PRODUCTS.length;

  const handleLoadMore = () => {
    setLoadingMore(true);
    // Simulate natural infinite load feel
    setTimeout(() => {
      setDisplayedCount((c) => Math.min(PRODUCTS.length, c + 12));
      setLoadingMore(false);
    }, 600);
  };

  return (
    <section className="py-10 border-b border-burgundy/10 bg-ivory">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-base md:text-xl font-bold uppercase tracking-wider text-burgundy font-serif">
              All Products
            </h2>
            <p className="text-xs text-burgundy/60 mt-0.5">
              Showing {displayedProducts.length} of {PRODUCTS.length} curated luxury designs
            </p>
          </div>
        </div>

        {/* Responsive Grid: 2 cols on mobile, 3 on tablet, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {displayedProducts.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={idx < 4}
            />
          ))}

          {/* Skeleton Cards While Loading More */}
          {loadingMore &&
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className="bg-white rounded-md overflow-hidden border border-burgundy/10 animate-pulse flex flex-col"
              >
                <div className="aspect-[3/4] bg-blush/40" />
                <div className="p-3 space-y-2">
                  <div className="h-4 bg-blush/50 rounded w-3/4" />
                  <div className="h-3 bg-blush/30 rounded w-1/2" />
                  <div className="h-4 bg-blush/50 rounded w-1/3 mt-2" />
                </div>
              </div>
            ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-10 flex flex-col items-center justify-center">
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="px-8 py-3 bg-white border border-burgundy/30 text-burgundy hover:bg-blush/30 active:scale-95 font-semibold text-xs md:text-sm uppercase tracking-wider rounded-md shadow-xs transition flex items-center gap-2 min-h-[44px]"
            >
              {loadingMore ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-burgundy" />
                  <span>Loading More Styles...</span>
                </>
              ) : (
                <span>Load More Styles ({PRODUCTS.length - displayedCount} remaining)</span>
              )}
            </button>
            <div className="w-48 bg-burgundy/10 h-1 rounded-full overflow-hidden mt-3">
              <div
                className="bg-burgundy h-full rounded-full transition-all duration-300"
                style={{ width: `${(displayedCount / PRODUCTS.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

