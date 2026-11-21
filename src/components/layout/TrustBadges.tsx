import React from 'react';
import { Truck, RotateCcw, ShieldCheck, HeartHandshake } from 'lucide-react';

export function TrustBadges() {
  const badges = [
    {
      icon: Truck,
      title: 'Fast Delivery Pan-India',
      subtitle: 'Dispatched in 24 hours',
    },
    {
      icon: RotateCcw,
      title: 'Easy 7-Day Return & Exchange',
      subtitle: 'Hassle-free doorstep pickup',
    },
    {
      icon: ShieldCheck,
      title: '100% Secure Checkout',
      subtitle: 'UPI, Cards, NetBanking & COD',
    },
    {
      icon: HeartHandshake,
      title: 'Proudly Made in India',
      subtitle: 'Artisanal tailoring & finish',
    },
  ];

  return (
    <section className="bg-blush/25 border-y border-burgundy/10 py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
        {badges.map((b, i) => {
          const Icon = b.icon;
          return (
            <div key={i} className="flex items-center gap-3.5 p-2">
              <div className="w-11 h-11 rounded-full bg-white border border-rose/50 flex items-center justify-center text-burgundy shrink-0 shadow-xs">
                <Icon className="w-5 h-5 text-burgundy stroke-[1.8]" />
              </div>
              <div>
                <h4 className="text-xs md:text-sm font-bold text-burgundy leading-snug">
                  {b.title}
                </h4>
                <p className="text-[11px] text-burgundy/70 mt-0.5">
                  {b.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

