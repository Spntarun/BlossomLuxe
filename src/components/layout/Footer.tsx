'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LotusLogo } from '@/components/common/LotusLogo';
import { Instagram, Facebook, Youtube, Send, ArrowRight, ShieldCheck } from 'lucide-react';
import { useToast } from '@/components/common/Toast';

export function Footer() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast('Welcome to the Blossom Luxe VIP Circle! ₹500 voucher sent to your inbox.', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-burgundy text-white pt-12 pb-24 md:pb-12 border-t border-burgundy-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col pr-0 lg:pr-8">
            <div className="mb-4">
              <LotusLogo size="md" color="white" variant="horizontal" />
            </div>
            <p className="text-xs text-white/75 leading-relaxed max-w-sm mb-6">
              Blossom Luxe redefines modern Indian luxury fashion. Merging timeless heritage craftsmanship with contemporary silhouettes, structured corsets, and effortless pre-draped ensembles.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleNewsletter} className="flex flex-col gap-2 max-w-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-rose">
                Join the Luxe Circle
              </span>
              <p className="text-[11px] text-white/70">
                Subscribe for secret B1G1 early access and ₹500 off your first purchase.
              </p>
              <div className="flex gap-2 mt-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-3 py-2 text-xs bg-white/10 border border-white/20 rounded text-white placeholder:text-white/40 focus:outline-none focus:border-rose"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="px-4 py-2 bg-rose text-burgundy text-xs font-bold uppercase tracking-wider rounded hover:bg-rose-200 transition flex items-center gap-1 shadow-sm shrink-0"
                >
                  <span>Join</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose font-serif mb-4">
              Help & Support
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80">
              <li><Link href="/checkout" className="hover:text-rose transition">Track Order</Link></li>
              <li><Link href="/collections/all" className="hover:text-rose transition">Return & Exchange Portal</Link></li>
              <li><span className="cursor-pointer hover:text-rose transition">Shipping Policy</span></li>
              <li><span className="cursor-pointer hover:text-rose transition">FAQs & Order Queries</span></li>
              <li><span className="cursor-pointer hover:text-rose transition">Contact Concierge</span></li>
              <li><span className="cursor-pointer hover:text-rose transition">Size Measurement Guide</span></li>
            </ul>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose font-serif mb-4">
              Shop Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80">
              <li><Link href="/collections/indo-western" className="hover:text-rose transition">Indo-Western Sets</Link></li>
              <li><Link href="/collections/corsets" className="hover:text-rose transition">Couture Corsets</Link></li>
              <li><Link href="/collections/festive-wear" className="hover:text-rose transition">Royal Festive Wear</Link></li>
              <li><Link href="/collections/festive-wear?sub=Lehengas" className="hover:text-rose transition">Kalidar Lehengas</Link></li>
              <li><Link href="/collections/indo-western?sub=Ready-to-Wear+Sarees" className="hover:text-rose transition">1-Minute Sarees</Link></li>
              <li><Link href="/collections/sale" className="text-rose font-semibold hover:underline">B1G1 Sale Edit</Link></li>
            </ul>
          </div>

          {/* Company & Social */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose font-serif mb-4">
              Experience Luxe
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80 mb-6">
              <li><span className="cursor-pointer hover:text-rose transition">About Blossom Luxe</span></li>
              <li><span className="cursor-pointer hover:text-rose transition">Sustainability & Craft</span></li>
              <li><span className="cursor-pointer hover:text-rose transition">Careers with Us</span></li>
              <li><span className="cursor-pointer hover:text-rose transition">Press & Editorial</span></li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-rose hover:text-burgundy flex items-center justify-center transition"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-rose hover:text-burgundy flex items-center justify-center transition"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-rose hover:text-burgundy flex items-center justify-center transition"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>

            {/* App Store Placeholders */}
            <div className="mt-4 flex flex-col gap-1.5">
              <span className="text-[10px] text-white/60 uppercase tracking-wider">Experience on Mobile</span>
              <div className="flex gap-2">
                <div className="px-2.5 py-1.5 bg-white/10 rounded border border-white/20 text-[10px] font-medium text-white/90">
                  App Store
                </div>
                <div className="px-2.5 py-1.5 bg-white/10 rounded border border-white/20 text-[10px] font-medium text-white/90">
                  Google Play
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/60 gap-3">
          <p>© {new Date().getFullYear()} BLOSSOM LUXE Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

