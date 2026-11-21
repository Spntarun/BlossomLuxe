'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Heart, ShoppingBag, User } from 'lucide-react';
import { useCartStore, useWishlistStore } from '@/lib/store';

export function MobileNav() {
  const pathname = usePathname();
  const { getItemCount, openCart, hasHydrated: cartHydrated } = useCartStore();
  const { items: wishlistItems, hasHydrated: wishlistHydrated } = useWishlistStore();

  const cartCount = cartHydrated ? getItemCount() : 0;
  const wishlistCount = wishlistHydrated ? wishlistItems.length : 0;

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Explore', href: '/collections/all', icon: Compass },
    { label: 'Wishlist', href: '/wishlist', icon: Heart, badge: wishlistCount },
    { label: 'Cart', href: '#cart', icon: ShoppingBag, badge: cartCount, isCart: true },
    { label: 'Account', href: '#account', icon: User, isAccount: true },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-burgundy/10 shadow-[0_-4px_12px_rgba(74,26,44,0.06)] pb-[env(safe-area-inset-bottom,0px)]">
      <div className="grid grid-cols-5 h-14 items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (item.isCart) {
            return (
              <button
                key={item.label}
                onClick={openCart}
                aria-label={`Open Cart (${cartCount} items)`}
                className="flex flex-col items-center justify-center h-full min-h-[44px] text-burgundy/70 hover:text-burgundy relative active:scale-95 transition"
              >
                <div className="relative">
                  <Icon className="w-5 h-5 text-burgundy" />
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 bg-burgundy text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-semibold tracking-tight mt-1 text-burgundy">
                  {item.label}
                </span>
              </button>
            );
          }

          if (item.isAccount) {
            return (
              <button
                key={item.label}
                onClick={() => alert('Blossom Luxe Club: Log in or create an account to view orders, saved addresses, and rewards.')}
                aria-label="Account details"
                className="flex flex-col items-center justify-center h-full min-h-[44px] text-burgundy/70 hover:text-burgundy relative active:scale-95 transition"
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium tracking-tight mt-1">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center h-full min-h-[44px] relative active:scale-95 transition ${
                isActive ? 'text-burgundy' : 'text-burgundy/60 hover:text-burgundy'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 bg-rose text-burgundy text-[9px] font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] tracking-tight mt-1 ${
                  isActive ? 'font-bold text-burgundy' : 'font-medium'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

