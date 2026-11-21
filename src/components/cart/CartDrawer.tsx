'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Tag,
  ShieldCheck,
  Sparkles,
  Check,
} from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { useToast } from '@/components/common/Toast';

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    getSubtotal,
    getTotalDiscount,
    getTotal,
    couponCode,
    applyCoupon,
    removeCoupon,
  } = useCartStore();

  const { toast } = useToast();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  // Lock body scroll when open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  const subtotal = getSubtotal();
  const discount = getTotalDiscount();
  const total = getTotal();
  const shippingThreshold = 1999;
  const giftThreshold = 2999;
  const amountToFreeShipping = Math.max(0, shippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / shippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (res.success) {
      toast(res.message, 'success');
      setCouponInput('');
      setCouponError('');
    } else {
      setCouponError(res.message);
      toast(res.message, 'error');
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-burgundy/60 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-6">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="w-screen max-w-md bg-white shadow-drawer flex flex-col"
            >
              {/* Header */}
              <div className="px-5 py-4 border-b border-burgundy/10 flex items-center justify-between bg-ivory">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-burgundy" />
                  <h2 className="text-base font-bold uppercase tracking-wider text-burgundy font-serif">
                    Your Shopping Bag ({items.reduce((s, i) => s + i.quantity, 0)})
                  </h2>
                </div>
                <button
                  onClick={closeCart}
                  aria-label="Close cart"
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-blush/40 text-burgundy transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping & Gift Progress Bar */}
              <div className="bg-blush/30 px-5 py-3 border-b border-burgundy/5">
                <div className="flex items-center justify-between text-xs font-semibold text-burgundy mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                    {amountToFreeShipping > 0 ? (
                      <>
                        Add <span className="font-bold">{formatPrice(amountToFreeShipping)}</span> more for{' '}
                        <span className="text-rose-600 font-bold uppercase">Free Express Shipping</span>
                      </>
                    ) : (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 stroke-[3]" /> You unlocked Free Express Shipping!
                      </span>
                    )}
                  </span>
                  <span className="text-[11px] text-burgundy/70">
                    {Math.round(freeShippingProgress)}%
                  </span>
                </div>
                <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-burgundy/10">
                  <div
                    className="bg-gradient-to-r from-rose to-burgundy h-full transition-all duration-500 rounded-full"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
                {subtotal > 0 && subtotal < giftThreshold && (
                  <p className="text-[10px] text-burgundy/70 mt-1">
                    🎁 Add {formatPrice(giftThreshold - subtotal)} more to get a Free Silk Scrunchie & Pouch!
                  </p>
                )}
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto px-5 py-4 divide-y divide-burgundy/10">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-blush/50 flex items-center justify-center text-burgundy mb-4">
                      <ShoppingBag className="w-8 h-8 text-burgundy/60" />
                    </div>
                    <h3 className="text-lg font-serif font-bold text-burgundy mb-1">
                      Your bag is empty
                    </h3>
                    <p className="text-xs text-burgundy/70 max-w-xs mb-6">
                      Explore our stunning collection of Indo-Western fusion, corsets, and festive edits.
                    </p>
                    <button
                      onClick={closeCart}
                      className="px-6 py-2.5 bg-burgundy text-white text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-burgundy-600 transition"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="py-4 first:pt-0 flex gap-3">
                      {/* Thumbnail */}
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={closeCart}
                        className="relative w-20 h-24 rounded-md overflow-hidden bg-blush/20 shrink-0"
                      >
                        <ImageWithFallback
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="90px"
                          className="object-cover"
                        />
                      </Link>

                      {/* Info */}
                      <div className="flex flex-col flex-1 justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <Link
                              href={`/product/${item.slug}`}
                              onClick={closeCart}
                              className="text-xs font-semibold text-burgundy hover:text-rose-600 line-clamp-1 pr-2"
                            >
                              {item.title}
                            </Link>
                            <button
                              onClick={() => removeItem(item.id)}
                              aria-label="Remove item"
                              className="text-burgundy/50 hover:text-red-500 transition p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center gap-2 mt-1 text-[11px] text-burgundy/70">
                            <span className="bg-blush/60 px-1.5 py-0.5 rounded font-medium">
                              Size: {item.size}
                            </span>
                            <span className="flex items-center gap-1">
                              <span
                                className="w-2.5 h-2.5 rounded-full border border-burgundy/20"
                                style={{ backgroundColor: item.color.hex }}
                              />
                              {item.color.name}
                            </span>
                          </div>
                        </div>

                        {/* Price & Qty Stepper */}
                        <div className="flex items-center justify-between mt-2 pt-1">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xs font-bold text-burgundy">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                            {item.mrp > item.price && (
                              <span className="text-[10px] text-burgundy/40 line-through">
                                {formatPrice(item.mrp * item.quantity)}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center border border-burgundy/20 rounded">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              aria-label="Decrease quantity"
                              className="w-7 h-7 flex items-center justify-center text-xs font-bold text-burgundy hover:bg-blush/40"
                            >
                              -
                            </button>
                            <span className="w-7 text-center text-xs font-semibold text-burgundy">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              aria-label="Increase quantity"
                              className="w-7 h-7 flex items-center justify-center text-xs font-bold text-burgundy hover:bg-blush/40"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Checkout Section (only when items exist) */}
              {items.length > 0 && (
                <div className="border-t border-burgundy/10 p-5 bg-ivory flex flex-col gap-3">
                  {/* Coupon Code Input */}
                  <div>
                    {couponCode ? (
                      <div className="flex items-center justify-between p-2 rounded bg-rose/20 border border-rose/40 text-xs">
                        <div className="flex items-center gap-1.5 text-burgundy font-medium">
                          <Tag className="w-3.5 h-3.5 text-rose-600" />
                          <span>Code <strong>{couponCode}</strong> applied ({discount > 0 && `-${formatPrice(discount)}`})</span>
                        </div>
                        <button
                          onClick={removeCoupon}
                          className="text-burgundy/60 hover:text-red-500 text-[11px] underline font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyCoupon} className="flex gap-2">
                        <div className="relative flex-1">
                          <input
                            type="text"
                            value={couponInput}
                            onChange={(e) => {
                              setCouponInput(e.target.value);
                              setCouponError('');
                            }}
                            placeholder="Enter coupon (try BLOSSOM10)"
                            className="w-full text-xs px-3 py-2 border border-burgundy/20 rounded bg-white text-burgundy uppercase placeholder:normal-case focus:outline-none focus:border-burgundy"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-3 py-2 bg-burgundy/90 text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-burgundy transition"
                        >
                          Apply
                        </button>
                      </form>
                    )}
                    {couponError && (
                      <p className="text-[11px] text-red-500 mt-1">{couponError}</p>
                    )}
                  </div>

                  {/* Summary Breakdown */}
                  <div className="space-y-1.5 text-xs text-burgundy/80 pt-2 border-t border-burgundy/10">
                    <div className="flex justify-between">
                      <span>Bag Subtotal</span>
                      <span className="font-semibold">{formatPrice(subtotal)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-rose-600">
                        <span>Coupon Discount</span>
                        <span>-{formatPrice(discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping Fee</span>
                      <span>
                        {subtotal >= shippingThreshold ? (
                          <span className="text-emerald-700 font-semibold uppercase text-[11px]">
                            FREE
                          </span>
                        ) : (
                          formatPrice(99)
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-burgundy pt-2 border-t border-burgundy/10">
                      <span>Total Amount</span>
                      <span className="text-base text-burgundy">{formatPrice(total)}</span>
                    </div>
                  </div>

                  {/* Checkout CTA */}
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="w-full min-h-[48px] bg-burgundy hover:bg-burgundy-600 active:scale-98 text-white rounded-lg font-semibold text-xs md:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all mt-1"
                  >
                    <span>Continue to Safe Checkout</span>
                    <ArrowRight className="w-4 h-4 text-rose" />
                  </Link>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-burgundy/60 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>100% Verified Safe & Encrypted Checkout</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

