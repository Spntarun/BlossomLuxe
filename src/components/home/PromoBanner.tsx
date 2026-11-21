'use client';

import React from 'react';
import Link from 'next/link';
import { CountdownTimer } from '@/components/common/CountdownTimer';
import { Sparkles, ArrowRight } from 'lucide-react';

export function PromoBanner() {
  return (
    <div className="bg-rose text-burgundy py-3.5 px-4 border-b border-rose-400 shadow-xs relative overflow-hidden">
      {/* Subtle decorative background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left relative z-10">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-burgundy text-rose text-[11px] font-bold uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FESTIVE SALE</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-sm md:text-base tracking-wide text-burgundy">
              BUY 1 GET 1 Sale is live!
            </span>
            <span className="hidden sm:inline text-burgundy/60">|</span>
            <span className="text-xs font-semibold text-burgundy/90">
              Ends in:
            </span>
          </div>
        </div>

        {/* Live Countdown and Shop CTA */}
        <div className="flex items-center gap-4">
          <CountdownTimer initialHours={18} />

          <Link
            href="/collections/sale"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-burgundy hover:bg-burgundy-600 active:scale-95 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-sm transition"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-3.5 h-3.5 text-rose" />
          </Link>
        </div>
      </div>
    </div>
  );
}

