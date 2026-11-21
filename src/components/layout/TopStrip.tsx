'use client';

import React from 'react';
import { Smartphone, Star } from 'lucide-react';

export function TopStrip() {
  return (
    <div className="bg-burgundy text-white text-xs py-2 px-4 select-none relative z-40 border-b border-burgundy-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] md:text-xs">
        <div className="flex items-center gap-1.5 mx-auto md:mx-0">
          <Smartphone className="w-3.5 h-3.5 text-rose shrink-0" />
          <span>Get special discount inside app</span>
          <span className="text-rose/80 font-bold">·</span>
          <span className="flex items-center gap-0.5 font-semibold text-rose">
            <Star className="w-3 h-3 fill-gold text-gold" /> 4.8
          </span>
          <span className="text-rose/80 font-bold">·</span>
          <span className="text-white/90">1M+ Downloads</span>
        </div>

        <button
          onClick={() => alert('Download Blossom Luxe App on iOS & Android for extra ₹200 OFF on your first purchase!')}
          className="hidden md:inline-flex items-center gap-1 px-3 py-1 bg-rose text-burgundy font-bold text-[11px] uppercase tracking-wider rounded-full hover:bg-rose-200 transition shadow-xs"
        >
          Get App
        </button>
      </div>
    </div>
  );
}
