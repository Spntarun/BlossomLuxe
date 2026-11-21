'use client';

import React from 'react';
import Link from 'next/link';
import { EDITORIAL_COLLECTIONS } from '@/data/products';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { ArrowUpRight } from 'lucide-react';

export function EditorialCollections() {
  return (
    <section className="py-8 border-b border-burgundy/10 bg-ivory">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6">
          <h2 className="text-base md:text-xl font-bold uppercase tracking-wider text-burgundy font-serif">
            Shop by Collection
          </h2>
          <p className="text-xs text-burgundy/60 mt-0.5">
            Handpicked edits curated for the modern Indian celebration
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EDITORIAL_COLLECTIONS.map((col, idx) => (
            <Link
              key={idx}
              href={col.href}
              className="group relative rounded-xl overflow-hidden aspect-[3/4] bg-blush/30 shadow-subtle flex flex-col justify-end p-5 transition-transform hover:-translate-y-1"
            >
              <ImageWithFallback
                src={col.image}
                alt={col.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition duration-700"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy/90 via-burgundy/40 to-transparent" />

              <div className="relative z-10 text-white">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-rose text-burgundy mb-2">
                  {col.tag}
                </span>
                <h3 className="text-lg font-serif font-bold leading-tight group-hover:text-rose transition">
                  {col.title}
                </h3>
                <p className="text-xs text-white/80 line-clamp-2 mt-1">
                  {col.subtitle}
                </p>

                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-rose uppercase tracking-wider">
                  <span>Explore Edit</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

