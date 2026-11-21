import React from 'react';
import Link from 'next/link';
import { LotusLogo } from '@/components/common/LotusLogo';
import { ArrowRight, ShoppingBag } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 bg-ivory">
      <div className="max-w-md w-full bg-white p-8 md:p-12 rounded-2xl border border-burgundy/10 shadow-card">
        <LotusLogo size="lg" className="mx-auto mb-6" />

        <span className="text-4xl md:text-5xl font-serif font-bold text-burgundy block mb-2">
          404
        </span>
        <h1 className="text-base md:text-lg font-serif font-bold uppercase tracking-wider text-burgundy mb-2">
          Page Not Found
        </h1>
        <p className="text-xs text-burgundy/70 mb-8 leading-relaxed">
          The luxury silhouette you are looking for might have been moved or is no longer in season.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="w-full min-h-[44px] bg-burgundy text-white hover:bg-burgundy-600 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition"
          >
            <ShoppingBag className="w-4 h-4 text-rose" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/collections/all"
            className="w-full min-h-[44px] border border-burgundy/20 hover:border-burgundy rounded-lg text-xs font-bold uppercase tracking-wider text-burgundy flex items-center justify-center gap-2 transition"
          >
            <span>Explore All Collections</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

