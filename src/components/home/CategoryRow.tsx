'use client';

import React from 'react';
import Link from 'next/link';
import { CATEGORIES_CIRCULAR } from '@/data/products';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';

export function CategoryRow() {
  return (
    <section className="py-6 border-b border-burgundy/10 bg-ivory">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-burgundy font-serif">
              Shop by Category
            </h2>
            <div className="w-8 h-0.5 bg-rose mt-1" />
          </div>
          <span className="text-[11px] uppercase tracking-wider text-burgundy/60 font-medium">
            Swipe to explore →
          </span>
        </div>

        {/* Circular Row with Snap Scrolling and Hidden Scrollbar */}
        <div className="flex items-start gap-4 md:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-2 -mx-4 px-4">
          {CATEGORIES_CIRCULAR.map((cat, idx) => (
            <Link
              key={idx}
              href={cat.href}
              className="flex flex-col items-center gap-2 shrink-0 group snap-start focus:outline-none"
            >
              <div className="relative w-18 h-18 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full p-1 border-2 border-rose/50 group-hover:border-burgundy transition-all duration-300 group-hover:scale-105 shadow-sm bg-white">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-blush/30">
                  <ImageWithFallback
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="96px"
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>
              </div>
              <span className="text-[11px] md:text-xs font-semibold text-burgundy text-center whitespace-nowrap group-hover:text-rose-600 transition">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

