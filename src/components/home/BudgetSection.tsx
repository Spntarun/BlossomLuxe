'use client';

import React from 'react';
import Link from 'next/link';
import { BUDGET_CHIPS } from '@/data/products';
import { Sparkles } from 'lucide-react';

export function BudgetSection() {
  return (
    <section className="py-6 border-b border-burgundy/10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-rose-500" />
            <h2 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-burgundy font-serif">
              Shop by Budget
            </h2>
          </div>
          <span className="text-[11px] text-burgundy/60 font-medium">
            Find the luxury look that fits your wallet
          </span>
        </div>

        {/* Chips Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {BUDGET_CHIPS.map((chip, idx) => (
            <Link
              key={idx}
              href={chip.href}
              className="py-3 px-4 rounded-lg border border-burgundy/15 bg-ivory hover:bg-blush/40 hover:border-burgundy/40 transition-all text-center group active:scale-98 shadow-2xs"
            >
              <span className="text-xs md:text-sm font-bold text-burgundy group-hover:text-burgundy-900 block">
                {chip.label}
              </span>
              <span className="text-[10px] text-burgundy/60 uppercase tracking-wider block mt-0.5">
                Explore Styles →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

