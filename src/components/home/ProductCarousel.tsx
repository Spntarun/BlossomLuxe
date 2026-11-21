'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Product } from '@/types';
import { ProductCard } from '@/components/product/ProductCard';

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  viewAllHref: string;
  products: Product[];
}

export function ProductCarousel({
  title,
  subtitle,
  viewAllHref,
  products,
}: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-8 border-b border-burgundy/10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-5">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base md:text-xl font-bold uppercase tracking-wider text-burgundy font-serif">
                {title}
              </h2>
            </div>
            {subtitle && (
              <p className="text-xs text-burgundy/60 mt-0.5">{subtitle}</p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={viewAllHref}
              className="text-xs font-bold uppercase tracking-wider text-burgundy hover:text-rose-600 transition flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 text-rose" />
            </Link>

            {/* Desktop Navigation Arrows */}
            <div className="hidden md:flex items-center gap-1.5 ml-2">
              <button
                onClick={() => scroll('left')}
                aria-label="Scroll left"
                className="w-8 h-8 rounded-full border border-burgundy/20 flex items-center justify-center text-burgundy hover:bg-blush/40 active:scale-95 transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                aria-label="Scroll right"
                className="w-8 h-8 rounded-full border border-burgundy/20 flex items-center justify-center text-burgundy hover:bg-blush/40 active:scale-95 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Row: Peek next card on mobile (w-[65vw] sm:w-[45vw] md:w-[28vw] lg:w-[22vw]) */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-3 md:gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory -mx-4 px-4 pb-2"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[68vw] sm:w-[44vw] md:w-[29vw] lg:w-[22.5vw] shrink-0 snap-start flex"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

