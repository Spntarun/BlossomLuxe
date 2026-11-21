'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Package,
  Truck,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Download,
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';

interface StoredOrder {
  orderId: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    paymentMethod: string;
  };
  items: Array<{
    id: string;
    title: string;
    size: string;
    color: { name: string; hex: string };
    price: number;
    quantity: number;
    image: string;
  }>;
  subtotal: number;
  discount: number;
  total: number;
  date: string;
}

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<StoredOrder | null>(null);

  useEffect(() => {
    // Launch celebratory confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#EBA5B8', '#4A1A2C', '#C9A36B', '#F8DDE5'],
    });

    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('blossom_last_order');
      if (stored) {
        try {
          setOrder(JSON.parse(stored));
        } catch {
          // fallback
        }
      }
    }
  }, []);

  const orderId = order?.orderId || 'BL-892415';
  const total = order?.total || 4299;

  return (
    <div className="bg-ivory min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Main Confirmation Card */}
        <div className="bg-white rounded-2xl p-6 md:p-10 border border-burgundy/10 shadow-card text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto mb-4 shadow-xs">
            <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
          </div>

          <span className="text-xs uppercase font-bold tracking-widest text-rose-600">
            Order Confirmed
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-burgundy mt-1">
            Thank You, {order?.customer.fullName || 'Luxury Patron'}!
          </h1>
          <p className="text-xs text-burgundy/70 mt-1.5 max-w-md mx-auto leading-relaxed">
            Your Blossom Luxe order has been placed successfully. A confirmation receipt has been sent to{' '}
            <strong className="text-burgundy">{order?.customer.email || 'your email'}</strong>.
          </p>

          {/* Order Details Badge Strip */}
          <div className="my-6 p-4 rounded-xl bg-ivory border border-burgundy/10 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
            <div>
              <span className="text-[10px] uppercase font-bold text-burgundy/60 tracking-wider">
                Order ID
              </span>
              <p className="text-xs font-bold text-burgundy font-mono mt-0.5">{orderId}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-burgundy/60 tracking-wider">
                Estimated Delivery
              </span>
              <p className="text-xs font-bold text-burgundy mt-0.5">3–5 Business Days</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-[10px] uppercase font-bold text-burgundy/60 tracking-wider">
                Total Paid
              </span>
              <p className="text-xs font-bold text-burgundy font-serif mt-0.5">
                {formatPrice(total)}
              </p>
            </div>
          </div>

          {/* Delivery Tracker Steps */}
          <div className="py-4 border-y border-burgundy/10 text-left">
            <h3 className="text-xs font-bold uppercase tracking-wider text-burgundy mb-4 flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-burgundy" /> Shipment Timeline
            </h3>

            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="text-xs font-bold text-burgundy">Order Placed</h4>
                  <p className="text-[11px] text-burgundy/70">Verified & sent to master tailoring atelier.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-rose text-burgundy flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  2
                </div>
                <div>
                  <h4 className="text-xs font-bold text-burgundy">Handcrafted & Quality Inspection</h4>
                  <p className="text-[11px] text-burgundy/70">Signature finishing, ironed, and packed in luxury gift box.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start opacity-60">
                <div className="w-6 h-6 rounded-full bg-burgundy/20 text-burgundy flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  3
                </div>
                <div>
                  <h4 className="text-xs font-bold text-burgundy">Express Dispatch & Delivery</h4>
                  <p className="text-[11px] text-burgundy/70">Handed to BlueDart / Delhivery courier partner.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Items if available */}
          {order?.items && order.items.length > 0 && (
            <div className="mt-6 text-left">
              <h3 className="text-xs font-bold uppercase tracking-wider text-burgundy mb-3">
                Items In This Order
              </h3>
              <div className="space-y-2 divide-y divide-burgundy/10">
                {order.items.map((item, idx) => (
                  <div key={idx} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-10 h-12 rounded overflow-hidden bg-blush/30 shrink-0">
                        <ImageWithFallback src={item.image} alt={item.title} fill sizes="40px" className="object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold text-burgundy truncate max-w-xs">{item.title}</p>
                        <p className="text-[10px] text-burgundy/60">Size: {item.size} · Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-burgundy">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="flex-1 min-h-[48px] bg-burgundy hover:bg-burgundy-600 active:scale-95 text-white rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition"
            >
              <ShoppingBag className="w-4 h-4 text-rose" />
              <span>Continue Shopping</span>
            </Link>

            <button
              onClick={() => alert(`Order receipt BL-${orderId} downloaded!`)}
              className="px-5 min-h-[48px] border border-burgundy/25 rounded-lg text-xs font-bold uppercase tracking-wider text-burgundy hover:bg-blush/30 transition flex items-center justify-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Receipt</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

