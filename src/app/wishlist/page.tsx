'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlistStore } from '@/lib/store';
import { ProductCard } from '@/components/product/ProductCard';

export default function WishlistPage() {
  const { items, hasHydrated } = useWishlistStore();

  if (!hasHydrated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-ivory">
        <div className="w-8 h-8 rounded-full border-2 border-burgundy border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-ivory min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-6 border-b border-burgundy/10 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 fill-rose text-rose" />
              <h1 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-burgundy font-serif">
                My Wishlist ({items.length})
              </h1>
            </div>
            <p className="text-xs text-burgundy/70 mt-1">
              All your favorite pieces saved for your next glamorous occasion
            </p>
          </div>

          {items.length > 0 && (
            <Link
              href="/collections/all"
              className="text-xs font-bold uppercase tracking-wider text-burgundy hover:text-rose-600 flex items-center gap-1"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-3.5 h-3.5 text-rose" />
            </Link>
          )}
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center max-w-lg mx-auto border border-burgundy/10 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-blush/40 flex items-center justify-center text-burgundy mx-auto mb-4">
              <Heart className="w-8 h-8 text-rose-500" />
            </div>
            <h2 className="text-lg font-serif font-bold text-burgundy mb-2">
              Your wishlist is lonely!
            </h2>
            <p className="text-xs text-burgundy/70 mb-6 leading-relaxed">
              Explore our trending corsets, 1-minute pre-draped sarees, and festive lehengas to save what catches your eye.
            </p>
            <Link
              href="/collections/all"
              className="inline-flex items-center gap-2 px-6 py-3 bg-burgundy hover:bg-burgundy-600 active:scale-95 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm transition"
            >
              <ShoppingBag className="w-4 h-4 text-rose" />
              <span>Explore All Collections</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

