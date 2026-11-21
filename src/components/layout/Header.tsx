'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  Search,
  Heart,
  ShoppingBag,
  User,
  X,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { CATEGORIES_NAV } from '@/data/products';
import { useCartStore, useWishlistStore } from '@/lib/store';
import { LotusLogo } from '@/components/common/LotusLogo';
import { MegaMenu } from '@/components/layout/MegaMenu';
import { SearchModal } from '@/components/search/SearchModal';

export function Header() {
  const pathname = usePathname();
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { getItemCount, openCart, hasHydrated: cartHydrated } = useCartStore();
  const { items: wishlistItems, hasHydrated: wishlistHydrated } = useWishlistStore();

  const cartCount = cartHydrated ? getItemCount() : 0;
  const wishlistCount = wishlistHydrated ? wishlistItems.length : 0;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-burgundy/10 shadow-xs">
        {/* Main Header Bar */}
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-2 md:gap-4 w-full">
          {/* Left: Mobile Hamburger & Logo */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="lg:hidden w-10 h-10 flex items-center justify-center text-burgundy hover:bg-blush/40 rounded-full transition shrink-0"
            >
              <Menu className="w-5 h-5" />
            </button>

            <LotusLogo size="md" />
          </div>

          {/* Center: Search Bar Trigger (Littlebox style pill) */}
          <div className="flex-1 min-w-0 max-w-[200px] md:max-w-xs lg:max-w-md hidden sm:block mx-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 bg-ivory hover:bg-blush/20 text-burgundy/60 text-xs rounded-full border border-burgundy/15 transition-all text-left group shadow-2xs"
            >
              <Search className="w-4 h-4 text-burgundy/50 group-hover:text-burgundy transition" />
              <span className="truncate">Search corset tops, lehengas, sarees...</span>
              <kbd className="hidden md:inline-block ml-auto text-[10px] bg-white border border-burgundy/20 px-1.5 py-0.5 rounded text-burgundy/60">
                /
              </kbd>
            </button>
          </div>

          {/* Right Action Icons: Search (mobile), Wishlist, Account, Cart Badge */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Mobile Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search products"
              className="sm:hidden w-11 h-11 flex items-center justify-center text-burgundy hover:bg-blush/40 rounded-full transition"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              aria-label={`Wishlist (${wishlistCount} items)`}
              className="relative w-11 h-11 flex items-center justify-center text-burgundy hover:bg-blush/40 rounded-full transition"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose text-burgundy text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account Icon (Desktop) */}
            <button
              onClick={() => alert('Sign In / Register: Welcome to Blossom Luxe Luxury Club! Get 500 reward points on sign-up.')}
              aria-label="User Account"
              className="hidden md:flex w-11 h-11 items-center justify-center text-burgundy hover:bg-blush/40 rounded-full transition"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Cart Button Badge */}
            <button
              onClick={openCart}
              aria-label={`Shopping Bag (${cartCount} items)`}
              className="relative min-w-[44px] min-h-[44px] px-2.5 flex items-center justify-center gap-1.5 text-burgundy hover:bg-blush/40 rounded-full transition"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] px-1 bg-burgundy text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden lg:inline text-xs font-bold uppercase tracking-wider">
                Bag
              </span>
            </button>
          </div>
        </div>

        {/* Sub-nav: Horizontally scrollable row on mobile & tablet, mega-menu on desktop */}
        <nav
          className="border-t border-burgundy/10 bg-ivory/60"
          onMouseLeave={() => setActiveMegaMenu(null)}
        >
          <div className="max-w-7xl mx-auto px-4 flex items-center overflow-x-auto no-scrollbar scroll-smooth">
            {CATEGORIES_NAV.map((cat) => {
              const isActive = pathname === cat.href;
              const hasMega = ['Indo-Western', 'Corsets', 'Festive Wear'].includes(cat.name);

              return (
                <div
                  key={cat.name}
                  className="relative shrink-0"
                  onMouseEnter={() => hasMega && setActiveMegaMenu(cat.name)}
                >
                  <Link
                    href={cat.href}
                    onMouseEnter={() => hasMega && setActiveMegaMenu(cat.name)}
                    onFocus={() => hasMega && setActiveMegaMenu(cat.name)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold uppercase tracking-wider transition whitespace-nowrap border-b-2 ${
                      isActive
                        ? 'border-burgundy text-burgundy'
                        : 'border-transparent text-burgundy/80 hover:text-burgundy hover:border-rose'
                    }`}
                  >
                    <span>{cat.name}</span>
                    {cat.badge && (
                      <span className="px-1.5 py-0.2 text-[9px] font-bold rounded bg-rose text-burgundy shadow-2xs">
                        {cat.badge}
                      </span>
                    )}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Desktop Hover Mega-Menu */}
          {activeMegaMenu && (
            <div onMouseEnter={() => setActiveMegaMenu(activeMegaMenu)}>
              <MegaMenu
                category={activeMegaMenu}
                onClose={() => setActiveMegaMenu(null)}
              />
            </div>
          )}
        </nav>
      </header>

      {/* Mobile Slide-over Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-burgundy/60 backdrop-blur-xs"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-2xl flex flex-col">
            <div className="p-4 border-b border-burgundy/10 flex items-center justify-between bg-ivory">
              <LotusLogo size="sm" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-burgundy"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 divide-y divide-burgundy/10">
              <div className="py-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-burgundy/50 px-2">
                  Categories
                </span>
                <div className="mt-2 space-y-1">
                  {CATEGORIES_NAV.map((cat) => (
                    <Link
                      key={cat.name}
                      href={cat.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-burgundy hover:bg-blush/30 rounded"
                    >
                      <div className="flex items-center gap-2">
                        <span>{cat.name}</span>
                        {cat.badge && (
                          <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-rose text-burgundy">
                            {cat.badge}
                          </span>
                        )}
                      </div>
                      <ChevronRight className="w-4 h-4 text-burgundy/40" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="py-4 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-burgundy/50 px-2">
                  Special Edits
                </span>
                <Link
                  href="/collections/festive-wear"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 text-xs font-medium text-burgundy hover:bg-blush/30 rounded"
                >
                  <span>Wedding Guest Edit</span>
                  <ChevronRight className="w-4 h-4 text-burgundy/40" />
                </Link>
                <Link
                  href="/collections/corsets"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 text-xs font-medium text-burgundy hover:bg-blush/30 rounded"
                >
                  <span>Party Night Corsets</span>
                  <ChevronRight className="w-4 h-4 text-burgundy/40" />
                </Link>
                <Link
                  href="/collections/sale"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 text-xs font-medium text-rose-600 font-bold hover:bg-blush/30 rounded"
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> BUY 1 GET 1 Sale
                  </span>
                  <ChevronRight className="w-4 h-4 text-burgundy/40" />
                </Link>
              </div>

              <div className="py-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-burgundy/50 px-2">
                  Help & Support
                </span>
                <div className="mt-2 space-y-1 text-xs text-burgundy/80">
                  <div className="px-3 py-1.5">WhatsApp Concierge: +91 98765 43210</div>
                  <div className="px-3 py-1.5">Track Order Status</div>
                  <div className="px-3 py-1.5">Returns & Exchanges</div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blush/30 border-t border-burgundy/10 flex flex-col items-center justify-center text-center">
              <LotusLogo size="sm" variant="stacked" />
            </div>
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}

