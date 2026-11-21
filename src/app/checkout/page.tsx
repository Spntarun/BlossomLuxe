'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  ShieldCheck,
  CreditCard,
  Banknote,
  QrCode,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Lock,
} from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { useToast } from '@/components/common/Toast';

const checkoutSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  pincode: z.string().regex(/^\d{6}$/, 'Enter a valid 6-digit Pincode'),
  address: z.string().min(6, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  paymentMethod: z.enum(['upi', 'card', 'cod']),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getTotalDiscount, getTotal, clearCart, couponCode } = useCartStore();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      pincode: '',
      address: '',
      city: '',
      state: 'Maharashtra',
      paymentMethod: 'upi',
    },
  });

  const selectedPayment = watch('paymentMethod');

  const subtotal = getSubtotal();
  const discount = getTotalDiscount();
  const total = getTotal();

  const onSubmit = (data: CheckoutFormData) => {
    setIsSubmitting(true);

    // Save order data for order-success page
    const orderData = {
      orderId: `BL-${Math.floor(100000 + Math.random() * 900000)}`,
      customer: data,
      items: [...items],
      subtotal,
      discount,
      total,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    };

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('blossom_last_order', JSON.stringify(orderData));
    }

    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      router.push('/order-success');
    }, 800);
  };

  if (items.length === 0) {
    return (
      <div className="bg-ivory min-h-screen py-16 px-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl p-8 text-center border border-burgundy/10 shadow-sm">
          <ShoppingBag className="w-12 h-12 text-burgundy/40 mx-auto mb-3" />
          <h2 className="text-lg font-serif font-bold text-burgundy mb-2">
            No items in your shopping bag
          </h2>
          <p className="text-xs text-burgundy/70 mb-6">
            Please add luxury silhouettes to your bag before checking out.
          </p>
          <Link
            href="/collections/all"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-burgundy text-white text-xs font-bold uppercase tracking-wider rounded-lg"
          >
            Browse Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ivory min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="pb-6 border-b border-burgundy/10 mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-burgundy font-serif">
              Secure Checkout
            </h1>
            <p className="text-xs text-burgundy/70 mt-0.5">
              Guaranteed encrypted SSL checkout · Dispatched within 24 hours
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit SSL Encrypted</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Delivery Address & Payment Method */}
            <div className="lg:col-span-7 space-y-6">
              {/* Shipping Address Box */}
              <div className="bg-white p-6 rounded-xl border border-burgundy/10 shadow-2xs">
                <h3 className="text-sm font-bold uppercase tracking-wider text-burgundy font-serif mb-4 pb-2 border-b border-burgundy/10">
                  1. Shipping & Contact Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-burgundy mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      {...register('fullName')}
                      placeholder="e.g. Ananya Roy"
                      className="w-full text-xs px-3.5 py-2.5 border border-burgundy/20 rounded-md focus:outline-none focus:border-burgundy"
                    />
                    {errors.fullName && (
                      <span className="text-[11px] text-red-500 mt-1 block">
                        {errors.fullName.message}
                      </span>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-burgundy mb-1">
                      Email Address (for order updates) *
                    </label>
                    <input
                      type="email"
                      {...register('email')}
                      placeholder="ananya@example.com"
                      className="w-full text-xs px-3.5 py-2.5 border border-burgundy/20 rounded-md focus:outline-none focus:border-burgundy"
                    />
                    {errors.email && (
                      <span className="text-[11px] text-red-500 mt-1 block">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-burgundy mb-1">
                      Mobile Number (for delivery SMS) *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-xs bg-blush/30 border border-r-0 border-burgundy/20 rounded-l-md font-bold text-burgundy">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        {...register('phone')}
                        placeholder="9876543210"
                        className="flex-1 text-xs px-3.5 py-2.5 border border-burgundy/20 rounded-r-md focus:outline-none focus:border-burgundy"
                      />
                    </div>
                    {errors.phone && (
                      <span className="text-[11px] text-red-500 mt-1 block">
                        {errors.phone.message}
                      </span>
                    )}
                  </div>

                  {/* Address */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-burgundy mb-1">
                      Flat, House No., Building, Street *
                    </label>
                    <input
                      type="text"
                      {...register('address')}
                      placeholder="402, Lotus Residency, MG Road"
                      className="w-full text-xs px-3.5 py-2.5 border border-burgundy/20 rounded-md focus:outline-none focus:border-burgundy"
                    />
                    {errors.address && (
                      <span className="text-[11px] text-red-500 mt-1 block">
                        {errors.address.message}
                      </span>
                    )}
                  </div>

                  {/* Pincode */}
                  <div>
                    <label className="block text-xs font-semibold text-burgundy mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      {...register('pincode')}
                      placeholder="400001"
                      className="w-full text-xs px-3.5 py-2.5 border border-burgundy/20 rounded-md focus:outline-none focus:border-burgundy"
                    />
                    {errors.pincode && (
                      <span className="text-[11px] text-red-500 mt-1 block">
                        {errors.pincode.message}
                      </span>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-xs font-semibold text-burgundy mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      {...register('city')}
                      placeholder="Mumbai"
                      className="w-full text-xs px-3.5 py-2.5 border border-burgundy/20 rounded-md focus:outline-none focus:border-burgundy"
                    />
                    {errors.city && (
                      <span className="text-[11px] text-red-500 mt-1 block">
                        {errors.city.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Methods Box */}
              <div className="bg-white p-6 rounded-xl border border-burgundy/10 shadow-2xs">
                <h3 className="text-sm font-bold uppercase tracking-wider text-burgundy font-serif mb-4 pb-2 border-b border-burgundy/10">
                  2. Select Payment Method
                </h3>

                <div className="space-y-3">
                  {/* UPI Option */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition ${
                      selectedPayment === 'upi'
                        ? 'border-burgundy bg-blush/20 shadow-xs'
                        : 'border-burgundy/15 hover:border-burgundy/40'
                    }`}
                  >
                    <input
                      type="radio"
                      value="upi"
                      {...register('paymentMethod')}
                      className="mt-1 accent-burgundy"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-burgundy flex items-center gap-1.5">
                          <QrCode className="w-4 h-4 text-burgundy" /> Instant UPI (GPay, PhonePe, Paytm, CRED)
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          FASTEST
                        </span>
                      </div>
                      <p className="text-[11px] text-burgundy/70 mt-1">
                        Zero transaction fees. Instant cashback eligibility.
                      </p>
                    </div>
                  </label>

                  {/* Card Option */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition ${
                      selectedPayment === 'card'
                        ? 'border-burgundy bg-blush/20 shadow-xs'
                        : 'border-burgundy/15 hover:border-burgundy/40'
                    }`}
                  >
                    <input
                      type="radio"
                      value="card"
                      {...register('paymentMethod')}
                      className="mt-1 accent-burgundy"
                    />
                    <div className="flex-1">
                      <span className="text-xs font-bold text-burgundy flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-burgundy" /> Credit / Debit Card
                      </span>
                      <p className="text-[11px] text-burgundy/70 mt-1">
                        Visa, Mastercard, RuPay, Amex. 3D-Secure OTP verification.
                      </p>
                    </div>
                  </label>

                  {/* Cash on Delivery */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition ${
                      selectedPayment === 'cod'
                        ? 'border-burgundy bg-blush/20 shadow-xs'
                        : 'border-burgundy/15 hover:border-burgundy/40'
                    }`}
                  >
                    <input
                      type="radio"
                      value="cod"
                      {...register('paymentMethod')}
                      className="mt-1 accent-burgundy"
                    />
                    <div className="flex-1">
                      <span className="text-xs font-bold text-burgundy flex items-center gap-1.5">
                        <Banknote className="w-4 h-4 text-burgundy" /> Cash on Delivery (COD)
                      </span>
                      <p className="text-[11px] text-burgundy/70 mt-1">
                        Pay cash or UPI directly to delivery executive upon doorstep arrival.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary Box */}
            <div className="lg:col-span-5">
              <div className="bg-white p-6 rounded-xl border border-burgundy/10 shadow-2xs sticky top-28 space-y-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-burgundy font-serif pb-2 border-b border-burgundy/10 flex items-center justify-between">
                  <span>Order Summary</span>
                  <span className="text-xs text-burgundy/60 font-sans font-normal">
                    {items.length} {items.length === 1 ? 'Item' : 'Items'}
                  </span>
                </h3>

                {/* Items Mini List */}
                <div className="space-y-3 max-h-64 overflow-y-auto no-scrollbar divide-y divide-burgundy/5">
                  {items.map((item) => (
                    <div key={item.id} className="pt-3 first:pt-0 flex gap-3">
                      <div className="relative w-14 h-18 rounded overflow-hidden bg-blush/30 shrink-0">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="60px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-burgundy truncate">
                          {item.title}
                        </h4>
                        <div className="text-[11px] text-burgundy/60 mt-0.5">
                          Size: {item.size} · Qty: {item.quantity}
                        </div>
                        <div className="text-xs font-bold text-burgundy mt-1">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="pt-4 border-t border-burgundy/10 space-y-2 text-xs text-burgundy/80">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-burgundy">{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-rose-600 font-semibold">
                      <span>Promo Discount ({couponCode})</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>
                      {subtotal >= 1999 ? (
                        <span className="text-emerald-700 font-bold uppercase text-[11px]">
                          FREE EXPRESS
                        </span>
                      ) : (
                        formatPrice(99)
                      )}
                    </span>
                  </div>
                  <div className="pt-3 border-t border-burgundy/10 flex justify-between items-baseline text-sm font-bold text-burgundy">
                    <span>Total Amount</span>
                    <span className="text-xl font-serif text-burgundy">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Submit Order Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full min-h-[48px] bg-burgundy hover:bg-burgundy-600 active:scale-98 text-white rounded-lg font-bold text-xs md:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span>Confirming Luxury Order...</span>
                  ) : (
                    <>
                      <span>Place Order · {formatPrice(total)}</span>
                      <ArrowRight className="w-4 h-4 text-rose" />
                    </>
                  )}
                </button>

                <div className="text-center pt-2">
                  <span className="text-[10px] text-burgundy/60 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    By placing order, you agree to Blossom Luxe Terms & 7-Day Return Policy
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

