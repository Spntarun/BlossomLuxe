import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { REVIEWS } from '@/data/products';

export function ReviewsStrip() {
  return (
    <section className="py-10 bg-white border-b border-burgundy/10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blush/50 text-burgundy text-xs font-semibold mb-2">
            <Star className="w-3.5 h-3.5 fill-gold text-gold" />
            <span>4.8 Rating</span>
            <span className="text-burgundy/40">·</span>
            <span>10,000+ Verified Reviews</span>
          </div>
          <h2 className="text-lg md:text-2xl font-bold uppercase tracking-wider text-burgundy font-serif">
            Loved By Women Nationwide
          </h2>
          <p className="text-xs text-burgundy/70 mt-1">
            Real customer stories from celebrations across India
          </p>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {REVIEWS.map((r) => (
            <div
              key={r.id}
              className="p-5 rounded-xl bg-ivory border border-burgundy/10 flex flex-col justify-between shadow-2xs relative"
            >
              <div>
                {/* Rating Stars & Verified Pill */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-gold">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle className="w-3 h-3 stroke-[2.5]" />
                    <span>Verified Buyer</span>
                  </div>
                </div>

                <Quote className="w-6 h-6 text-rose/50 mb-1" />

                <h4 className="text-xs md:text-sm font-bold text-burgundy mb-1">
                  &ldquo;{r.title}&rdquo;
                </h4>
                <p className="text-xs text-burgundy/80 leading-relaxed mb-4">
                  {r.comment}
                </p>
              </div>

              {/* Author & Product */}
              <div className="pt-3 border-t border-burgundy/10 text-xs flex items-center justify-between">
                <div>
                  <span className="font-semibold text-burgundy block">
                    {r.author}
                  </span>
                  <span className="text-[11px] text-burgundy/60">
                    {r.city} · {r.date}
                  </span>
                </div>
                <span className="text-[10px] text-rose-600 font-medium max-w-[120px] truncate text-right">
                  {r.productTitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

